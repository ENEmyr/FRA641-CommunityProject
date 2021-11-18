<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <img :src="img" alt="Project Image">
          <div class="card-body">
            <h5 class="card-title text-center">{{title}}</h5>
            <p class="card-text">{{body}}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li v-for="i in members.length" :key="i" class="list-group-item text-center">{{members[i-1]}}</li>
          </ul>
          <div class="card-body d-grid gap-2">
            <button v-for="i in buttons.length" :key="i" class="btn btn-outline-info" v-on:click="goPlayGame(buttons[i-1].url, buttons[i-1].requireAuth)">{{buttons[i-1].title}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import authHeader from "../__helpers/auth-header"
import Swal from "sweetalert2";
import axios from "axios"
import validator from "validator"
import { configs } from "../__helpers/configs"
export default {
  name: "projectCard",
  data(){
    return {
      isSignin: authHeader().Authorization ? true : false,
    }
  },
  props: {
      title: {
          type: String,
          required: true
      },
      body: {
          type: String,
          required: true
      },
      img: {
          type: String,
          required: true
      },
      members: {
          type: Array, // array of string
          required: true
      },
      buttons: {
          type: Array, // array of objects
          required: true
      }
  },
  methods: {
    goto_page(page) {
        this.$router.push(page);
    },
    goPlayGame(page, requireAuth = true) {
      if (!requireAuth)
        this.goto_page(page)
      else {
        if (this.isSignin) {
            this.goto_page(page)
        } else {
            Swal.fire({
              title: 'Please Sign-in before play',
              html: `<input type="email" id="email" class="swal2-input" placeholder="Email">
              <input type="password" id="password" class="swal2-input" placeholder="Password">`,
              type: 'info',
              confirmButtonText: 'Sign in',
              focusConfirm: true,
              showCloseButton: true,
              closeOnConfirm: true,
              allowOutsideClick: false,
              allowEscapeKey: true,
              footer: `<a href='register'> Don't have an account?, register now!</a>`,
              preConfirm: () => {
                const email = Swal.getPopup().querySelector('#email').value
                const password = Swal.getPopup().querySelector('#password').value
                if (!email || !password || !validator.isEmail(email)) {
                  Swal.showValidationMessage(`Please enter email and password`)
                }
                return { email: email, password: password }
              }
            }).then(async (result) => {
              let timerInterval = null;
              const res = await axios.request({
                method: configs.backend.signin.method,
                url: configs.backend.signin.requestUrl,
                data: {
                  email: result.value.email,
                  password: result.value.password
                }
              })
              if (res.status === 200) {
                  localStorage.setItem('userData', JSON.stringify(res.data));
                  Swal.fire({
                    title: `Welcome back ${result.value.email}`,
                    text: 'Have a fun :D',
                    type: 'success',
                    timer: 1000,
                    didOpen: () => { timerInterval = setInterval(() => {}, 100); },
                    willClose: () => { clearInterval(timerInterval); }
                  })
                  .then(() => {
                    // if (result.dismiss === Swal.DismissReason.timer) this.goto_page(page);
                    this.goto_page(page);
                  });
              } else if (res.status === 401 || res.status === 422) {
                  Swal.fire({
                    title: `Authentication Failed`,
                    text: 'Invalid email or password', 
                    type: 'warning',
                    timer: 1000,
                    didOpen: () => { timerInterval = setInterval(() => {}, 100); },
                    willClose: () => { clearInterval(timerInterval); }
                  })
              } else {
                Swal.fire({
                  title: `Error`, 
                  text: 'Internal Server Error', 
                  type: 'error',
                  timer: 1000,
                  didOpen: () => { timerInterval = setInterval(() => {}, 100); },
                  willClose: () => { clearInterval(timerInterval); }
                })
              }
            })
        }
      }
    },
  }
}
</script>
