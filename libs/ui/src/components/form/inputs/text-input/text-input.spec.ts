import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { TextInput } from './text-input';

@Component({
  imports: [TextInput, FormField],
  template: `<lib-text-input label="Name" [formField]="f.name" />`,
})
class Host {
  readonly model = signal({ name: '' });
  readonly f = form(this.model, (p) => {
    required(p.name, { message: 'Name is required' });
    minLength(p.name, 3, { message: 'Must be at least 3 characters' });
  });
}

describe('TextInput', () => {
  it('writes to the model and shows the first error only after blur', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector('input') as HTMLInputElement;
    const error = () => el.querySelector('.ui-helper.is-error')?.textContent?.trim();

    expect(el.querySelector('label')?.textContent).toContain('*');
    expect(error()).toBeUndefined();

    input.value = 'ab';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(fixture.componentInstance.model().name).toBe('ab');
    expect(error()).toBeUndefined();

    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(fixture.componentInstance.f.name().touched()).toBe(true);
    expect(error()).toBe('Must be at least 3 characters');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('shows a manual error without a form', async () => {
    TestBed.overrideComponent(Host, { set: { template: `<lib-text-input label="Name" error="Taken" />` } });
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.ui-helper.is-error')?.textContent?.trim()).toBe('Taken');
  });
});
