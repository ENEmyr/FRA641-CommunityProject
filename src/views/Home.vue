<template>
  <div>
    <div class="d-grid gap-2">
      <button class="btn btn-outline-info" type="button" v-on:click="goPlayGame('roboticarm')">Go to Robotics Arm Game</button>
      <button class="btn btn-outline-info" type="button" v-on:click="goPlayGame('game2')">Go to game 2</button>
      <button class="btn btn-outline-info" type="button" v-on:click="goPlayGame('game3')">Go to game 3</button>
      <button class="btn btn-outline-info" type="button" v-on:click="goPlayGame('game4')">Go to game 4</button>
    </div>
  </div>
</template>
<script>
import authHeader from "../__helpers/auth-header"
import jwtDecode from "jwt-decode"
/* import axios from "axios" */
import Swal from "sweetalert2";

export default {
  data() {
    return {
      isSignin: authHeader().Authorization ? true : false,
      name: "",
    }
  },
  methods: {
    goto_page(page) {
        this.$router.push(page);
    },
    goPlayGame(page) {
      if (this.isSignin) {
          this.goto_page(page)
      } else {
          Swal.fire({
            title: 'Please Sign-in before play',
            html: `<input type="text" id="email" class="swal2-input" placeholder="Email">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Sign in',
            focusConfirm: true,
            showCloseButton: true,
            closeOnConfirm: true,
            allowOutsideClick: false,
            allowEscapeKey: true,
            footer: `<a href> Don't have an account?, register now!</a>`,
            preConfirm: () => {
              const email = Swal.getPopup().querySelector('#email').value
              const password = Swal.getPopup().querySelector('#password').value
              if (!email || !password) {
                Swal.showValidationMessage(`Please enter email and password`)
              }
              return { email: email, password: password }
            }
          }).then((result) => {
            if (result.value.email === '' || result.value.password === '')
              location.href = 'https://blocklyfra641.dogmatism.me/'
            else Swal.fire(`Welcome ${result.value.email}`, 'Have a fun :D', 'success')
          })
      }
    },
    register() {
      Swal.fire('Test')
    }
  },
  async created() {
      try {
        const token = JSON.parse(localStorage.getItem("userData")).token;
        if (token) {
          const tokenDecoded = jwtDecode(token);
          const firstName = tokenDecoded.first_name;
          const lastName = tokenDecoded.last_name;
          this.name = `${firstName} ${lastName}`
        }
      } catch (error) {
        console.log(error);
        if (localStorage.getItem("userData")) {
          localStorage.removeItem("userData");
          this.$router.push("/");
        }
      }
    }

}
</script>
