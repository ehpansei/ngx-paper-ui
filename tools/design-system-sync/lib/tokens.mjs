/*
 * 3-way merge of tokens.json, token by token, so edits to different tokens on either side never conflict.
 * A tokens.json is flattened to ordered entries keyed by `<family>/<name>`:
 *   color/<name>, spacing/<name>, …           the {"tokens":[…]} families
 *   type.families/<key>, type.groups/<group>/<style>, type.fonts/<family>|<weight>|<style>
 *   <key> (whole value)                         everything else: name, version, meta, color.themes, notes
 */

const isList = (v) => v && typeof v === 'object' && Array.isArray(v.tokens);

export function flatten(doc) {
  const out = new Map();
  for (const [key, value] of Object.entries(doc)) {
    if (key === 'type' && value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        if (k === 'families') for (const [f, stack] of Object.entries(v)) out.set(`type.families/${f}`, stack);
        else if (k === 'groups') for (const g of v) {
          const { styles, ...group } = g;
          out.set(`type.groups/${g.name}`, group);
          for (const s of styles ?? []) out.set(`type.groups/${g.name}/${s.name}`, s);
        }
        else if (k === 'fonts') for (const f of v) out.set(`type.fonts/${f.family}|${f.weight ?? ''}|${f.style ?? ''}`, f);
        else out.set(`type.${k}`, v);
      }
    } else if (isList(value)) {
      const { tokens, ...rest } = value;
      out.set(`${key}.__family`, rest);
      for (const t of tokens) out.set(`${key}/${t.name}`, t);
    } else {
      out.set(key, value);
    }
  }
  return out;
}

export function unflatten(entries) {
  const doc = {};
  const type = () => (doc.type ??= { fonts: [], families: {}, groups: [] });
  for (const [key, value] of entries) {
    let m;
    if ((m = /^type\.families\/(.+)$/.exec(key))) type().families[m[1]] = value;
    else if ((m = /^type\.groups\/([^/]+)$/.exec(key))) type().groups.push({ ...value, styles: [] });
    else if ((m = /^type\.groups\/([^/]+)\/(.+)$/.exec(key))) {
      let g = type().groups.find((x) => x.name === m[1]);
      if (!g) type().groups.push((g = { name: m[1], styles: [] }));
      g.styles.push(value);
    } else if (key.startsWith('type.fonts/')) type().fonts.push(value);
    else if ((m = /^type\.(.+)$/.exec(key))) type()[m[1]] = value;
    else if ((m = /^([^/]+)\.__family$/.exec(key))) doc[m[1]] = { ...value, tokens: doc[m[1]]?.tokens ?? [] };
    else if ((m = /^([^/]+)\/(.+)$/.exec(key))) (doc[m[1]] ??= { tokens: [] }).tokens.push(value);
    else doc[key] = value;
  }
  return doc;
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * merge(base, local, remote) → { doc, conflicts: [{key, base, local, remote}], changes: {pushed:[], pulled:[]} }
 * Conflicting keys keep the LOCAL value in `doc` until the caller resolves them (see resolve()).
 */
export function merge(baseDoc, localDoc, remoteDoc) {
  const B = flatten(baseDoc ?? {});
  const L = flatten(localDoc);
  const R = flatten(remoteDoc);
  const conflicts = [];
  const pushed = [];
  const pulled = [];

  // Order: local's order, with remote-only keys inserted after their remote predecessor.
  const order = [...L.keys()];
  let prev = null;
  for (const k of R.keys()) {
    if (!L.has(k) && !order.includes(k)) order.splice(prev === null ? 0 : order.indexOf(prev) + 1, 0, k);
    prev = k;
  }

  const result = new Map();
  for (const k of order) {
    const b = B.get(k);
    const l = L.get(k);
    const r = R.get(k);
    const inB = B.has(k);
    const inL = L.has(k);
    const inR = R.has(k);
    if (inL && inR && same(l, r)) result.set(k, l);
    else if (inB && inL && same(b, l)) {
      if (inR) { result.set(k, r); pulled.push(k); }           // only the DS changed it
      else pulled.push(`-${k}`);                                   // deleted on the DS
    } else if (inB && inR && same(b, r)) {
      if (inL) { result.set(k, l); pushed.push(k); }             // only the repo changed it
      else pushed.push(`-${k}`);                                   // deleted in the repo
    } else if (!inB && inL && !inR) { result.set(k, l); pushed.push(k); }
    else if (!inB && inR && !inL) { result.set(k, r); pulled.push(k); }
    else {
      conflicts.push({ key: k, base: b, local: l, remote: r });
      if (inL) result.set(k, l);
    }
  }
  return { doc: unflatten(result), conflicts, changes: { pushed, pulled } };
}

/** Apply decisions {key: 'local' | 'remote'} to a merge result's conflicts. */
export function resolve(merged, local, remote, choices) {
  const R = flatten(remote);
  const L = flatten(local);
  const entries = [...flatten(merged)];
  const keys = new Set(entries.map(([k]) => k));
  for (const [key, pick] of Object.entries(choices)) {
    const src = pick === 'remote' ? R : L;
    const i = entries.findIndex(([k]) => k === key);
    if (src.has(key)) {
      if (i >= 0) entries[i] = [key, src.get(key)];
      else if (!keys.has(key)) entries.push([key, src.get(key)]);
    } else if (i >= 0) entries.splice(i, 1);
  }
  return unflatten(entries);
}

export const stringify = (doc) => JSON.stringify(doc, null, 2) + '\n';
