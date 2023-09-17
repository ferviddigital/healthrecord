import { createRouter, createWebHistory } from 'vue-router'
import Start from '../components/Start/Start.vue'
import StartNew from '../components/Start/New.vue'
import Dashboard from '../components/Dashboard/Index.vue'
import People from '../components/Dashboard/People/People.vue'
import Person from '../components/Dashboard/People/Person.vue'
import AddPerson from '../components/Dashboard/People/Add.vue'
import EditPerson from '../components/Dashboard/People/Edit.vue'
import Settings from '../components/Dashboard/Settings/Settings.vue'
import Dash from '../components/Dashboard/Dash/Dash.vue'
import Vitals from '../components/Dashboard/Vitals/Vitals.vue'
import AddVital from '../components/Dashboard/Vitals/Add.vue'
import EditVital from '../components/Dashboard/Vitals/Edit.vue'
import Measurements from '../components/Dashboard/Measurements/Measurements.vue'
import AddMeasurement from '../components/Dashboard/Measurements/Add.vue'
import EditMeasurement from '../components/Dashboard/Measurements/Edit.vue'
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
    name: 'Dashboard',
    components: {
      default: Dashboard,
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dash',
        components: {
          main: Dash
        }
      },
      {
        path: '/vitals',
        name: 'Vitals',
        components: {
          main: Vitals
        }
      },
      {
        path: '/vitals/add',
        name: 'AddVital',
        components: {
          main: Vitals,
          modal: AddVital
        }
      },
      {
        path: '/vitals/:id/edit',
        name: 'EditVital',
        components: {
          main: Vitals,
          modal: EditVital
        }
      },
      {
        path: '/measurements',
        name: 'Measurements',
        components: {
          main: Measurements
        }
      },
      {
        path: '/measurements/add',
        name: 'AddMeasurement',
        components: {
          main: Measurements,
          modal: AddMeasurement
        }
      },
      {
        path: '/measurement/:id/edit',
        name: 'EditMeasurement',
        components: {
          main: Measurements,
          modal: EditMeasurement
        }
      },
      {
        path: '/settings',
        name: 'Settings',
        components: {
          main: Settings
        }
      },
      {
        path: '/people',
        name: 'People',
        components: {
          main: People
        }
      },
      {
        path: '/people/add',
        name: 'AddPerson',
        components: {
          main: People,
          modal: AddPerson
        }
      },
      {
        path: '/people/:id',
        name: 'Person',
        components: {
          main: Person
        }
      },
      {
        path: '/people/:id/measurement/add',
        name: 'AddPersonMeasurement',
        components: {
          main: Person,
          modal: AddMeasurement
        }
      },
      {
        path: '/people/:id/edit',
        name: 'EditPerson',
        components: {
          main: People,
          modal: EditPerson
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  return checkRecordExists(to);
})

export default router