<script setup>
import { ref } from 'vue';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { PencilIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: null
  },
  inputClasses: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['updated']);

const newValue = ref(props.value);
const editMode = ref(false);
const input = ref();

const save = () => {
  emits('updated', newValue.value);
  editMode.value = false;
}

const activate = () => {
  editMode.value = true;
  setTimeout(() => {
    input.value.focus();
  }, 100)
}
</script>

<template>
  <div>
    <div v-if="editMode" class="group focus-within:ring-4 focus-within:ring-indigo-200 focus-within:border focus-within:border-indigo-500 border rounded grid grid-cols-[auto_min-content_min-content]">
      <input class="!rounded-tr-none !rounded-br-none border-none !ring-0 leading-[24px]" name="editable-field" :class="inputClasses" ref="input" :type="props.type" :placeholder="props.placeholder" v-model="newValue" @keyup.enter="save" />
      <button class="p-2 border-l text-indigo-500 bg-white hover:bg-indigo-50" @click="save"><CheckIcon class="w-5 h-5" /></button>
      <button class="p-2 border-l rounded-tr rounded-br bg-white hover:bg-red-50 text-red-500" @click="editMode = false"><XMarkIcon class="w-5 h-5" /></button>
    </div>
    <div v-else class="relative grid grid-cols-[auto_min-content]">
      <span
        class="bg-gray-50 border border-gray-200 border-r-0 text-gray-500 leading-[24px] py-2 px-3 pr-10 rounded rounded-tr-none rounded-br-none truncate"
        :class="[
          {'text-gray-300 text-sm font-light' : placeholder && !props.value},
          props.inputClasses
          ]">
        {{ props.value || placeholder }}
      </span>
      <button class="border border-gray-200 text-indigo-500 rounded-tr rounded-br px-3 hover:bg-gray-50" @click="activate"><PencilIcon class="w-3.5 h-3.5" /></button>
    </div>
  </div>
</template>
