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
import Swal from "sweetalert2";

export default {
  data() {
    return {
      isSignin: authHeader().Authorization ? true : false,
      userId: "",
    }
  },
  methods: {},
  async created() {
    if (this.isSignin) {
      try {
        const token = JSON.parse(localStorage.getItem("userData")).access_token;
        if (token) {
          const tokenDecoded = jwtDecode(token);
          this.userId = tokenDecoded.user_id;
          let timerInterval = null;
          Swal.fire({
              title: "Sign Out",
              type: 'warning',
              html: `<p>Good bye ${this.userId}</p><p>Sigining Out in <b></b> ms</p>`,
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
          }).then(() => {
            localStorage.removeItem("userData");
            this.$router.push('/')
          })
        }
      } catch (error) {
        console.log(error);
        if (localStorage.getItem("userData")) {
          localStorage.removeItem("userData");
          this.$router.push("/");
        }
      }
    } else {
        this.$router.push("/");
    }
  }
}
</script>
<style scoped>
body, html {
    height: 100%;
}
</style>
