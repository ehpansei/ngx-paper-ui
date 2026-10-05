import { describe, expect, it } from 'vitest';
import { flatten, merge, resolve, unflatten } from './tokens.mjs';

const doc = (over = {}) => ({
  name: 'Paper UI',
  color: {
    themes: [{ id: 'light' }, { id: 'dark' }],
    tokens: [
      { name: 'primary', value: { light: '#8a5a2b', dark: '#d4a373' }, usage: 'The theme input.' },
      { name: 'danger', value: { light: '#b3401f', dark: '#e07a5f' }, usage: 'Destructive fills.' },
      ...(over.extraColor ?? []),
    ],
  },
  type: {
    fonts: [],
    families: { sans: 'Inter, sans-serif' },
    groups: [{ name: 'Text', family: 'sans', styles: [{ name: 'body', fontSize: '14px', lineHeight: '20px', fontWeight: 400 }] }],
  },
  radius: { tokens: [{ name: 'radius-md', value: '8px', usage: 'Buttons.' }] },
});
const set = (d, family, name, patch) => {
  const t = d[family].tokens.find((x) => x.name === name);
  Object.assign(t, patch);
  return d;
};

describe('tokens flatten/unflatten', () => {
  it('round-trips a tokens.json exactly', () => {
    const d = doc();
    expect(unflatten(flatten(d))).toEqual(d);
  });
});

describe('merge (3-way, per token)', () => {
  it('takes one-sided changes from each side without conflict', () => {
    const base = doc();
    const local = set(doc(), 'color', 'primary', { value: { light: '#3f5a7a', dark: '#9fb3cc' } });
    const remote = set(doc(), 'radius', 'radius-md', { value: '10px' });
    const m = merge(base, local, remote);
    expect(m.conflicts).toEqual([]);
    expect(m.changes).toEqual({ pushed: ['color/primary'], pulled: ['radius/radius-md'] });
    expect(m.doc.color.tokens[0].value.light).toBe('#3f5a7a');
    expect(m.doc.radius.tokens[0].value).toBe('10px');
  });

  it('reports the same token changed on both sides as a conflict, keeping the repo value until resolved', () => {
    const base = doc();
    const local = set(doc(), 'color', 'danger', { usage: 'Repo wording.' });
    const remote = set(doc(), 'color', 'danger', { usage: 'Page wording.' });
    const m = merge(base, local, remote);
    expect(m.conflicts.map((c) => c.key)).toEqual(['color/danger']);
    expect(m.doc.color.tokens[1].usage).toBe('Repo wording.');
    expect(resolve(m.doc, local, remote, { 'color/danger': 'remote' }).color.tokens[1].usage).toBe('Page wording.');
  });

  it('keeps a token added on the page, in place, and honours a deletion made on one side', () => {
    const base = doc();
    const added = { name: 'info', value: { light: '#3f5a7a' }, usage: 'Info.' };
    const remote = doc({ extraColor: [added] });
    const local = doc();
    local.radius.tokens = [];
    const m = merge(base, local, remote);
    expect(m.conflicts).toEqual([]);
    expect(m.doc.color.tokens.map((t) => t.name)).toEqual(['primary', 'danger', 'info']);
    expect(m.doc.radius.tokens).toEqual([]);
    expect(m.changes).toEqual({ pushed: ['-radius/radius-md'], pulled: ['color/info'] });
  });

  it('merges type styles independently of colours', () => {
    const base = doc();
    const remote = doc();
    remote.type.groups[0].styles[0].fontSize = '15px';
    const m = merge(base, doc(), remote);
    expect(m.doc.type.groups[0].styles[0].fontSize).toBe('15px');
  });
});
