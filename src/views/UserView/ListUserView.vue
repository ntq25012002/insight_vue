<template>
  <div class="mr-6">
    <div class="d-flex justify-end">
      <v-btn class="my-5" color="success" to="/user/them">
        Thêm
      </v-btn>
    </div>

    <v-checkbox v-model="selectAll">Chọn tất cả</v-checkbox>
    <v-data-table :headers="headers" :items="desserts" item-key="id" show-select class="elevation-1">
      <!-- Cột checkbox -->
      <template v-slot:item="{ item }">
        <tr>
          <td><input type="checkbox" v-model="checked" :value="item.id"></td>
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
          <td>{{ item.fat }}</td>
          <td>{{ item.carbs }}</td>
          <td>{{ item.protein }}</td>
          <td>{{ item.iron }}</td>
          <td >
           
          <router-link :to="`/user/sua/${item.id}`" class="mx-3">
            <v-icon
            >
              mdi-pencil
            </v-icon>
          </router-link>

          <v-icon
            @click="deleteItem(item.id)"
          >
            mdi-delete
          </v-icon>
          </td>
        </tr>
      </template>

      <!-- Các cột dữ liệu khác -->
      <template v-for="header in headers" v-slot:[`item.${header.key}`]="{ item }">
        {{ item[header.key] }}
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  name: 'ListUserView',
  data() {
    return {
      checked: [],
      selectAll: false,
      itemsPerPage: 5,
      headers: [

        { text: 'Dessert (100g serving)', value: 'name', key: 'name' },
        { text: 'Calories', value: 'calories', key: 'calories' },
        { text: 'Fat (g)', value: 'fat', key: 'fat' },
        { text: 'Carbs (g)', value: 'carbs', key: 'carbs' },
        { text: 'Protein (g)', value: 'protein', key: 'protein' },
        { text: 'Iron (%)', value: 'iron', key: 'iron' },
        { text: 'Action', value: 'iron', key: 'iron', align: 'center' },
      ],
      desserts: [
        {
            id: 1,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1',
          },
          {
            id: 2,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0',
          },
          {
            id: 3,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6',
          },
          {
            id: 4,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7',
          },
          {
            id: 5,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16',
          },
          {
            id: 6,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1',
          },
          {
            id: 7,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2',
          },
          {
            id: 8,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8',
          },
          {
            id: 9,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45',
          },
          {
            id: 10,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22',
          },
        ],
    };
  },
  methods: {
    deleteItem: function(id) {
      console.log(id);
    },
     toggleSelectAll() {
      // Khi checkbox ở tiêu đề thay đổi, cập nhật trạng thái chọn của các checkbox ở dưới
      this.desserts.forEach((item) => (item.selected = this.selectAll));
    },
    
  }
  
};
</script>

<style scoped>

.custom-btn {
  height: 44px !important;
  width: 44px !important;
  padding: 0 !important;
  background-color: rgb(245, 245, 245) !important;
  border-color: rgb(245, 245, 245);
  min-width: unset !important; 
  box-shadow: unset !important;

}
</style>
