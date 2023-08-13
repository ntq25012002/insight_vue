<template>
    <v-app-bar app color="white" light class="w-100 header" >
      <div class="d-flex align-center">
        <!-- <v-img
            alt="Insight Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          /> -->
        <v-btn text color="white" class="btn-menu" @click="sendDataToOtherComponent">
          <v-icon color="#ff5126!important"  >mdi-menu</v-icon>
        </v-btn>

        <v-img
          alt="Insight Logo"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="../assets/images/logo_new.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        class="rounded-pill mr-2 avatar"
        text
      >
        <v-avatar size="36" class="mr-2">
          <img src="https://insight.lotusacademy.edu.vn/static/img/default-avatar.png" alt="User Avatar" />
        </v-avatar>
        
        <span class="mr-2 ">Nguyen Van A</span>
      </v-btn>

      <v-btn class="rounded-circle custom-btn" tonal >
        <v-icon color="#ff5126!important" >screen_share</v-icon>
      </v-btn>
      <v-btn class="rounded-circle custom-btn ma-4" tonal >
        <v-icon color="#ff5126!important">chat</v-icon>
      </v-btn>
      <v-btn class="rounded-circle custom-btn" tonal >
        <v-icon color="#ff5126!important" class="fs-arrow-down">keyboard_arrow_down</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
import { EventBus } from '../main.ts';
export default {
  name: "HeaderComponent",
  data() {
    return {
      showNav: true,
    };
  },
  methods: {
    sendDataToOtherComponent() {
      this.showNav = !this.showNav
      EventBus.$emit('show-nav', this.showNav);
    }
  }
};
</script>

<style scoped>
.header {
  left: 0 !important;
  z-index: 3;
}
.custom-btn {
  height: 44px !important;
  width: 44px !important;
  padding: 0 !important;
  background-color: rgb(245, 245, 245) !important;
  border-color: rgb(245, 245, 245);
  min-width: unset !important; 
  box-shadow: unset !important;
}
.btn-menu {
  min-width: unset !important;
  padding: 0 !important;
}
.fs-arrow-down {
  font-size: 34px !important;
}
.avatar {
  padding: 0 30px 0 0 !important;
}
</style>
