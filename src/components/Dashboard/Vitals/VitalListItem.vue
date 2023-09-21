<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { store as vitalStore } from '../../../store/vitals';
import { EllipsisHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
  vital: {
    /** @type {import('vue').PropType<import("../../../typedefs").Vital>} */
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="grid grid-cols-[auto_min-content] bg-white p-3 rounded-md hover:shadow">
    <div>
      <h3 class="font-semibold mb-1">{{ vital.name }} <span class="text-xs text-gray-400 font-light">({{ vital.unit }})</span></h3>
      <p class="text-gray-400 text-sm">{{ vital.description }}</p>
    </div>
    <div class="grid">
      <Menu as="div" class="menu">
        <MenuButton class="menu-button group/menu-button -mt-1.5" @click.stop>
          <EllipsisHorizontalIcon class="group-hover/menu-button:text-indigo-600"/>
        </MenuButton>
        <MenuItems @click.stop class="menu-items">
          <div class="p-1">
            <MenuItem v-slot="{ close }">
              <button class="menu-item group/menu-item" @click="close(); $router.push({ name: 'VitalUpdate', params: { vitalId: vital.id }});">
                <PencilIcon class="group-hover/menu-item:text-indigo-200" />
                Edit
              </button>
            </MenuItem>
          </div>
          <div class="p-1">
            <MenuItem v-slot="{ close }">
              <button class="menu-item group/menu-item" @click="close(); vitalStore.delete(vital.id)">
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
