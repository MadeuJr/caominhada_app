<template>
  <q-page class="flex flex-center">
    <q-page-container class="container q-pa-md shadow-5">

      <div class="row justify-center">
        <q-img :src="Logo" loading="eager" width="150px" class="q-mx-sm" />
      </div>

      <q-card-section>
        <div class="text-center">
          <h5>{{ isLogin ? 'Que bom ter você aqui de novo!' : 'Primeira vez? Registre-se' }}</h5>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="isLogin ? handleLogin() : handleRegister()">
          <!-- LOGIN FORM -->
          <template v-if="isLogin">


            <q-input rounded v-model="loginForm.email" label="Email" type="email" outlined dense class="q-mb-sm"
              :rules="[val => !!val || 'Informe seu e-mail']" />

            <q-input rounded v-model="loginForm.password" label="Senha" :type="showPassword ? 'text' : 'password'"
              outlined dense class="q-mb-sm" :rules="[val => !!val || 'Informe sua senha']">
              <template #append>
                <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="showPassword = !showPassword"
                  class="cursor-pointer" />
              </template>
            </q-input>

            <q-btn rounded label="Entrar" type="submit" color="primary" class="full-width q-mt-md" />
            <q-btn rounded flat label="Criar conta" @click="isLogin = false" class="q-mt-sm full-width" />
          </template>

          <!-- REGISTER FORM -->
          <template v-else>
            <q-input rounded v-model="registerForm.name" label="Seu nome" type="text" outlined dense class="q-mb-sm"
              :rules="[val => !!val || 'Informe seu nome']" />

            <q-input rounded v-model="registerForm.email" label="Email" type="email" outlined dense class="q-mb-sm"
              :rules="[val => !!val || 'Informe seu e-mail']" />

            <q-input rounded v-model="registerForm.password" label="Senha" :type="showPassword ? 'text' : 'password'"
              outlined dense class="q-mb-sm" :rules="[val => !!val || 'Informe sua senha']">
              <template #append>
                <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="showPassword = !showPassword"
                  class="cursor-pointer" />
              </template>
            </q-input>

            <q-input rounded v-model="registerForm.confirmPassword" label="Confirmar Senha"
              :type="showPassword ? 'text' : 'password'" outlined dense class="q-mb-sm"
              :rules="[val => val === registerForm.password || 'As senhas não coincidem']" />

            <q-input rounded v-model="registerForm.telephone" label="Telefone" mask="(##) #####-####" outlined dense
              class="q-mb-sm" />

            <q-option-group v-model="registerForm.role" :options="[
              { label: 'Tutor', value: 'TUTOR' },
              { label: 'Passeador', value: 'WALKER' }
            ]" type="radio" inline class="q-mb-sm" />

            <q-input rounded v-if="registerForm.role === 'TUTOR'" v-model="registerForm.address" label="Endereço"
              outlined dense class="q-mb-sm" />

            <q-btn rounded label="Registrar" type="submit" color="primary" class="full-width q-mt-md" />
            <q-btn rounded flat label="Já tem conta? Entrar" @click="isLogin = true" class="q-mt-sm full-width" />
          </template>
        </q-form>
      </q-card-section>

    </q-page-container>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from "src/assets/Logo.png"
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar();
const router = useRouter()

const isLogin = ref(true)
const showPassword = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
  telephone: '',
  role: 'TUTOR',
  address: ''
})


const handleLogin = async () => {
  try {

    const response = await api.post('/auth/login', loginForm.value)
    const { access_token, id, role } = response.data



    $q.localStorage.setItem('access_token', access_token)
    $q.localStorage.setItem('userId', id)
    $q.localStorage.setItem('role', role)

    const userRequest = await api.get('/user/' + id)

    const { name } = userRequest.data

    $q.localStorage.setItem('name', name)

    const userId = id;

    if (role === "WALKER") {
      const idWalkerRequest = await api.get('/walker/' + userId)
      const { id } = idWalkerRequest.data
      $q.localStorage.setItem('walkerId', id)
    } else {
      const idTutorRequest = await api.get('/tutor/' + userId)
      const { id } = idTutorRequest.data
      $q.localStorage.setItem('tutorId', id)
    }

    $q.notify({
      type: 'positive',
      message: "Login realizado com sucesso"
    })
    await router.push('/home')
  } catch (err) {
    console.error('Erro ao fazer login:', err)
    $q.notify({
      type: 'negative',
      message: 'Usuário ou senha incorretos.'
    })
  }
}

const handleRegister = async () => {
  try {

    const payload = {
      email: registerForm.value.email,
      password: registerForm.value.password,
      name: registerForm.value.name,
      telephone: registerForm.value.telephone,
      role: registerForm.value.role
    }


    const registerRequest = await api.post('/user', payload)
    const loginResponse = await api.post('/auth/login', { email: registerForm.value.email, password: registerForm.value.password })
    const { access_token, id, role } = loginResponse.data
    const { name } = registerRequest.data
    const userId = id;

    $q.localStorage.setItem('access_token', access_token)
    $q.localStorage.setItem('userId', id)
    $q.localStorage.setItem('role', role)
    $q.localStorage.setItem('name', name)
    

    if (registerForm.value.role === "WALKER") {
      const response = await api.post('/walker', { userId: userId })
      const { id } = response.data
      $q.localStorage.setItem('walkerId', id)
    } else {
      const response = await api.post('/tutor', { userId: userId, address: registerForm.value.address })
      const { id } = response.data
      $q.localStorage.setItem('tutorId', id)
    }

    $q.notify({
      type: 'positive',
      message: "Registro realizado com sucesso"
    })

    await router.push('/home')

  } catch (error) {
    console.error('Erro ao fazer registro:', error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao fazer login.'
    })
  }
}

</script>
