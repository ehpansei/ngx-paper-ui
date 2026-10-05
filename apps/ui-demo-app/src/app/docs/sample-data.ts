import { BadgeSpec, IconName } from 'ngx-paper-ui';

/** Sample records shared by the InfoCard and MainView showcases. */
export const CARDS: { title: string; description: string; icon?: IconName; badges: BadgeSpec[] }[] = [
  { title: 'github.com', description: 'pedro@example.com', icon: 'globe', badges: [{ tone: 'success', label: 'Strong' }] },
  { title: 'figma.com', description: 'pedro@example.com', badges: [{ tone: 'warning', label: 'Reused' }] },
  { title: 'Website redesign', description: '12 tasks', icon: 'folder', badges: [{ tone: 'primary', label: 'Active' }] },
  { title: 'old-forum.net', description: 'pedro275', badges: [{ tone: 'danger', label: 'Weak' }, { tone: 'warning', label: 'Reused' }] },
];
