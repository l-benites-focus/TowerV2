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
let text = ref("")
let props:{projectName:string,code:number,studioName:string}[] = await fetchData()
let show = ref(props)
let update = ref(0);

//#region fetch Data
async function fetchData(){
  let _props:{projectName:string,code:number,studioName:string}[] = []
    try{
    const res = await fetch("http://localhost:3000/requestStatus");
    _props = await res.json();
    }
    catch(err){
      _props = [{projectName:"Entertainment",code:404,studioName:"Focus"},{projectName:"Frei",code:200,studioName:"10 AM Studio"},{projectName:"ShadowBound",code:150,studioName:"Funny dice studio"},{projectName:"Expeditions: A MudRunner Game",code:200,studioName:"Focus"},{projectName:"A Plague Tale: Innocence",code:404,studioName:"Asobo Studio"},{projectName:"Aliens: Fireteam Elite",code:300,studioName:"Focus"},{projectName:"Hood: Outlaws & Legends",code:404,studioName:"Focus"},{projectName:"Evil West",code:200,studioName:"Focus"},{projectName:"Atomic Heart",code:100,studioName:"Focus"},{projectName:"Tour de France 2013",code:404,studioName:"Focus"},{projectName:"Magrunner: Dark Pulse",code:200,studioName:"Focus"},{projectName:"Final Exam",code:150,studioName:"Focus"},{projectName:"Farming Simulator 2013",code:200,studioName:"Focus"},{projectName:"Contrast",code:404,studioName:"Focus"},{projectName:"Space Hulk: Deathwing - Enhanced Edition",code:300,studioName:"Focus"},{projectName:"Pro Cycling Manager Saison 2011",code:404,studioName:"Focus"},{projectName:"TrackMania",code:200,studioName:"Focus"},{projectName:"Styx: Master of Shadows",code:100,studioName:"Focus"}]
  }
  return _props
}
//#endregion
function uncheckAll(id:string, tag:string){
  const elements = document.getElementsByClassName(tag) as HTMLCollectionOf<HTMLInputElement>;
    for (const c of elements) {
      if(c.id!=id) c.checked = false
  }
}
function updateDisplay(_text:string,_sort:SORT_ORDER,_display:SHOW_ONLY = display.value, shouldSwap:boolean = true ){
  console.log(_sort !== sort.value)
  text.value = _text
  show.value = props
  //#region show only
  if((_display == SHOW_ONLY.ALL || _display == display.value)&&shouldSwap){
        display.value = SHOW_ONLY.ALL;
      }
  else{
      if(_display == SHOW_ONLY.BROKEN){
        show.value = show.value.filter(x => x.code >200 && x.code != 404)
      }
      if(_display == SHOW_ONLY.DOWN){
        show.value = show.value.filter(x => x.code == 404)
      }
      if(_display == SHOW_ONLY.UP){
        show.value = show.value.filter(x => x.code == 200)
      }
      display.value = _display;
  }
  //#endregion
  //#region sort
  if(_sort !== sort.value){
    if(_sort == SORT_ORDER.NAME){
      show.value = show.value.sort((a, b) => a.projectName > b.projectName ? 1 : -1)
    }
    if(_sort == SORT_ORDER.STATUS){
      show.value = show.value.sort((a, b) =>b.code-a.code)
    }
    if(_sort == SORT_ORDER.TAG){
      show.value = show.value.sort((a, b) => a.studioName > b.studioName ? 1 : -1)
    }
  }
  else{
    sort.value = sort.value==_sort? SORT_ORDER.NONE:_sort;
  }
  //#endregion
    show.value = show.value.filter(x => x.projectName.includes(_text)|| x.studioName.includes(_text))
    update.value++
}
const sortCategory = [
  {id:"Name", sort_order:SORT_ORDER.NAME},
  {id:"Status", sort_order:SORT_ORDER.STATUS},
  {id:"Tag", sort_order:SORT_ORDER.TAG}
]
const displaySetup = [
  {id:"Alive", display_config:SHOW_ONLY.UP},
  {id:"Dead", display_config:SHOW_ONLY.DOWN},
  {id:"Broken", display_config:SHOW_ONLY.BROKEN}
]
</script>
<script setup lang="ts">
import {ref} from 'vue';
import card from './components/card.vue';
import linkButton from './components/linkButton.vue'
import towerLogo from '/public/TowerCICD-logo.png'
import devopsLogo from '/public/pcicd_v1.png'
</script>

<template >
      <header :class = "'bgPrimary'">
      <div id="tower-logo">
        <img id="tower-logo" :src="towerLogo">
        <input type="checkbox" class="bgPrimary hover-effect">
        <input type="text" class="bgPrimary hover-effect" placeholder="Search a project..." id="inputField" @input="event => {if(event.target && ![1,2].includes((event.target as HTMLTextAreaElement).value.length))updateDisplay((event.target as HTMLTextAreaElement).value,sort,display,false)}">
      </div>
      <div class="rightHeaderContent">
      <linkButton link="https://focusent.atlassian.net/wiki/spaces/Devops/pages" desc="Documentation" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/30_Atlassian_logo_logos-1024.png"/>
        <div id="focus-Logo">
          <img  :src="devopsLogo"/>
        </div>
      </div>
    </header>
    <div id="colorStrip"></div>
    <div id="body-content" compilerOptions.isCustomElement>
      <div id="top-bar">
        <div id="sort-bar"></div>
      </div>
      <div id="elements">
        <div id="side-bar">
        <p class="sortCategory mainText">Sort By</p>
        <div v-for="(object) in sortCategory" class="Category">
          <input type="checkbox" :id="object.id" name="drone" :value="object.id" @click="uncheckAll(object.id,'displaySortBox'), updateDisplay(text,object.sort_order,display,false)" class="displaySortBox"/>
          <label type="checkbox" class="sortButton rounded-left mainText hover-effect" :for="object.id">{{object.id}}</label>
        </div> 
        <p class="sortCategory mainText">Show Only</p>
        <div v-for="(object) in displaySetup" class="Category">
          <input type='checkbox' :id="object.id" name="drone" :value="object.id" @click="uncheckAll(object.id,'displayCheckBox'),updateDisplay(text,sort,object.display_config)" class="displayCheckBox"/>
          <label type='checkbox' class="sortButton rounded-left mainText hover-effect" :for="object.id">{{object.id}}</label>  
        </div> 
      </div>
      <div id="cards-flex">
        <div id="cards"> 
        <card :key="update" v-for="(object) in show" class="hover-effect" :projectName="object.projectName" :studioName=object.studioName :code=object.code :uptime="100"/>
      </div>
      </div>
      </div>
    </div>
    <div id="bottom-bar"><div id="bottom-shadow"></div></div>
    <footer class="bgPrimary">
      <toolname > <a href="https://dev.azure.com/FocusDevops/InnerSource">is part of the Pullup InnerSource Initiative !</a></toolname>
      <img id="pullup-logo" src="https://cdn.focus-home.com/admin/investor/website/pullup_logo.png">
    </footer>
</template>
