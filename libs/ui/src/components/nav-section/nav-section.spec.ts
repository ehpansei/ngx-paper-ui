import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavSection } from './nav-section';

@Component({
  imports: [NavSection],
  template: `
    <lib-nav-section title="Plain"><button>A</button></lib-nav-section>
    <lib-nav-section title="Forms" collapsible [(expanded)]="open">
      <button>B</button>
      <lib-nav-section title="Passwords" collapsible><button>C</button></lib-nav-section>
    </lib-nav-section>
  `,
})
class Host {
  readonly open = signal(true);
}

describe('NavSection', () => {
  const setup = () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const [plain, forms, passwords] = Array.from(fixture.nativeElement.querySelectorAll('lib-nav-section')) as HTMLElement[];
    return { fixture, plain, forms, passwords };
  };

  it('renders a plain title without a toggle when not collapsible', () => {
    const { plain } = setup();
    expect(plain.querySelector('button.ui-nav-section-toggle')).toBeNull();
    expect(plain.querySelector('div.ui-overline')?.textContent).toBe('Plain');
    expect(plain.querySelector('nav')?.getAttribute('aria-label')).toBe('Plain');
    expect(plain.querySelector('nav')?.classList).not.toContain('is-collapsible');
  });

  it('toggles the items and syncs [(expanded)]', async () => {
    const { fixture, forms } = setup();
    expect(forms.querySelector('nav')?.classList).toContain('is-collapsible');
    const toggle = forms.querySelector('button.ui-nav-section-toggle') as HTMLButtonElement;
    const items = forms.querySelector('.ui-nav-section-items') as HTMLElement;
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-controls')).toBe(items.id);
    expect(items.hidden).toBe(false);

    toggle.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.open()).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(items.hidden).toBe(true);

    fixture.componentInstance.open.set(true);
    await fixture.whenStable();
    expect(items.hidden).toBe(false);
  });

  it('renders a nested section as a group, not a second nav', () => {
    const { passwords } = setup();
    expect(passwords.querySelector('nav')).toBeNull();
    const group = passwords.querySelector('[role="group"]');
    expect(group?.classList).toContain('is-nested');
    expect(group?.getAttribute('aria-label')).toBe('Passwords');
  });
});
