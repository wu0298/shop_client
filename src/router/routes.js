import Layout from "../views/layout";
export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register"),
  },
  {
    path: "",
    component: Layout,
    redirect: {
      name: "home",
    },
  },
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home/Home"),
      },
    ],
  },
  {
    path: "/cart",
    component: Layout,
    children: [
      {
        path: "",
        name: "cart",
        component: () => import("@/views/cart"),
      },
    ],
  },
  {
    path: "/detail",
    component: Layout,
    children: [
      {
        path: "",
        name: "detail",
        component: () => import("@/views/detail"),
      },
    ],
  },
  {
    path: "/category",
    component: Layout,
    children: [
      {
        path: "",
        name: "category",
        component: () => import("@/views/category"),
      },
    ],
  },
  {
    path: "/search",
    component: Layout,
    children: [
      {
        path: "",
        name: "search",
        component: () => import("@/views/search"),
        props: true,
      },
    ],
  },
  {
    path: "/personal",
    component: Layout,
    children: [
      {
        path: "",
        name: "personal",
        component: () => import("@/views/personal"),
      },
      {
        path: "edit",
        component: () => import("@/views/edit"),
        children: [
          {
            path: '',
            redirect: '/404'
          },
          {
            path: "mine",
            name: "mine",
            component: () => import("@/views/mine"),
          },
          {
            path: "address",
            name: "address",
            component: () => import("@/views/address"),
          },
          {
            path: "order",
            name: "order",
            component: () => import("@/views/order"),
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    component: Layout,
    children: [
      {
        path: "",
        name: "404",
        component: () => import("@/views/404"),
      },
    ],
  },
  {
    path: "*",
    redirect: {
      name: "404",
    },
  },
];
