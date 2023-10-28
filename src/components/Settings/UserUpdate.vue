<script setup lang="ts">
import { record } from '@store/record';
import EditFields from '@components/Interface/EditFields.vue';

const fields: FormField[] = [
{
    name: 'firstName',
    placeholder: 'First name',
    currentValue: record.value?.user.firstName,
    type: 'text',
    blurCallback: (newValue) => {
      if (!record.value) throw new Error('Record not found.');
      record.value.user.firstName = newValue;
    }
  },
  {
    name: 'lastName',
    placeholder: 'Last name',
    currentValue: record.value?.user.lastName,
    type: 'text',
    blurCallback: (newValue) => {
      if (!record.value) throw new Error('Record not found.');
      record.value.user.lastName = newValue;
    }
  },
];
</script>

<template>
  <EditFields title="Owner" :fields="fields" />
</template>
