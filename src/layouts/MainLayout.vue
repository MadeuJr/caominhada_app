<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class=" shadow-up-">
      <q-toolbar class="justify-center">



        <q-tabs v-model="tab" shrink>


          <q-route-tab name="Home" exact icon="home" to="/home" />

          <q-route-tab name="Trip" exact icon="route" to="/trip" />
          <q-route-tab name="Pets" icon="fa-solid fa-dog" to="/dogs" />
          <q-route-tab name="Settigs" icon="settings" to="/settings" />
        </q-tabs>

      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<style>

.q-footer {
  background-color: #f3f3f3;
  border-top: 1.5px solid black;
  border-left: 1.5px solid black;
  border-right: 1.5px solid black;
  border-radius: 20px 20px 0 0;
  color: black;
}

.q-tab--active {
  color: #ED1010
}


</style>

<script setup lang="ts">
import { ref } from 'vue';


const tab = ref('name');
</script>
