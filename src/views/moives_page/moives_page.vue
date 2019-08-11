<template>
  <div>
    <Header title="喵喵电影" />
    <HeaderTab />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import HeaderTab from "@/views/moives_page/moives_page_modules/headertab.vue";
export default {
  name: "moives",
  components: {
    Header,
    Footer,
    HeaderTab
  }
}
</script>

<style>

</style>
