<template>
  <v-app>
    <HeaderComponent/>
    
    <v-main style="background-color: #ffeae6!important;">
      <SidebarComponent />

      <router-view/>
    </v-main>
    
  </v-app>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
export default {
  name: 'App',
  components: {
    HeaderComponent,
    SidebarComponent
  },
  data() {
    return {
     
    };
  },
  methods: {
    
  },

};
</script>
