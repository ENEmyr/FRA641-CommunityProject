<template>
  <div class="container-fluid bg">
    <div class="row justify-content-center">
      <div class="text-center p-3 fs-1 text-white bg-dark">
        Project for Community
      </div>
      <div class="col-3"></div>
      <div class="col-4 pb-3">
        <router-view />
      </div>
      <div class="col-3"></div>
    </div>
    <footer class="bg-dark text-center text-white">
      <!-- Grid container -->
      <div class="container p-4 pb-0">
        <!-- Section: Social media -->
        <section class="mb-4">
          <!-- Github -->
          <a class="btn btn-outline-light btn-floating m-1" href="https://github.com/Untesler/FRA641-CommunityProject" role="button" ><i class="fab fa-github"></i></a>
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
export default {
  name: "app",
  components: {
    /* Home */
  },
  data() {
    return {};
  },
  created() {
      document.title = "FRA641 - Project for Community";
  }
};
</script>

<style scoped>
body, html {
    height: 100%;
}
.bg {
  background-image: url('https://siamrath.co.th/files/styles/750/public/img/20200502/650c6304ec09443e4efcd933036ef650f468334d18795b1e07c389e71e062109.jpg');
  height: 100%;
  /* filter: blur(8px); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-text {
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
}
</style>
