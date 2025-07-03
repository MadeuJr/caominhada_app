<template>
  <div class="flex column q-ma-md">
    <div>
      <q-btn class="q-py-md q-px-lg" outline rounded icon="arrow_back" color="blue" @click="voltar" />
    </div>

    <div class="text-center">
      <h5>Adicionar Cachorro</h5>
    </div>

    <div class="q-my-md">
      <q-form @submit.prevent="salvarDog" class="q-gutter-md">
        <q-input outlined dense rounded v-model="form.name" label="Nome do Cachorro" />
        <q-input outlined dense rounded v-model="form.breed" label="Raça" />
        <q-select outlined dense rounded v-model="form.weight" label="Porte" :options="['SMALL', 'MEDIUM', 'LARGE']"
          emit-value map-options />
        <q-input outlined dense rounded v-model="form.observation" label="Observações" type="textarea" autogrow
          hint="Insira Condições para realizar o passeio com esse cachorro" />

        <div class="row justify-center q-mt-xl">
          <q-btn rounded type="reset" icon="cleaning_services" @click="limparFormulario" label="Limpar" color="warning"
            class="q-mr-sm" />
          <q-btn rounded type="submit" icon="save" label="Salvar" color="positive"/>
        </div>

      </q-form>


    </div>

  </div>

</template>

<style></style>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from 'boot/axios'

const route = useRoute()
const router = useRouter()


const tutorId = route.params.tutorId as string

const form = ref({
  name: '',
  breed: '',
  weight: '',
  observation: ''
})

const limparFormulario = () => {
  form.value = {
    name: '',
    breed: '',
    weight: '',
    observation: ''
  }
}

const salvarDog = async () => {
  try {
    const payload = {
      ...form.value,
      tutorId
    }
    await api.post('/dog', payload)
    await router.push('/dogs')
  } catch (err) {
    console.error('Erro ao salvar dog:', err)
  }
}

const voltar = () => {
  router.back()
}
</script>