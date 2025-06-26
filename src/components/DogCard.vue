<template>
    <q-expansion-item class="q-py-sm q-mx-sm q-my-lg shadow-5 cardborder">
        <template v-slot:header>
            <q-item-section avatar>
                <q-avatar>
                    <img :src="imageToShow">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                Nome: <span class=" text-caption">{{ name }}</span>
            </q-item-section>
            <q-item-section>
                Raça: <span class=" text-caption">{{ breed }}</span>
            </q-item-section>
            <q-item-section>
                Porte: <span class=" text-caption">{{ weight }}</span>
            </q-item-section>

        </template>
        <q-card>
            <q-card-section>
                <q-btn />
            </q-card-section>
        </q-card>
    </q-expansion-item>

</template>

<style></style>

<script setup lang="ts">

import Userphoto from 'src/assets/Userphoto.png'

const props = defineProps({
    dogImage: String,
    id: Number,
    name: String,
    weight: String,
    breed: String
})



import { computed } from 'vue'

const imageToShow = computed(() => {
    return props.dogImage ? props.dogImage : Userphoto
})

</script>