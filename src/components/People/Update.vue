<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { people, store as peopleStore } from '../../store/people';
import PersonForm from './Form.vue';

const route   = useRoute();
const router  = useRouter();

const person = computed(() => {
  const person = people.value.find(person => person.id === route.params.personId);
  
  if (! person) throw Error(`Could not find person with ID: ${route.params.personId}.`);

  return person;
});

const firstName = ref(person.value.firstName);
const lastName  = ref(person.value.lastName);
const sex       = ref(person.value.sex);
const dob       = ref(person.value.dob);

/**
 * Update Person
 * 
 * @param {import("../../typedefs").Person} updatedPerson 
 */
const updatePerson = (updatedPerson) => {
  peopleStore.update(person.value.id, updatedPerson);
  router.push({ name: 'People' });
}
</script>

<template>
  <Dialog :open="true" @close="$router.push({ name: 'People' })" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full max-w-xs rounded-2xl shadow-lg my-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Edit Person</DialogTitle>
        <PersonForm class="p-6" @submit="updatePerson" :firstName="firstName" :lastName="lastName" :sex="sex" :dob="dob" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
