<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
    projectName:String,
    studioName:String,
    code:Number,
    uptime:Number
});
  var status = "Up"
  var message = 'check_circle'
  var textClass = ''
  if (props.code != 200){
    status = "Info"
    message = 'help_center'
  }
  if(props.code>200){
    status = "Broken"
    message = 'emergency_home'
  } 
  if(props.code == 404){
    status = "Down"
    message = 'report'
    textClass = "bold-text text-"+status
  } 
</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <!-- pas de camel case/mettre des dash comme content-top -->
    <!-- header footer // top bottom -->
    <!-- glow // drop shadow -> contour de couleur -->
    <!-- studo/projectName // card-title/subtitle -->
<div :class="'card hover-effect glow' + status">
    <div :class="'status-bar rounded-left bg-' + status"></div>
    <div class="content">
        <div class="content-top content-separator">
            <div>
            <p class="mainText">{{projectName}}</p>
            <p class="secondaryText">{{studioName}}</p>
            </div>
            <div class="status-icon rounded-left">
                <span :class="'material-symbols-outlined bg-'+ status" style="font-size: 4vh;">{{message}}</span>
            </div>
        </div>
        <div class="secondaryText textAlignRight">
                <p :class="textClass">{{code}}</p>
                <p>{{uptime}}%</p>
        </div>
    </div>
</div>
</template>