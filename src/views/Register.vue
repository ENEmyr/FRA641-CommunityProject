<template>
  <div>
    <div class="d-grid gap-2">
      <img class="bg-img" src="https://siamrath.co.th/files/styles/750/public/img/20200502/650c6304ec09443e4efcd933036ef650f468334d18795b1e07c389e71e062109.jpg" alt="">
    </div>
  </div>
</template>
<script>
import authHeader from "../__helpers/auth-header"
import jwtDecode from "jwt-decode"
import validator from "validator"
import axios from "axios"
import Swal from "sweetalert2";
import { configs } from '../__helpers/configs.js'

export default {
  data() {
    return {
      isSignin: authHeader().Authorization ? true : false,
    }
  },
  async created() {
    if (this.isSignin) {
      console.log(JSON.parse(localStorage.getItem('userData')))
      try {
        const token = JSON.parse(localStorage.getItem("userData")).access_token;
        if (token) {
          const tokenDecoded = jwtDecode(token);
          const userId = tokenDecoded.user_id;
          let timerInterval = null;
          Swal.fire({
              title: "You are already signed-in",
              type: 'info',
              html: `<p>Hello User ID: ${userId}</p><p>Back to Home Page in <b></b> ms</p>`,
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b');
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                  }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval);
              }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer)
              this.$router.push('/')
          })
        }
      } catch (error) {
        console.log(error);
        if (localStorage.getItem("userData")) {
          localStorage.removeItem("userData");
          this.$router.go();
        }
      }
    } else {
      let _email = "",
           _pass = "";
      Swal.fire({
        title: 'Registration',
        html: `<input type="email" id="email" class="swal2-input" placeholder="Email">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
        <input type="text" id="first_name" class="swal2-input" placeholder="First Name">
        <input type="text" id="last_name" class="swal2-input" placeholder="Last Name">
        `,
        confirmButtonText: 'Submit',
        type: 'info',
        focusConfirm: true,
        closeOnConfirm: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        preConfirm: () => {
          const email = Swal.getPopup().querySelector('#email').value,
                password = Swal.getPopup().querySelector('#password').value,
                first_name = Swal.getPopup().querySelector('#first_name').value,
                last_name = Swal.getPopup().querySelector('#last_name').value
          if (!email || !password || !first_name || !last_name || !validator.isEmail(email)) {
            Swal.showValidationMessage(`Please fill all of information!`)
          }
          return { email: email, password: password, first_name: first_name, last_name: last_name }
        }
      }).then(async (result) => {
        try {
          _email = result.value.email;
          _pass = result.value.password;
          const res = await axios.request({
            method: configs.backend.register.method,
            url: configs.backend.register.requestUrl,
            data: {
              email: result.value.email,
              password: result.value.password,
              first_name: result.value.first_name,
              last_name: result.value.last_name,
              role: false
            }
          })
          if (res.status === 201) {
            let timerInterval = null;
            Swal.fire({
              title: 'Registration completed!',
              type: 'success',
              html: `<p>Welcome ${result.value.first_name} ${result.value.last_name}</p><p>Back to Home Page in <b></b> ms</p>`,
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b');
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                  }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval);
              }
            }).then(async (result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                const res = await axios.request({
                  method: configs.backend.signin.method,
                  url: configs.backend.signin.requestUrl,
                  data: {
                    email: _email,
                    password: _pass
                  }
                })
                if (res.status === 200) {
                  localStorage.setItem('userData', JSON.stringify(res.data));
                } 
                this.$router.push('/')
              }
            })
          }
        } catch (error) {
            let timerInterval = null;
            Swal.fire({
                title: 'Error!',
                type: 'error',
                html: `<p>Message: ${error}</p><p>Refresh Page in <b></b> ms</p>`,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b');
                    timerInterval = setInterval(() => {
                      b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                  clearInterval(timerInterval);
                }
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer)
                this.$router.go();
            })
        }
      })
    }
  }
}
</script>
<style scoped>
body, html {
    height: 100%;
}
</style>
