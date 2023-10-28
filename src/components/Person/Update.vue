<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { people, update, destroy } from '@store/people';
import PersonForm from '@components/Settings/People/Form.vue';
import type { PersonUpdateProps } from '@project-types/person';
import { selectedPersonId } from '@store/person';

const route = useRoute();
const router = useRouter();

const props = defineProps<PersonUpdateProps>();

const person = computed(() => {
  const person = people.value.find(person => person.id === route.params.personId);

  if (!person) throw Error(`Could not find person with ID: ${route.params.personId}.`);

  return person;
});

const firstName = ref(person.value.firstName);
const lastName = ref(person.value.lastName);
const sex = ref(person.value.sex);
const dob = ref(person.value.dob);

/**
 * Update Person
 */
const updatePerson = (updatedPerson: Person) => {
  update(person.value.id, updatedPerson);
  router.push({ name: 'Person', params: { personId: person.value.id } });
};

const destroyPerson = () => {
  router.push({ name: 'Dashboard' });
  setTimeout(() => {
    destroy(props.personId);
    selectedPersonId.value = null;
  }, 100);
};
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3"
          >Edit Person</DialogTitle
        >
        <PersonForm
          class="p-6"
          @submit="updatePerson"
          @destroy="destroyPerson"
          :firstName="firstName"
          :lastName="lastName"
          :sex="sex"
          :dob="dob"
          :deletable="true"
        />
      </DialogPanel>
    </div>
  </Dialog>
</template>
