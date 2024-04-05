<script lang="ts">
let props:{projectName:string,code:number}[]
  try{
  const res = await fetch("http://localhost:8080/requestStatus");
  props = await res.json();
  }
  catch(err){
    props = [{projectName:"Entertainment",code:404},{projectName:"Frei",code:200},{projectName:"ShadowBound",code:150},{projectName:"Vi",code:200},{projectName:"Bebou",code:404},{projectName:"Floriane",code:300},{projectName:"Leandro",code:404},{projectName:"Mario",code:200},{projectName:"Springles",code:100}]
}
const show = ref(props)

</script>

<script setup lang="ts">
import { computed, createApp, markRaw, ref, shallowRef } from 'vue';
import card from './components/card.vue';
</script>

<template >
      <header>
      <div class="titleText">
        <span >froject lower</span>
      </div>
      <div class="rightHeaderContent">
        <div class ="focusLogo">
          <img  src="https://th.bing.com/th/id/OIP.lXPtc_Y3WMHgm7xLB7wkAQHaFS?rs=1&pid=ImgDetMain"/>
        </div>
      </div>
    </header>
    <div id="body-content">
      <div id="side-bar">
        <p class="sortCategory">Sort By</p>
        <button class="sortButton" @click="show = show.sort((a, b) => a.projectName > b.projectName ? 1 : -1)">Name</button>
        <button class="sortButton" @click="show = show.sort((a, b) => a.code - b.code)">Status</button>
        <button class="sortButton">Tag</button>
        <p class="sortCategory">Show Only</p>
        <button class="sortButton" @click="show = props.filter(x => x.code == 404)">Down</button>
        <button class="sortButton" @click="show = props.filter(x => x.code == 200)">Up</button>
        <button class="sortButton" @click="show = props.filter(x => x.code >200 && x.code != 404)">Broken</button>

      </div>
      <div id="app">
        <p> {{show}}</p>    
        <body-content><card :key="show" v-for="(object) in show" :projectName="object.projectName" studioName='matt' :code=object.code :uptime="100"/> </body-content>
      </div>
    </div>
</template>
