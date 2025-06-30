<!-- eslint-disable @typescript-eslint/restrict-template-expressions -->
<template>
  <q-page>
    <q-page-container class="column fullcontent justify-start container q-mx-md q-mt-sm shadow-5">
      <div v-if="role === 'WALKER'">
        <q-select v-model="tutorSelecionado" :options="tutores" option-label="user.name" label="Selecione o tutor"
          @update:model-value="buscarDogs" />

        <q-select v-if="dogs.length" v-model="dogSelecionado" :options="dogs" option-label="name"
          label="Selecione o cachorro" />

        <div class="q-my-md" style="height: 300px">
          <TripMap :positions="posicoes" />
        </div>

        <q-btn color="primary" :label="passeioAtivo ? 'Parar Passeio' : 'Iniciar Passeio'" @click="alternarPasseio"
          class="full-width" />
      </div>

      <div v-else-if="role === 'TUTOR'">
        <div class="q-my-md" style="height: 300px">
          <TripMap :positions="posicoes" />
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { Geolocation } from '@capacitor/geolocation'
import io from 'socket.io-client'
import TripMap from 'components/TripMap.vue'

await Geolocation.requestPermissions()

const $q = useQuasar()
const role = $q.localStorage.getItem('role')
const walkerId = $q.localStorage.getItem('walkerId')
const userId = $q.localStorage.getItem('userId')

interface Tutor {
  id: number,
  user: { name: string },
  address: string
}

const tutores = ref<Tutor[]>([])
const dogs = ref([])
const tutorSelecionado = ref(null)
const dogSelecionado = ref(null)

const passeioAtivo = ref(false)
const posicoes = ref<unknown[]>([])

let watchId: string | null = null


onMounted(async () => {
  if (role === 'WALKER' && walkerId) {
    const res = await api.get(`/walker/${walkerId}/tutors`)
    tutores.value = res.data
  }

  if (role === 'TUTOR' && userId) {
    const socket = io('http://localhost:3000')
    socket.on(`location-2`, (data) => {
      posicoes.value.push({ lat: data.lat, lng: data.lng })
    })
  }
})

const buscarDogs = async () => {
  if (!tutorSelecionado.value?.id) return
  const res = await api.get(`/tutor/${tutorSelecionado.value.id}/dogs`)
  dogs.value = res.data
}

const alternarPasseio = async () => {
  passeioAtivo.value = !passeioAtivo.value
  const socket = io('http://localhost:3000')

  if (passeioAtivo.value) {
    watchId = await Geolocation.watchPosition({
      timeout: 10000
    }, (position, err) => {
      if (err) {
        console.error('Erro no rastreamento:', err)
        return
      }

      if (position) {
        const { latitude, longitude } = position.coords
        console.log('Nova posição:', latitude, longitude)

        posicoes.value.push({lat: latitude, lng: longitude})

        socket.emit('locationUpdate', {
          passeadorId: walkerId,
          tutorId: tutorSelecionado.value?.id,
          dogId: dogSelecionado.value?.id,
          lat: latitude,
          lng: longitude
        })
      }
    })
  } else {
    if (watchId) {
      await Geolocation.clearWatch({ id: watchId })
      watchId = null
    }
  }
}

</script>
