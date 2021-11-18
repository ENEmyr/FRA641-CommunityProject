import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home"
import RoboticsArm from "../views/RoboticsArm"
import Register from "../views/Register"
import SignOut from "../views/SignOut"

Vue.use(VueRouter);

function getToken() {
  try {
    const token = JSON.parse(localStorage.getItem("userData")).access_token;
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
    component: Register,
  },
  {
    path: '/signout',
    name: 'Sign Out',
    component: SignOut,
  },
  {
    path: '/augmentinfo',
    name: 'Augmented Maze Challenge Info',
    beforeEnter() {
      location = `https://thanatchai12.wixsite.com/website`
    }
  },
  {
    path: '/logiticrobotinfo',
    name: 'Rogistic Robot Info',
    beforeEnter() {
      location = `https://medium.com/@ropcj/class-project-for-community-192c8666c61c`
    }
  },
  {
    path: '/logiticrobotgame',
    name: 'Rogistic Robot Game',
    beforeEnter() {
      location = `http://52.163.215.95${token}`
    }
  },
  {
    path: '/noderedinfo',
    name: 'Node-RED to the moon Info',
    beforeEnter() {
      location = `https://phisekphin.wixsite.com/my-site`
    }
  },
  {
    path: '/githubfra641',
    name: 'Project for Community Github',
    beforeEnter() {
      location = `https://github.com/Untesler/FRA641-CommunityProject`
    }
  },
  {
    path: '/roboticarminfo',
    name: 'Information Page for Robotic Arm Control',
    beforeEnter() {
      location = `https://dogmatism.me/2021/09/07/fra-641-class-project-for-community`
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
