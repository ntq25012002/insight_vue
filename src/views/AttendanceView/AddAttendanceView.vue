<template>
    <v-container>
      <v-form @submit.prevent="submitForm" ref="form">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="name" label="Name" :rules="nameRules"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="age" label="Age" :rules="ageRules"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="age" label="Age" :rules="ageRules"></v-text-field>
          </v-col>
         
        </v-row>
        <v-btn type="submit" color="primary">Submit</v-btn>
      </v-form>
  
      <!-- Hiển thị thông báo lỗi -->
      <v-alert v-if="formErrors.length > 0" type="error">
        <ul>
          <li v-for="error in formErrors" :key="error">{{ error }}</li>
        </ul>
      </v-alert>
  
      <!-- Hiển thị thông tin đã nhập -->
      <v-data-table v-if="submittedData.length > 0" :headers="headers" :items="submittedData" class="mt-4"></v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "AddAttendanceView",
    data() {
      return {
        name: '',
        email: '',
        age: '',
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Age', value: 'age' },
        ],
        submittedData: [],
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        ],
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        ageRules: [
          v => !!v || 'Age is required',
          v => (v && /^\d+$/.test(v)) || 'Age must be a number',
        ],
        formErrors: [],
      };
    },
    methods: {
      submitForm() {
        this.formErrors = [];
  
        // Kiểm tra validate trước khi submit form
        if (!this.$refs.form.validate()) {
          this.formErrors.push('Please fix the errors in the form.');
          return;
        }
  
        // Khi form được gửi đi, thêm thông tin vào submittedData
        this.submittedData.push({ name: this.name, email: this.email, age: this.age });
  
        // Xóa các trường nhập liệu sau khi submit
        this.name = '';
        this.email = '';
        this.age = '';
      },
    },
  };
  </script>
  