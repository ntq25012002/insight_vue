<template>
  <div class="mx-6">
    <v-card class="mt-6">
      <v-container>
        <v-row class="my-3" >
          <v-col cols="12" md="12">
            <v-form @submit.prevent="submitForm">
              <v-row>
            
                <v-col cols="4">
                  <v-select
                    small dense hide-details="true"
                    v-model="filters.userId"
                    :items="options"
                    item-text="value"
                    item-value="id"
                    label="Chọn user"
                    outlined
                    background-color="white"
                    ></v-select>
  
                </v-col>
                <v-col cols="4">
                  <v-select
                    small dense hide-details="true"
                    v-model="filters.workShiftId"
                    :items="workShiftOptions"
                    item-text="value"
                    item-value="id"
                    label="Chọn ca"
                    outlined
                    background-color="white"
                    ></v-select>
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
      :items="dataAttendances" item-key="id" 
      :items-per-page-options="[5, 10, 20, -1]"
      show-select 
      v-model="selected"
      class="elevation-1">

        <template v-slot:[`item.actions`]="{ item }">
          <td>
            <v-icon @click="updateAttendance(item)"> mdi-pencil </v-icon>
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
              <span class="text-h5">Attendance</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select :items="options"  
                      item-text="value"
                      item-value="id"
                      label="User"
                      v-model="dataAttendance.userId" 
                      required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="workShiftOptions"  
                      item-text="value"
                      item-value="id"
                      label="Work Shift"
                      v-model="dataAttendance.workShiftId" 
                      required></v-select>
                  </v-col>
                  <!-- <v-col cols="12" sm="6">
                    <template>
                      <div>
                        <v-menu offset-y>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-calendar</v-icon>
                          </template>
                          <v-date-picker v-model="selectedDate" />
                        </v-menu>
                      </div>
                    </template>
                  </v-col> -->

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
                    <v-col cols="12" sm="6">
                      <v-select :items="options"  
                        item-text="value"
                        item-value="id"
                        label="User"
                        v-model="dataAttendanceUpdate.userId" 
                        required></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select :items="workShiftOptions"  
                        item-text="value"
                        item-value="id"
                        label="Work Shift"
                        v-model="dataAttendanceUpdate.workShiftId" 
                        required></v-select>
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
        userId: null,
        workShiftId: null,
        contractId: null,
      },
      options: [],
      workShiftOptions: [
        { "id": 1, "value": "sbc" },
        { "id": 2, "value": "ccba" }
      ],
      contractOptions: [2,7],
      selected: [],
      selectAll: false,
      showConfirmDialog: false,
      deleteId: '',
      selectedDate: null,
      deleteIds: [],
      dialogFormUpdate: false,
      dialogFormCreate: false,
      headers: [
        { text: 'User Id', value: 'userId', key: 'userId' },
        { text: 'Contract Id', value: 'contractId', key: 'contractId' },
        { text: 'Work Shift Id', value: 'workShiftId', key: 'workShiftId' },
        { text: 'IsOverTime', value: 'isOverTime', key: 'IsOverTime', align: "center" },
        { text: 'Enter Time', value: 'enterTime', key: 'enterTime' },
        { text: 'Out Time', value: 'outTime', key: 'createTime' },
        { text: 'Attendance Status', value: 'attendanceStatus', key: 'attendanceStatus' },
        { text: 'Actions', value: 'actions', key: 'actions', sortable: false },
      ],
      dataAttendances: [],
      dataAttendance:  {
        "userId": null,
        "contractId": null,
        "workShiftId": 1,
        "totalWorkMinute": null,
        "isOverTime": null,
        "enterTime": null,
        "outTime": null,
        "typeAttendance": null,
        "attendanceStatus": null,
      },
      dataAttendanceUpdate:  {
        "id": null,
        "userId": null,
        "contractId": null,
        "workShiftId": 1,
        "totalWorkMinute": null,
        "isOverTime": null,
        "enterTime": null,
        "outTime": null,
        "typeAttendance": null,
        "attendanceStatus": null,
      },
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      snackbarTimeout: 5000,
    };
  },
  created() {
    this.getAllUsers();
    this.getAllAttendances();
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
    filterAttendances: function() {
      let apiGetAttendanceUrl = apiUrl + '/GetAllAttendance';

      const filteredFields = {};
      Object.entries(this.filters).forEach(([key, value]) => {
        if (value != null) {
          filteredFields[key] = value;
        }
      });

      if(Object.keys(filteredFields).length > 0) {
        const queryString = Object.keys(filteredFields).map(key => `${key}=${filteredFields[key]}`).join('&');
        apiGetAttendanceUrl = `${apiGetAttendanceUrl}?${queryString}`;
        console.log(apiGetAttendanceUrl);
      }
      
      axios.get(apiGetAttendanceUrl)
      .then(response => {
        this.dataAttendances = response.data.data;
      })
      .catch(error => {
        console.error(error);
      });

    },
    getAllAttendances: function() {
      let apiGetAttendanceUrl = apiUrl + '/GetAllAttendance';
      axios.get(apiGetAttendanceUrl)
      .then(response => {
        this.dataAttendances = response.data.data;
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
      const apiDeleteAttendanceUrl = `${apiUrl}/DeleteRangeAttendance`;
      axios.post(apiDeleteAttendanceUrl,this.deleteIds)
          .then(response => {
            console.log(response);
            this.showSnackbar("Xóa thành công", "success")
            this.getAllAttendances();
          })
          .catch(error => {
            console.log(error);
          })
      this.showConfirmDialog = false;
    },
   
    handleDataAttendance: function(dataAttendance) {
      const now = new Date();
    
      dataAttendance.outTime = now.toISOString();
      dataAttendance.isOverTime = false;
      dataAttendance.attendanceStatus = 1;
      dataAttendance.typeAttendance = 2;
   },
    submitFormCreate: function() {
      this.handleDataAttendance(this.dataAttendance);
      const now = new Date();
      this.dataAttendance.enterTime = now.toISOString();
      const totalWorkMinuteArr = [30,40,45,50,60,90,100,110,75,70]
      const randomContract = this.contractOptions[Math.floor(Math.random() * this.contractOptions.length)];
      this.dataAttendance.totalWorkMinute = totalWorkMinuteArr[[Math.floor(Math.random() * this.contractOptions.length)]];
      this.dataAttendance.contractId = randomContract;

      const apiAddAttendanceUrl = `${apiUrl}/AddAttendance`;
      axios.post(apiAddAttendanceUrl, this.dataAttendance)
          .then(response => {
            this.showSnackbar("Thêm attendance thành công", "success")
            this.dialogFormCreate = false;
            this.getAllAttendances();
            console.log(response);
          })
          .catch(error => {
            // this.showSnackbar("Thêm dự án thất bại", "error")
            console.log("error: ",error);
          })
    },

    updateAttendance: function(Attendance) {
      let keyDataAttendance = Object.keys(this.dataAttendanceUpdate);
      Object.entries(Attendance).forEach(([key, value]) => {
          if (keyDataAttendance.includes(key)) {
            this.dataAttendanceUpdate[key] = value;
          }
        });
      this.dialogFormUpdate = true;
      console.log(this.dataAttendanceUpdate);
    },
  
    submitFormUpdate: function() {
      this.handleDataAttendance(this.dataAttendanceUpdate);
      console.log(this.dataAttendanceUpdate);
      const apiAddAttendanceUrl = `${apiUrl}/updateAttendanceAsync/${this.dataAttendanceUpdate.id}`;
      axios.put(apiAddAttendanceUrl, this.dataAttendanceUpdate)
          .then(response => {
            this.showSnackbar("Cập nhật attendance thành công", "success")
            this.dialogFormUpdate = false;
            this.getAllAttendances();
            console.log(response);
          })
          .catch(error => {
            // this.showSnackbar("Cập nhật người dùng thất bại", "error")
            console.log("error: ",error);
          })
    },
    submitForm: function() {
      this.filterAttendances();
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
