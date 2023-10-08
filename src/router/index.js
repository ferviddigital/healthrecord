import { createRouter, createWebHistory } from 'vue-router'

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
const Person = () => import(/* webpackChunkName: "group-person" */ '../components/People/Person.vue');
const PersonVital = () => import(/* webpackChunkName: "group-person" */ '../components/People/Vital.vue');
const Settings = () => import('../components/Settings/Settings.vue');

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
          },
          {
            path: ':personId/update',
            name: 'PersonUpdate',
            components: {
              modal: PersonUpdate
            }
          }
        ]
      },
      {
        path: ':personId',
        name: 'Person',
        components: {
          main: Person
        },
        children: [
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
        path: ':personId/vital/:vitalId',
        name: 'PersonVital',
        components: {
          main: PersonVital
        },
        children: [
          {
            path: 'measurement/create',
            name: 'PersonVitalMeasurementCreate',
            components: {
              modal: MeasurementCreate
            }
          },
          {
            path: 'measurement/:measurementId/update',
            name: 'PersonVitalMeasurementUpdate',
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
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem('isActive')) {
    return {
      name: 'Start'
    }
  }
})

export default router