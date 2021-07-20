import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Todo from '../components/Todo.vue'
import Profile from '../components/Profile.vue'
import Register from '../components/Register.vue'
import Weather from '../components/Weather.vue'


import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = 
[
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/todo', name: 'Todo', component: Todo },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/weather', name: 'Weather', component: Weather }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
	
  let documentTitle = `${ process.env.VUE_APP_TITLE } - ${ to.name }`;
  if( to.params.title) {
    documentTitle += ` - ${ to.params.title }`;
  }
  document.title = documentTitle;
  
  const toPages = ["Todo", "Profile"];
  const fromPages = ["Todo", "Profile", "Home", "About", "Login", "Weather"];
  var checkToPages = toPages.indexOf(to.name);
  var checkFromPages = fromPages.indexOf(from.name);

  if (checkToPages !== -1) {
    if (checkFromPages !== -1) next();
    else next("login");
  } else {
    next();
  }
});

export default router
