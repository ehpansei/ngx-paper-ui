import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Button, ButtonSize, ButtonVariant } from './button';

@Component({
  imports: [Button],
  template: `<button libButton [variant]="variant()" [size]="size()" icon="plus" [iconOnly]="iconOnly()" label="Add">Add</button>`,
})
class Host {
  readonly variant = signal<ButtonVariant>('primary');
  readonly size = signal<ButtonSize>('md');
  readonly iconOnly = signal(false);
}

describe('Button', () => {
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement.querySelector('button') as HTMLButtonElement };
  }

  it('renders the variant class and no size class at md', () => {
    const { el } = render();
    expect(el.className).toBe('ui-btn ui-btn-primary');
    expect(el.querySelector('lib-icon')).toBeTruthy();
  });

  it('adds size and icon-only classes, and an aria-label only when icon-only', async () => {
    const { fixture, el } = render();
    fixture.componentInstance.variant.set('danger');
    fixture.componentInstance.size.set('sm');
    fixture.componentInstance.iconOnly.set(true);
    await fixture.whenStable();
    expect([...el.classList].sort()).toEqual(['ui-btn', 'ui-btn-danger', 'ui-btn-icon-only', 'ui-btn-sm']);
    expect(el.getAttribute('aria-label')).toBe('Add');
  });
});
