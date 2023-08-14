<template>
  <v-navigation-drawer app v-model="sidebarOpen" :mini-variant="sidebarMini" class="h-screen nav-position-top">
    <v-list>
      <!-- Sử dụng v-list-item để tạo các mục trong sidebar -->
      <v-list-item v-for="item in sidebarItems" :key="item.text" :to="item.route" exact class="mr-4 rounded-e-xl">

        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { EventBus } from '@/main';
export default {
  name: "SidebarComponent",
  
  created() {
    this.eventBusListener = (data) => {
      this.sidebarOpen = data;
    };
    EventBus.$on('show-nav', this.eventBusListener);
  },
  data() {
    return {
      sidebarOpen: true, // Trạng thái mở/đóng sidebar
      sidebarMini: false, // Chế độ mini-variant cho sidebar
      sidebarItems: [
        { text: 'Bản tin', route: '/', icon: 'home' },
        { text: 'User', route: '/user', icon: 'account_circle_rounded' },
        { text: 'Project', route: '/project', icon: 'person_rounded' },
        { text: 'Attendance', route: '/attendance', icon: 'person_rounded' },
        { text: 'About', route: '/about', icon: 'person_rounded' },
      ],
    };
  },
};
</script>

<style scoped>
/* Điều chỉnh chiều rộng và vị trí của SidebarComponent */
.v-navigation-drawer {
  width: 240px !important; /* Điều chỉnh chiều rộng của sidebar */
  z-index: 1; /* Đảm bảo SidebarComponent hiển thị trước HeaderComponent */
}
.nav-position-top {
  padding-top: 64px !important;
}
.v-list-item__icon {
  max-width: 24px;
  
}
.v-list-item--active {
  background-color: #ffeae6!important;
  overflow: hidden;
  color: #ff5126!important;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  overflow: hidden;
}
.rounded-e-xl {
  border-radius: 0 30px 30px 0;
}
</style>
