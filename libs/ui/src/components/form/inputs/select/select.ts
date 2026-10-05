import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, model, OnInit, signal } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { Icon } from '../../../icon';
import { FieldControl } from '../../field-control';
import { uid } from '../../uid';

export interface SelectOption<T = string> { value: T; label: string; disabled?: boolean }

/**
 * <lib-select label="Role" [options]="roles" [formField]="member.role" />
 * Signal Forms control (FormValueControl<T | null>). Arrow keys, Home/End, Enter/Space and Escape are handled.
 */
@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"ui-field" + (block() ? " is-block" : "")', '(document:click)': 'onDocClick($event)' },
  templateUrl: './select.html',
})
export class Select<T = string> extends FieldControl implements FormValueControl<T | null>, OnInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  readonly id = uid('lib-select');
  /** The selected option's value. Bound by [formField], or two-way with [(value)]. */
  readonly value = model<T | null>(null);
  readonly options = input.required<SelectOption<T>[]>();
  readonly label = input<string>();
  readonly placeholder = input('Select…');
  readonly helper = input<string>();
  readonly block = input(false, { transform: booleanAttribute });
  /** Open the menu initially (docs, tests). */
  readonly defaultOpen = input(false, { transform: booleanAttribute });

  readonly open = signal(false);
  readonly activeIndex = signal(-1);
  readonly current = computed(() => this.options().find(o => o.value === this.value()));

  // Inputs aren't bound at construction; open on init instead.
  ngOnInit() { if (this.defaultOpen()) this.show(); }

  toggle() { if (this.open()) this.close(); else this.show(); }
  show() { if (this.disabled() || this.readonly()) return; this.open.set(true); this.activeIndex.set(Math.max(0, this.options().findIndex(o => o.value === this.value()))); }
  close() { this.open.set(false); }
  pick(o: SelectOption<T>) { if (o.disabled) return; this.value.set(o.value); this.close(); }

  onKey(e: KeyboardEvent) {
    const n = this.options().length;
    if (e.key === 'Escape') return this.close();
    if (!this.open() && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); return this.show(); }
    if (!this.open()) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); this.activeIndex.update(i => (i + 1) % n); }
    if (e.key === 'ArrowUp') { e.preventDefault(); this.activeIndex.update(i => (i - 1 + n) % n); }
    if (e.key === 'Home') { e.preventDefault(); this.activeIndex.set(0); }
    if (e.key === 'End') { e.preventDefault(); this.activeIndex.set(n - 1); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const o = this.options()[this.activeIndex()]; if (o) this.pick(o); }
  }
  onDocClick(e: Event) { if (this.open() && !this.host.nativeElement.contains(e.target as Node)) this.close(); }
}
