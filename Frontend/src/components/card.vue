<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
    projectName:String,
    studioName:String,
    code:Number,
    uptime:Number
});
  var status = "Up"
  if (props.code != 200)status = "Info"
  if(props.code>200) status = "Broken"
  if(props.code == 404) status = "Down"
</script>

<template>
    <!-- pas de camel case/mettre des dash comme content-top -->
    <!-- header footer // top bottom -->
    <!-- glow // drop shadow -> contour de couleur -->
    <!-- studo/projectName // card-title/subtitle -->
<div :class="'card bgPrimary glow' + status">
    <div :class="'status-bar bg-' + status"></div>
    <div class="content">
        <div class="content-top">
            <span class="mainText">{{projectName}}</span>
            <br>
            <span class="secondaryText">{{studioName}}</span>
        </div>
        <div class="content-bottom secondaryText textAlignRight">
            <p>{{code}} <br> {{uptime}}% </p>
        </div>
    </div>
</div>
</template>