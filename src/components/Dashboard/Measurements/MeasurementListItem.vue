<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { store as measurementStore } from '../../../store/measurements';
import { EllipsisHorizontalIcon, PencilIcon, TrashIcon, CalendarIcon, UserIcon } from '@heroicons/vue/20/solid';
import { vitals } from '../../../store/vitals';
import { people } from '../../../store/people';
import { computed } from 'vue';

const props = defineProps(['measurement']);

const vital = computed(() => {
  return vitals.value.find(vital => vital.id === props.measurement.vitalId);
});

const person = computed(() => {
  return people.value.find(person => person.id === props.measurement.personId);
});

const isHigh = computed(() => {

});
</script>

<template>
  <div class="grid grid-cols-[auto_min-content_min-content] bg-white p-3 gap-6 md:gap-10 rounded-md hover:shadow">
    <div>
      <h3 class="font-semibold mb-1">
        {{ Number(measurement.value).toLocaleString() }}
        <span class="text-xs text-gray-400 font-light">{{ vital.unit }}</span>
        <span v-if="vital.high.length > 0 && measurement.value >= Number(vital.high)"
          class="border border-amber-200 p-1 py-0 rounded-lg text-amber-500 bg-amber-100 text-xs ml-3 font-normal">High</span>
        <span v-if="vital.low.length > 0 && measurement.value <= Number(vital.low)"
          class="border border-amber-200 p-1 py-0 rounded-lg text-amber-500 bg-amber-100 text-xs ml-3 font-normal">Low</span>
      </h3>
      <p class="text-gray-400 text-sm">{{ vital.name }}</p>
    </div>
    <div class="text-xs text-gray-400">
      <span class="block mb-3"><CalendarIcon class="h-3 w-3 inline -mt-1" /> {{ new Date(measurement.date).toLocaleDateString() }}</span>
      <span class="whitespace-nowrap"><UserIcon class="h-3 w-3 inline -mt-1" /> {{ person.firstName + ' ' + person.lastName }}</span>
    </div>
    <div class="grid">
      <Menu as="div" class="menu">
        <MenuButton class="menu-button group/menu-button -mt-1.5" @click.stop>
          <EllipsisHorizontalIcon class="group-hover/menu-button:text-indigo-600"/>
        </MenuButton>
        <MenuItems @click.stop class="menu-items">
          <div class="p-1">
            <MenuItem v-slot="{ close }">
              <button class="menu-item group/menu-item" @click="close(); $router.push({ name: 'EditMeasurement', params: { id: measurement.id }});">
                <PencilIcon class="group-hover/menu-item:text-indigo-200" />
                Edit
              </button>
            </MenuItem>
          </div>
          <div class="p-1">
            <MenuItem v-slot="{ close }">
              <button class="menu-item group/menu-item" @click="close(); measurementStore.delete(measurement.id)">
                <TrashIcon class="group-hover/menu-item:text-indigo-200" />
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  </div>
</template>
