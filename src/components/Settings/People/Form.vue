<script setup lang="ts">
import { computed, ref } from 'vue';

/** Type `PersonFormProps` defined in Person type declarations but unusable in Vue `defineProps` */
interface PersonFormProps {
  id?: string;
  firstName?: string;
  lastName?: string;
  sex?: string;
  dob?: string;
}

/** Type `PersonFormEmits` defined in Person type declarations but unusable in Vue `defineEmits` */
interface PersonFormEmits {
  (e: 'submit', payload: PartialPerson): void;
  (e: 'destroy'): void;
}

const props = defineProps<PersonFormProps>();

const emit = defineEmits<PersonFormEmits>();

const firstName = ref(props.firstName);
const lastName = ref(props.lastName);
const sex = ref(props.sex);
const dob = ref(props.dob);

const isFormComplete = computed(() => {
  return (
    firstName.value &&
    firstName.value.length > 0 &&
    lastName.value &&
    lastName.value.length > 0 &&
    sex.value &&
    sex.value.length > 0 &&
    dob.value &&
    dob.value.length > 0
  );
});

const partialPerson = computed<PartialPerson>(() => {
  return {
    id: props.id,
    firstName: firstName.value,
    lastName: lastName.value,
    sex: sex.value,
    dob: dob.value,
  };
});
</script>

<template>
  <form @submit.prevent="emit('submit', partialPerson)">
    <label for="first-name">First Name</label>
    <input v-model="firstName" type="text" id="first-name" autocomplete="on" required />
    <label for="last-name">Last Name</label>
    <input v-model="lastName" type="text" id="last-name" required />
    <span class="block text-gray-500 text-sm font-light mb-1">Sex</span>
    <input
      class="peer/male"
      v-model="sex"
      type="radio"
      name="sex"
      id="male"
      value="Male"
      required />
    <label
      for="male"
      class="inline align-text-bottom text-sm ml-1 peer-checked/male:text-indigo-500 peer-checked/male:font-normal">
      Male
    </label>
    <input
      class="peer/female ml-4"
      v-model="sex"
      type="radio"
      name="sex"
      id="female"
      value="Female"
      required />
    <label
      for="female"
      class="inline align-text-bottom ml-1 peer-checked/female:text-indigo-500 peer-checked/female:font-normal">
      Female
    </label>
    <label class="mt-3" for="dob">Date of Birth</label>
    <input v-model="dob" type="date" id="dob" required />
    <div class="grid grid-flow-col justify-end items-center gap-5 mt-4">
      <a
        v-if="props.id"
        @click="emit('destroy')"
        class="text-sm text-red-500 font-light cursor-pointer">
        Delete
      </a>
      <a @click="$router.back()" class="text-sm text-gray-500 font-light cursor-pointer">Cancel</a>
      <button type="submit" class="btn" :disabled="!isFormComplete">Save</button>
    </div>
  </form>
</template>
