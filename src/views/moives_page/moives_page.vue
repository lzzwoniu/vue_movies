<template>
  <div id="main">
    <Header title="喵喵电影" />
    <HeaderTab />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import HeaderTab from "@/views/moives_page/moives_page_modules/headertab.vue";
import {messageBox} from "@/components/Js";


export default {
  name: "moives",
  components: {
    Header,
    Footer,
    HeaderTab,
  },
  mounted() {
    setTimeout(()=>{
      this.$axios.get('/api/getLocation').then((res)=>{
        var msg = res.data.msg;
        if(msg === 'ok'){
          var nm = res.data.data.nm;
          var id = res.data.data.id;
          if( this.$store.state.MoiveCity.id == id ){return;}
          messageBox({
            title : '定位',
            content : nm,
            cancel : '取消',
            ok : '切换定位',
            handleOk(){
                window.localStorage.setItem('nowNm',nm);
                window.localStorage.setItem('nowId',id);
                window.location.reload();
            }
          });
        }
      });
    },3000);
  },
}
</script>

<style>

</style>
