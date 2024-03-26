<script setup>
import { ref, defineProps, reactive, toRefs,withDefaults } from 'vue'
const count = ref(0)

const props = defineProps({
    projectName:String,
    studioName:String,
    code:Number,
    uptime:Number
});
  var status = "Up"
  if(props.code>200) status = "Broken"
  if(props.code == 404) status = "Down"
</script>

<template>
<div :class="'rectangle glow' + status">
    <div :class="'colorStrip bgColor' + status"></div>
    <div class="content">
        <div class="content-top">
        <div class="projectName"><b>{{projectName}}</b></div>
        <div class="studioName">{{studioName}}</div>
    </div>
        <div class="content-bottom">
        <div class="code">{{code}}</div>
        <div class="uptime">{{uptime}}%</div>
    </div>
    </div>
</div>
</template>

