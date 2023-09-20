import { createRouter, createWebHistory } from 'vue-router'
import Start from '../components/Start/Start.vue'
import StartNew from '../components/Start/New.vue'
import DashboardLayout from '../components/Dashboard/Layout.vue'
import People from '../components/Dashboard/People/People.vue'
import Person from '../components/Dashboard/People/Person.vue'
import PeopleAdd from '../components/Dashboard/People/Add.vue'
import PeopleEdit from '../components/Dashboard/People/Edit.vue'
import Settings from '../components/Dashboard/Settings/Settings.vue'
import Dashboard from '../components/Dashboard/Dash/Dash.vue'
import Vitals from '../components/Dashboard/Vitals/Vitals.vue'
import VitalAdd from '../components/Dashboard/Vitals/Add.vue'
import VitalEdit from '../components/Dashboard/Vitals/Edit.vue'
import Measurements from '../components/Dashboard/Measurements/Measurements.vue'
import MeasurementAdd from '../components/Dashboard/Measurements/Add.vue'
import MeasurementEdit from '../components/Dashboard/Measurements/Edit.vue'
import { record } from '../store/record'

const checkRecordExists = (to) => {
  switch (to.name) {
    case 'Start':
    case 'StartNew':
      if (!record.value) {
        return true
      }
      return {
        name: 'Dash'
      }
    default:
      if (record.value) {
        return true
      }
      return {
        name: 'Start'
      }      
  }
}

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
    }
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
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
    children: [
      {
        path: '',
        name: 'People',
        components: {
          main: People
        }
      },
      {
        path: '/people/add',
        name: 'PeopleAdd',
        components: {
          main: People,
          modal: PeopleAdd
        }
      },
      {
        path: '/people/:personId',
        name: 'Person',
        components: {
          main: Person
        },
        children: [
          {
            path: 'measurement/add',
            name: 'PersonMeasurementAdd',
            components: {
              modal: MeasurementAdd
            }
          }
        ]
      },
      {
        path: '/people/:personId/edit',
        name: 'PeopleEdit',
        components: {
          main: People,
          modal: PeopleEdit
        }
      },
    ]
  },
  {
    path: '/vitals',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Vitals',
        components: {
          main: Vitals
        },
        children: [
          {
            path: 'add',
            name: 'VitalAdd',
            components: {
              modal: VitalAdd
            }
          },
          {
            path: ':vitalId/edit',
            name: 'VitalEdit',
            components: {
              modal: VitalEdit
            }
          },
        ]
      },
    ]
  },
  {
    path: '/measurements',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Measurements',
        components: {
          main: Measurements
        },
        children: [
          {
            path: 'add',
            name: 'MeasurementAdd',
            components: {
              modal: MeasurementAdd
            }
          },
          {
            path: ':measurementId/edit',
            name: 'MeasurementEdit',
            components: {
              modal: MeasurementEdit
            }
          }
        ]
      },
    ]
  },
  {
    path: '/settings',
    component: DashboardLayout,
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