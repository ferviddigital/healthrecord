import { createRouter, createWebHistory } from 'vue-router'
import Start from '../components/Start/Start.vue'
import StartNew from '../components/Start/New.vue'
import DashboardLayout from '../components/Dashboard/Layout.vue'
import People from '../components/Dashboard/People/People.vue'
import Person from '../components/Dashboard/People/Person.vue'
import PersonVital from '../components/Dashboard/People/Vital.vue'
import PersonCreate from '../components/Dashboard/People/Create.vue'
import PersonUpdate from '../components/Dashboard/People/Update.vue'
import Settings from '../components/Dashboard/Settings/Settings.vue'
import Dashboard from '../components/Dashboard/Dash/Dash.vue'
import Vitals from '../components/Dashboard/Vitals/Vitals.vue'
import VitalCreate from '../components/Dashboard/Vitals/Create.vue'
import VitalUpdate from '../components/Dashboard/Vitals/Update.vue'
import Measurements from '../components/Dashboard/Measurements/Measurements.vue'
import MeasurementCreate from '../components/Dashboard/Measurements/Create.vue'
import MeasurementUpdate from '../components/Dashboard/Measurements/Update.vue'
import { record } from '../store/record'

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
  routes
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !record.value) {
    return {
      name: 'Start'
    }
  }
})

export default router