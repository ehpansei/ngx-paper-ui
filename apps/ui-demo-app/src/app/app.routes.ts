import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'lib-overview' },
  {
    path: 'lib-overview',
    title: 'Overview — Paper UI',
    loadComponent: () => import('./pages/overview-page/overview-page').then((m) => m.OverviewPage),
  },
  {
    path: 'lib-tokens',
    title: 'Tokens — Paper UI',
    loadComponent: () => import('./pages/tokens-page/tokens-page').then((m) => m.TokensPage),
  },
  {
    path: 'lib-icon',
    title: 'Icon — Paper UI',
    loadComponent: () => import('./pages/icon-docs-page/icon-docs-page').then((m) => m.IconDocsPage),
  },
  {
    path: 'lib-icon-sizes',
    title: 'Icon sizes — Paper UI',
    loadComponent: () => import('./pages/icon-sizes-docs-page/icon-sizes-docs-page').then((m) => m.IconSizesDocsPage),
  },
  {
    path: 'lib-button',
    title: 'Button — Paper UI',
    loadComponent: () => import('./pages/button-docs-page/button-docs-page').then((m) => m.ButtonDocsPage),
  },
  {
    path: 'lib-link',
    title: 'Link — Paper UI',
    loadComponent: () => import('./pages/link-docs-page/link-docs-page').then((m) => m.LinkDocsPage),
  },
  {
    path: 'lib-text-input',
    title: 'Text input — Paper UI',
    loadComponent: () => import('./pages/text-input-docs-page/text-input-docs-page').then((m) => m.TextInputDocsPage),
  },
  {
    path: 'lib-select',
    title: 'Select — Paper UI',
    loadComponent: () => import('./pages/select-docs-page/select-docs-page').then((m) => m.SelectDocsPage),
  },
  {
    path: 'lib-password-field',
    title: 'Password field — Paper UI',
    loadComponent: () => import('./pages/password-field-docs-page/password-field-docs-page').then((m) => m.PasswordFieldDocsPage),
  },
  {
    path: 'lib-strength-meter',
    title: 'Strength meter — Paper UI',
    loadComponent: () => import('./pages/strength-meter-docs-page/strength-meter-docs-page').then((m) => m.StrengthMeterDocsPage),
  },
  {
    path: 'lib-checkbox',
    title: 'Checkbox — Paper UI',
    loadComponent: () => import('./pages/checkbox-docs-page/checkbox-docs-page').then((m) => m.CheckboxDocsPage),
  },
  {
    path: 'lib-switch',
    title: 'Switch — Paper UI',
    loadComponent: () => import('./pages/switch-docs-page/switch-docs-page').then((m) => m.SwitchDocsPage),
  },
  {
    path: 'lib-tabs',
    title: 'Tabs — Paper UI',
    loadComponent: () => import('./pages/tabs-docs-page/tabs-docs-page').then((m) => m.TabsDocsPage),
  },
  {
    path: 'lib-progress',
    title: 'Progress — Paper UI',
    loadComponent: () => import('./pages/progress-docs-page/progress-docs-page').then((m) => m.ProgressDocsPage),
  },
  {
    path: 'lib-badge',
    title: 'Badge — Paper UI',
    loadComponent: () => import('./pages/badge-docs-page/badge-docs-page').then((m) => m.BadgeDocsPage),
  },
  {
    path: 'lib-avatar',
    title: 'Avatar — Paper UI',
    loadComponent: () => import('./pages/avatar-docs-page/avatar-docs-page').then((m) => m.AvatarDocsPage),
  },
  {
    path: 'lib-logo',
    title: 'Logo — Paper UI',
    loadComponent: () => import('./pages/logo-docs-page/logo-docs-page').then((m) => m.LogoDocsPage),
  },
  {
    path: 'lib-sidebar',
    title: 'Sidebar — Paper UI',
    loadComponent: () => import('./pages/sidebar-docs-page/sidebar-docs-page').then((m) => m.SidebarDocsPage),
  },
  {
    path: 'lib-nav-section',
    title: 'Nav section — Paper UI',
    loadComponent: () => import('./pages/nav-section-docs-page/nav-section-docs-page').then((m) => m.NavSectionDocsPage),
  },
  {
    path: 'lib-nav-item',
    title: 'Nav item — Paper UI',
    loadComponent: () => import('./pages/nav-item-docs-page/nav-item-docs-page').then((m) => m.NavItemDocsPage),
  },
  {
    path: 'lib-sidebar-user',
    title: 'Sidebar user — Paper UI',
    loadComponent: () => import('./pages/sidebar-user-docs-page/sidebar-user-docs-page').then((m) => m.SidebarUserDocsPage),
  },
  {
    path: 'lib-info-card',
    title: 'Info card — Paper UI',
    loadComponent: () => import('./pages/info-card-docs-page/info-card-docs-page').then((m) => m.InfoCardDocsPage),
  },
  {
    path: 'lib-detail-view',
    title: 'Detail view — Paper UI',
    loadComponent: () => import('./pages/detail-view-docs-page/detail-view-docs-page').then((m) => m.DetailViewDocsPage),
  },
  {
    path: 'lib-empty-state',
    title: 'Empty state — Paper UI',
    loadComponent: () => import('./pages/empty-state-docs-page/empty-state-docs-page').then((m) => m.EmptyStateDocsPage),
  },
  {
    path: 'lib-toast',
    title: 'Toast — Paper UI',
    loadComponent: () => import('./pages/toast-docs-page/toast-docs-page').then((m) => m.ToastDocsPage),
  },
  {
    path: 'lib-modal',
    title: 'Modal — Paper UI',
    loadComponent: () => import('./pages/modal-docs-page/modal-docs-page').then((m) => m.ModalDocsPage),
  },
  {
    path: 'lib-confirm-dialog',
    title: 'Confirm dialog — Paper UI',
    loadComponent: () => import('./pages/confirm-dialog-docs-page/confirm-dialog-docs-page').then((m) => m.ConfirmDialogDocsPage),
  },
  {
    path: 'lib-main-view',
    title: 'Main view — Paper UI',
    loadComponent: () => import('./pages/main-view-docs-page/main-view-docs-page').then((m) => m.MainViewDocsPage),
  },
  {
    path: 'lib-theme',
    title: 'Theme — Paper UI',
    loadComponent: () => import('./pages/theme-docs-page/theme-docs-page').then((m) => m.ThemeDocsPage),
  },
  {
    path: 'lib-form',
    title: 'Config form — Paper UI',
    loadComponent: () => import('./pages/form-docs-page/form-docs-page').then((m) => m.FormDocsPage),
  },
  { path: '**', redirectTo: 'lib-overview' },
];
