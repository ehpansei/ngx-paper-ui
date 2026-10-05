import type { SelectOption } from '../inputs';

export type InputTextType = 'text' | 'email' | 'search' | 'url' | 'tel';

/** A rule's value with an optional custom message; a bare value uses the default message. */
export type RuleWithMessage<T> = T | { value: T; message: string };

/**
 * Everything is plain data (a pattern is a string source, not a RegExp) so a form config can be stored or
 * sent as JSON.
 */
export interface BaseFieldConfig {
  key: string;
  label: string;
  placeholder?: string;
  helper?: string;
  /** Initial value; defaults to '' for inputs and null for selects. */
  value?: string | number | null;
  disabled?: boolean;
  /** true, or the message to show ("Email is required" by default). */
  required?: boolean | string;
  minLength?: RuleWithMessage<number>;
  maxLength?: RuleWithMessage<number>;
  /** A RegExp source, e.g. { value: '^https?://', message: 'Start with http:// or https://' }. */
  pattern?: RuleWithMessage<string>;
}

export interface InputFieldConfig extends BaseFieldConfig {
  controlType: 'input';
  type?: InputTextType;
  /** Validate as an email address: true, or the message to show. */
  email?: boolean | string;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  controlType: 'select';
  options: SelectOption<string | number>[];
}

export type FieldConfig = InputFieldConfig | SelectFieldConfig;

export type FormConfig = FieldConfig[];
