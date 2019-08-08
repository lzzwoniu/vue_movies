// import My from "../../views/my_page/my_page.vue";

export default{
  path: "/my",
  name: "my",
  component: () => import("@/views/my_page/my_page")
}