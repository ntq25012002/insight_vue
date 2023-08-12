<template>
  <div class="mx-6">
    <v-card class="mt-6">
      <v-container>
        <v-row class="my-3" >
          <v-col cols="12" md="12">
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="3">
                  <v-text-field background-color="white" small dense hide-details="true" v-model="filters.projectName"  outlined label="Tên project"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-select
                    small dense hide-details="true"
                    v-model="filters.poId"
                    :items="options"
                    item-text="value"
                    item-value="id"
                    label="Chọn PO"
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
                <v-col cols="3">
                  <v-select v-model="filters.pmId"
                  :items="options"
                  item-text="value"
                  item-value="id"
                  outlined
                  background-color="white"
                  small dense hide-details="true"
                  label="Chọn PM"
                  ></v-select>
                  <!-- <v-combobox
                      v-model="filters.introduceUserId"
                      label="Chọn người giới thiệu"
                      :items="options"
                      item-text="value"
                      item-value="id"
                    ></v-combobox> -->
                </v-col>
                
                <v-col cols="3">
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
      :items="dataProjects" item-key="id" 
      :items-per-page-options="[5, 10, 20, -1]"
      show-select 
      v-model="selected"
      class="elevation-1">
      
        <template v-slot:[`item.isLate`]="{ item }">
          <td >
            {{item.isLate ? 'có' : 'Không' }}
          </td>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <td>
            <v-icon @click="updateProject(item)"> mdi-pencil </v-icon>
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
      <v-btn @click="confirmDeleteSelected" :disabled="selected.length == 0" color="error">Xóa mục đã chọn</v-btn>
    </div>

    <!-- Dialog Confirm delete-->
    <v-app v-show="showConfirmDialog">
      <v-dialog v-model="showConfirmDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Xác nhận xóa</v-card-title>
          <v-card-text>Bạn có chắc chắn muốn xóa dự án đã chọn?</v-card-text>
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
              <span class="text-h5">Thông tin dự án</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col  cols="12" sm="6" md="6" >
                    <v-text-field v-model="dataProject.projectName" label="Tên dự án" required> </v-text-field>
                  </v-col>
                  <v-col  cols="12" sm="6" md="6" >
                    <v-text-field v-model="dataProject.estimateDay" label="Thời gian ước tính (ngày)" required> </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="options"  
                      item-text="value"
                      item-value="id"
                      label="Người quản lý"
                      v-model="dataProject.pmId" 
                      required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="options"  
                      item-text="value"
                      item-value="id"
                      label="Chủ dự án"
                      v-model="dataProject.poId" 
                      required></v-select>
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
              <v-card-title>Thông tin dự án</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field v-model="dataProjectUpdate.projectName" required label="Tên dự án"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field v-model="dataProjectUpdate.estimateDay" required label="Thời gian ước tính(ngày)"></v-text-field>
                    </v-col>

                     <v-col cols="12" md="6" sm="6">
                      <v-select
                        :items="options"
                        item-value="id"
                        item-text="value"
                        label="Người quản lý"
                        v-model="dataProjectUpdate.pmId" 
                        required
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-select
                        :items="options"
                        item-value="id"
                        item-text="value"
                        label="Chủ dự án"
                        v-model="dataProjectUpdate.poId" 
                        required
                      >
                      </v-select>
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
      filters: {
        projectName: null,
        pmId: null,
        poId: null,
      },
      options: [],
      selected: [],
      selectAll: false,
      showConfirmDialog: false,
      deleteId: '',
      deleteIds: [],
      dialogFormUpdate: false,
      dialogFormCreate: false,
      headers: [
        { text: 'Tên dự án', value: 'projectName', key: 'projectName' },
        { text: 'PoId', value: 'poId', key: 'poId' },
        { text: 'PmId', value: 'pmId', key: 'pmId' },
        { text: 'Thời gian ước tính (ngày)', value: 'estimateDay', key: 'estimateDay', align: "center" },
        { text: 'Trễ', value: 'isLate', key: 'isLate' },
        { text: 'Ngày tạo', value: 'createTime', key: 'createTime' },
        { text: 'Thao tác', value: 'actions', key: 'actions', sortable: false },
      ],
      dataProjects: [],
      dataProject:  {
        "projectName": null,
        "poId": null,
        "pmId": null,
        "createTime": null,
        "updateTime": null,
        "dateTime": null,
        "estimateDay": null,
        "isLate": null,
        "statusId": null,
      },
      dataProjectUpdate:  {
        "id": null,
        "projectName": null,
        "poId": null,
        "pmId": null,
        "createTime": null,
        "updateTime": null,
        "dateTime": null,
        "estimateDay": null,
        "isLate": null,
        "statusId": null,
      },
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      snackbarTimeout: 5000,
    };
  },
  created() {
    this.getAllUsers();
    this.getAllProjects();
  },  
  methods: {
    getAllUsers: function() {
      let apiGetUserUrl = apiUrl + '/GetAllUser';
      axios.get(apiGetUserUrl)
      .then(response => {
        this.dataUsers = response.data.data.map(item => (Object.assign({}, item, { fullname: item.fisrtName + ' ' + item.lastname })));
        this.options = [...this.dataUsers.map(item => (Object.assign({}, {'id': item.id}, { 'value': item.fullname })))];
        console.log("option: ",this.options);
        console.log(this.dataUsers);
      })
      .catch(error => {
        console.error(error);
      });
    },
    formatDate: function(date) {
      let h = date.getHours();
      let i = date.getMinutes();
      let s = date.getSeconds();
      let dd = date.getDate()+1;
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      return `${h}:${i}:${s} ${dd}-${mm}-${yyyy}`;
    },
    filterProjects: function() {
      let apiGetProjectUrl = apiUrl + '/GetAllProject';

      const filteredFields = {};
      Object.entries(this.filters).forEach(([key, value]) => {
        if (value != null) {
          filteredFields[key] = value;
        }
      });

      if(Object.keys(filteredFields).length > 0) {
        const queryString = Object.keys(filteredFields).map(key => `${key}=${filteredFields[key]}`).join('&');
        apiGetProjectUrl = `${apiGetProjectUrl}?${queryString}`;
        console.log(apiGetProjectUrl);
      }
      
      axios.get(apiGetProjectUrl)
      .then(response => {
        this.dataProjects = response.data.data.map(item => (
          Object.assign({}, 
                        { createTime: this.formatDate(item.createTime) },  
                        item)
        ));
      })
      .catch(error => {
        console.error(error);
      });

    },
    getAllProjects: function() {
      let apiGetProjectUrl = apiUrl + '/GetAllProject';
      axios.get(apiGetProjectUrl)
      .then(response => {
        // this.dataProjects = response.data.data.map(item => (
        //   Object.assign({}, 
        //                 item,
        //                 { createTime: this.formatDate(new Date(`${item.createTime}`)) }
        //                 )
        // ));
        this.dataProjects = response.data.data;
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
      const apiDeleteProjectUrl = `${apiUrl}/DeleteRangeProject`;
      axios.post(apiDeleteProjectUrl,this.deleteIds)
          .then(response => {
            this.showSnackbar("Xóa thành công", "success")
            
            console.log(response);
            this.getAllProjects();
          })
          .catch(error => {
            console.log(error);
          })
      this.showConfirmDialog = false;
    },
   
    handleDataProject: function(dataProject) {
      const now = new Date();
      dataProject.updateTime = now.toISOString();
      dataProject.isLate = false;
      dataProject.statusId = 1;
   },
    submitFormCreate: function() {
      this.handleDataProject(this.dataProject);
      const now = new Date();
      this.dataProject.createTime = now.toISOString();
      this.dataProject.dateTime = now.toISOString();

      const apiAddProjectUrl = `${apiUrl}/AddProject`;
      axios.post(apiAddProjectUrl, this.dataProject)
          .then(response => {
            this.showSnackbar("Thêm dự án thành công", "success")
            this.dialogFormCreate = false;
            this.getAllProjects();

            console.log(response);
          })
          .catch(error => {
            // this.showSnackbar("Thêm dự án thất bại", "error")
            console.log("error: ",error);
          })
    },

    updateProject: function(project) {
      let keyDataProject = Object.keys(this.dataProjectUpdate);
      Object.entries(project).forEach(([key, value]) => {
        if (keyDataProject.includes(key)) {
          this.dataProjectUpdate[key] = value;
        }
        });
      this.dialogFormUpdate = true;
      console.log(this.dataProjectUpdate);
    },
  
    submitFormUpdate: function() {
      this.handleDataProject(this.dataProjectUpdate);
      console.log(this.dataProjectUpdate);
      const apiAddProjectUrl = `${apiUrl}/updateProjectAsync/${this.dataProjectUpdate.id}`;
      axios.put(apiAddProjectUrl, this.dataProjectUpdate)
          .then(response => {
            this.showSnackbar("Cập nhật dự án thành công", "success")
            this.dialogFormUpdate = false;
            this.getAllProjects();
            console.log(response);
          })
          .catch(error => {
            // this.showSnackbar("Cập nhật người dùng thất bại", "error")
            console.log("error: ",error);
          })
    },
    submitForm: function() {
      this.filterProjects();
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
