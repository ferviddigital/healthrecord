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
  <div class="grid grid-cols-[auto_min-content] min-h-[10em] bg-gray-50 p-3 rounded-xl">
    <div class="grid">
      <h3 class="font-semibold mb-1">{{ vital.name }} <span class="text-xs text-gray-400 font-light">({{ vital.unit }})</span></h3>
      <p class="text-gray-400 text-sm self-end">{{ vital.description }}</p>
    </div>
    <div class="grid">
      <Menu as="div" class="menu">
        <MenuButton class="menu-button group/menu-button -mt-1" @click.stop>
          <EllipsisHorizontalIcon />
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
