<script setup>
import { ref, defineProps } from 'vue'
import linkButton from '../components/linkButton.vue'
const props = defineProps({
    projectName:String,
    studioName:String,
    code:Number,
    uptime:Number
});
  var status = "Up"
  var message = 'check_circle'
  var textClass = ''
  var link = 'http://'+props.projectName+'-qkbld.westeurope.cloudapp.azure.com:8810/'
  var src = 'https://th.bing.com/th/id/R.e8a90a30407503d3a7621ab9a591c443?rik=2nNQcPbJL%2bNjQA&riu=http%3a%2f%2fwiki.pmease.com%2fdownload%2fattachments%2f18809226%2fquickbuild-logo.png&ehk=dtkKK%2b35O4qUz9LMRcJGcfAUmzt3mBClHaxFL%2f8iv6g%3d&risl=&pid=ImgRaw&r=0'
  if (props.code != 200){
    status = "Info"
    message = 'help_center'
    link = 'https://portal.azure.com/#home'
    src = 'https://swimburger.net/media/ppnn3pcl/azure.png'
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
            <div :class="'status-icon rounded-left bg-'+ status">
                <span :class="'material-symbols-outlined'">{{message}}</span>
            </div>
        </div>
        <div class="bottom-Part">
          <div>
            <linkButton :link="link" desc="Documentation" :src="src"/>
          </div>
          <div class="secondaryText textAlignRight">
                <p :class="textClass">{{code}}</p>
                <p>{{uptime}}%</p>
        </div>
        </div>

    </div>
</div>
</template>