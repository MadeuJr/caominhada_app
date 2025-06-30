<template>
  <q-page>
    <q-page-container class="column fullcontent justify-between container q-mx-md q-mt-sm shadow-5">
      <div class="row justify-center">
        <q-img :src="Logo" loading="eager" width="150px" class="q-ma-sm" />
      </div>
      <h5 class=" text-center">Configurações</h5>
      <q-list bordered separator class="rounded-borders">

        <q-item clickable v-ripple @click="irPara('/historico')">
          <q-item-section avatar>
            <q-icon name="history" />
          </q-item-section>
          <q-item-section>Histórico de Passeios</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="irPara('/editar-perfil')">
          <q-item-section avatar>
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section>Editar Perfil</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="irPara('/suporte')">
          <q-item-section avatar>
            <q-icon name="support_agent" />
          </q-item-section>
          <q-item-section>Suporte</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="irPara('/sobre')">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>Sobre o Aplicativo</q-item-section>
        </q-item>

      </q-list>

      <!-- Botões de ações -->
      <div class="column q-gutter-sm q-my-xl ">
        <q-btn rounded label="Apagar Conta" color="negative" outline icon="delete_forever" class="q-mx-lg"
          @click="apagarConta" />

        <q-btn rounded label="Encerrar Sessão" color="primary" icon="logout" class="q-mx-lg" @click="encerrarSessao" />
      </div>
    </q-page-container>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Dialog } from 'quasar'
import Logo from 'src/assets/Logo.png'

const router = useRouter()

const irPara = async (rota: string) => {
  await router.push(rota)
}

const encerrarSessao =  () => {
  // Confirmação opcional
  Dialog.create({
    title: 'Encerrar Sessão',
    message: 'Deseja realmente sair?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    localStorage.clear()
     void router.replace('/')
  })
}

const apagarConta = () => {
  Dialog.create({
    title: 'Apagar Conta',
    message: 'Tem certeza? Esta ação é irreversível.',
    cancel: true,
    ok: { color: 'negative', label: 'Apagar' },
    persistent: true
  }).onOk(() => {
    // Aqui você chamaria a API para deletar a conta
    // Exemplo:
    // await api.delete(`/users/${userId}`)

    localStorage.clear()
    void router.replace('/login')
  })
}
</script>
