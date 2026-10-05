/** One block of a component's API section, in reading order. */
export type DocBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'empty'; text: string }
  | { kind: 'html'; html: string }
  | { kind: 'code'; code: string };

/** A documentation page, ported from a Paper UI design-system card. `summary`, table cells and `html` blocks hold trusted markup. */
export interface ComponentDoc {
  name: string;
  title: string;
  summary: string;
  group: string;
  subtitle?: string | null;
  /** Selector, class name and source path chips. */
  meta: string[];
  blocks: DocBlock[];
  /** CSS custom properties the component reads, without the leading `--`. */
  tokens: string[];
}
