<template>
  <div id="main">
    <Header title="我的影院"/>
    <div id="content">
      <MyLogin />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import MyLogin from "@/components/mylogin/mylogin.vue";

export default {
  name: "my",
  components: {
    Header,
    Footer,
    MyLogin
  }
}
</script>

<style>

</style>
