import { ChangeDetectionStrategy, Component, computed, inject, Injector, input, linkedSignal, OnInit, output, runInInjectionContext, signal } from '@angular/core';
import { disabled, email, FieldTree, form, FormField, maxLength, minLength, pattern, required, SchemaPath, submit } from '@angular/forms/signals';
import { Select, TextInput } from './inputs';
import { FieldConfig, FormConfig, RuleWithMessage } from './types';

export type FormModel = Record<string, string | number | null>;

/**
 * <lib-form [formConfig]="fields" (submitted)="save($event)"><button libButton type="submit">Save</button></lib-form>
 * Renders a Signal Forms form from a config: `input` fields as TextInput, `select` fields as Select, with the
 * config's validation rules. Errors show once a field is touched; submitting touches every field, and
 * `submitted` only fires when the form is valid (`invalidSubmit` fires otherwise).
 */
@Component({
  selector: 'lib-form',
  imports: [TextInput, Select, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-form' },
  templateUrl: './form.html',
})
export class Form implements OnInit {
  private readonly injector = inject(Injector);
  readonly formConfig = input.required<FormConfig>();
  /** Emits the form value on a valid submit. */
  readonly submitted = output<FormModel>();
  /** Emits when a submit was blocked because the form is invalid (every error is now showing). */
  readonly invalidSubmit = output<void>();

  /** The model is built from the config; a new config resets the values. */
  private readonly model = linkedSignal<FormModel>(() => Object.fromEntries(this.formConfig().map((c) => [c.key, initial(c)])));
  /** The current values. */
  readonly value = this.model.asReadonly();

  /** Created on init: the schema reads `formConfig`, which isn't available at construction. Rules are read once. */
  form!: FieldTree<FormModel>;
  private readonly ready = signal(false);
  /** Whether every field passes its rules. */
  readonly valid = computed(() => this.ready() && this.form().valid());

  ngOnInit() {
    this.form = runInInjectionContext(this.injector, () =>
      form(this.model, (p) => {
        for (const c of this.formConfig()) applyRules(p[c.key], c);
      }),
    );
    this.ready.set(true);
  }

  field(key: string) {
    return this.form[key];
  }

  protected async onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const ok = await submit(this.form, async () => {
      this.submitted.emit(this.model());
    });
    if (!ok) this.invalidSubmit.emit();
  }
}

const initial = (c: FieldConfig) => c.value ?? (c.controlType === 'select' ? null : '');

const rule = <T>(r: RuleWithMessage<T>): { value: T; message?: string } =>
  r !== null && typeof r === 'object' && 'value' in (r as object) ? (r as { value: T; message: string }) : { value: r as T };

/** Maps a field config's rules onto Signal Forms validators, with readable default messages. */
function applyRules(path: SchemaPath<string | number | null>, c: FieldConfig) {
  const text = path as SchemaPath<string>;
  if (c.disabled) disabled(path);
  if (c.required) required(path, { message: typeof c.required === 'string' ? c.required : `${c.label} is required` });
  if (c.controlType === 'input' && c.email) email(text, { message: typeof c.email === 'string' ? c.email : 'Enter a valid email address' });
  if (c.minLength !== undefined) {
    const r = rule(c.minLength);
    minLength(text, r.value, { message: r.message ?? `Use at least ${r.value} characters` });
  }
  if (c.maxLength !== undefined) {
    const r = rule(c.maxLength);
    maxLength(text, r.value, { message: r.message ?? `Use at most ${r.value} characters` });
  }
  if (c.pattern !== undefined) {
    const r = rule(c.pattern);
    pattern(text, new RegExp(r.value), { message: r.message ?? `${c.label} isn't in the expected format` });
  }
}
