<template>
  <q-page class="column justify-start">

    <div class="row justify-center">
      <q-img :src="Logo" loading="eager" width="150px" class="q-ma-sm" />
    </div>

    <div class="row q-ma-lg">
      <div>
        <q-img :src="UserIcon" width="40px" />
      </div>
      <div class="q-ma-sm">
        name
      </div>
    </div>



    <div class="column q-px-lg q-my-lg">


      <div class="column container flex-center q-pa-md  shadow-2 ">

        <div class="row flex items-center justify-around  q-pa-md q-ma-md shadow-4 full-width infoborder">
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

        <div class="row flex items-center justify-around  q-pa-md q-ma-md shadow-4 full-width infoborder">
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

        <div class="row flex items-center justify-around  q-pa-md q-ma-md shadow-4 full-width infoborder">
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



.datatrip {
  width: 60%;
}

.icontrip {
  width: 30%;
}

.infoborder {
  border-radius: 20px;
}
</style>

<script setup lang="ts">
import Logo from 'src/assets/Logo.png'
import UserIcon from 'src/assets/Userphoto.png'

</script>
