<template>
  <div class="mx-6">
    <v-card class="mt-6">
      <v-container>
        <v-row class="my-3" >
          <v-col cols="12" md="12">
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field background-color="white" small dense hide-details="true" v-model="projectFilters.projectName"  outlined label="Tên project"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    small dense hide-details="true"
                    v-model="projectFilters.poId"
                    :items="optionUsers"
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
                <v-col cols="12" md="3">
                  <v-select v-model="projectFilters.pmId"
                  :items="optionUsers"
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
                
                <v-col cols="12" md="3">
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
      :items="projects" item-key="id" 
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
            <v-icon @click="updateDataProject(item)"> mdi-pencil </v-icon>
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
                    <v-text-field v-model="project.projectName" label="Tên dự án" required> </v-text-field>
                  </v-col>
                  <v-col  cols="12" sm="6" md="6" >
                    <v-text-field v-model="project.estimateDay" label="Thời gian ước tính (ngày)" required> </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="optionUsers"  
                      item-text="value"
                      item-value="id"
                      label="Người quản lý"
                      v-model="project.pmId" 
                      required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="optionUsers"  
                      item-text="value"
                      item-value="id"
                      label="Chủ dự án"
                      v-model="project.poId" 
                      required></v-select>
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
              <v-card-title>Thông tin dự án</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field v-model="project.projectName" required label="Tên dự án"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field v-model="project.estimateDay" required label="Thời gian ước tính(ngày)"></v-text-field>
                    </v-col>

                     <v-col cols="12" md="6" sm="6">
                      <v-select
                        :items="optionUsers"
                        item-value="id"
                        item-text="value"
                        label="Người quản lý"
                        v-model="project.pmId" 
                        required
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-select
                        :items="optionUsers"
                        item-value="id"
                        item-text="value"
                        label="Chủ dự án"
                        v-model="project.poId" 
                        required
                      >
                      </v-select>
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ListUserView',
  computed: {
    ...mapGetters(['projectFilters', 'project', 'projects', 'optionUsers', 'addStatus', 'updateStatus', 'deleteStatus']),
  },
  data() {
    return {
      selected: [],
      showConfirmDialog: false,
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
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      snackbarTimeout: 5000,
    };
  },
  created() {
    this.getOptionUsers();
    this.getProjects();
  },  
  methods: {
    ...mapActions(['getProjects', 'getOptionUsers', 'addProject', 'updateProject', 'deleteProjects']),
  
    formatDate: function(date) {
      let h = date.getHours();
      let i = date.getMinutes();
      let s = date.getSeconds();
      let dd = date.getDate()+1;
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      return `${h}:${i}:${s} ${dd}-${mm}-${yyyy}`;
    },
    
    confirmDelete: function(id) {
      this.showConfirmDialog = true;
      this.deleteIds = [id];
    },
    confirmDeleteSelected: function() {
      this.showConfirmDialog = true;
      this.deleteIds = this.selected.map(item => item.id);
    },
    deleteItem: async function() {
      await this.deleteProjects(this.deleteIds);

      if (this.deleteStatus) {
        this.getProjects();
        this.showConfirmDialog = false;
        this.showSnackbar("Xóa thành công", "success");
      } else {
        this.showSnackbar("Xóa thất bại", "error");
      }
     
    },
   
    handleDataProject: function(dataProject) {
      const now = new Date();
      dataProject.updateTime = now.toISOString();
      dataProject.isLate = false;
      dataProject.statusId = 1;
   },
    submitFormCreate: async function() {
      this.handleDataProject(this.project);
      const now = new Date();
      this.project.createTime = now.toISOString();
      this.project.dateTime = now.toISOString();

      await this.addProject(this.project);
      console.log('sau: ',this.addStatus);
      if(this.addStatus) {
        this.showSnackbar("Thêm thành công", "success")
        this.dialogFormCreate = false;
        this.getProjects();
        this.resetProject();
      }else {
        this.showSnackbar("Thêm thất bại", "error");
      }
    },

    updateDataProject: function(project) {
      let keyDataProject = Object.keys(this.project);
      Object.entries(project).forEach(([key, value]) => {
        if (keyDataProject.includes(key)) {
          this.project[key] = value;
        }
        });
      this.project.id = project.id;
      this.dialogFormUpdate = true;
      console.log(this.project);
    },
  
    submitFormUpdate: async function() {
      this.updateDataProject(this.project);
      await this.updateProject(this.project);
      console.log('sau: ',this.updateStatus);

      if(this.updateStatus) {
        this.showSnackbar("Cập nhật thành công", "success")
        this.dialogFormUpdate = false;
        this.getProjects();
        this.resetProject();
      }else {
        this.showSnackbar("Cập nhật thất bại", "error");
      }
    },
    submitForm: function() {
      this.getProjects(this.projectFilters);
    },
    resetProject: function() {
      Object.entries(this.project).forEach(([key]) => {
        this.project[key] = null;
      });
      delete this.project.id
    },
    showSnackbar(msg, color) {
      this.snackbarMessage = msg;
      this.snackbarColor = color; 
      this.snackbar = true; 
    },
    closeUpdateDialog: function() {
      this.dialogFormUpdate = false;
      this.resetProject();
    },
    closeAddDialog: function() {
      this.dialogFormCreate = false;
      this.resetProject()
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
