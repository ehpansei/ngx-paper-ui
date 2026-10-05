import { Component, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Icon } from './icon';
import { provideInlineIconSprite } from './icon-sprite';
import { ICON_NAMES } from './icon-names';

@Component({
  imports: [Icon],
  template: `<lib-icon name="search" />`,
})
class Host {}

describe('provideInlineIconSprite', () => {
  const holders = () => document.querySelectorAll('#lib-icon-sprite');
  const href = (fixture: { nativeElement: HTMLElement }) =>
    (fixture.nativeElement as HTMLElement).querySelector('use')?.getAttribute('href');

  afterEach(() => holders().forEach((h) => h.remove()));

  it('adds the sprite to the page once and points icons at it', async () => {
    TestBed.configureTestingModule({ providers: [provideInlineIconSprite()] });
    const fixture = TestBed.createComponent(Host);
    TestBed.createComponent(Host);
    await fixture.whenStable();

    expect(href(fixture)).toBe('#search');
    expect(holders()).toHaveLength(1);
    const holder = holders()[0] as HTMLElement;
    expect(holder.getAttribute('aria-hidden')).toBe('true');
    expect(holder.style.width).toBe('0px');
    expect([...holder.querySelectorAll('symbol')].map((s) => s.id)).toEqual([...ICON_NAMES]);
  });

  it('does not add a second copy when one is already in the page', async () => {
    const existing = document.createElement('div');
    existing.id = 'lib-icon-sprite';
    document.body.append(existing);
    TestBed.configureTestingModule({ providers: [provideInlineIconSprite()] });
    await TestBed.createComponent(Host).whenStable();

    expect(holders()).toHaveLength(1);
    expect(holders()[0]).toBe(existing);
  });

  it('leaves the DOM alone on the server', async () => {
    TestBed.configureTestingModule({ providers: [provideInlineIconSprite(), { provide: PLATFORM_ID, useValue: 'server' }] });
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();

    expect(holders()).toHaveLength(0);
    expect(href(fixture)).toBe('#search');
  });
});
