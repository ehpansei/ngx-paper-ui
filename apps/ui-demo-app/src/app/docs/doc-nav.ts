export interface DocNavLink {
  label: string;
  path: string;
}

/** A sub-group inside a sidebar group (one level deep, like `lib-nav-section` nesting). */
export interface DocNavSubGroup {
  title: string;
  links: DocNavLink[];
}

/** A sidebar group; its entries are links or sub-groups, in display order. */
export interface DocNavGroup {
  title: string;
  links: (DocNavLink | DocNavSubGroup)[];
}

export const isNavGroup = (entry: DocNavLink | DocNavSubGroup): entry is DocNavSubGroup => 'links' in entry;

/** Every link in a group, sub-groups included. */
export const navLinks = (group: DocNavGroup): DocNavLink[] =>
  group.links.flatMap((e) => (isNavGroup(e) ? e.links : [e]));

/**
 * Sidebar navigation, grouped like the design system's cards. Sub-groups live only here: each page's
 * `*.docs.ts` `group` (and the design-system card) stays the top-level title.
 */
export const DOC_NAV: DocNavGroup[] = [
  {
    "title": "Foundations",
    "links": [
      {
        "label": "Overview",
        "path": "/lib-overview"
      },
      {
        "label": "Tokens",
        "path": "/lib-tokens"
      },
      {
        "label": "Icon",
        "path": "/lib-icon"
      },
      {
        "label": "Icon sizes",
        "path": "/lib-icon-sizes"
      },
      {
        "label": "Logo",
        "path": "/lib-logo"
      }
    ]
  },
  {
    "title": "Colors",
    "links": [
      {
        "label": "Theme",
        "path": "/lib-theme"
      }
    ]
  },
  {
    "title": "Actions",
    "links": [
      {
        "label": "Button",
        "path": "/lib-button"
      },
      {
        "label": "Link",
        "path": "/lib-link"
      }
    ]
  },
  {
    "title": "Forms",
    "links": [
      {
        "label": "Text input",
        "path": "/lib-text-input"
      },
      {
        "label": "Select",
        "path": "/lib-select"
      },
      {
        "title": "Passwords",
        "links": [
          {
            "label": "Password field",
            "path": "/lib-password-field"
          },
          {
            "label": "Strength meter",
            "path": "/lib-strength-meter"
          }
        ]
      },
      {
        "label": "Checkbox",
        "path": "/lib-checkbox"
      },
      {
        "label": "Switch",
        "path": "/lib-switch"
      },
      {
        "label": "Config form",
        "path": "/lib-form"
      }
    ]
  },
  {
    "title": "Navigation",
    "links": [
      {
        "label": "Tabs",
        "path": "/lib-tabs"
      },
      {
        "label": "Sidebar",
        "path": "/lib-sidebar"
      },
      {
        "label": "Nav section",
        "path": "/lib-nav-section"
      },
      {
        "label": "Nav item",
        "path": "/lib-nav-item"
      },
      {
        "label": "Sidebar user",
        "path": "/lib-sidebar-user"
      }
    ]
  },
  {
    "title": "Data display",
    "links": [
      {
        "label": "Badge",
        "path": "/lib-badge"
      },
      {
        "label": "Avatar",
        "path": "/lib-avatar"
      },
      {
        "label": "Info card",
        "path": "/lib-info-card"
      },
      {
        "label": "Detail view",
        "path": "/lib-detail-view"
      }
    ]
  },
  {
    "title": "Feedback",
    "links": [
      {
        "label": "Progress",
        "path": "/lib-progress"
      },
      {
        "label": "Empty state",
        "path": "/lib-empty-state"
      },
      {
        "label": "Toast",
        "path": "/lib-toast"
      },
      {
        "label": "Modal",
        "path": "/lib-modal"
      },
      {
        "label": "Confirm dialog",
        "path": "/lib-confirm-dialog"
      }
    ]
  },
  {
    "title": "Layout",
    "links": [
      {
        "label": "Main view",
        "path": "/lib-main-view"
      }
    ]
  }
];
