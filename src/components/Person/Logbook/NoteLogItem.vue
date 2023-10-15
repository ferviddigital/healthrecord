<script setup>
const props = defineProps({
  note: {
    /** @type {import('vue').PropType<import('../../../typedefs').Note>} */
    type: Object,
    required: true
  }
})
</script>

<template>
  <p
    class="bg-gray-200 text-gray-800 p-3 px-4 rounded-md mt-3 leading-tight hover:shadow hover:bg-gray-100 cursor-pointer"
    @click.stop="$router.push({ name: 'PersonNoteUpdate', params: { noteId: note.id}})">
      {{ note.text }}
  </p>
</template>
