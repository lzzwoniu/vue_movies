<template>
  <div class="cinema_body">
    <Loading v-if="isLoading" />
    <BScroll v-else :handleScroll=handleScrolls :handleTouchEnd=handleTouchEnds>
      <ul>
        <li class="pullDown">{{pullDown}}</li>
        <li v-for="item in cinemalist" :key="item.id">
          <div>
              <span>{{item.nm}}</span>
              <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
          </div>
          <div class="address">
              <span>{{item.addr}}</span>
              <span>{{item.distance}}</span>
          </div>
          <div class="card">
              <div v-for="(itemcard,key) in item.tag" :key="key">
                <p :class=" key | classCard " v-if = "itemcard === 1">{{ key | filtersCard}}</p>
              </div>
          </div>
        </li>
      </ul>
    </BScroll>
  </div>
</template>

<script>
export default {
  name: "cinemalist",
  data() {
    return {
      cinemalist:[],
      isLoading: true,
      pullDown: '',
      before_cityId: '-1'
    }
  },
  activated() {
    var cityId = this.$store.state.MoiveCity.id
    if(this.before_cityId == cityId){ return false;}
    this.isLoading = true
    this.$axios.get("/api/cinemaList?cityId=" + cityId).then((res)=>{
      var msg = res.data.msg;
      if(msg == "ok"){
        this.cinemalist = res.data.data.cinemas
        this.isLoading = false
        this.before_cityId = cityId
      }
    })
  },
  filters:{
    filtersCard(val){
      var temporary = [
        { key: "allowRefund", value: "改签" },
        { key: "endorse", value: "退" },
        { key: "sell", value: "折扣卡" },
        { key: "snack", value: "小吃" }
      ]
      for(var i=0;i<temporary.length;i++){
        if(temporary[i].key == val){
          return temporary[i].value
        }
      }
      return ''
    },
    classCard(val){
      var card = [
        { key: "allowRefund", value: "bl" },
        { key: "endorse", value: "bl" },
        { key: "sell", value: "or" },
        { key: "snack", value: "or" }
      ];
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === val) {
          return card[i].value;
        }
      }
      return "";
    }
  },
  methods: {
    handleScrolls(pos){
      if(pos.y > 30){
        this.pullDown = "更新中"
      }
    },
    handleTouchEnds(){
      this.pullDown = "更新成功"
      this.$axios.get("/api/cinemaList?cityId=10").then((res)=>{
      var msg = res.data.msg;
      if(msg == "ok"){
        this.cinemalist = res.data.data.cinemas
        this.pullDown = ''
      }
    })
    }
  },
}
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card p {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card p.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card p.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
.cinema_body .pullDown{
  margin: 0;
  padding: 0;
  border: none;
}
</style>
