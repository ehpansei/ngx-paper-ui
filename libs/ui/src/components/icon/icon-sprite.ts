import { isPlatformBrowser } from '@angular/common';
import {
  DOCUMENT, EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, PLATFORM_ID, provideEnvironmentInitializer,
  Provider,
} from '@angular/core';
import { ICON_SPRITE_SVG } from './icon-sprite-data';

/**
 * URL of the icon sprite (`libs/ui/src/assets/icons.svg`), which apps copy into their build.
 * Defaults to `assets/ui/icons.svg`. It must be same-origin: browsers refuse cross-origin `<use>` references.
 * An empty string means the sprite is in the page itself (see `provideInlineIconSprite()`).
 */
export const ICON_SPRITE_URL = new InjectionToken<string>('ICON_SPRITE_URL', {
  providedIn: 'root',
  factory: () => 'assets/ui/icons.svg',
});

/** providers: [provideIconSprite('/static/icons.svg')] — when the app serves the sprite somewhere else. */
export const provideIconSprite = (url: string): Provider => ({ provide: ICON_SPRITE_URL, useValue: url });

/** The id of the hidden element that holds the inlined sprite. */
const INLINE_ICON_SPRITE_ID = 'lib-icon-sprite';

/**
 * providers: [provideInlineIconSprite()] — icons with no asset to serve. On app start the sprite is added to the
 * page once, hidden, and `<lib-icon>` points at it (`#lock`). Does nothing outside the browser (SSR).
 */
export function provideInlineIconSprite(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideIconSprite(''),
    provideEnvironmentInitializer(() => {
      if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
      const document = inject(DOCUMENT);
      if (document.getElementById(INLINE_ICON_SPRITE_ID)) return;
      const holder = document.createElement('div');
      holder.id = INLINE_ICON_SPRITE_ID;
      holder.setAttribute('aria-hidden', 'true');
      holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
      holder.innerHTML = ICON_SPRITE_SVG;
      document.body.prepend(holder);
    }),
  ]);
}
