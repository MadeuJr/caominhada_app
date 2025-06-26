<template>
  <q-page class="">
    <q-page-container class="column fullcontent justify-start container q-mx-md q-mt-sm shadow-5">
      <q-scroll-area class=" q-mt-sm" style="height: 100%;">
        <h4 class=" text-center">Seus Cachorros</h4>
        <DogCard v-for="dog in dogs" :key="dog.id" :name="dog.name" :breed="dog.breed"
          :weight="porteTraduzido[dog.weight] ?? ''" />
      </q-scroll-area>

    </q-page-container>
  </q-page>
</template>

<style></style>

<script setup lang="ts">

import DogCard from 'src/components/DogCard.vue';

import { onMounted, ref } from 'vue'
import { api } from 'src/boot/axios'

interface Dog {
  id: number,
  name: string,
  breed: string,
  weight: string
}

const porteTraduzido: Record<string, string> = {
  SMALL: 'Pequeno',
  MEDIUM: 'Médio',
  LARGE: 'Grande'
}

const dogs = ref<Dog[]>([])

const buscaDogs = async () => {
  try {
    const res = await api.get('/dog')
    dogs.value = res.data

  } catch (error) {
    console.error('Erro ao buscar dogs', error)
  }
}

onMounted(async () => {
  await buscaDogs();
})


</script>
