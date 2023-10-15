import { createRouter, createWebHistory } from 'vue-router'
import { previousRoute } from '../store/ui';

const Start = () => import(/* webpackChunkName: "group-start" */ '../components/Start/Start.vue');
const StartNew = () => import(/* webpackChunkName: "group-start" */ '../components/Start/New.vue');
const DashboardLayout = () => import(/* webpackChunkName: "group-dashboard" */ '../components/Layout.vue');
const Dashboard = () => import(/* webpackChunkName: "group-dashboard" */ '../components/Dashboard/Dashboard.vue');
const People = () => import(/* webpackChunkName: "group-people" */ '../components/People/People.vue');
const PersonCreate = () => import(/* webpackChunkName: "group-people" */ '../components/People/Create.vue');
const PersonUpdate = () => import(/* webpackChunkName: "group-people" */ '../components/People/Update.vue');
const Vitals = () => import(/* webpackChunkName: "group-vitals" */ '../components/Vitals/Vitals.vue');
const VitalCreate = () => import(/* webpackChunkName: "group-vitals" */ '../components/Vitals/Create.vue');
const VitalUpdate = () => import(/* webpackChunkName: "group-vitals" */ '../components/Vitals/Update.vue');
const Measurements = () => import(/* webpackChunkName: "group-measurements" */ '../components/Measurements/Measurements.vue');
const MeasurementCreate = () => import(/* webpackChunkName: "group-measurements" */ '../components/Measurements/Create.vue');
const MeasurementUpdate = () => import(/* webpackChunkName: "group-measurements" */ '../components/Measurements/Update.vue');
const NoteCreate = () => import(/* webpackChunkName: "group-notes" */ '../components/Notes/Create.vue');
const NoteUpdate = () => import(/* webpackChunkName: "group-notes" */ '../components/Notes/Update.vue');
const Person = () => import(/* webpackChunkName: "group-person" */ '../components/Person/Person.vue');
const PersonLogbook = () => import(/* webpackChunkName: "group-person" */ '../components/Person/Logbook/Logbook.vue');
const PersonVitals = () => import(/* webpackChunkName: "group-person" */ '../components/Person/Vitals.vue');
const PersonVital = () => import(/* webpackChunkName: "group-person" */ '../components/Person/Vital.vue');
const Settings = () => import('../components/Settings/Settings.vue');

/** @type {import('vue-router').RouteRecordRaw[]} */
const routes = [
  {
    path: '/start',
    name: 'Start',
    component: Start
  },
  {
    path: '/start/new',
    name: 'StartNew',
    component: StartNew
  },
  {
    path: '/',
    redirect: {
      name: 'Dashboard'
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        components: {
          main: Dashboard
        }
      }
    ]
  },
  {
    path: '/person',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: ':personId',
        name: 'Person',
        components: {
          main: Person
        },
        children: [
          {
            path: 'update',
            name: 'PersonUpdate',
            components: {
              modal: PersonUpdate
            }
          },
          {
            path: 'measurement/create',
            name: 'PersonMeasurementCreate',
            components: {
              modal: MeasurementCreate
            }
          },
          {
            path: 'measurement/:measurementId/update',
            name: 'PersonMeasurementUpdate',
            components: {
              modal: MeasurementUpdate
            }
          },
        ]
      },
      {
        path: ':personId/vitals',
        children: [
          {
            name: 'PersonVitals',
            path: '',
            components: {
              main: PersonVitals
            },
            children: [
              {
                path: 'measurement/create',
                name: 'PersonVitalsMeasurementCreate',
                components: {
                  modal: MeasurementCreate
                }
              }
            ]
          },
          {
            path: ':vitalId',
            name: 'PersonVital',
            components: {
              main: PersonVital
            },
            children: [
              {
                path: 'measurement/create',
                name: 'PersonVitalMeasurementCreate',
                props: true,
                components: {
                  modal: MeasurementCreate
                }
              },
              {
                path: 'measurement/:measurementId/update',
                name: 'PersonVitalMeasurementUpdate',
                props: true,
                components: {
                  modal: MeasurementUpdate
                }
              },
            ]
          }
        ]
      },
      {
        path: ':personId/logbook',
        name: 'PersonLogbook',
        components: {
          main: PersonLogbook
        },
        children: [
          {
            path: 'note/create',
            name: 'PersonNoteCreate',
            components: {
              modal: NoteCreate
            }
          },
          {
            path: 'note/:noteId/update',
            name: 'PersonNoteUpdate',
            components: {
              modal: NoteUpdate
            }
          },
          {
            path: 'measurement/:measurementId/update',
            name: 'PersonLogbookMeasurementUpdate',
            props: true,
            components: {
              modal: MeasurementUpdate
            }
          },
        ]
      },
    ]
  },
  {
    path: '/people',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'People',
        components: {
          main: People
        },
        children: [
          {
            path: 'create',
            name: 'PersonCreate',
            components: {
              modal: PersonCreate
            }
          }
        ]
      },
    ]
  },
  {
    path: '/vitals',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Vitals',
        components: {
          main: Vitals
        },
        children: [
          {
            path: 'create',
            name: 'VitalCreate',
            components: {
              modal: VitalCreate
            }
          },
          {
            path: ':vitalId/update',
            name: 'VitalUpdate',
            components: {
              modal: VitalUpdate
            }
          },
        ]
      },
    ]
  },
  {
    path: '/measurements',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Measurements',
        components: {
          main: Measurements
        },
        children: [
          {
            path: 'create',
            name: 'MeasurementCreate',
            components: {
              modal: MeasurementCreate
            }
          },
          {
            path: ':measurementId/update',
            name: 'MeasurementUpdate',
            components: {
              modal: MeasurementUpdate
            }
          }
        ]
      },
    ]
  },
  {
    path: '/settings',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Settings',
        components: {
          main: Settings
        }
      },
      {
        path: 'people',
        name: 'SettingsPeople',
        components: {
          main: People
        }
      },
      {
        path: 'vitals',
        name: 'SettingsVitals',
        components: {
          main: Vitals
        }
      },
      {
        path: 'measurements',
        name: 'SettingsMeasurements',
        components: {
          main: Measurements
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0
      }
    }
  }
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem('isActive')) {
    return {
      name: 'Start'
    }
  }
});


router.beforeEach((to, from) => {
  previousRoute.value = from;
});

export default router;
