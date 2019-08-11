import Moives from "../../views/moives_page/moives_page.vue";

export default{
  path: "/moives",
  name: "moives",
  component: Moives,
  children: [
    {
      path: '/moives', 
      redirect: '/moives/ishit',
    },
    {
      path: '/moives/cityposition', 
      component: () => import("@/components/cityposition/cityposition")
    },
    {
      path: '/moives/ishit', 
      component: () => import("@/components/ishit/ishit")
    },
    {
      path: '/moives/upcoming', 
      component: () => import("@/components/upcoming/upcoming")
    },
    {
      path: '/moives/sousuo', 
      component: () => import("@/components/sousuo/sousuo")
    },
  ]
}