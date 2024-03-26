<script setup lang="ts">
import card from './components/card.vue';
import exData from './ressources/exData.json'
</script>

<template >
    <card v-for="(value,key) in exData" :projectName="key" studioName='matt' :code="value" uptime='matt'/>
</template>
