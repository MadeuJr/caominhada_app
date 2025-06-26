<template>
    <q-expansion-item>
        <template v-slot:header>
            <q-item-section avatar>
                <q-avatar>
                    <img :src="imageToShow">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                Nome: technology
            </q-item-section>
            <q-item-section>
                Raça: technology
            </q-item-section>
            <q-item-section>
                Porte: technology
            </q-item-section>

        </template>
        <q-card>
            <q-card-section>

            </q-card-section>
        </q-card>
    </q-expansion-item>
    <q-separator />
</template>

<style></style>

<script setup lang="ts">

import Userphoto from 'src/assets/Userphoto.png'

const props = defineProps({
    userImage: String
})

import { computed } from 'vue'

const imageToShow = computed(() => {
    return props.userImage ? props.userImage : Userphoto
})


</script>