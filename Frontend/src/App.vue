<script lang="ts">
enum SORT_ORDER {
  NAME,
  STATUS,
  TAG,
  NONE,
}
enum SHOW_ONLY {
  DOWN,
  UP,
  BROKEN,
  ALL,
}
let sort = ref(SORT_ORDER.NONE)
let display = ref(SHOW_ONLY.ALL);
let props:{projectName:string,code:number}[]
  try{
  const res = await fetch("http://localhost:8080/requestStatus");
  props = await res.json();
  }
  catch(err){
    props = [{projectName:"Entertainment",code:404},{projectName:"Frei",code:200},{projectName:"ShadowBound",code:150},{projectName:"Vi",code:200},{projectName:"Bebou",code:404},{projectName:"Floriane",code:300},{projectName:"Leandro",code:404},{projectName:"Mario",code:200},{projectName:"Springles",code:100}]
}
let show = ref(props)
function changeState(_sort?:SORT_ORDER, _display?:SHOW_ONLY){
//#region show only
    if(_display == SHOW_ONLY.ALL || display.value == _display)
      show.value = props;
    if(_display == SHOW_ONLY.BROKEN){
      show.value = props.filter(x => x.code >200 && x.code != 404)
    }
    if(_display == SHOW_ONLY.DOWN){
      show.value = props.filter(x => x.code == 404)
    }
    if(_display == SHOW_ONLY.UP){
      show.value = props.filter(x => x.code == 200)
    }
  //#endregion
  if(_sort != sort.value){
    if(_sort == SORT_ORDER.NAME){
    show.value = show.value.sort((a, b) => a.projectName > b.projectName ? 1 : -1)
  }
  if(_sort == SORT_ORDER.STATUS){
    show.value = show.value.sort((a, b) => a.code - b.code)
  }
  if(_sort == SORT_ORDER.TAG){
    throw new Error("not Implemented")
  }
  }
}
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
        <button class="sortButton" @click="changeState(SORT_ORDER.NAME)">Name</button>
        <button class="sortButton" @click="changeState(SORT_ORDER.STATUS)">Status</button>
        <button class="sortButton" @click="changeState(SORT_ORDER.TAG)">Tag</button>
        <p class="sortCategory">Show Only</p>
        <button class="sortButton" @click="changeState(SHOW_ONLY.DOWN)">Down</button>
        <button class="sortButton" @click="">Up</button>
        <button class="sortButton" @click="">Broken</button>
        
        
      </div>
      <div id="app">
        <p> {{show}}</p>    
        <body-content><card :key="show" v-for="(object) in show" :projectName="object.projectName" studioName='matt' :code=object.code :uptime="100"/> </body-content>
      </div>
    </div>
</template>
