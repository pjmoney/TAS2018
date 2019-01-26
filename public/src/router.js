import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignIn from "./views/SignInView.vue";
import SignUpComponent from "./views/SignUpView.vue";
import Products from "./views/Products.vue";
import Profile from "./components/Profile.vue";
import SearchHome from "./views/SearchHome";
import Product from "./views/Product.vue";

Vue.use(Router);

const logged = 60000 * 60 * 24;

const router = new Router({
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "/products",
          name: "products",
          component: Products,
        },
        {
          path: "/settings",
          name: "settings",
          component: Profile,
        },
        {
          path: "/",
          name: "search",
          component: SearchHome
        },
        {
          path: "/product/:productId",
          name: "product",
          component: Product,
          props: true
        }
      ],
      beforeEnter: requireAuth,
      meta: { requiresAuth: true }
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpComponent
    }
  ]
})

function requireAuth(to, from, next) {
  localStorage.current = new Date().getTime();
  if (localStorage.token && localStorage.current - localStorage.created < logged) {
    next()
  } else {
    next("/signin")
  }
}

router.beforeEach((to, from, next) => {
  localStorage.current = new Date().getTime();
  if (to.meta.requiresAuth) {
    if (localStorage.token && localStorage.current - localStorage.created < logged) {
      next()
    } else {
      next("/signin");
    }
  }
  next()
})

export default router;
