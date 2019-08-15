<template>
  <div class="city_body">
        <div class="city_list">
            <Loading v-if="isLoading" />
            <BScroll v-else ref="city_List">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix" >
                            <li v-for="item in hotList" :key="item.id">{{item.nm}}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{item.index}}</h2>
                            <ul>
                                <li v-for="cityname in item.list" :key="cityname.id">{{cityname.nm}}</li>
                            </ul>
                        </div>	
                    </div>
                </div>
            </BScroll>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item, index) in cityList" :key="item.index" @touchstart = "handIndex(index)">{{item.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "cityposition",
  data() {
      return {
          hotList:[],
          cityList:[],
          isLoading: true
      }
  },
  mounted() {
      var hotList = window.localStorage.getItem("hotList")
      var cityList = window.localStorage.getItem("cityList")
      if(hotList && cityList){
          this.hotList = hotList
          this.cityList = cityList
          this.isLoading = false
      }else{
          this.$axios.get("/api/cityList").then((res)=>{
            var msg = res.data.msg;
            if(msg == "ok"){
                this.isLoading = false
                var cityListData = res.data.data.cities;
                var newdata = this.forCityData(cityListData)
                this.hotList = newdata.hotList
                this.cityList = newdata.cityList
                window.localStorage.setItem('hotList', JSON.stringify(newdata.hotList))
                window.localStorage.setItem('cityList', JSON.stringify(newdata.cityList))
            }
        })
      }
  },
  methods: {
      forCityData(listdata){
        var cityList = [],
            hotList = [],
            i;
        for(var k = 0;k<listdata.length;k++){
            if(listdata[k].isHot === 1){
              hotList.push(listdata[k])  
            }
        }
        for(i = 0;i<listdata.length;i++){
            var everyFirst = listdata[i].py.substring(0, 1).toUpperCase()
            if(obtainList(everyFirst)){  //新加的index
                cityList.push({index: everyFirst,list: [{nm:listdata[i].nm, id: listdata[i].id}]})
            }else{ // 老的index
              for(var j=0;j<cityList.length;j++){
                  if(cityList[j].index === everyFirst){
                    cityList[j].list.push({nm: listdata[i].nm, id: listdata[i].id})
                  }
              }  
            }
        }
        cityList.sort((a, b)=>{
            if(a.index > b.index){
                return 1
            }else if(a.index < b.index){
                return -1
            }
        })
        function obtainList(everyFirst){
            for(var i = 0;i<cityList.length;i++){
                if(cityList[i].index === everyFirst){
                    return false
                }
            }
            return true;
        }
        return {
            hotList,
            cityList
        }
      },
      handIndex(index){
          var h2 = this.$refs.city_sort.getElementsByTagName('h2');
        //   this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
        this.$refs.city_List.toScrollClick(-h2[index].offsetTop)

      }
  },
}
</script>

<style scoped>
  #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
