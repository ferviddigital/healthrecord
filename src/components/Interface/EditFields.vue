<script setup lang="ts">
import HeaderTitleCenter from '@components/Interface/HeaderTitleCenter.vue';

defineProps<{
  fields: FormField[];
  title: string;
}>();

const runUpdateCallback = (event: FocusEvent, field: FormField) => {
  if (!(event.target instanceof HTMLInputElement)) return;
  const newValue = event.target.value;
  field.blurCallback(newValue);
};
</script>

<template>
  <div>
    <HeaderTitleCenter :title="title" />
    <div class="p-4">
      <div class="rounded-xl bg-white divide-y overflow-hidden">
        <div v-for="field in fields">
          <input
            :type="field.type"
            :name="field.name"
            :placeholder="field.placeholder"
            :value="field.currentValue"
            class="border-none bg-none !ring-0 !p-3 !px-4 w-full"
            :class="field.classes"
            @blur="(event: FocusEvent) => runUpdateCallback(event, field)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
