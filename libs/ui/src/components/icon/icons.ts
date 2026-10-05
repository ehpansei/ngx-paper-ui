// Paper UI icon set: 24px grid, 1.75px stroke, drawn in currentColor.
// Source: src/assets/icons/*.svg → `nx run ui:icons` builds src/assets/icons.svg (sprite) and ./icon-names.ts.
export { ICON_NAMES, type IconName } from './icon-names';

export type IconSize = 'sm' | 'md' | 'lg';
/** Matches the icon-size-sm / -md / -lg tokens. */
export const ICON_SIZES: Record<IconSize, number> = { sm: 16, md: 18, lg: 20 };
