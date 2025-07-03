<template>
  <q-page>
    <q-page-container class="column fullcontent justify-start container q-mx-md q-mt-sm shadow-5">
      <template v-if="!exibindoSubpagina" >
          <q-scroll-area  class="q-mt-sm" style="height: 100%;">

          <div v-if="role === 'TUTOR'">
            <h5 class="text-center q-mb-lg">Seus Cachorros</h5>


            <DogCard v-for="dog in dogs" :key="dog.id" :name="dog.name" :breed="dog.breed"
              :weight="porteTraduzido[dog.weight] ?? ''" />


            <div class="q-mt-xl absolute-bottom flex justify-center">
              <q-btn rounded label="Adicionar Cachorro" color="primary" icon="add" @click="irParaAdicionarCachorro" />
            </div>
          </div>


          <div v-else-if="role === 'WALKER'">
            <h5 class="text-center q-mb-md">Tutores Atendidos</h5>


            <TutorCard v-for="tutor in tutores" :key="tutor.id" :name="tutor.user.name" :address="tutor.address" />


            <div class="q-mt-xl absolute-bottom flex justify-center">
              <q-btn rounded class="" label="Adicionar Tutor" color="primary" icon="person_add"
                @click="irParaAdicionarTutor" />
            </div>
          </div>


          <div v-else>
            <q-banner class="bg-warning text-black">
              Role do usuário não reconhecida.
            </q-banner>
          </div>
        </q-scroll-area>
        </template>
      <router-view/>
    </q-page-container>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import DogCard from 'src/components/DogCard.vue'
import TutorCard from 'src/components/TutorCard.vue'
import { useRoute } from 'vue-router'


interface Dog {
  id: number,
  name: string,
  weight: string,
  breed: string
}

interface Tutor {
  id: number,
  user: { name: string },
  address: string
}

const $q = useQuasar()

const role = $q.localStorage.getItem('role')
const userId = String($q.localStorage.getItem('userId') ?? '')
const dogs = ref<Dog[]>([])
const tutores = ref<Tutor[]>([])
const router = useRouter()
const route = useRoute()

const exibindoSubpagina = computed(() => {
  return route.path !== '/dogs'
})

const porteTraduzido: Record<string, string> = {
  SMALL: 'Pequeno',
  MEDIUM: 'Médio',
  LARGE: 'Grande'
}

const irParaAdicionarCachorro = async () => {
  await router.push('/dogs/dogadd')
}

const irParaAdicionarTutor = async () => {
  await router.push('/dogs/tutoradd')
}


onMounted(async () => {
  try {
    if (role === 'TUTOR') {
      if (!userId) {
        throw new Error('userId não encontrado no localStorage')
      }

      const res = await api.get(`/tutor/${userId}/dogs`)
      dogs.value = res.data

    } else if (role === 'WALKER') {
      const walkerIdRequest = String($q.localStorage.getItem("walkerId") ?? "")
      if (!walkerIdRequest) {
        throw new Error('walkerId não encontrado no localStorage')
      }
      const res = await api.get(`/walker/${walkerIdRequest}/tutors`)
      tutores.value = res.data

    }
  } catch (err) {
    console.error('Erro ao buscar dados:', err)
  }
})
</script>