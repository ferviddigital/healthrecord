import { computed, ref, watch } from "vue";
import { people } from "./people";

/** @type {import("vue").Ref<string | null>} */
export const selectedPersonId = ref(localStorage.getItem('selectedPersonId'));

/** @type {import("vue").ComputedRef<import("../typedefs").Person | null>} */
export const selectedPerson = computed(() => {
  return selectedPersonId.value ? people.value.find(person => person.id === selectedPersonId.value) : null;
});

watch(selectedPersonId, (value) => {
  if (value) {
    localStorage.setItem('selectedPersonId', value);
  } else {
    localStorage.removeItem('selectedPersonId');
  }
});