import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home"
import RoboticsArm from "../views/RoboticsArm"

Vue.use(VueRouter);

function getToken() {
  try {
    const token = JSON.parse(localStorage.getItem("userData")).token;
    if (token) return `?token=${token}`;
  } catch (error) {
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData');
    }
    return '';
  }
}
const token = getToken();
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/roboticarm',
    name: 'Remote Robotics Arm Controlling',
    component: RoboticsArm,
  },
  {
    path: '/register',
    name: 'Register',
    component: RoboticsArm,
  },
  {
    path: '/game2',
    name: 'Game 2',
    beforeEnter() {
      location = `https://blocklyfra641.dogmatism.me/verification${token}`
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
