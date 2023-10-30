<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { people, update, destroy } from '@store/people';
import PersonForm from '@components/Settings/People/Form.vue';
import { selectedPersonId } from '@store/person';

const router = useRouter();

const props = defineProps<{
  personId: string;
}>();

const person = computed(() => {
  const targetPerson = people.value.find(person => person.id === props.personId);
  if (!targetPerson) throw Error(`Could not find Person with ID: ${props.personId}.`);
  return targetPerson;
});

/**
 * Update Person
 */
const updatePerson = (partialPerson: PartialPerson) => {
  try {
    update(partialPerson);
  } catch (e) {
    console.log(e);
  }

  router.back();
};

/**
 * Destroy Person
 */
const destroyPerson = () => {
  setTimeout(() => {
    destroy(props.personId);
    selectedPersonId.value = null;
  }, 150);
  router.push({ name: 'Dashboard' });
};
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">
          Edit Person
        </DialogTitle>
        <PersonForm
          class="p-6"
          @submit="updatePerson"
          @destroy="destroyPerson"
          :id="person.id"
          :firstName="person.firstName"
          :lastName="person.lastName"
          :sex="person.sex"
          :dob="person.dob" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
