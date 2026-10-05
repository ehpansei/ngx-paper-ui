import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TabItem, Tabs } from './tabs';

@Component({
  imports: [Tabs],
  template: `<lib-tabs [items]="items" [(value)]="tab" />`,
})
class Host {
  readonly items: TabItem[] = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B', count: 3 }, { value: 'c', label: 'C' }];
  readonly tab = signal<string | undefined>(undefined);
}

describe('Tabs', () => {
  it('defaults to the first tab and moves with the arrow keys, wrapping around', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement.querySelector('lib-tabs');
    const selected = () => host.querySelector('[aria-selected="true"]')?.textContent?.trim();
    expect(selected()).toBe('A');

    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await fixture.whenStable();
    expect(fixture.componentInstance.tab()).toBe('c');

    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await fixture.whenStable();
    expect(fixture.componentInstance.tab()).toBe('a');
  });

  it('shows a count badge', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('lib-badge').length).toBe(1);
  });
});
