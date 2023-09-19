<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed, ref } from 'vue';

const passphrase = ref();

const emit = defineEmits(['passphraseSubmitted', 'close']);

const passphraseSubmitted = () => {
  emit('passphraseSubmitted', passphrase.value);
}

const isFormComplete = computed(() => {
  return passphrase.value
});
</script>

<template>
  <Dialog :open="true" @close="emit('close')" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-10 items-start justify-center">
      <DialogPanel class="bg-white w-full max-w-xs rounded-2xl shadow-lg">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Passphrase</DialogTitle>
        <p class="m-6">Type an 8-character passphrase to secure and unlock your data file.</p>
        <form class="m-6" @submit.prevent="passphraseSubmitted">
          <input type="password" v-model="passphrase" placeholder="8-character passphrase" required minlength="8"/>
          <div class="grid grid-flow-col justify-end items-center gap-5 mt-4">
            <a @click="emit('close')" class="cursor-pointer text-sm text-gray-500 font-light">Cancel</a>
            <button type="submit" class="btn" :disabled="!isFormComplete">Confirm</button>
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
