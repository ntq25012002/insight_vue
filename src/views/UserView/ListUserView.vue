<template>
  <div class="mx-6">
    <v-card class="mt-6">
      <v-container>
        <v-row class="my-3" >
          <v-col cols="12" md="12">
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field background-color="white" small dense hide-details="true" v-model="filters.name"  outlined label="Họ tên"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field background-color="white" small dense hide-details="true" v-model="filters.email" outlined label="Email"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field background-color="white" small dense hide-details="true" v-model="filters.phone" outlined label="Số điện thoại"></v-text-field>
                </v-col>
                <v-col cols="6" md="4">
                  <v-select
                    small dense hide-details="true"
                    v-model="filters.hrId"
                    :items="optionUsers"
                    item-text="value"
                    item-value="id"
                    label="Chọn hr"
                    outlined
                    background-color="white"
                    ></v-select>
  
                    <!-- <v-combobox
                      v-model="filters.hrId"
                      label="Chọn hr"
                      :items="optionUsers"
                      item-text="value"
                      item-value="id"
                    ></v-combobox> -->
                </v-col>
                <v-col cols="6" md="4">
                  <v-select v-model="filters.introduceUserId"
                  :items="optionUsers"
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
                      :items="optionUsers"
                      item-text="value"
                      item-value="id"
                    ></v-combobox> -->
                </v-col>
                <v-col cols="12" md="4">
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
      :items="users" item-key="id" 
      :items-per-page-options="[5, 10, 20, -1]"
      show-select 
      v-model="selected"
      class="elevation-1">

        <template v-slot:[`item.userAvatar`]="{ item }">
          <td>
            <v-avatar size="45" class="mr-2">
              <img :src="item.userAvatar" alt="User Avatar"  />
            </v-avatar>
          </td>
        </template>
      
        <template v-slot:[`item.actions`]="{ item }">
          <td>
            <v-icon @click="updateDataUser(item)"> mdi-pencil </v-icon>
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
                    <input id="avatar_file" hidden ref="image" type="file" @change="handleImageUpload" />
                  </v-col>

                  <v-col  cols="12" sm="6" md="4" >
                    <v-text-field v-model="user.fisrtName" label="Họ" required> </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="user.lastname" label="Tên" ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Số điện thoại*"
                      v-model="user.phoneNumber"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Email*"  v-model="user.email" required></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Mật khẩu*" type="password"  v-model="user.password" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Địa chỉ" v-model="user.address" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="optionUsers"  
                      item-text="value"
                      item-value="id"
                      label="Người giới thiệu"
                      v-model="user.introduceUserId" 
                      required></v-select>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="optionUsers"
                      label="Hr"
                      v-model="user.hrId" 
                      item-text="value"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text" @click="closeAddDialog">
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
                      <img :src="selectedImage" alt="User Avatar" />
                    </v-avatar>
                    </label>
                    <input id="avatar_file_update" hidden type="file" @change="handleImageUpload" />
                   
                  </v-col>

                  <v-col  cols="12" sm="6" md="4" >
                    <v-text-field v-model="user.fisrtName" label="Họ" required> </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="user.lastname" label="Tên" ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Số điện thoại*"
                      v-model="user.phoneNumber"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Email*"  v-model="user.email" required></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Mật khẩu*" type="password"  v-model="user.password" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Địa chỉ" v-model="user.address" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="optionUsers"  
                      item-text="value"
                      item-value="id"
                      label="Người giới thiệu"
                      v-model="user.introduceUserId" 
                      required></v-select>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="optionUsers"
                      label="Hr"
                      v-model="user.hrId" 
                      item-text="value"
                      item-value="id"
                    ></v-autocomplete>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text" @click="closeUpdateDialog">
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
// import axios from "axios";
import { mapActions, mapGetters } from 'vuex';
// const apiUrl = 'https://localhost:44384/ii';

export default {
  name: 'ListUserView',
  computed: {
    ...mapGetters(['users', 'user', 'userUpdate', 'optionUsers', 'filters', 'deleteStatus', 'addStatus', 'updateStatus']),
  },
  data() {
    return {
      selectedImage: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
      selected: [],
      selectAll: false,
      showConfirmDialog: false,
      
      deleteIds: [],
      dialogFormUpdate: false,
      dialogFormCreate: false,

      headers: [
        { text: 'Avatar', value: 'userAvatar', key: 'userAvatar' },
        { text: 'Họ tên', value: 'fullname', key: 'fullname' },
        { text: 'Số điện thoại', value: 'phoneNumber', key: 'phoneNumber' },
        { text: 'Email', value: 'email', key: 'email' },
        { text: 'Địa chỉ', value: 'address', key: 'address' },
        { text: 'Thao tác', value: 'actions', key: 'actions' },
      ],
     
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
      fileImage: null,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      snackbarTimeout: 5000,
      
    };
  },
  created() {
    this.getUsers();
    this.getOptionUsers();
  },  
  methods: {
    ...mapActions(['getUsers','getOptionUsers','addUser','deleteUsers','updateUser']),
    
    confirmDelete: function(id) {
      this.showConfirmDialog = true;
      this.deleteIds = [id];
    },
    confirmDeleteSelected: function() {
      this.showConfirmDialog = true;
      this.deleteIds = this.selected.map(item => item.id);
    },
    deleteItem: async function() {
      await this.deleteUsers(this.deleteIds);

      if (this.deleteStatus) {
          this.getUsers();
          this.getOptionUsers();

          this.showConfirmDialog = false;
          this.showSnackbar("Xóa thành công", "success");
      } else {
          this.showSnackbar("Xóa thất bại", "error");
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedImage = URL.createObjectURL(file);
        // this.fileImage = this.$refs.image.files[0]
        this.fileImage = file;
      }
      console.log(this.fileImage);
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
      dataUser.typeUser = 5;
      dataUser.userWallImage = "https://img.rawpixel.com/private/static/images/website/2022-05/px1371058-image-kwvxzp98.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b6716f0c16f696115a0bb012f38d10d4";
    },
    resetUser: function() {
      Object.entries(this.user).forEach(([key]) => {
        this.user[key] = null;
      });
      delete this.user.id;
    },
    submitFormCreate: async function() {
      this.handleDataUser(this.user);
      const formData = new FormData();
      const now = new Date();
      this.user.createTime = now.toISOString();

      formData.append('user', JSON.stringify(this.user))
      if(this.fileImage) {
        formData.append('fileImage', this.fileImage)
      }

      await this.addUser(formData);

      if(this.addStatus) {
        this.showSnackbar("Thêm thành công", "success")
        this.dialogFormCreate = false;
        this.getUsers();
        this.getOptionUsers();
        this.resetUser();
        this.fileImage = null;
        this.selectedImage = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
      }else {
        this.showSnackbar("Thêm thất bại", "error");
      }
    },

    updateDataUser: function(user) {
      let keyDataUser = Object.keys(this.user);
      Object.entries(user).forEach(([key, value]) => {
        if (keyDataUser.includes(key)) {
          this.user[key] = value;
        }
      });
      this.user.id = user.id;
      this.selectedImage = user.userAvatar != null ? user.userAvatar : this.selectedImage;
      this.dialogFormUpdate = true;
    },
  
    submitFormUpdate: async function() {
      const dataUser = new FormData();
      const now = new Date();
      this.user.updateTime = now.toISOString();

      dataUser.append('user', JSON.stringify(this.user))

      if(this.fileImage) {
        dataUser.append('fileImage', this.fileImage)
      }
      const id = this.user.id;

      await this.updateUser({dataUser, id});

      if(this.updateStatus) {
        this.showSnackbar("Cập nhật thành công", "success")
        this.dialogFormUpdate = false;
        this.getUsers();
        this.getOptionUsers();
        this.resetUser();
        this.selectedImage = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
        this.fileImage = null;
      }else {
        this.showSnackbar("Cập nhật thất bại", "error");
      }

    },
    submitForm: function() {
      this.getUsers(this.filters);
    },
    showSnackbar(msg, color) {
      this.snackbarMessage = msg;
      this.snackbarColor = color; 
      this.snackbar = true; 
    },
    closeUpdateDialog: function() {
      this.dialogFormUpdate = false;
      this.resetUser();
      this.selectedImage = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
      this.fileImage = null;
    },
    closeAddDialog: function() {
      this.dialogFormCreate = false;
      this.resetUser();
      this.selectedImage = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
      this.fileImage = null;
    }
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
