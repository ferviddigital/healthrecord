<script setup lang="ts">
import { record } from '../../store/record';
import EditFields from '../Interface/EditFields.vue';

const fields: FormField[] = [
{
    name: 'firstName',
    placeholder: 'First name',
    currentValue: record.value.user.firstName,
    type: 'text',
    blurCallback: (newValue) => record.value.user.firstName = newValue
  },
  {
    name: 'lastName',
    placeholder: 'Last name',
    currentValue: record.value.user.lastName,
    type: 'text',
    blurCallback: (newValue) => record.value.user.lastName = newValue
  },
];
</script>

<template>
  <EditFields title="Owner" :fields="fields" />
</template>
