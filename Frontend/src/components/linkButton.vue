<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
    link:String,
    desc:String,
    src:String,
}); 
</script>

<template>
    <a :href="props.link">
        <button class ="link-button">
            <img :src="props.src">
        </button>
    </a>
</template>