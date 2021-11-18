<template>
  <div id="app">
    <BlocklyComponent id="blockly" :options="options" ref="foo"></BlocklyComponent>
    <p id="submitBtn" class="d-grid gap-2">
      <button
        v-if="isSignin"
        v-on:click="submitCode()"
        class="btn btn-outline-success"
        type="button"
      >Submit</button>
      <button v-else class="btn btn-outline-success disabled" type="button">Submit</button>
    </p>
    <p id="stream">
      <iframe
        class="center"
        width="560"
        height="315"
        :src="streamUrl"
        title="Robotic Arm Streaming"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </p>
      <!-- <pre v-html="code"></pre> -->
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "../__helpers/auth-header"
import Swal from "sweetalert2";
import validator from "validator";
import BlocklyComponent from "../components/BlocklyComponent.vue";
import "../blocks/robotic_arm";
import "../prompt";
import { configs } from '../__helpers/configs.js'

import BlocklyJS from "blockly/javascript";

export default {
  name: "app",
  components: {
    BlocklyComponent
  },
  data() {
    return {
      isSignin: authHeader().Authorization ? true : false,
      code: "",
      streamUrl: "",
      configs: null,
      client: {
        connected: false
      },
      options: {
        media: "media/",
        grid: {
          spacing: 25,
          length: 3,
          colour: "#ccc",
          snap: true
        },
        toolbox: `<xml>
          <category name="Start/End" colour="#50ff39">
            <block type="start"></block>
            <block type="end"></block>
          </category>
          <category name="Math" colour="#39afff">
            <block type="math_number">
              <field name="NUM">123</field>
            </block>
            <block type="math_arithmetic"></block>
            <block type="math_single"></block>
          </category>
          <category name="Robotics Arm" colour="#ff398f">
            <block type="rotate_base"></block>
            <block type="rotate_upper_arm"></block>
            <block type="rotate_lower_arm"></block>
            <block type="gripper"></block>
          </category>
          <category name="Direction" colour="#39f0ff">
            <block type="direction_l"></block>
            <block type="direction_r"></block>
            <block type="direction_u"></block>
            <block type="direction_d"></block>
          </category>
        </xml>`
      }
    };
  },
  methods: {
    async submitCode() {
      const { result, value, id, message } = (
        await axios.request({
          method: configs.backend.get.roboticArm.method,
          url: configs.backend.get.roboticArm.requestUrl
        })
      ).data;
      if (result !== "true") {
        // An error occurs on MQTT Broker
        console.error(id, message);
        Swal.fire(
          "Sorry!",
          `An error occurs on MQTT broker (Code: ${id}), Please wait a sec then try it again.`,
          "error"
        );
      } else {
        if (value) {
          // Previous command has not done yet
          Swal.fire(
            "One Moment Please!",
            "Previous command have not done yet, Please wait until it done.",
            "warning"
          );
        } else {
          // Previous command is done
          this.code = BlocklyJS.workspaceToCode(this.$refs["foo"].workspace);
          // Precheck syntax
          if (!this.code.includes("END")) {
              Swal.fire("Syntax Error", "Please end the program with 'End' block.", "error");
              return
          }
          if (this.code.includes("ERR_VALUE_MISMATCH_ROTATE_BASE")) {
              Swal.fire("Direction Mismatch", "The base of robotic arm can't perform vertical rotation.", "warning");
              return
          }
          if (this.code.includes("ERR_VALUE_MISMATCH_LOWER_ARM") || this.code.includes("ERR_VALUE_MISMATCH_UPPER_ARM")) {
              Swal.fire("Direction Mismatch", "The robotic arm can't perform horizontal rotation.", "warning");
              return
          }
          if (this.code.includes("ERR_INVALID_RANGE_LOWER_ARM") || this.code.includes("ERR_INVALID_RANGE_UPPER_ARM")) {
              Swal.fire("Invalid Rotation Range", "Rotation degree must be more than 0 and less than 91", "warning");
              return
          }
          if (this.code.includes("ERR_INVALID_RANGE_ROTATE_BASE")){
              Swal.fire("Invalid Rotation Range", "Rotation degree of base must be more than 0 and less than 181", "warning");
              return
          }
          // Send request
          const res = await axios.request({
            method: configs.backend.set.roboticArm.method,
            url: `${configs.backend.set.roboticArm.requestUrl}/${this.code}`
          });
          if (res.data.result !== "true") {
            console.error(res.data.id, res.data.message);
            Swal.fire(
              "Sorry!",
              `An error occurs on MQTT broker (Code: ${res.data.id}), Please wait a sec then try it again.`,
              "error"
            );
          }
          // this.submitEnable = false;
        }
      }
    }
  },
  async beforeCreate() {
    const { result, value, id, message } = (
      await axios.request({
        method: configs.backend.get.stream.method,
        url: configs.backend.get.stream.requestUrl
      })
    ).data;
    if (result !== "true") console.error(id, message);
    else{
        const stream_vid = value.split(':')
        if (stream_vid[0] == 'youtube')
          this.streamUrl = `https://www.youtube.com/embed/${stream_vid[1]}?autoplay=1&disablekb=1&modestbranding=1&color=white&iv_load_policy=3`;
        else if (stream_vid[0] == 'twitch')
          this.streamUrl = `https://player.twitch.tv/?channel=${stream_vid[1]}&parent=blocklyfra641.dogmatism.me&autoplay=true&muted=true`;
      }
  },
  async created() {
    // Check credentials
    if (!this.isSignin)
      Swal.fire({
        title: 'Please Sign-in before play',
        html: `<input type="email" id="email" class="swal2-input" placeholder="Email">
        <input type="password" id="password" class="swal2-input" placeholder="Password">`,
        type: 'info',
        confirmButtonText: 'Sign in',
        focusConfirm: true,
        closeOnConfirm: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
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
          if (res.data.status_code === 200) {
            localStorage.setItem('userData', JSON.stringify(res.data));
            Swal.fire({
              title: `Welcome back ${result.value.email}`,
              text: 'Have a fun :D',
              type: 'success',
              timer: 1000,
              didOpen: () => { timerInterval = setInterval(() => {}, 100); },
              willClose: () => { clearInterval(timerInterval); }
            })
            .then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) this.$router.go();
            });
          } else if (res.data.status_code === 401 || res.data.status_code === 422) {
            Swal.fire({
              title: `Authentication Failed`,
              text: 'Invalid email or password', 
              type: 'warning',
              timer: 1000,
              didOpen: () => { timerInterval = setInterval(() => {}, 100); },
              willClose: () => { clearInterval(timerInterval); }
            })
            .then(() => { this.$router.go(); });
          } else {
            Swal.fire({
              title: `Error`, 
              text: 'Internal Server Error', 
              type: 'error',
              timer: 1000,
              didOpen: () => { timerInterval = setInterval(() => {}, 100); },
              willClose: () => { clearInterval(timerInterval); }
            })
            .then(() => { this.$router.go(); });
          }
        } else {
          Swal.fire({
            title: `Error`, 
            text: 'Unknown Error', 
            type: 'error',
            timer: 1000,
            didOpen: () => { timerInterval = setInterval(() => {}, 100); },
            willClose: () => { clearInterval(timerInterval); }
          })
          .then(() => { this.$router.go(); });
        }
      })
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  margin: 0;
}

.center {
  display: block;
  width: 100%;
  margin-top: 5%;
  margin-bottom: 5%;
  height: 90%;
}

#twitch-embed {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40%;
  height: 100%;
  margin: 0;
  background-color: #171717;
}
#stream {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40%;
  height: 100%;
  margin: 0;
  background-color: #171717;
}

#blockly {
  position: absolute;
  left: 0;
  bottom: 15%;
  width: 60%;
  height: 85%;
}

#submitBtn {
  position: absolute;
  left: 1%;
  right: 1%;
  bottom: 0;
  top: 88%;
  width: 58%;
  height: 10%;
}
</style>
