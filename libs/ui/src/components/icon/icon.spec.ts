import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Icon } from './icon';
import { IconName } from './icons';
import { provideIconSprite } from './icon-sprite';

@Component({
  imports: [Icon],
  template: `<lib-icon [name]="name()" size="sm" [title]="title()" />`,
})
class Host {
  readonly name = signal<IconName>('search');
  readonly title = signal<string | undefined>(undefined);
}

describe('Icon', () => {
  const svg = (fixture: { nativeElement: HTMLElement }) => fixture.nativeElement.querySelector('svg') as SVGSVGElement;

  it('draws the named symbol from the default sprite, decorative by default', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    expect(svg(fixture).querySelector('use')?.getAttribute('href')).toBe('assets/ui/icons.svg#search');
    expect(svg(fixture).getAttribute('width')).toBe('16');
    expect(svg(fixture).getAttribute('stroke')).toBe('currentColor');
    expect(svg(fixture).getAttribute('aria-hidden')).toBe('true');

    fixture.componentInstance.name.set('lock');
    await fixture.whenStable();
    expect(svg(fixture).querySelector('use')?.getAttribute('href')).toBe('assets/ui/icons.svg#lock');
  });

  it('becomes an image with an accessible name when titled', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.title.set('Locked');
    await fixture.whenStable();
    expect(svg(fixture).getAttribute('role')).toBe('img');
    expect(svg(fixture).getAttribute('aria-label')).toBe('Locked');
    expect(svg(fixture).hasAttribute('aria-hidden')).toBe(false);
  });

  it('uses the sprite URL from provideIconSprite', async () => {
    TestBed.configureTestingModule({ providers: [provideIconSprite('/static/icons.svg')] });
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    expect(svg(fixture).querySelector('use')?.getAttribute('href')).toBe('/static/icons.svg#search');
  });
});
