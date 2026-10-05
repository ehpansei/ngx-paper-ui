import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { DOC_NAV, navLinks } from './docs/doc-nav';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(DOC_NAV.flatMap(navLinks).map((l) => ({ path: l.path.slice(1), children: [] })))],
    }).compileComponents();
  });

  it('renders the docs shell with one nav item per page', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('lib-main-view lib-sidebar')).toBeTruthy();
    const links = DOC_NAV.flatMap(navLinks);
    expect(el.querySelectorAll('a.ui-nav-item').length).toBe(links.length);
    expect(el.querySelector('.ui-overline')?.textContent?.trim()).toBe('Foundations');
  });

  it('opens only the sections holding the current page', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/lib-strength-meter');
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const expanded = Array.from(el.querySelectorAll('.ui-nav-section-toggle[aria-expanded="true"]')).map((b) => b.textContent?.trim());
    expect(expanded).toEqual(['Forms', 'Passwords']);
    expect(el.querySelectorAll('.ui-nav-section-toggle').length).toBe(DOC_NAV.length + 1);
    expect(el.querySelector('lib-main-view')?.textContent).toContain('Forms');
  });

  it('switches the document to dark mode', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('lib-switch input') as HTMLInputElement;
    input.click();
    await fixture.whenStable();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
