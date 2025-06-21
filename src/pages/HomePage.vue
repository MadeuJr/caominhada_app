<template>
  <q-page class="flex flex-center">
    <div class="column full-width q-px-md">

      <div class="row flex flex-center">
        <q-img :src="Logo" loading="eager" width="200px" />
      </div>

      <div class="column container flex flex-center q-pa-md ">


              <!-- <q-icon name="fa-solid fa-route" color="primary" size="30px" />
              <q-icon name="access_time_filled" color="primary" size="30px" /> -->


        <div class="row flex items-center justify-around  q-pa-md q-ma-md shadow-4 full-width ">
          <div class="column datatrip">
            <div class="row">Velocidade Média</div>
            <div class="row text-primary">valor</div>
          </div>
          <div class="column icontrip">
            <div class="row justify-end">
              <q-icon name="fa-solid fa-gauge-high" color="primary" size="30px" />
            </div>
          </div>
        </div>

        <div class="row flex items-center justify-around  q-pa-md q-ma-md shadow-4 full-width ">
          <div class="column datatrip">
            <div class="row">Velocidade Média</div>
            <div class="row text-primary">valor</div>
          </div>
          <div class="column icontrip">
            <div class="row justify-end">
              <q-icon name="fa-solid fa-gauge-high" color="primary" size="30px" />
            </div>
          </div>
        </div>

        <div class="row flex items-center justify-around  q-pa-md q-ma-md shadow-4 full-width ">
          <div class="column datatrip">
            <div class="row">Velocidade Média</div>
            <div class="row text-primary">valor</div>
          </div>
          <div class="column icontrip">
            <div class="row justify-end">
              <q-icon name="fa-solid fa-gauge-high" color="primary" size="30px" />
            </div>
          </div>
        </div>

      </div>

    </div>
  </q-page>
</template>

<style>

.container{
  border: 2px solid black;
  border-radius: 20px;
}


.datatrip{
  width: 60%;
}

.icontrip{
  width: 30%;
}

</style>

<script setup lang="ts">
import Logo from 'src/assets/Logo.png'

</script>
