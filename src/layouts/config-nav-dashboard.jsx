import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  connection: icon('ic-connections'),
  issues:icon('ic-issues'),
  transformations:icon('ic-transformations'),
  requests:icon('ic-requests'),
  events:icon('ic-events'),
  timezone:icon('ic-time-zone'),
  setting:icon('ic-settings')

  
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    // subheader: 'Overview 6.0.0',
    items: [
      { title: 'Connections', path: paths.dashboard.root, icon: ICONS.connection },
      { title: 'Requests', path: paths.dashboard.four, icon: ICONS.requests},
      { title: 'Events', path: paths.dashboard.five, icon: ICONS.events},
      // { title: 'Issues', path: paths.dashboard.two, icon: ICONS.issues },
      { title: 'Transformations', path: paths.dashboard.three, icon: ICONS.transformations},
      // { title: 'Time-Zone', path: paths.dashboard.Seven, icon: ICONS.timezone},
    ],
  },
  /**
   * Management
   */
  {
    // subheader: 'Management',
    items: [
      {
        title: 'Setting',
        path: paths.dashboard.group.root,
        icon: ICONS.setting,
        children: [
          { title: 'Time Zone', path: paths.dashboard.group.root },
          // { title: 'Five', path: paths.dashboard.group.five },
          // { title: 'Six', path: paths.dashboard.group.six },
        ],
      },
    ],
  },
];
