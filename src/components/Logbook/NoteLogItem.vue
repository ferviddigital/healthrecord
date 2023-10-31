<script setup lang="ts">
const props = defineProps<{
  note: Note;
}>();
</script>

<template>
  <p
    class="bg-gray-200 text-gray-800 p-3 px-4 rounded-md mt-3 leading-tight hover:shadow hover:bg-gray-100 cursor-pointer"
    @click.stop="$router.push({ name: 'PersonLogbookNoteView', params: { noteId: props.note.id } })"
  >
    {{ props.note.text }}
  </p>
</template>
