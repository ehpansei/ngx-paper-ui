import { booleanAttribute, computed, Directive, input, model } from '@angular/core';
import type { ValidationError } from '@angular/forms/signals';

/**
 * Shared Signal Forms plumbing (FormUiControl) for every Paper UI form control.
 * Bind a control with the FormField directive — `<lib-text-input [formField]="f.name" />` — and the
 * directive fills these inputs from the field state: disabled, readonly, errors, invalid, touched,
 * required, name.
 * Subclasses add the value contract: `value = model<T>()` (FormValueControl) or
 * `checked = model<boolean>()` (FormCheckboxControl).
 *
 * Angular 21.2: `touched` is a two-way model — controls call `touched.set(true)` on blur and the
 * FormField directive marks the field as touched. (Angular 22 replaces this with a `touch` output.)
 */
@Directive()
export abstract class FieldControl {
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  /** Bound by [formField] (two-way); set on blur so the field is marked touched. */
  readonly touched = model(false);
  readonly name = input('');
  /** Bound from the field; each error's `message` is shown once the field is touched. */
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  /** Manual message, for use without a form. Wins over `errors`. */
  readonly error = input<string | null>(null);

  /** The message to show under the control, or null. */
  readonly message = computed(() => {
    const manual = this.error();
    if (manual) return manual;
    if (!this.touched()) return null;
    const first = this.errors()[0];
    return first ? (first.message ?? 'Invalid value') : null;
  });
}
