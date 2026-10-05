import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Form, FormModel } from './form';
import { FormConfig } from './types';

@Component({
  imports: [Form],
  template: `
    <lib-form [formConfig]="config()" (submitted)="value = $event" (invalidSubmit)="blocked = blocked + 1">
      <button type="submit">Save</button>
    </lib-form>
  `,
})
class Host {
  value: FormModel | undefined;
  blocked = 0;
  readonly config = signal<FormConfig>([
    { controlType: 'input', key: 'name', label: 'Name', required: true, minLength: 2 },
    { controlType: 'input', key: 'email', label: 'Email', type: 'email', required: 'Add your email', email: true },
    { controlType: 'input', key: 'site', label: 'Website', pattern: { value: '^https?://', message: 'Start with http:// or https://' } },
    { controlType: 'select', key: 'role', label: 'Role', required: true, options: [{ value: 'viewer', label: 'Viewer' }] },
    { controlType: 'input', key: 'plan', label: 'Plan', value: 'Free', disabled: true },
  ]);
}

describe('Form', () => {
  let fixture: ComponentFixture<Host>;
  let el: HTMLElement;
  const input = (label: string) => {
    const field = [...el.querySelectorAll('lib-text-input')].find((f) => f.querySelector('label')?.textContent?.includes(label));
    if (!field) throw new Error(`no field labelled ${label}`);
    return field.querySelector('input') as HTMLInputElement;
  };
  const errors = () => [...el.querySelectorAll('.ui-helper.is-error')].map((e) => e.textContent?.trim());
  const type = async (label: string, value: string) => {
    const i = input(label);
    i.value = value;
    i.dispatchEvent(new Event('input'));
    i.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
  };
  const submit = async () => {
    (el.querySelector('button[type=submit]') as HTMLButtonElement).click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    fixture = TestBed.createComponent(Host);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('renders one control per field, with initial values and disabled fields', () => {
    expect(el.querySelectorAll('lib-text-input').length).toBe(4);
    expect(el.querySelectorAll('lib-select').length).toBe(1);
    expect(input('Plan').value).toBe('Free');
    expect(input('Plan').disabled).toBe(true);
  });

  it('shows a field’s error only once it is touched, with default or configured messages', async () => {
    expect(errors()).toEqual([]);
    await type('Name', 'A');
    expect(errors()).toEqual(['Use at least 2 characters']);
    await type('Website', 'example.com');
    expect(errors()).toContain('Start with http:// or https://');
  });

  it('blocks an invalid submit, touching every field so all errors show', async () => {
    await submit();
    expect(fixture.componentInstance.value).toBeUndefined();
    expect(fixture.componentInstance.blocked).toBe(1);
    expect(errors()).toEqual(['Name is required', 'Add your email', 'Role is required']);
  });

  it('emits the model on a valid submit', async () => {
    await type('Name', 'Ana Silva');
    await type('Email', 'ana@example.com');
    await type('Website', 'https://ana.dev');
    const form = fixture.debugElement.children[0].componentInstance as Form;
    form.field('role')().value.set('viewer');
    await fixture.whenStable();
    expect(form.valid()).toBe(true);
    await submit();
    expect(fixture.componentInstance.blocked).toBe(0);
    expect(fixture.componentInstance.value).toEqual({ name: 'Ana Silva', email: 'ana@example.com', site: 'https://ana.dev', role: 'viewer', plan: 'Free' });
  });

  it('rejects a malformed email with the default message', async () => {
    fixture = TestBed.createComponent(Host);
    fixture.componentInstance.config.set([{ controlType: 'input', key: 'email', label: 'Email', email: true }]);
    el = fixture.nativeElement;
    await fixture.whenStable();
    await type('Email', 'not-an-email');
    expect(errors()).toEqual(['Enter a valid email address']);
  });
});
