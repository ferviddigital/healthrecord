import { previousRoute } from '@stores/ui';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const Start = () => import(/* webpackChunkName: "group-start" */ '@components/Start/Start.vue');
const StartNew = () => import(/* webpackChunkName: "group-start" */ '@components/Start/New.vue');
const DashboardLayout = () =>
  import(/* webpackChunkName: "group-dashboard" */ '@components/Layout.vue');
const Dashboard = () =>
  import(/* webpackChunkName: "group-dashboard" */ '@components/Dashboard/Dashboard.vue');
const MeasurementCreate = () =>
  import(/* webpackChunkName: "group-measurements" */ '@components/Measurements/Create.vue');
const MeasurementUpdate = () =>
  import(/* webpackChunkName: "group-measurements" */ '@components/Measurements/Update.vue');
const NoteView = () => import(/* webpackChunkName: "group-notes" */ '@components/Notes/View.vue');
const NoteCreate = () =>
  import(/* webpackChunkName: "group-notes" */ '@components/Notes/Create.vue');
const NoteUpdate = () =>
  import(/* webpackChunkName: "group-notes" */ '@components/Notes/Update.vue');
const Person = () => import(/* webpackChunkName: "group-person" */ '@components/Person/Person.vue');
const PersonLogbook = () =>
  import(/* webpackChunkName: "group-person" */ '@components/Logbook/Logbook.vue');
const PersonVitals = () =>
  import(/* webpackChunkName: "group-person" */ '@components/Person/Vitals.vue');
const PersonVital = () =>
  import(/* webpackChunkName: "group-person" */ '@components/Person/Vital.vue');
const PersonUpdate = () =>
  import(/* webpackChunkName: "group-person" */ '@components/Person/Update.vue');
const Settings = () =>
  import(/* webpackChunkName: "group-settings" */ '@components/Settings/Settings.vue');
const SettingsPeople = () =>
  import(/* webpackChunkName: "group-people" */ '@components/Settings/People/People.vue');
const SettingsPersonCreate = () =>
  import(/* webpackChunkName: "group-settings" */ '@components/Settings/People/Create.vue');
const SettingsVitals = () =>
  import(/* webpackChunkName: "group-vitals" */ '@components/Settings/Vitals/Vitals.vue');
const SettingsVitalCreate = () =>
  import(/* webpackChunkName: "group-settings" */ '@components/Settings/Vitals/Create.vue');
const SettingsVitalUpdate = () =>
  import(/* webpackChunkName: "group-settings" */ '@components/Settings/Vitals/Update.vue');
const SettingsUserUpdate = () =>
  import(/* webpackChunkName: "group-settings" */ '@components/Settings/UserUpdate.vue');
const SettingsSignalServerUpdate = () =>
  import(/* webpackChunkName: "group-settings" */ '@components/Settings/SignalServerUpdate.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/start',
    name: 'Start',
    component: Start,
  },
  {
    path: '/start/new',
    name: 'StartNew',
    component: StartNew,
  },
  {
    path: '/',
    redirect: {
      name: 'Dashboard',
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        components: {
          main: Dashboard,
        },
      },
    ],
  },
  {
    path: '/person',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: ':personId',
        name: 'Person',
        props: true,
        components: {
          main: Person,
        },
        children: [
          {
            path: 'update',
            name: 'PersonUpdate',
            props: true,
            components: {
              modal: PersonUpdate,
            },
          },
          {
            path: 'measurement/create',
            name: 'PersonMeasurementCreate',
            props: true,
            components: {
              modal: MeasurementCreate,
            },
          },
          {
            path: 'measurement/:measurementId/update',
            name: 'PersonMeasurementUpdate',
            components: {
              modal: MeasurementUpdate,
            },
          },
        ],
      },
      {
        path: ':personId/vitals',
        props: true,
        children: [
          {
            name: 'PersonVitals',
            path: '',
            components: {
              main: PersonVitals,
            },
          },
          {
            path: ':vitalId',
            name: 'PersonVital',
            components: {
              main: PersonVital,
            },
            children: [
              {
                path: 'measurement/create',
                name: 'PersonVitalMeasurementCreate',
                props: true,
                components: {
                  modal: MeasurementCreate,
                },
              },
              {
                path: 'measurement/:measurementId/update',
                name: 'PersonVitalMeasurementUpdate',
                props: true,
                components: {
                  modal: MeasurementUpdate,
                },
              },
              {
                path: 'note/:noteId/update',
                name: 'VitalMeasurementNoteUpdate',
                props: true,
                components: {
                  modal: NoteUpdate,
                },
              },
              {
                path: 'note/:noteId',
                name: 'VitalMeasurementNoteView',
                props: true,
                components: {
                  modal: NoteView,
                },
              },
            ],
          },
        ],
      },
      {
        path: ':personId/logbook',
        name: 'PersonLogbook',
        props: true,
        components: {
          main: PersonLogbook,
        },
        children: [
          {
            path: 'note/create',
            name: 'PersonNoteCreate',
            props: true,
            components: {
              modal: NoteCreate,
            },
          },
          {
            path: 'note/:noteId/update',
            name: 'PersonNoteUpdate',
            props: true,
            components: {
              modal: NoteUpdate,
            },
          },
          {
            path: 'note/:noteId',
            name: 'PersonLogbookNoteView',
            props: true,
            components: {
              modal: NoteView,
            },
          },
          {
            path: 'measurement/:measurementId/update',
            name: 'PersonLogbookMeasurementUpdate',
            props: true,
            components: {
              modal: MeasurementUpdate,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/settings',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'Settings',
        components: {
          main: Settings,
        },
      },
      {
        path: 'people',
        name: 'SettingsPeople',
        components: {
          main: SettingsPeople,
        },
        children: [
          {
            path: 'create',
            name: 'SettingsPersonCreate',
            components: {
              modal: SettingsPersonCreate,
            },
          },
        ],
      },
      {
        path: 'vitals',
        name: 'SettingsVitals',
        components: {
          main: SettingsVitals,
        },
        children: [
          {
            path: 'create',
            name: 'SettingsVitalCreate',
            components: {
              modal: SettingsVitalCreate,
            },
          },
          {
            path: ':vitalId/update',
            name: 'SettingsVitalUpdate',
            props: true,
            components: {
              modal: SettingsVitalUpdate,
            },
          },
        ],
      },
      {
        path: 'user',
        name: 'SettingsUserUpdate',
        components: {
          main: SettingsUserUpdate,
        },
      },
      {
        path: 'signal-server',
        name: 'SettingsSignalServerUpdate',
        components: {
          main: SettingsSignalServerUpdate,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0,
      };
    }
  },
});

router.beforeEach(to => {
  if (to.meta.requiresAuth && !localStorage.getItem('isActive')) {
    return {
      name: 'Start',
    };
  }
  return true;
});

router.beforeEach((_to, from) => {
  previousRoute.value = from;
});

export default router;
