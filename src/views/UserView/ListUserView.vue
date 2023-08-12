<template>
  <div class="mx-6">
    <v-card class="mt-6">
      <v-container>
        <v-row class="my-3" >
          <v-col cols="12" md="12">
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="4">
                  <v-text-field background-color="white" small dense hide-details="true" v-model="filters.name"  outlined label="Họ tên"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field background-color="white" small dense hide-details="true" v-model="filters.email" outlined label="Email"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field background-color="white" small dense hide-details="true" v-model="filters.phone" outlined label="Số điện thoại"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                    small dense hide-details="true"
                    v-model="filters.hrId"
                    :items="options"
                    item-text="value"
                    item-value="id"
                    label="Chọn hr"
                    outlined
                    background-color="white"
                    ></v-select>
  
                    <!-- <v-combobox
                      v-model="filters.hrId"
                      label="Chọn hr"
                      :items="options"
                      item-text="value"
                      item-value="id"
                    ></v-combobox> -->
                </v-col>
                <v-col cols="4">
                  <v-select v-model="filters.introduceUserId"
                  :items="options"
                  item-text="value"
                  item-value="id"
                  outlined
                  background-color="white"
                  small dense hide-details="true"
                  label="Chọn người giới thiệu"
                  ></v-select>
                  <!-- <v-combobox
                      v-model="filters.introduceUserId"
                      label="Chọn người giới thiệu"
                      :items="options"
                      item-text="value"
                      item-value="id"
                    ></v-combobox> -->
                </v-col>
                <v-col cols="4">
                  <v-btn class="w-100 btn-custom--w-100 text-white" dark type="submit" color="#ff5126">Lọc</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <div class="d-flex justify-end">
      <v-btn class="my-3" color="success" @click="dialogFormCreate = true">
        Thêm
      </v-btn>
    </div>

    <!-- Data table -->
    <v-data-table 
      :headers="headers" 
      :items="dataUsers" item-key="id" 
      :items-per-page-options="[5, 10, 20, -1]"
      show-select 
      v-model="selected"
      class="elevation-1">

        <template v-slot:[`item.userAvatar`]="{ item }">
          <td>
            <v-avatar size="36" class="mr-2">
              <img :src="item.userAvatar" alt="User Avatar" />
            </v-avatar>
          </td>
        </template>
      
        <template v-slot:[`item.actions`]="{ item }">
          <td>
            <v-icon @click="updateUser(item)"> mdi-pencil </v-icon>
            <v-icon @click="confirmDelete(item.id)" > mdi-delete </v-icon>
          </td>
        </template>

      <div class="table-footer-prepend d-flex pl-2 align-center">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              outlined
              color="primary"
              class="mr-3"
              v-on="on"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              outlined
              color="primary"
              class="mr-3"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </v-data-table>

    <div class="table-footer-prepend d-flex pl-2 align-center">
      <v-btn @click="confirmDeleteSelected" :disabled="selected.length == 0" color="error">Xóa đã chọn</v-btn>
    </div>

    <!-- Dialog -->
    <v-app v-show="showConfirmDialog">
      <v-dialog v-model="showConfirmDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Xác nhận xóa</v-card-title>
          <v-card-text>Bạn có chắc chắn muốn xóa user đã chọn?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="showConfirmDialog = false">hủy</v-btn>
            <v-btn color="error" text @click="deleteItem">Xác nhận</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
    <!-- Dialog Add -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogFormCreate" persistent max-width="1024">
         <v-form @submit.prevent="submitFormCreate" ref="formDataCreate" >
          <v-card>
            <v-card-title>
              <span class="text-h5">Thông tin người dùng</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col class="text-center" cols="12" >
                    <label for="avatar_file">
                      <v-avatar size="80" class="mr-2">
                      <img :src="selectedImage" alt="User Avatar" />
                    </v-avatar>
                    </label>
                    <input id="avatar_file" hidden type="file" @change="handleImageUpload" />
                   
                  </v-col>

                  <v-col  cols="12" sm="6" md="4" >
                    <v-text-field v-model="dataUser.fisrtName" label="Họ" required> </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="dataUser.lastname" label="Tên" ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Số điện thoại*"
                      v-model="dataUser.phoneNumber"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Email*"  v-model="dataUser.email" required></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Mật khẩu*" type="password"  v-model="dataUser.password" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Địa chỉ" v-model="dataUser.address" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="options"  
                      item-text="value"
                      item-value="id"
                      label="Người giới thiệu"
                      v-model="dataUser.introduceUserId" 
                      required></v-select>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="options"
                      label="Hr"
                      v-model="dataUser.hrId" 
                      item-text="value"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text" @click="dialogFormCreate = false">
                Đóng
              </v-btn>
              <v-btn color="success" type="submit" variant="text" >
                Lưu
              </v-btn>
            </v-card-actions>
          </v-card>
         </v-form>
        </v-dialog>
      </v-row>
    </template>

    <!--  Dialog Update  -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogFormUpdate" persistent max-width="1024">
         <v-form @submit.prevent="submitFormUpdate" ref="formDataUpdate" >
          <v-card>
            <v-card-title>
              <span class="text-h5">Thông tin người dùng</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col class="text-center" cols="12" >
                    <label for="avatar_file_update">
                      <v-avatar size="80" class="mr-2">
                      <img :src="userImageUpdate" alt="User Avatar" />
                    </v-avatar>
                    </label>
                    <input id="avatar_file_update" hidden type="file" @change="handleImageUpload" />
                   
                  </v-col>

                  <v-col  cols="12" sm="6" md="4" >
                    <v-text-field v-model="dataUserUpdate.fisrtName" label="Họ" required> </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="dataUserUpdate.lastname" label="Tên" ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Số điện thoại*"
                      v-model="dataUserUpdate.phoneNumber"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Email*"  v-model="dataUserUpdate.email" required></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Mật khẩu*" type="password"  v-model="dataUserUpdate.password" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Địa chỉ" v-model="dataUserUpdate.address" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="options"  
                      item-text="value"
                      item-value="id"
                      label="Người giới thiệu"
                      v-model="dataUserUpdate.introduceUserId" 
                      required></v-select>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="options"
                      label="Hr"
                      v-model="dataUserUpdate.hrId" 
                      item-text="value"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text" @click="dialogFormUpdate = false">
                Đóng
              </v-btn>
              <v-btn color="success" type="submit" variant="text" >
                Lưu
              </v-btn>
            </v-card-actions>
          </v-card>
         </v-form>
        </v-dialog>
      </v-row>
    </template>

    <v-snackbar v-model="snackbar" :color="snackbarColor" top right :timeout="snackbarTimeout">

      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn text icon color="white" @click="snackbar = false">
          <v-icon color="white">mdi-close-circle</v-icon>
        </v-btn>
      </template>

    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
const apiUrl = 'https://localhost:44384/ii';

export default {
  name: 'ListUserView',
 
  data() {
    return {
      userImageUpdate: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
      selectedImage: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
      filters: {
        name: null,
        email: null,
        phone: null,
        hrId: null,
        introduceUserId: null,
      },
      itemsPerPage: 10,
      perPage: 10,
      perPageOptions: [10, 20, 30],
      options: [],
      selected: [],
      selectAll: false,
      showConfirmDialog: false,
      deleteId: '',
      deleteIds: [],
      dialogFormUpdate: false,
      dialogFormCreate: false,
      headers: [
        { text: 'Avatar', value: 'userAvatar', key: 'userAvatar' },
        { text: 'Họ tên', value: 'fullname', key: 'fullname' },
        { text: 'Nick name', value: 'nickName', key: 'nickName' },
        { text: 'Số điện thoại', value: 'phoneNumber', key: 'phoneNumber' },
        { text: 'Email', value: 'email', key: 'email' },
        { text: 'Địa chỉ', value: 'address', key: 'address' },
        { text: 'Thao tác', value: 'actions', key: 'actions' },
      ],
      dataUsers: [],

      dataUser: {
        "email": null,
        "code": null,
        "userAvatar": null,
        "userWallImage": null,
        "phoneNumber": null,
        "password": null,
        "contactCode": null,
        "fisrtName": null,
        "hrId": null,
        "introduceUserId": null,
        "lastname": null,
        "payLeave": null,
        "paidLeave": null,
        "unPaidLeave": null,
        "userStatus": null,
        "typeUser": null,
        "createTime": null,
        "updateTime": null
      },
      dataUserUpdate: {
      "email": null,
      "code": null,
      "userAvatar": null,
      "userWallImage": null,
      "password": null,
      "contactCode": null,
      "phoneNumber": null,
      "fisrtName": null,
      "lastname": null,
      "address": null,
      "introduceUserId": null,
      "hrId": null,
      "payLeave": null,
      "paidLeave": null,
      "unPaidLeave": null,
      "userStatus": null,
      "typeUser": null,
      "createTime": null,
      "updateTime": null,
      "id": null
      },
      
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      snackbarTimeout: 5000,
    };
  },
  created() {
    this.getAllUsers();
  },  
  methods: {
    getAllUsers: function() {
      let apiGetUserUrl = apiUrl + '/GetAllUser';
      axios.get(apiGetUserUrl)
      .then(response => {
        this.dataUsers = response.data.data.map(item => (Object.assign({}, item, { fullname: item.fisrtName + ' ' + item.lastname })));
        this.options = [...this.dataUsers.map(item => (Object.assign({}, {'id': item.id}, { 'value': item.fullname })))];
        console.log(this.dataUsers);
      })
      .catch(error => {
        console.error(error);
      });
    },
    filterUsers: function() {
      let apiGetUserUrl = apiUrl + '/GetAllUser';
     
      const filteredFields = {};
      Object.entries(this.filters).forEach(([key, value]) => {
        if (value != null) {
          filteredFields[key] = value.trim();
        }
      });

      if(Object.keys(filteredFields).length > 0) {
        const queryString = Object.keys(filteredFields).map(key => `${key}=${filteredFields[key]}`).join('&');
        apiGetUserUrl = `${apiGetUserUrl}?${queryString}`;
        console.log(apiGetUserUrl);
      }
      
      axios.get(apiGetUserUrl)
      .then(response => {
        this.dataUsers = response.data.data.map(item => (Object.assign({}, item, { fullname: item.fisrtName + ' ' + item.lastname })));
      })
      .catch(error => {
        console.error(error);
      });

    },
    confirmDelete: function(id) {
      this.showConfirmDialog = true;
      this.deleteIds = [id];
    },
    confirmDeleteSelected: function() {
      this.showConfirmDialog = true;
      this.deleteIds = this.selected.map(item => item.id);
    },
    deleteItem: function() {
      const apiDeleteUserUrl = `${apiUrl}/DeleteRange`;
      axios.post(apiDeleteUserUrl,this.deleteIds)
          .then(response => {
            this.showSnackbar("Xóa thành công", "success")

            console.log(response);
            this.getAllUsers();
          })
          .catch(error => {
            console.log(error);
          })
      this.showConfirmDialog = false;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedImage = URL.createObjectURL(file);
      }
    },
    handleDataUser: function(dataUser) {
      const now = new Date();
      dataUser.userAvatar = this.selectedImage;
      dataUser.code = String(now.getTime());
      dataUser.contactCode = 'lts_' + now.getTime();
      dataUser.updateTime = now.toISOString();
      dataUser.payLeave = 100;
      dataUser.paidLeave = 100;
      dataUser.unPaidLeave = 100;
      dataUser.userStatus = 1;
      dataUser.typeUser = 1;
      dataUser.userWallImage = "https://img.rawpixel.com/private/static/images/website/2022-05/px1371058-image-kwvxzp98.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b6716f0c16f696115a0bb012f38d10d4";
    },
    submitFormCreate: function() {
      this.handleDataUser(this.dataUser);
      const now = new Date();
      this.dataUser.createTime = now.toISOString();
      console.log(this.dataUser);
      const apiAddUserUrl = `${apiUrl}/AddUser`;
      axios.post(apiAddUserUrl, this.dataUser)
          .then(response => {
            this.showSnackbar("Thêm người dùng thành công", "success")
            this.dialogFormCreate = false;
            this.getAllUsers();
            // this.$ref.formDataCreate.$el.reset();
            console.log(response);
          })
          .catch(error => {
            // this.showSnackbar("Thêm người dùng thất bại", "error")
            console.log("error: ",error);
          })
    },

    updateUser: function(user) {
      let keyDataUser = Object.keys(this.dataUserUpdate);
      Object.entries(user).forEach(([key, value]) => {
        if (keyDataUser.includes(key)) {
          this.dataUserUpdate[key] = value;
        }
        });
      this.userImageUpdate = user.userAvatar != null ? user.userAvatar : this.userImageUpdate;
      this.dialogFormUpdate = true;
      console.log(this.dataUserUpdate);
    },
  
    submitFormUpdate: function() {
      this.handleDataUser(this.dataUserUpdate);
      const apiAddUserUrl = `${apiUrl}/UpdateUserAsync/${this.dataUserUpdate.id}`;
      axios.put(apiAddUserUrl, this.dataUserUpdate)
          .then(response => {
            this.showSnackbar("Cập nhật người dùng thành công", "success")
            this.dialogFormUpdate = false;
            this.getAllUsers();
            // this.$ref.formDataUpdate.$el.reset();
            console.log(response);
          })
          .catch(error => {
            // this.showSnackbar("Cập nhật người dùng thất bại", "error")
            console.log("error: ",error);
          })
    },
    submitForm: function() {
      this.filterUsers();
    },
    showSnackbar(msg, color) {
      this.snackbarMessage = msg;
      this.snackbarColor = color; 
      this.snackbar = true; 
    },
    
  },
 

};
</script>

<style scoped>
.btn-custom--w-100{
  width: 100% !important;
}
.table-footer-prepend {
  margin-top: -58px;
  height: 58px;
}
.h-40{
  max-height: 40px;
}
label {
  cursor: pointer;
}

.v-avatar {
  position: relative;
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
</style>
