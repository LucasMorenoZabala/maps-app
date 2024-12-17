<template>

  <MapView />
  
  <myLocationBtn />

  <SearchBar />

  <tripDetails />

</template>

<script lang="ts">
import MapView from '@/components/mapView/MapView.vue';
import MyLocationBtn from '@/components/myLocationBtn/myLocationBtn.vue';
import SearchBar from '@/components/searchBar/SearchBar.vue';
import tripDetails from '@/components/tripDetails/tripDetails.vue';

import { usePlacesStore } from '@/composables';
import { defineComponent } from 'vue';



export default defineComponent({
  name: 'HomeView',
  components: {MapView, MyLocationBtn, SearchBar, tripDetails},

  setup(){
    usePlacesStore()
  }
});
</script>
