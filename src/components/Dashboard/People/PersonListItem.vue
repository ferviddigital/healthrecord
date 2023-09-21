<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { store as peopleStore } from '../../../store/people';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { EllipsisHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/vue/20/solid';
import dayjs from 'dayjs';

const props = defineProps({
  person: {
    /** @type {import('vue').PropType<import("../../../typedefs").Person>} */
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="group/person grid grid-cols-[auto_min-content] bg-white p-3 rounded-md cursor-pointer hover:shadow" @click="$router.push({ name: 'Person', params: { personId: person.id } })">
    <div>
      <h3 class="font-semibold group-hover/person:text-indigo-600 mb-1">{{ person.firstName + ' ' + person.lastName }}</h3>
      <p class="text-gray-400 text-sm">
        <strong>Age</strong>: {{ dayjs().diff(dayjs(person.dob), 'year') }} &emsp;
        <strong>Sex</strong>: {{ person.sex }}
      </p>
    </div>
    <div class="grid justify-items-end">
      <Menu as="div" class="menu">
        <MenuButton class="menu-button group/menu-button -mt-1.5" @click.stop>
          <EllipsisHorizontalIcon class="group-hover/menu-button:text-indigo-600"/>
        </MenuButton>
        <MenuItems @click.stop class="menu-items">
          <div class="p-1">
            <MenuItem v-slot="{ close }">
              <button class="menu-item group/menu-item" @click="close(); $router.push({ name: 'PersonUpdate', params: { personId: person.id }});">
                <PencilIcon class="group-hover/menu-item:text-indigo-200" />
                Edit
              </button>
            </MenuItem>
          </div>
          <div class="p-1">
            <MenuItem v-slot="{ close }">
              <button class="menu-item group/menu-item" @click="close(); peopleStore.delete(person.id)">
                <TrashIcon class="group-hover/menu-item:text-indigo-200" />
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      <ChevronRightIcon class="h-5 w-5 self-end group-hover/person:stroke-indigo-600" />
    </div>
  </div>
</template>
