import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { cardOf, loadDocs, renderDts, renderPreview } from './docs.mjs';
import { TOKENS_JSON } from './paths.mjs';

const tokens = JSON.parse(readFileSync(TOKENS_JSON, 'utf8'));
const docs = loadDocs();
const button = docs.find((d) => d.name === 'Button');

describe('preview.html', () => {
  const html = renderPreview(button, tokens, { height: 1500 });

  it('follows the design-system card contract', () => {
    expect(html.split('\n')[0]).toBe('<!-- @dsCard group="Actions" height=1500 subtitle="Primary · Secondary · Danger · Ghost" -->');
    expect(cardOf(html)).toMatchObject({ group: 'Actions', height: 1500 });
    for (const s of ['Showcase', 'API', 'CSS tokens']) expect(html).toContain(`>${s}</h2>`);
    expect(html).toContain("window.PaperUI.mount('Button', document.getElementById('showcase'))");
    expect(html).not.toMatch(/<iframe|<object|<embed/);
  });

  it('documents the repo names and resolves token aliases for display', () => {
    expect(html).toContain('<code>button[libButton], a[libButton]</code>');
    expect(html).toContain('<code>--button-primary-bg</code><span class="doc-derived">derived</span>');
    expect(html).toContain('<code>#8a5a2b</code> / <code>#d4a373</code>'); // {primary} resolved per theme
  });
});

describe('index.d.ts', () => {
  const dts = renderDts(docs, ['lock', 'x']);

  it('is valid TypeScript', () => {
    const file = ts.createSourceFile('index.d.ts', dts, ts.ScriptTarget.Latest, true);
    const diagnostics = file.parseDiagnostics ?? [];
    expect(diagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))).toEqual([]);
    expect(dts).toContain('strength?: 0 | 1 | 2 | 3 | 4;');
  });

  it('emits <Comp>Props / Models / Outputs from the API tables', () => {
    expect(dts).toContain("export type IconName = 'lock' | 'x';");
    expect(dts).toMatch(/export interface ButtonProps \{[\s\S]*?variant\?: 'primary' \| 'secondary' \| 'danger' \| 'ghost';/);
    expect(dts).toMatch(/export interface SelectProps<T = string> \{[\s\S]*?options: SelectOption<T>\[\];/);
    expect(dts).toMatch(/export interface TextInputModels \{\n[\s\S]*?value: string;/);
    expect(dts).toMatch(/export interface PasswordFieldOutputs \{[\s\S]*?copied: void;/);
  });
});
