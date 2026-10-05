import TOKENS from './tokens.json';
import DERIVED from './derived-tokens.json';

export interface DesignToken {
  name: string;
  value: string | { light: string; dark?: string };
  usage: string;
}

export interface TokenFamily {
  key: string;
  label: string;
  tokens: DesignToken[];
}

/** Computed from --primary in libs/ui/src/styles/paper-ui/base.css; values in tokens.json are the default-sepia results. */
export const DERIVED_TOKENS = new Set<string>(DERIVED);

const LABELS: Record<string, string> = {
  color: 'Color', spacing: 'Spacing', radius: 'Radius', shadow: 'Shadow', typeScale: 'Type scale',
  size: 'Size', opacity: 'Opacity', breakpoint: 'Breakpoints',
};

const source = TOKENS as unknown as Record<string, { tokens?: DesignToken[] }>;

export const TOKEN_FAMILIES: TokenFamily[] = Object.keys(LABELS).map((key) => ({
  key,
  label: LABELS[key],
  tokens: source[key]?.tokens ?? [],
}));

export const TYPE_STYLES = TOKENS.type.groups.flatMap((g) =>
  g.styles.map((s) => ({ ...s, group: g.name, letterSpacing: 'letterSpacing' in s ? String(s.letterSpacing) : undefined })),
);

const BY_NAME = new Map(TOKEN_FAMILIES.flatMap((f) => f.tokens.map((t) => [t.name, { token: t, family: f.key }] as const)));

export const findToken = (name: string) => BY_NAME.get(name);

/** A token's display value, resolving `{alias}` references to `var(--alias)`. */
export const tokenValue = (t: DesignToken, theme: 'light' | 'dark') => {
  const v = typeof t.value === 'string' ? t.value : (t.value[theme] ?? t.value.light);
  return v.replace(/^\{([\w.-]+)\}$/, 'var(--$1)');
};
