<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <router-view />
      </div>
    </div>
    <footer class="bg-dark text-center text-white">
      <!-- Grid container -->
      <div class="container p-4 pb-0">
        <!-- Section: Social media -->
        <section class="mb-4">
          <!-- Github -->
          <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i class="fab fa-github"></i
          ></a>
        </section>
        <!-- Section: Social media -->
      </div>
      <!-- Grid container -->
      <!-- Copyright -->
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2021 Copyright:
        <a class="text-white" href="https://dogmatism.me/">ENEmy</a>
      </div>
      <!-- Copyright -->
    </footer>
  </div>
</template>

<script>
/* import axios from "axios"; */
/* import Swal from "sweetalert2"; */
/* import Home from "./views/Home.vue"; */

export default {
  name: "app",
  components: {
    /* Home */
  },
  data() {
    return { };
  },
  created() {
      document.title = "FRA641 - Project for Community";
    }
};
</script>

<style scoped>
</style>
