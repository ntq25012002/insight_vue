<template>
  <div class="mx-6">
    <v-card class="mt-6">
      <v-container>
        <v-row class="my-3" >
          <v-col cols="12" md="12">
            <v-form @submit.prevent="submitForm">
              <v-row>
            
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    small dense hide-details="true"
                    v-model="attendanceFilters.userId"
                    :items="optionUsers"
                    item-text="value"
                    item-value="id"
                    label="Chọn user"
                    outlined
                    background-color="white"
                    ></v-select>
  
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    small dense hide-details="true"
                    v-model="attendanceFilters.workShiftId"
                    :items="workShiftOptions"
                    item-text="value"
                    item-value="id"
                    label="Chọn ca"
                    outlined
                    background-color="white"
                    ></v-select>
                </v-col>
               
                <v-col cols="12" sm="12" md="4">
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
      :items="attendances" item-key="id" 
      :items-per-page-options="[5, 10, 20, -1]"
      show-select 
      v-model="selected"
      class="elevation-1">

        <template v-slot:[`item.actions`]="{ item }">
          <td>
            <v-icon @click="updateDataAttendance(item)"> mdi-pencil </v-icon>
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
                    <v-select :items="optionUsers"  
                      item-text="value"
                      item-value="id"
                      label="User"
                      v-model="attendance.userId" 
                      required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items="workShiftOptions"  
                      item-text="value"
                      item-value="id"
                      label="Work Shift"
                      v-model="attendance.workShiftId" 
                      required></v-select>
                  </v-col>
                  <!-- <v-col cols="12" sm="6">
                    <template>
                      <div>
                        <v-text-field
                          v-model="selectedDateTime"
                          :value="selectedDateTime"
                          label="Date and Time"
                          readonly
                          append-icon="event"
                          @click:append="showPicker = !showPicker"
                        ></v-text-field>
                        <v-menu v-model="showPicker" :close-on-content-click="false" offset-y>
                          <v-date-picker
                            v-model="selectedDate"
                            no-title
                            scrollable
                          ></v-date-picker>
                          <v-time-picker v-model="selectedTime"></v-time-picker>
                        </v-menu>
                      </div>
                    </template>
                   
                  </v-col> -->

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
                    <v-col cols="12" sm="6">
                      <v-select :items="optionUsers"  
                        item-text="value"
                        item-value="id"
                        label="User"
                        v-model="attendance.userId" 
                        required></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select :items="workShiftOptions"  
                        item-text="value"
                        item-value="id"
                        label="Work Shift"
                        v-model="attendance.workShiftId" 
                        required></v-select>
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ListUserView',
  computed: {
    // selectedDateTime: {
    //   get() {
    //     return `${this.selectedDate}T${this.selectedTime}`;
    //   },
    //   set(value) {
    //     const [date, time] = value.split('T');
    //     this.selectedDate = date;
    //     this.selectedTime = time;
    //   },
    // },
    ...mapGetters(['attendanceFilters', 'attendance', 'attendances', 'optionUsers', 'addStatus', 'updateStatus', 'deleteStatus'] )
  },
  data() {
    return {
      workShiftOptions: [
        { "id": 1, "value": "sbc" },
        { "id": 2, "value": "ccba" }
      ],
      contractOptions: [2,7],
      selected: [],
      selectAll: false,
      showConfirmDialog: false,
      // selectedDate: null,
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
      // selectedDate: new Date().toISOString().substr(0, 10),
      // selectedTime: '00:00',
      // showPicker: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      snackbarTimeout: 5000,
    };
  },
  created() {
    this.getOptionUsers();
    this.getAttendances();
  },  
  methods: {
    ...mapActions(['getAttendances', 'addAttendance', 'updateAttendance','deleteAttendances','getOptionUsers']),
   
    confirmDelete: function(id) {
      this.showConfirmDialog = true;
      this.deleteIds = [id];
    },
    confirmDeleteSelected: function() {
      this.showConfirmDialog = true;
      this.deleteIds = this.selected.map(item => item.id);
    },
    deleteItem: async function() {
      await this.deleteAttendances(this.deleteIds);

      if (this.deleteStatus) {
        this.getAttendances();

        this.showConfirmDialog = false;
        this.showSnackbar("Xóa thành công", "success");
      } else {
        this.showSnackbar("Xóa thất bại", "error");
      }
     
    },
   
    handleDataAttendance: function(dataAttendance) {
      const now = new Date();
    
      dataAttendance.outTime = now.toISOString();
      dataAttendance.isOverTime = false;
      dataAttendance.attendanceStatus = 1;
      dataAttendance.typeAttendance = 2;
   },
    submitFormCreate: async function() {
      this.handleDataAttendance(this.attendance);
      const now = new Date();
      this.attendance.enterTime = now.toISOString();
      const totalWorkMinuteArr = [30,40,45,50,60,90,100,110,75,70]
      const randomContract = this.contractOptions[Math.floor(Math.random() * this.contractOptions.length)];
      this.attendance.totalWorkMinute = totalWorkMinuteArr[[Math.floor(Math.random() * this.contractOptions.length)]];
      this.attendance.contractId = randomContract;

      console.log(this.attendance);
      
      await this.addAttendance(this.attendance);
      console.log('sau: ',this.addStatus);

      if(this.addStatus) {
        this.showSnackbar("Thêm thành công", "success")
        this.dialogFormCreate = false;
        this.getAttendances();
        this.resetAttendance();
      }else {
        this.showSnackbar("Thêm thất bại", "error");
      }

    },

    updateDataAttendance: function(attendance) {
      let keyDataAttendance = Object.keys(this.attendance);
      Object.entries(attendance).forEach(([key, value]) => {
        if (keyDataAttendance.includes(key)) {
          this.attendance[key] = value;
        }
      });
      
      this.attendance.id = attendance.id 
      this.dialogFormUpdate = true;
      console.log(this.attendance);
    },
  
    submitFormUpdate: async function() {

      await this.updateAttendance(this.attendance);
      console.log('sau: ',this.updateStatus);

      if(this.updateStatus) {
        this.showSnackbar("Cập nhật thành công", "success")
        this.dialogFormUpdate = false;
        this.getAttendances();
        this.resetAttendance();
      }else {
        this.showSnackbar("Cập nhật thất bại", "error");
      }

    },
    submitForm: function() {
      this.getAttendances(this.attendanceFilters);
    },
    resetAttendance: function() {
      Object.entries(this.attendance).forEach(([key]) => {
        this.attendance[key] = null;
      });
      delete this.attendance.id
    },
    showSnackbar(msg, color) {
      this.snackbarMessage = msg;
      this.snackbarColor = color; 
      this.snackbar = true; 
    },
    closeUpdateDialog: function() {
      this.dialogFormUpdate = false;
      this.resetAttendance();
    },
    closeAddDialog: function() {
      this.dialogFormCreate = false;
      this.resetAttendance()
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
