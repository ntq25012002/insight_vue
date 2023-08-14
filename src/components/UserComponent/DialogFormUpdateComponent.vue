<template>
    <v-row justify="center">
      <v-dialog v-model="show" persistent max-width="1024">
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
            <v-btn color="primary" variant="text" @click="sentDataToParent">
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

<script>
import { mapGetters } from 'vuex'

export default {
    name: "DialogFormUpdateComponent",
    props: {
        dialogFormUpdate: Boolean
    },
    data() {
        return {
            show: this.dialogFormUpdate,
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    method: {
        sentDataToParent() {
            this.$emit('close-update-dialog-from-child', !this.show)
        }
    }
}


</script>