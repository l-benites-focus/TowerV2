<script lang="ts">
export default {
    data() {
      return {
        data: []
      }
    },
    methods: {
      async getData() {
        const res = await fetch("http://localhost:8080/requestStatus");
        console.log(res)
        const finalRes = await res.json();
        this.data = finalRes;
      }
    },
  mounted() {
    this.getData()
  }
  }
</script>
<script setup lang="ts">
import card from './components/card.vue';
</script>

<template >
    <card v-for="(value,key) in data " :projectName="key.toString()" studioName='matt' :code="value" :uptime="100"/>
</template>
