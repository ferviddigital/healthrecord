import { createRouter, createWebHistory } from 'vue-router'
import { previousRoute } from '../store/ui';

const Start = () => import(/* webpackChunkName: "group-start" */ '../components/Start/Start.vue');
const StartNew = () => import(/* webpackChunkName: "group-start" */ '../components/Start/New.vue');
const DashboardLayout = () => import(/* webpackChunkName: "group-dashboard" */ '../components/Layout.vue');
const Dashboard = () => import(/* webpackChunkName: "group-dashboard" */ '../components/Dashboard/Dashboard.vue');
const People = () => import(/* webpackChunkName: "group-people" */ '../components/People/People.vue');
const PeopleCreate = () => import(/* webpackChunkName: "group-people" */ '../components/People/Create.vue');
const Vitals = () => import(/* webpackChunkName: "group-vitals" */ '../components/Vitals/Vitals.vue');
const VitalCreate = () => import(/* webpackChunkName: "group-vitals" */ '../components/Vitals/Create.vue');
const VitalUpdate = () => import(/* webpackChunkName: "group-vitals" */ '../components/Vitals/Update.vue');
const MeasurementCreate = () => import(/* webpackChunkName: "group-measurements" */ '../components/Measurements/Create.vue');
const MeasurementUpdate = () => import(/* webpackChunkName: "group-measurements" */ '../components/Measurements/Update.vue');
const NoteView = () => import(/* webpackChunkName: "group-notes" */ '../components/Notes/View.vue');
const NoteCreate = () => import(/* webpackChunkName: "group-notes" */ '../components/Notes/Create.vue');
const NoteUpdate = () => import(/* webpackChunkName: "group-notes" */ '../components/Notes/Update.vue');
const Person = () => import(/* webpackChunkName: "group-person" */ '../components/Person/Person.vue');
const PersonLogbook = () => import(/* webpackChunkName: "group-person" */ '../components/Person/Logbook/Logbook.vue');
const PersonVitals = () => import(/* webpackChunkName: "group-person" */ '../components/Person/Vitals.vue');
const PersonVital = () => import(/* webpackChunkName: "group-person" */ '../components/Person/Vital.vue');
const PersonUpdate = () => import(/* webpackChunkName: "group-person" */ '../components/People/Update.vue');
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
                path: 'create',
                name: 'PersonVitalCreate',
                components: {
                  modal: VitalCreate
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
              {
                path: 'note/:noteId/update',
                name: 'VitalMeasurementNoteUpdate',
                components: {
                  modal: NoteUpdate
                }
              },
              {
                path: 'note/:noteId',
                name: 'VitalMeasurementNoteView',
                components: {
                  modal: NoteView
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
            path: 'note/:noteId',
            name: 'PersonLogbookNoteView',
            components: {
              modal: NoteView
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
        },
        children: [
          {
            path: 'create',
            name: 'SettingsPeopleCreate',
            components: {
              modal: PeopleCreate
            }
          }
        ]
      },
      {
        path: 'vitals',
        name: 'SettingsVitals',
        components: {
          main: Vitals
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
