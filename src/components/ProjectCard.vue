<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <img :src="img" alt="Project Image">
          <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">{{body}}</p>
          </div>
          <ul class="list-group list-group-flush">
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "projectCard",
  data(){
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
  }
}
</script>
<style scoped>
</style>
