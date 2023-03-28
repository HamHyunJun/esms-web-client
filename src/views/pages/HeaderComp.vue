<template>
  <header id="header" v-if="this.$store.state.userId">
    <div class="header_top">
      <h1><a href="http://www.ib-care.com//#/dashboard/allView"><img alt="Vue logo" src="../../assets/images/logo_ib.png">IB-Care System</a></h1>
      <div class="util_wrap">
        <div class="user_name">
          <button type="button" class="btn form2" @click="logOut"> 로그아웃</button>
          <i class="pf_img" style="background-image: url(../../assets/images/img_profile.png)"></i>
          <a href="#" class="name"><em>{{loginCheck}}</em> 님</a>
        </div>
      </div>
    </div>
    <nav id="gnb">
      <ul>
        <li :class="getPath==='/dashboard'? 'on':''"><a href="#" ><router-link to="/dashboard/allView" ><i class="ico-1"></i>모니터링</router-link></a></li>
        <li :class="getPath==='/customer'? 'on':''"><a href="#"><router-link to="/customer/allView" ><i class="ico-2"></i>대상자 관리</router-link></a></li>
        <li :class="getPath==='/emevent'? 'drop on':'drop'"> <!-- gnb li에 마우스 오버시 드랍메뉴 on -->
          <a href="#"><router-link to="/emevent/allView" ><i class="ico-3"></i>이벤트 리포트</router-link></a>
          <ul class="sub_menu">
            <li :class="getDetailPath==='/emevent/allView'? 'on':''"><a href="#"><router-link to ="/emevent/allView">응급알람</router-link></a></li>
            <li :class="getDetailPath==='/emevent/outingEvent'? 'on':''"><a href="#"><router-link to ="/emevent/outingEvent">외출이벤트</router-link></a></li>
            <li :class="getDetailPath==='/emevent/activityDetection'? 'on':''"><a href="#"><router-link to ="/emevent/activityDetection">활동 미감지</router-link></a></li>
            <li :class="getDetailPath==='/emevent/equipmentEvent'? 'on':''"><a href="#"><router-link to ="/emevent/equipmentEvent">장비 이벤트</router-link></a></li>
            <li :class="getDetailPath==='/emevent/equipmentFailure'? 'on':''"><a href="#"><router-link to ="/emevent/equipmentFailure">장비 점검 대상</router-link></a></li>
          </ul>
        </li>
        <li :class="getPath==='/setting'? 'drop on':'drop'">
          <a href="#"><router-link to="/setting/allView" ><i class="ico-4"></i>시스템관리</router-link></a>
          <ul class="sub_menu">
            <li v-if="this.$store.state.userTypeCd === 'TPE001' || this.$store.state.userTypeCd === 'TPE002' || this.$store.state.userTypeCd === 'TPE003' || this.$store.state.userTypeCd === 'TPE004'" :class="getDetailPath==='/setting/org'? 'on':''"><a href="#"><router-link to ="/setting/org">기관관리</router-link></a></li>
            <li v-if="this.$store.state.userTypeCd === 'TPE001' || this.$store.state.userTypeCd === 'TPE002' || this.$store.state.userTypeCd === 'TPE003' || this.$store.state.userTypeCd === 'TPE004' || this.$store.state.userTypeCd === 'TPE005'"
            :class="getDetailPath==='/setting/customer'? 'on':''"><a href="#"><router-link to ="/setting/customer">사용자관리</router-link></a></li>
            <li :class="getDetailPath==='/setting/allView'? 'on':''"><a href="#"><router-link to ="/setting/allView">장비관리</router-link></a></li>
            <li v-if="this.$store.state.userTypeCd === 'TPE001'" :class="getDetailPath==='/setting/ippbx'? 'on':''"><a href="#"><router-link to ="/setting/ippbx">IP-PBX 관리</router-link></a></li>
            <li v-if="this.$store.state.userTypeCd === 'TPE001'" :class="getDetailPath==='/setting/firmware'? 'on':''"><a href="#"><router-link to ="/setting/firmware">펌웨어 관리</router-link></a></li>
            <li :class="getDetailPath==='/setting/notice'? 'on':''"><a href="#"><router-link to ="/setting/notice">공지사항</router-link></a></li>
            <li v-if="this.$store.state.userTypeCd === 'TPE001'" :class="getDetailPath==='/setting/manageLog'? 'on':''"><a href="#"><router-link to ="/setting/manageLog">로그관리</router-link></a></li>
            <li v-if="this.$store.state.userTypeCd === 'TPE001'" :class="getDetailPath==='/setting/appLog'? 'on':''"><a href="#"><router-link to ="/setting/appLog">앱로그수집</router-link></a></li>
            <li :class="getDetailPath==='/setting/deviceRecord'? 'on':''"><a href="#"><router-link to ="/setting/deviceRecord">장비이력관리</router-link></a></li>
            <li :class="getDetailPath==='/setting/installCheck'? 'on':''"><a href="#"><router-link to ="/setting/installCheck">설치완료확인서</router-link></a></li>
          </ul>
        </li>
        <li :class="getPath==='/as'? 'drop on':'drop'">
          <a href="#"><router-link to="/as/Request" ><i class="ico-5"></i>A/S관리</router-link></a>
          <ul class="sub_menu">
            <li :class="getDetailPath==='/as/Request'? 'on':''"><a href="#"><router-link to ="/as/Request">A/S 요청</router-link></a></li>
            <li :class="getDetailPath==='/as/Confirm'? 'on':''"><a href="#"><router-link to ="/as/Confirm">A/S 접수</router-link></a></li>
            <li :class="getDetailPath==='/as/Complete'? 'on':''"><a href="#"><router-link to ="/as/Complete">A/S 완료</router-link></a></li>
            <li :class="getDetailPath==='/as/Cancel'? 'on':''"><a href="#"><router-link to ="/as/Cancel">A/S 취소</router-link></a></li>
          </ul>
        </li>
        <li :class="getPath==='/schedule'? 'on':''"><a href="#"><router-link to="/schedule/Calendar" ><i class="ico-6"></i>일정관리</router-link></a></li>
        <!-- <li :class="getPath==='/radar'? 'on':''"><a href="#" ><router-link to="/radar/radarSensor" ><i class="ico-7"></i>레이더센서</router-link></a></li> -->
        <li :class="getPath==='/radar'? 'drop on':'drop'">
          <a href="#"><router-link to="/radar/radarSensor" ><i class="ico-7"></i>레이더센서</router-link></a>
          <ul class="sub_menu">
            <li :class="getDetailPath==='/radar/radarSensor'? 'on':''"><a href="#"><router-link to ="/radar/radarSensor">60GHz Radar</router-link></a></li>
            <li :class="getDetailPath==='/radar/radarSensor24'? 'on':''"><a href="#"><router-link to ="/radar/radarSensor24">24GHz Radar</router-link></a></li>
          </ul>
        </li>
      </ul>
      <div class="emerg_area">
        <button type="button"  style="margin-right:10px;" :class="Emeventtoggle===0 ? 'btn': 'btn on'" @click="clickEmergency()"><i></i>응급상황 수신</button> 
        <button type="button" :class="Eqeventtoggle===0 ? 'btn': 'btn on'" @click="clickEquipmentEvent()"><i></i>장비 이벤트</button>
        <!--<button type="button" style="margin-right:10px;" :class="this.socketData==='ALL' || this.socketData==='ALARM' ? 'btn on': 'btn' " @click="clickEmergency()"><i></i>응급상황 수신</button> 
        <button type="button" :class="this.socketData==='ALL' || this.socketData==='EVENT' ? 'btn on': 'btn' " @click="clickEquipmentEvent()"><i></i>장비 이벤트</button> -->
      </div>
    </nav>
  </header>
</template>

<script>
import axios from "axios";
import moment from "moment";
let router;
export default {
  name: 'HeaderComp',
  props: {
    msg: String
  },
  data: () => ({
    userId: null,
    userTypeCd: null,
    s_date: '',
    e_date: '',
    oldEmevent : 0,
    newEmevent : 0,
    Emeventtoggle:0,
    oldEqevent : 0,
    newEqevent : 0,
    Eqeventtoggle:0,
    timerId:'',
    EqtimerId:'',
    socketData:'',
    oldsocketData:'',
    newsocketData:'',
    socketCount:0,
  }),
  created(){
    //테스트
    this.s_date=moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    this.e_date=moment().format('YYYY-MM-DD HH:mm:ss');
    this.getUserId();
    this.checkCount();
    this.checkEqCount();
    // this.$socket.on('chat', (data)=>{
    //   console.log("=================socket=======================")
    //   console.log(data.message)
    //   this.socketData = data.message
    //   this.oldsocketData = moment().format('YYYY-MM-DD HH:mm:ss')
    //   this.newsocketData = moment().format('YYYY-MM-DD HH:mm:ss')
    //   console.log(this.oldsocketData)
    //   console.log(this.newsocketData)
    //   console.log("=================socket=======================")
    //   this.socketCount = 1
    //   setTimeout(() => {
    //     this.socketCheck()
    //   }, 20000);
    // })
  },
  methods:{
    // socketCheck(){
    //   console.log("====================socketCheck========================")
    //   console.log("socket test")
    //   this.newsocketData = moment().format('YYYY-MM-DD HH:mm:ss')
    //   console.log('newsocket = '+this.newsocketData)
    //   if(this.newsocketData !== this.oldsocketData){
    //     this.socketData = ''
    //   }
    //   console.log("====================socketCheck========================")
    // },
    getUserId(){
      this.userId = sessionStorage.getItem("userId");
      this.userTypeCd = sessionStorage.getItem("userTypeCd")
      this.$store.state.userTypeCd = this.userTypeCd
      console.log(this.userTypeCd)
      console.log("this.userId")
      console.log(this.userId)
      console.log("this.$store.state.data")
      console.log(this.$store.state.userTypeCd)
      console.log(this.$store.state.userId)
      console.log(this.$store)
    },
    logOut(){
      alert("로그아웃 되었습니다")
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("userId", null);
      sessionStorage.setItem("userTypeCd", null);
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('userTypeCd')
      this.userId = null
      this.$store.state.userId = null
      this.$store.state.userTypeCd = null
      console.log(sessionStorage.getItem("token"));
      
      clearTimeout(this.timerId);

      this.$router.push({ name: 'Home' });
    }, 
    async checkCount(){
      console.log("this Emeventtoggle ==> "+this.Emeventtoggle)
      console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
      let uri = this.$store.state.serverApi+"/admin/emergencys/checkcnt?userId="+this.$store.state.userId;
      await axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
      .then(response => {
       this.newEmevent = response.data.totalCount
       if(this.oldEmevent === this.newEmevent){
         this.Emeventtoggle = 0
       }else{
         this.Emeventtoggle = 1
       }
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
      if(sessionStorage.getItem("token") != 'null' && this.$store.state.userId != 'null'){
        //this.timerId=setTimeout(this.checkCount, 5000)
      }else{
        clearTimeout(this.timerId);
      }
    },
    async checkEqCount(){
      this.s_date = moment().subtract(15, 'seconds').format('YYYY-MM-DD HH:mm:ss')
      this.e_date = moment().format('YYYY-MM-DD HH:mm:ss')
      console.log("this Eqeventtoggle ==> "+this.Eqeventtoggle)
      console.log(this.s_date)
      console.log(this.e_date)

      let uri = this.$store.state.serverApi+`/admin/emergencys/gateway-events?occurStartDate=${this.s_date}&occurEndDate=${this.e_date}&userId=${this.$store.state.userId}`;
      await axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
      .then(response => {
        console.log(response)
        console.log(response.data.totalCount)
       this.newEqevent = response.data.totalCount
       console.log(this.oldEqevent)
       console.log(this.newEqevent)
       if(this.oldEqevent === this.newEqevent){
         this.Eqeventtoggle = 0
       }else{
         this.Eqeventtoggle = 1
       }
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
      if(sessionStorage.getItem("token") != 'null' && this.$store.state.userId != 'null'){
        //this.EqtimerId=setTimeout(this.checkEqCount, 5000)
      }else{
        clearTimeout(this.EqtimerId);
      }
    },
    clickEmergency(){
      if(this.$route.path !==`/emevent/allView2`){
        this.$router.push({
        path : `/emevent/allView2`
      })
      }
      // if(this.$route.path !==`/emevent/allView`){
      //   this.$router.push({
      //   path : `/emevent/allView`,
      //   query:{state:'STE001'}
      // })
      // } 
    },
    clickEquipmentEvent(){
      if(this.$route.path !==`/emevent/EquipmentEvent2`){
        this.$router.push({
        path : `/emevent/EquipmentEvent2`
      })
      } 
      // if(this.$route.path !==`/emevent/EquipmentEvent`){
      //   this.$router.push({
      //   path : `/emevent/equipmentEvent`,
      //   query:{date: moment().subtract(15, 'seconds').format('YYYY-MM-DD HH:mm:ss')}
      // })
      // } 
    },
  },
  computed: {
    loginCheck(){
      console.log("this.$store.state.data")
      this.userId = sessionStorage.getItem("userId")
      console.log(this.$store.state.data)
      return this.userId
    },
    getPath(){
      let tmpPath = this.$route.path
      let tmpResult = tmpPath.split("/")
      console.log(tmpResult)
      let result = "/" + tmpResult[1] 
      console.log("path is")
      console.log(result)
      return result
    },
    getDetailPath(){
      let tmpPath = this.$route.path
      let tmpResult = tmpPath.split("/")
      console.log(tmpResult)
      let result = "/" + tmpResult[1] + "/" + tmpResult[2]
      console.log("path is")
      console.log(result)
      return result
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header{/*position:absolute; top:0; left:0; */width:100%;}
#header .header_top{height:80px;display: flex;background: transparent linear-gradient(270deg, #151A1D 0%, #2A363E 100%) 0% 0% no-repeat padding-box; color: #fff; padding: 0 60px;justify-content: space-between;align-items: center;}
#header .header_top h1{font-size: 0;}
#header .header_top .util_wrap{font-size: 0;}
#header .header_top .user_name{display: inline-block;vertical-align: top;}
#header .header_top .user_name i.pf_img{display: inline-block;vertical-align: middle;margin: 0 10px 0 0;width: 40px;height: 40px;background-repeat: no-repeat;background-position: center;background-size: cover;border-radius: 50%;background-color: #fff;}
#header .header_top .user_name .name{display: inline-block;vertical-align: middle;font-weight: 600;font-size: 16px;}
#header .header_top .user_name .name em{font-weight: 300;}
#gnb{display: flex;align-items: center;justify-content: space-between;height: 80px;background-color: #2A363E;box-shadow: 0px 3px 10px #00000012;padding: 0 60px;}
#gnb > ul{margin-left: -60px;}
#gnb > ul > li{display: inline-block;margin: 0 0 0 60px;}
#gnb > ul > li > a{color: #ADB0BB;font-weight: 500;height: 80px;line-height: 80px;display: block;}
#gnb > ul > li > a i{display: inline-block;width: 24px;height: 24px;background-repeat: no-repeat;background-position: center;background-size: contain;margin: 0 10px 0 0;}
#gnb > ul > li > a i.ico-1{background-image: url(../../assets/images/menu_01.png);}
#gnb > ul > li > a i.ico-2{background-image: url(../../assets/images/menu_02.png);}
#gnb > ul > li > a i.ico-3{background-image: url(../../assets/images/menu_03.png);}
#gnb > ul > li > a i.ico-4{background-image: url(../../assets/images/menu_04.png);}
#gnb > ul > li > a i.ico-5{background-image: url(../../assets/images/menu_05.png);}
#gnb > ul > li > a i.ico-6{background-image: url(../../assets/images/menu_06.png);}
#gnb > ul > li > a i.ico-7{background-image: url(../../assets/images/menu_07.png);}
#gnb > ul > li:hover > a{color: #11B787;}
#gnb > ul > li:hover > a i.ico-1{background-image: url(../../assets/images/menu_01_on.png);}
#gnb > ul > li:hover > a i.ico-2{background-image: url(../../assets/images/menu_02_on.png);}
#gnb > ul > li:hover > a i.ico-3{background-image: url(../../assets/images/menu_03_on.png);}
#gnb > ul > li:hover > a i.ico-4{background-image: url(../../assets/images/menu_04_on.png);}
#gnb > ul > li:hover > a i.ico-5{background-image: url(../../assets/images/menu_05_on.png);}
#gnb > ul > li:hover > a i.ico-6{background-image: url(../../assets/images/menu_06_on.png);}
#gnb > ul > li:hover > a i.ico-7{background-image: url(../../assets/images/menu_07_on.png);}
#gnb > ul > li.on > a{color: #11B787;}
#gnb > ul > li.on > a i.ico-1{background-image: url(../../assets/images/menu_01_on.png);}
#gnb > ul > li.on > a i.ico-2{background-image: url(../../assets/images/menu_02_on.png);}
#gnb > ul > li.on > a i.ico-3{background-image: url(../../assets/images/menu_03_on.png);}
#gnb > ul > li.on > a i.ico-4{background-image: url(../../assets/images/menu_04_on.png);}
#gnb > ul > li.on > a i.ico-5{background-image: url(../../assets/images/menu_05_on.png);}
#gnb > ul > li.on > a i.ico-6{background-image: url(../../assets/images/menu_06_on.png);}
#gnb > ul > li.on > a i.ico-7{background-image: url(../../assets/images/menu_07_on.png);}
#gnb > ul > li.drop{padding: 0 18px 0 0;background-image: url(../../assets/images/ico_menu_drop.png);background-repeat: no-repeat;background-position: right center;position: relative;}
#gnb > ul > li.drop:hover{background-image: url(../../assets/images/ico_menu_drop_on.png);}
#gnb > ul > li.drop.on{background-image: url(../../assets/images/ico_menu_drop_on.png);}
#gnb > ul > li.drop > .sub_menu{display: none;position: absolute;left: 0;top: 80px;width: 100%;min-width: 173px;background-color: #2A363E;border-radius: 0px 0px 10px 10px;padding: 30px 22px 30px 30px;z-index: 20;}
#gnb > ul > li.drop:hover > .sub_menu{display: block;}
#gnb > ul > li.drop > .sub_menu li{display: block;margin: 0 0 20px 0;}
#gnb > ul > li.drop > .sub_menu li:last-child{margin: 0;}
#gnb > ul > li.drop > .sub_menu li a{display: inline-block;color: #fff;position: relative;font-weight: 300;}
#gnb > ul > li.drop > .sub_menu li:hover a{font-weight: 500;}
#gnb > ul > li.drop > .sub_menu li:hover a::after{content: '';width: 12px;height: 4px;background-color: #11B787;border-radius: 2px;position: absolute;right: -20px;top: 50%;margin-top: -2px;}
#gnb > ul > li.drop > .sub_menu li.on a{font-weight: 500;}
#gnb > ul > li.drop > .sub_menu li.on a::after{content: '';width: 12px;height: 4px;background-color: #11B787;border-radius: 2px;position: absolute;right: -20px;top: 50%;margin-top: -2px;}
#gnb .emerg_area .btn{display: inline-block;padding: 0 20px;height: 40px;line-height: 40px;font-size: 16px;color: #fff;border-radius: 50px;background-color: #11B787;}
#gnb .emerg_area .btn.on{background-color: #F61919;}
#gnb .emerg_area .btn i{display: inline-block;vertical-align: top;width: 19px;height: 23px;background-image: url(../../assets/images/ico_emerg.png);;background-repeat: no-repeat;background-position: center;margin: 9px 10px 0 0;}
#header .header_top .user_name .btn.form2{display: inline-block;width: auto;height: 40px;line-height: 40px;font-size: 14px;font-weight: 300;padding: 0 20px;background-color: #11B787;border-radius: 30px;color: #fff;box-shadow: 0px 6px 12px #0000000F;margin: 0 10px 0 0;}
</style>
