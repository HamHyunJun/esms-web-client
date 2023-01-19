<template>
    <div class="wrap">
      <!--<HeaderComp></HeaderComp>-->
      <div class="container type-02">
        <div id="" class="popupLayer" v-if="errorpopup1 == true">
                <div class="popup_wrap type-02">
                    <div class="title_wrap">
                        <div class="title">경고</div>
                        <button type="button" class="btn_close" @click="errorpopupClose(1)">닫기</button>
                    </div>
                    <div class="popup_cnt">
                        <p class="alert_txt">조회 종료일자가 시작일자보다 빠릅니다<br/>일자를 다시 선택하여 주십시요</p>
                    </div>
                    <div class="popbtn_area type-02">
                        <button type="button" class="btn form2" @click="errorpopupClose(1)">확인</button>
                    </div>
                </div>
            </div>
            <div id="" class="popupLayer" v-if="errorpopup2 == true">
                <div class="popup_wrap type-02">
                    <div class="title_wrap">
                        <div class="title">경고</div>
                        <button type="button" class="btn_close" @click="errorpopupClose(2)">닫기</button>
                    </div>
                    <div class="popup_cnt">
                        <p class="alert_txt">일주일단위로 조회 가능합니다<br/>일자를 다시 선택하여 주십시요</p>
                   </div>
                    <div class="popbtn_area type-02">
                        <button type="button" class="btn form2" @click="errorpopupClose(2)">확인</button>
                    </div>
                </div>
            </div>
        <div class="box_wrap" style="height: 134px;">
          <div class="box_search_wrap box_style type_db">
            <table>
              <colgroup>
                <col style="width:16%;">
                <col style="width:16%;">
                <col style="width:26%;">
                <col style="width:auto;">
              </colgroup>
              <thead>
                <th scope="row">시/도</th>
                <th scope="row">시/군/구</th>
                <th scope="row">관리기관</th>
                <th scope="row"></th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select v-model="selectedSidoItems" @change="onChangeSgg($event)">
                      <option v-for="(sido, index) in sidoItems" :value="sido.value" v-bind:key="index">{{sido.label}}</option>
                    </select> 
                  </td>
                  <td>
                    <select v-model="selectedSggItems" @change="onChangeOrg($event)">
                      <option v-for="(sgg, index) in sggItems" :value="sgg.value" v-bind:key="index">{{sgg.label}}</option>
                    </select>
                  </td>
                  <td>
                    <select v-model="selectedOrgItems">
                      <option v-for="(orgm, index) in orgmItems" :value="orgm.value" v-bind:key="index">{{orgm.label}}</option>
                    </select>
                  </td>
                  <td>
                    <div class="date_warp">
                      <div class="customerBts" style="justify-content: flex-start;">
                        <input type="date" v-model="s_date"/>
                        <span class="tilde">~</span>
                        <input type="date" v-model="e_date" :max="this.$moment().format('YYYY-MM-DD')"/>
                        <button type="button" class="btn" v-on:click="manageInquiry">조회</button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="top_info box_style">
            <i class="ico_info_1"></i>
              <div class="txt_area">
                <p class="tit">총 설치 가구수</p>
                <strong class="num">{{!this.setCount? 0 : this.setCount}}</strong>
              </div>
          </div>
          <div class="top_info type-l box_style">
            <div class="top_half">
              <i class="ico_info_2"></i>
                <div class="txt_area">
                  <p class="tit">응급관리요원</p>
                  <strong class="num">{{!this.setEMCount? 0 : this.setEMCount}}</strong>
                </div>  
            </div>
            <div class="top_half">
              <i class="ico_info_3"></i>
                <div class="txt_area">
                  <p class="tit">생활관리사</p>
                  <strong class="num">{{!this.setLMCount? 0 : this.setLMCount}}</strong>
                </div>
            </div>
          </div>
        </div>
        <div class="box_wrap">
          <div class="box_col3 box_style">
            <p style="height:1%">장비가동률</p>    
            <div>
              <canvas class="statistics-charts-line" ref="lineChart" width="100px" height="65px"></canvas>
            </div>
          </div>
          <div class="box_col3 box_style">
            <p style="float: left; width: 30%; height: 4%;">오늘 이벤트 현황</p>
            <img src = "@/assets/images/dashboard_event.png" style="float:right; width: 30%;"/>
            <div>
              <canvas ref="BarChart2" width="470" height="40"></canvas>
            </div>
            <p>응급 이벤트 현황</p>    
            <div>
              <canvas class="statistics-charts-line" ref="BarChart1" width="470" height="220" ></canvas>
            </div>
          </div>
            <div class="box_col3 box_style">
              <table class="asstatus">
                <colgroup>
                  <col style="width:20%;" >
                  <col style="width:20%;">
                  <col style="width:20%;">
                  <col style="width:20%;">
                  <col style="width:20%;">
                </colgroup>
                <thead>
                    <th>구 분</th>
                    <th>A/S 요청</th>
                    <th>A/S 접수</th>
                    <th>A/S 취소</th>
                    <th>A/S 완료</th>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">게이트웨이</th>
                    <td>{{this.gwrqCount}}</td>
                    <td>{{this.gwrcCount}}</td>
                    <td>{{this.gwcaCount}}</td>
                    <td class="comple">{{this.gwcpCount}}</td>
                  </tr>
                  <tr>
                    <th scope="row">응급호출기</th>
                    <td>{{this.emrqCount}}</td>
                    <td>{{this.emrcCount}}</td>
                    <td>{{this.emcaCount}}</td>
                    <td class="comple">{{this.emcpCount}}</td>
                  </tr>
                  <tr>
                    <th scope="row">활동감지기</th>
                    <td>{{this.acrqCount}}</td>
                    <td>{{this.acrcCount}}</td>
                    <td>{{this.accaCount}}</td>
                    <td class="comple">{{this.accpCount}}</td>
                  </tr>
                  <tr>
                    <th scope="row">화재감지기</th>
                    <td>{{this.firqCount}}</td>
                    <td>{{this.fircCount}}</td>
                    <td>{{this.ficaCount}}</td>
                    <td class="comple">{{this.ficpCount}}</td>
                  </tr>
                  <tr>
                    <th scope="row">출입문감지기</th>
                    <td>{{this.dorqCount}}</td>
                    <td>{{this.dorcCount}}</td>
                    <td>{{this.docaCount}}</td>
                    <td class="comple">{{this.docpCount}}</td>
                  </tr>
                  <tr>
                    <th scope="row">생활안심센서</th>
                    <td>{{this.lirqCount}}</td>
                    <td>{{this.lircCount}}</td>
                    <td>{{this.licaCount}}</td>
                    <td class="comple">{{this.licpCount}}</td>
                  </tr>
                </tbody>
              </table>
            <div>
              <canvas width="470" height="1"></canvas>
            </div>
          </div>
        </div>
        <div class="box_wrap">
          <div class="box_l chart box_style">
            <div class="result_txt">
            <p style="height:2px">배터리 상태</p>
            </div>
            <div>
              <canvas ref="barChart" style="height: 150px"/>
            </div>
          </div>
          <div class="box_style box_r" style="height: 270px;">
            <div class="result_txt">
              <p style="float: left; width: 6%; fontSize: 18px; height: 10px; margin-bottom: 20px;">전원연결</p>
               <img src = "@/assets/images/dashboard_gw.png" style="float:left; width: 10%;"/>
              <p style="float: left; width: 6%; fontSize: 18px; height: 10px; margin-left: 70px; margin-bottom: 20px;">통신상태</p>
               <img src = "@/assets/images/dashboard_power2.png" style="float:left; width: 15%;"/>
            </div>
            <div>
              <p style="float: left; width: 270px; margin-left: 40px">게이트웨이</p>
              <p style="float: left; width: 208px;">응급호출기</p>
              <p style="float: left; width: 196px;">활동감지센서</p>
              <p style="float: left; width: 215px;">화재감지기</p>
              <p style="float: left; width: 195px;">출입문감지기</p>
              <p style="float: left; width: 100px;">생활안심센서</p>
            </div>
            <div style="float: left; width: 160px; position: relative;">
              <div style="font-size:30px; font-weight: bold; width: 100%; height: 40px; position: absolute; top: 55%; left: 0; margin-top: -20px; line-height:19px; text-align: center; font">
                {{this.finalPwGwData1[0]}}%
              </div>
              <canvas height="100px" width="100px" ref="doughnutChart1"/>
            </div>
            <div style="float: left; width: 160px; margin-left: 8.7%; position: relative;">
              <div style="font-size:30px; font-weight: bold; width: 100%; height: 40px; position: absolute; top: 55%; left: 0; margin-top: -20px; line-height:19px; text-align: center; font">
                {{this.finalPwEmData1[0]}}%
              </div>
              <canvas height="100px" width="100px" ref="doughnutChart2"/>
            </div>
            <div style="float: left; width: 160px; margin-left: 3.9%; position: relative;">
              <div style="font-size:30px; font-weight: bold; width: 100%; height: 40px; position: absolute; top: 55%; left: 0; margin-top: -20px; line-height:19px; text-align: center; font">
                {{this.finalPwAcData1[0]}}%
              </div>
              <canvas height="100px" width="100px" ref="doughnutChart5"/>
            </div>
            <div style="float: left; width: 160px; margin-left: 3.7%; position: relative;">
              <div style="font-size:30px; font-weight: bold; width: 100%; height: 40px; position: absolute; top: 55%; left: 0; margin-top: -20px; line-height:19px; text-align: center; font">
                {{this.finalPwFiData1[0]}}%
              </div>
              <canvas height="100px" width="100px" ref="doughnutChart3"/>
            </div>
            <div style="float: left; width: 160px; margin-left: 3.8%; position: relative;">
              <div style="font-size:30px; font-weight: bold; width: 100%; height: 40px; position: absolute; top: 55%; left: 0; margin-top: -20px; line-height:19px; text-align: center; font">
                {{this.finalPwDoData1[0]}}%
              </div>
              <canvas height="100px" width="100px" ref="doughnutChart4"/>
            </div>
            <div style="float: left; width: 160px; margin-left: 3%; position: relative;">
              <div style="font-size:30px; font-weight: bold; width: 100%; height: 40px; position: absolute; top: 55%; left: 0; margin-top: -20px; line-height:19px; text-align: center; font">
                {{this.finalPwLiData1[0]}}%
              </div>
              <canvas height="100px" width="100px" ref="doughnutChart6"/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="scss">
@import '../../assets/scss/common.css';
@import '../../assets/scss/sub.css';

</style>
<script>
// 메뉴
import HeaderComp from "../pages/HeaderComp.vue";
// API
import axios from "axios";
// 날짜
import moment from "moment";
// 차트
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  name: 'DashBoard',

  components : {
    HeaderComp
  },

  data() {
  return {
    // 시/도, 시/군/도, 관리기관
    orgNm:'', orgId:'', sido:'', sidoCd:'', sgg:'', sggCd:'', 
    sidoItems:[], sggItems:[], orgmItems:[],
    selectedSidoItems:'', selectedSggItems:'', selectedOrgItems:'',
    // 날짜
    s_date: null, e_date: null, e_date1:null,
    errorpopup1: false, errorpopup2: false,
    // 설치 가구수, 응급관리요원, 생활 관리사
    setCount: 0, setEMCount: 0, setLMCount: 0,
    // A/S 현황
    ASs_date: null, ASe_date: null,
    gwrqCount: 0, gwrcCount: 0, gwcpCount: 0, gwcaCount: 0,
    emrqCount: 0, emrcCount: 0, emcpCount: 0, emcaCount: 0,
    acrqCount: 0, acrcCount: 0, accpCount: 0, accaCount: 0,
    firqCount: 0, fircCount: 0, ficpCount: 0, ficaCount: 0,
    dorqCount: 0, dorcCount: 0, docpCount: 0, docaCount: 0,
    lirqCount: 0, lircCount: 0, licpCount: 0, licaCount: 0,
    // 차트
    EuchartData: null, EuchartOptions: null, EuchartImage: null,
    EvchartData1: null, EvchartOptions1: null, EvchartImage1: null,
    TodayEventData: null, TodayEventOptions: null, TodayEventImage: null,
    BtchartData: null, BtchartOptions: null, BtchartImage: null,
    EuData: [ 82, 89, 23, 75, 42, 63, 87 ], TotalEuData: [ 88, 95, 85, 94, 82, 88, 98 ], EuChartItems:[], EuTodayChartItems:[],
    EvFireData: [ 12, 19, 7, 5, 8, 13, 7 ], EvEmData: [10, 12, 11, 10, 10, 15, 9], EvSafeData:[5, 12, 10, 7, 7, 8, 17], EvChartItems:[],
    TodayFireData: [7], TodayEmData: [9], TodaySafeData:[17],
    BtFullData: [ 12, 19, 7, 5, 8, 13], BtLackData: [10, 12, 11, 10, 10, 15], BtChangeData:[5, 12, 10, 7, 7, 8],
    newEuArr:[], newTotalEuArr:[],
    newEvChartArr:[], newEvFireArr:[],newEvEmArr:[],newEvSafeArr:[],
    newTodayChartArr:[],newTodayFireData: [], newTodayEmData: [], newTodaySafeData:[],
    newBtFullArr:[], newBtLackArr:[], newBtChangeArr:[],
    newEuChartLabelArr:[], newEuChartMMLabelArr:[], newEuChartDDLabelArr:[],
    newEvChartLabelArr:[], newEvChartMMLabelArr:[], newEvChartDDLabelArr:[],
    newBtChartLabelArr:[], newBtChartMMLabelArr:[], newBtChartDDLabelArr:[],
    checkStartDate:moment().subtract(6,'days').format('YYYY-MM-DD'),
    checkEndDate:moment().format('YYYY-MM-DD'),

    PwchartData1: null,
    PwchartData2: null,
    PwchartData3: null,
    PwchartData4: null,
    PwchartData5: null,
    PwchartData6: null,
    PwchartOptions: null,
    PwchartImage1: null,
    PwchartImage2: null,
    PwchartImage3: null,
    PwchartImage4: null,
    PwchartImage5: null,
    PwchartImage6: null,

    
    PwGwData: [7, 5],
    percentPwGwData:'',
    finalPwGwData1: [],
    finalPwGwData2: [],
    PwEmData: [22, 2, 3],
    percentPwEmData:'',
    sumPwEmData1:'',
    sumPwEmData2:'',
    sumPwEmData3:'',
    finalPwEmData1:[],
    finalPwEmData2:[],
    finalPwEmData3:[],
    PwFiData:[22, 2, 3],
    percentPwFiData:'',
    sumPwFiData1:'',
    sumPwFiData2:'',
    sumPwFiData3:'',
    finalPwFiData1:[],
    finalPwFiData2:[],
    finalPwFiData3:[],
    PwDoData: [22, 2, 3],
    percentPwDoData:'',
    sumPwDoData1:'',
    sumPwDoData2:'',
    sumPwDoData3:'',
    finalPwDoData1:[],
    finalPwDoData2:[],
    finalPwDoData3:[],
    PwAcData: [22, 17, 8],
    percentPwAcData:'',
    sumPwAcData1:'',
    sumPwAcData2:'',
    sumPwAcData3:'',
    finalPwAcData1:[],
    finalPwAcData2:[],
    finalPwAcData3:[],
    PwLiData: [22, 17, 8],
    percentPwLiData:'',
    sumPwLiData1:'',
    sumPwLiData2:'',
    sumPwLiData3:'',
    finalPwLiData1:[],
    finalPwLiData2:[],
    finalPwLiData3:[],
    PwChartItems:[],
    newPwGwArr:[],
    newPwEmArr:[],
    newPwFiArr:[],
    newPwDoArr:[],
    newPwAcArr:[],
    newPwLiArr:[],
  }
  },
  created(){
    this.getSidoData();
    this.getSggData();
    this.getOrgmData();
    this.s_date=moment().subtract(6, 'days').format('YYYY-MM-DD');
    this.e_date=moment().format('YYYY-MM-DD');
    this.getTotalCount();
    this.ASs_date = this.s_date;
    this.ASe_date = this.e_date;
    this.ASs_date=moment().subtract(999, 'days').format('YYYY-MM-DD');
    this.ASe_date=moment().format('YYYY-MM-DD');
    this.getASCount();
  },
  mounted(){
    this.createEuData();
    this.createTodayEvData();
    this.createEvData();
    this.createBtData();
    this.createPwData();
  },
  methods:{
    //--------------------------시/도--------------------------
    getSidoData() {
      axios.get(this.$store.state.serverApi + "/admin/address/sido", {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          this.sidoItems=[];
          this.sidoItems.push({label: '전체', value: ''});
          for(let i=0; i<response.data.data.length; i++) {
            this.sidoItems.push({
              label: response.data.data[i].sido,
              value: response.data.data[i].sidoCd
            });
          }  
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    //--------------------------시/군/구--------------------------
    getSggData() {
      this.selectedSggItems = ''
      let url =this.$store.state.serverApi + "/admin/address/sgg";
      if(this.sidoCd != ''){
        url += "?sidoCd="+this.sidoCd;
      }else{
        this.selectedSggItems = ''
        this.sggItems=[];
        this.sggItems.push({label: '전체', value: ''});
        return ; 
      }
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          const tempArr = [{label: '전체', value: ''}];
          let tmpResult2 = [{label: '전체', value: ''}];
          for(let i=0; i<response.data.data.length; i++) {
            tempArr.push({
              label: response.data.data[i].sgg,
              value: response.data.data[i].sggCd,
              value2: response.data.data[i].sidoCd
            });
          } 
          let tmpResult = tempArr.filter(cd=>{
            return cd.value2 === this.sidoCd
          });
          
          this.sggItems = [...tmpResult2,...tmpResult]
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    //--------------------------관리기관--------------------------
    getOrgmData() {
      this.selectedOrgItems = ''
      let sggCode = ''
      let url =this.$store.state.serverApi + "/admin/organizations";
      if(this.sggCd != ''){
        if(this.sggCd.startsWith('0', 4) === true){
          sggCode = this.sggCd.substring(0,4)
        }else{
          sggCode = this.sggCd.substring(0, 5)
        }
        url += "?sggCd="+sggCode;
      }else{
        this.selectedOrgItems = ''
        this.orgmItems=[];
        this.orgmItems.push({label: '전체', value: ''});
        return ; 
      }
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          const tmpArr = [{label: '전체', value: ''}];
          let tmpResult2 = [{label: '전체', value: ''}];
          this.orgmItems=[];
          for(let i=0; i<response.data.data.length; i++) {
            tmpArr.push({
              label: response.data.data[i].orgNm,
              value: response.data.data[i].orgId,
            });
          } 
          let tmpResult = tmpArr
          this.orgmItems = [...tmpResult2,...tmpResult]
        this.orgmItems=tmpArr;
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    onChangeSgg(event){
      this.sidoCd = event.target.value
      this.getSggData()
      this.sggCd = ''
      this.getOrgmData()
    },
    onChangeOrg(event) {
      this.sggCd = event.target.value
      this.getOrgmData()
    },
    //--------------------------총 설치 가구수--------------------------
    getTotalCount(){
      let addrCd = ''
      if(this.selectedSidoItems != '' && this.selectedSggItems == ''){
        addrCd = this.sidoCd.substring(0,2)
      }else if(this.selectedSggItems != ''){
        if(this.sggCd.startsWith('0', 4) === true){
          addrCd = this.sggCd.substring(0,4)
        }else{
          addrCd = this.sggCd.substring(0,5)
        }
      }else{
        addrCd = ''
      }
      let url =this.$store.state.serverApi + "/admin/organizations/stat/total?orgId="+this.selectedOrgItems+"&addrCd="+addrCd+"&startDate="+this.s_date+"&endDate="+this.e_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          let totalCData = response.data.data
          let totalCArrToString = ''
          let EMCArrToString = ''
          let LMCArrToString = ''
          totalCArrToString = totalCData.filter(cd=>{
            return cd.typeCd ==="1"
          })
          EMCArrToString = totalCData.filter(cd=>{
            return cd.typeCd ==="2"
          })
          LMCArrToString = totalCData.filter(cd=>{
            return cd.typeCd ==="3"
          })
          this.setCount =totalCArrToString[0].typeCnt
          this.setEMCount =EMCArrToString[0].typeCnt
          this.setLMCount =LMCArrToString[0].typeCnt
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    //--------------------------장비 가동률 차트--------------------------
    createEuData(){
      let data={
      labels: [],
      labelsColor: 'rgba(17, 183, 1, 1)',
      datasets: [{
        label: '지역 가동률',
        type: 'line',
        data: this.EuData,
        borderColor:'rgba(17, 183, 135, 1)',
        borderWidth: 3.5,
        tension: 0.5,
        fill: true,
        backgroundColor: 'rgba(17, 183, 135, 0.3)',
        animation: {        
          easing: 'easeInOutQuart'
        }
      },
      {
        label: '전체 가동률',
        type: 'line',
        data: this.TotalEuData,
        borderColor:'rgba(30, 118, 225, 1)',
        borderWidth: 3.5,
        tension: 0.5,
        fill: true,
        backgroundColor: 'rgba(30, 118, 225, 0.3)',
        animation: {        
          easing: 'easeInOutQuart'
        }
      }]
      }
      let options={
        scales: {
          x:{
            ticks:{
              color: "rgba(255, 255, 255, 1)"
            }
          },
          y: {
            beginAtZero: true,
            ticks:{
              min: 0,
              max: 100,
              stepSize: 5,
              color: "rgba(255, 255, 255, 1)"
            }
          }
        },
        plugins:{
          legend: {
		        display: true,
            position: 'top',
            align: 'end',
            labels:{
              color: "rgba(255, 255, 255, 1)",
              boxWidth: 8,
              usePointStyle: true
            }
		      },
        tooltip: { boxWidth: 10, bodyFont: { size: 15 } }
        }
      }
      this.EuchartData = data
      this.EuchartOptions = options
      this.createEuChartDateTime()
      this.EuchartRedraw();
    },
    EuchartRedraw(){
      this.EuchartImage = new Chart(this.$refs.lineChart,{
        type:'line',
        data:this.EuchartData,
        options:this.EuchartOptions
      })
      this.EuchartImage.update();
    },
    createEuChartDateTime(){
      if(this.EuchartData){
        let tmp = this.EuchartData.datasets[0].data.length
        let nowDate = moment().add(1,'days').format('MM-DD');
        let tmpArr = []
        for(let i=tmp ; i>0; i--){
          tmpArr.push(moment(nowDate).subtract(1*i, 'days').format('MM-DD'))
        }
        this.EuchartData.labels = tmpArr
      }
    },
    async remakeEuData(){
      this.EuchartImage.destroy();
      let addrCd = ''
      if(this.selectedSidoItems != '' && this.selectedSggItems == ''){
        addrCd = this.sidoCd.substring(0,2)
      }else if(this.selectedSggItems != ''){
        if(this.sggCd.startsWith('0', 4) === true){
          addrCd = this.sggCd.substring(0,4)
        }else{
          addrCd = this.sggCd.substring(0,5)
        }
      }else{
        addrCd = ''
      }
      this.e_date =  moment(this.s_date).add(6,'days').format('YYYY-MM-DD')
      let urlEuTodayChart = this.$store.state.serverApi + "/admin/organizations/stat/oper?startDate="+this.s_date+"&endDate="+this.e_date;
      let urlEuChart = this.$store.state.serverApi + "/admin/organizations/stat/oper?addrCd="+addrCd+"&orgId="+this.selectedOrgItems+"&startDate="+this.s_date+"&endDate="+this.e_date;
      // 전체 가동률
      await axios.get(urlEuTodayChart, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          this.EuTodayChartItems=[];     
          for(let i=0; i<response.data.data.length; i++) {
            this.EuTodayChartItems.push({
              statDate: response.data.data[i].statDate,
              installCnt: response.data.data[i].installCnt,
              operCnt: response.data.data[i].operCnt,
            });
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      // 장비 가동률
      await axios.get(urlEuChart, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          this.EuChartItems=[];     
          for(let i=0; i<response.data.data.length; i++) {
            this.EuChartItems.push({
              statDate: response.data.data[i].statDate,
              installCnt: response.data.data[i].installCnt,
              operCnt: response.data.data[i].operCnt,
            });
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      let tmpArr1 = []
      let tmpArr2 = []
      let checkAll = ''
      let checkAll2 = ''
      this.newEuArr=[]
      this.newTotalEuArr = []
      this.newEuChartLabelArr=[]
      this.newEuChartMMLabelArr=[]
      this.newEuChartDDLabelArr=[]

      checkAll = this.EuChartItems.filter(cd=>{
        return cd.statDate === "ALL"
      })
      checkAll2 = this.EuTodayChartItems.filter(cd=>{
        return cd.statDate === "ALL"
      })
      for(let i=0; i<7; i++){
        tmpArr1.push({
          statDate: moment(this.s_date).add(i,'days').format('YYYYMMDD'),
          installCnt:0,
          operCnt: 0,
        })
        tmpArr2.push({
          statDate: moment(this.s_date).add(i,'days').format('YYYYMMDD'),
          installCnt:0,
          operCnt: 0,
        })
      }
      if(checkAll.length !== 0){
      tmpArr1.push({
        statDate: checkAll[0].statDate,
        installCnt: checkAll[0].installCnt,
        operCnt: checkAll[0].operCnt
      })
      }
      if(checkAll2.length !== 0){
        tmpArr2.push({
        statDate: checkAll2[0].statDate,
        installCnt: checkAll2[0].installCnt,
        operCnt: checkAll2[0].operCnt
      })
      }
      if(this.EuChartItems != ''){
      for(let i=0; i<this.EuChartItems.length; i++){
        if(this.EuChartItems[i].installCnt !== 0){
          let tmpidx = tmpArr1.findIndex(idx =>{
            return idx.statDate === this.EuChartItems[i].statDate
          })
          tmpArr1[tmpidx].installCnt = this.EuChartItems[i].installCnt
          tmpArr1[tmpidx].operCnt = this.EuChartItems[i].operCnt
        }else{
          tmpArr1[i].installCnt = "0"
          tmpArr1[i].operCnt = "0"
        }
      }}else{
        for(let i=0; i<7; i++){
        tmpArr1[i] = {
          statDate: moment(this.s_date).add(i,'days').format('YYYYMMDD'),
          installCnt:0,
          operCnt: 0,
        }
      }}
      if(this.EuTodayChartItems != ''){
      for(let i=0; i<this.EuTodayChartItems.length; i++){
        if(this.EuTodayChartItems[i].installCnt !== 0){
          let tmpidx = tmpArr2.findIndex(idx =>{
            return idx.statDate === this.EuTodayChartItems[i].statDate
          })
          tmpArr2[tmpidx].installCnt = this.EuTodayChartItems[i].installCnt
          tmpArr2[tmpidx].operCnt = this.EuTodayChartItems[i].operCnt
        }else{
          tmpArr2[i].installCnt = "0"
          tmpArr2[i].operCnt = "0"
        }
      }}else{
        for(let i=0; i<7; i++){
        tmpArr2[i] = {
          statDate: moment(this.s_date).add(i,'days').format('YYYYMMDD'),
          installCnt:0,
          operCnt: 0,
        }
      }}

      if(checkAll.length !== 0){
      for(let i=0; i<tmpArr1.length-1; i++){
        tmpArr1[i].installCnt = Number(tmpArr1[i].installCnt)+Number(checkAll[0].installCnt)
      }
      }
      if(checkAll2.length !== 0){
      for(let i=0; i<tmpArr2.length-1; i++){
        tmpArr2[i].installCnt = Number(tmpArr2[i].installCnt)+Number(checkAll2[0].installCnt)
      }
      }
      if(this.EuChartItems != ''){
        for(let i=0; i<7; i++){
          if(tmpArr1[i].installCnt !== 0){
          this.newEuArr[i] = (tmpArr1[i].operCnt/tmpArr1[i].installCnt*100)
          this.newEuArr[i] = Math.round(this.newEuArr[i])
          }else{
            this.newEuArr[i] = 0
          }
          this.newEuChartMMLabelArr.push(tmpArr1[i].statDate.substring(4, 6))
          this.newEuChartDDLabelArr.push(tmpArr1[i].statDate.substring(6, 8))
          this.newEuChartLabelArr.push(this.newEuChartMMLabelArr[i] +"-"+ this.newEuChartDDLabelArr[i])
        }
      }else{
        for(let i=0; i<7; i++){
            this.newEuArr[i] = 0
            this.newEuChartMMLabelArr.push(tmpArr1[i].statDate.substring(4, 6))
            this.newEuChartDDLabelArr.push(tmpArr1[i].statDate.substring(6, 8))
            this.newEuChartLabelArr.push(this.newEuChartMMLabelArr[i] +"-"+ this.newEuChartDDLabelArr[i])
        }
      }
      if(this.EuTodayChartItems != ''){
        for(let i=0; i<7; i++){
          if(tmpArr2[i].installCnt !== 0){
          this.newTotalEuArr[i] = (tmpArr2[i].operCnt/tmpArr2[i].installCnt*100)
          this.newTotalEuArr[i] = Math.round(this.newTotalEuArr[i])
          }else{
            this.newTotalEuArr[i] = 0
          }
        }
      }else{
        for(let i=0; i<7; i++){
            this.newTotalEuArr[i] = 0
        }
      }
      this.EuData = this.newEuArr
      this.TotalEuData = this.newTotalEuArr
      this.EuchartData.datasets[0].data = this.EuData
      this.EuchartData.datasets[1].data = this.newTotalEuArr
      this.EuchartData.labels = this.newEuChartLabelArr
      this.EuchartRedraw();
    },
    //--------------------------응급 이벤트 차트--------------------------
    createEvData(){
      let data1 =  {
      labels: [],
      labelsColor: 'rgba(17, 183, 1, 1)',
      datasets: [
        {
        label: '화재',
        data: this.EvFireData,
        maxBarThickness: 10,    
        backgroundColor: ["rgba(19, 126, 255, 0.8)"],
        borderRadius: 30
        },
        {
        label: '응급',
        data: this.EvEmData,
        maxBarThickness: 10,  
        backgroundColor: ['rgba(17, 183, 135, 1)'],
        borderRadius: 30
      },
      {
        label:'119',
        data: this.EvSafeData,
        maxBarThickness: 10,  
        backgroundColor: ["rgba(255, 60, 166, 0.8)"],
        borderRadius: 30
      },
      ]}
      let options1={
      scales: {
        x: {
          ticks:{
            color: "rgba(255, 255, 255, 1)"
          }
        },
        y: {
          beginAtZero: true,
          ticks:{
            stepSize: 1,
            color: "rgba(255, 255, 255, 1)"
          }
        }
      },
      plugins:{
        legend: {
		      display: false,
          position: 'top',
          align: 'end',
          labels: {
            color: "rgba(255, 255, 255, 1)",
            boxWidth: 8,
            usePointStyle: true
          },
		    },
        tooltip: { boxWidth: 10, bodyFont: { size: 15 } }
      }
    }
    this.EvchartData1 = data1
    this.EvchartOptions1 = options1
    this.createEvChartDateTime()
    this.EvchartRedraw();
    },
    EvchartRedraw(){  
      this.EvchartImage1 = new Chart(this.$refs.BarChart1, {
        type:'bar',
        data:this.EvchartData1,
        options:this.EvchartOptions1,
      })
      this.EvchartImage1.update();
    },
    createEvChartDateTime(){
      if(this.EvchartData1){
        let tmp = this.EvchartData1.datasets[0].data.length
        let nowDate = moment().add(1,'days').format('MM-DD');
        let tmpArr = []
        for(let i=tmp ; i>0; i--){
          tmpArr.push(moment(nowDate).subtract(1*i, 'days').format('MM-DD'))
        }
        this.EvchartData1.labels = tmpArr
      }
    },
    createTodayEvData(){
      let TodayData =  {
      labels: [''],
      labelsColor: 'rgba(17, 183, 1, 1)',
      datasets: [
        {
        label: '화재',
        data: this.TodayFireData,
        backgroundColor: "rgba(19, 126, 255, 0.8)",
        },
        {
        label: '응급',
        data: this.TodayEmData,
        backgroundColor: 'rgba(17, 183, 135, 1)',
      },
      {
        label:'119',
        data: this.TodaySafeData,
        backgroundColor: "rgba(255, 60, 166, 0.8)",
      }]
      }
      let TodayOptions={
      scales: {
        x: {
          display:false,
          stacked: true,
          beginAtZero: true,
          ticks:{
            color: "rgba(255, 255, 255, 1)",
            min: 0,
            max: 100,
            stepSize: 1,
          }
        },
        y: {
          display:false,
          stacked: true,
          beginAtZero: true,
          ticks:{
            min: 0,
            max: 100,
            color: "rgba(255, 255, 255, 1)"
          }
        }
      },
      indexAxis: 'y',
      plugins:{
        legend: {
		      display: false,
          position: 'top',
          align: 'end',
          labels: {
            color: "rgba(255, 255, 255, 1)",
            boxWidth: 8,
            usePointStyle: true
          },
		    },
        tooltip: { boxWidth: 10, bodyFont: { size: 15 } }
      }
    }
    this.TodayEventData = TodayData
    this.TodayEventOptions = TodayOptions
    this.TodayEvchartRedraw();
    },

    TodayEvchartRedraw(){  
      this.TodayEventImage = new Chart(this.$refs.BarChart2, {
        type:'bar',
        data: this.TodayEventData,
        options: this.TodayEventOptions
      })
      this.TodayEventImage.update();
    },
    async remakeEvData(){
      this.EvchartImage1.destroy();  
      this.TodayEventImage.destroy();
      let addrCd = ''
      if(this.selectedSidoItems != '' && this.selectedSggItems == ''){
        addrCd = this.sidoCd.substring(0,2)
      }else if(this.selectedSggItems != ''){
        if(this.sggCd.startsWith('0', 4) === true){
          addrCd = this.sggCd.substring(0,4)
        }else{
          addrCd = this.sggCd.substring(0,5)
        }
      }else{
        addrCd = ''
      }
      this.e_date = moment(this.s_date).add(6,'days').format('YYYY-MM-DD')
      this.e_date1 = moment(this.s_date).add(7,'days').format('YYYY-MM-DD')
      let urlEventStatus = this.$store.state.serverApi + "/admin/organizations/stat/alarm?addrCd="+addrCd+"&orgId="+this.selectedOrgItems+"&startDate="+this.s_date+"&endDate="+this.e_date
      await axios.get(urlEventStatus, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            const EvtempArr = [];
            this.EvChartItems=[];     
            for(let i=0; i<response.data.data.length; i++) {
              EvtempArr.push({
                eventCd: response.data.data[i].eventCd,
                alarmCnt: response.data.data[i].alarmCnt,
                occurDate: response.data.data[i].occurDate,
              });
            } 
            this.EvChartItems=EvtempArr;
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });


      let tmpArr1 = []
      let tmpArr2 = []
      let tmpArr3 = []
      let tmpArr4 = []
      this.newEvChartArr=[]
      this.newEvFireArr = []
      this.newEvEmArr = []
      this.newEvSafeArr = []
      this.newTodayChartArr=[]
      this.newEvChartLabelArr=[]
      this.newEvChartMMLabelArr=[]
      this.newEvChartDDLabelArr=[]

      for(let i=0; i<7; i++){
        tmpArr1.push({
          alarmCnt:0,
          eventCd: null,
          occurDate: moment(this.s_date).add(i,'days').format('YYYYMMDD'),
        })
        tmpArr2.push({
          alarmCnt:0,
          eventCd: null,
          occurDate: moment(this.s_date).add(i,'days').format('YYYYMMDD'),
        })
        tmpArr3.push({
          alarmCnt:0,
          eventCd: null,
          occurDate: moment(this.s_date).add(i,'days').format('YYYYMMDD'),
        })
      }
      for(let i=0; i<this.EvChartItems.length; i++){
        if(this.EvChartItems[i].eventCd==="E1013"){
          let tmpidx = tmpArr1.findIndex(idx =>{
            return idx.occurDate == this.EvChartItems[i].occurDate
          })
          tmpArr1[tmpidx].alarmCnt = this.EvChartItems[i].alarmCnt
          tmpArr1[tmpidx].eventCd = this.EvChartItems[i].eventCd
        }
        if(this.EvChartItems[i].eventCd==="E1016"){
          let tmpidx = tmpArr2.findIndex(idx =>{
            return idx.occurDate == this.EvChartItems[i].occurDate
          })
          tmpArr2[tmpidx].alarmCnt = this.EvChartItems[i].alarmCnt
          tmpArr2[tmpidx].eventCd = this.EvChartItems[i].eventCd
        }
        if(this.EvChartItems[i].eventCd==="E1014"){
          let tmpidx = tmpArr3.findIndex(idx =>{
            return idx.occurDate == this.EvChartItems[i].occurDate
          })
          tmpArr3[tmpidx].alarmCnt = this.EvChartItems[i].alarmCnt
          tmpArr3[tmpidx].eventCd = this.EvChartItems[i].eventCd
        }
      }
      for(let i=0; i<7; i++){
        this.newEvFireArr.push(tmpArr1[i].alarmCnt)
        this.newEvEmArr.push(tmpArr2[i].alarmCnt)
        this.newEvSafeArr.push(tmpArr3[i].alarmCnt)
        this.newEvChartMMLabelArr.push(tmpArr1[i].occurDate.substring(4, 6))
        this.newEvChartDDLabelArr.push(tmpArr1[i].occurDate.substring(6, 8))
        this.newEvChartLabelArr.push(this.newEvChartMMLabelArr[i] +"-"+ this.newEvChartDDLabelArr[i])
      }
      let e_date1=''
      let e_date2=''
      let e_date3=''
      let e_date4=''
      e_date1 = this.e_date.substring(0,4)
      e_date2 = this.e_date.substring(5,7)
      e_date3 = this.e_date.substring(8,10)
      e_date4 = e_date1 + e_date2 + e_date3
      
      this.newTodayChartArr = this.EvChartItems.filter(cd=>{
        return cd.occurDate === e_date4
      })
      let newFi = []
      let newEm = []
      let newSa = []
      this.newTodayFireData = []
      this.newTodayEmData = []
      this.newTodaySafeData = []
      newFi = this.newTodayChartArr.filter(cd=>{
        return cd.eventCd === 'E1013'
      })
      newEm = this.newTodayChartArr.filter(cd=>{
        return cd.eventCd === 'E1016'
      })
      newSa = this.newTodayChartArr.filter(cd=>{
        return cd.eventCd === 'E1014'
      })
      if(newFi.length !== 0){
      this.newTodayFireData.push(newFi[0].alarmCnt)
      }else{
        this.newTodayFireData[0] = 0
      }
      if(newEm.length !== 0){
      this.newTodayEmData.push(newEm[0].alarmCnt)
      }else{
        this.newTodayEmData[0] = 0
      }
      if(newSa.length !== 0){
      this.newTodaySafeData.push(newSa[0].alarmCnt)
      }else{
        this.newTodaySafeData[0] = 0
      }


      this.EvFireData = this.newEvFireArr
      this.EvEmData = this.newEvEmArr
      this.EvSafeData = this.newEvSafeArr
      this.TodayFireData = this.newTodayFireData
      this.TodayEmData = this.newTodayEmData
      this.TodaySafeData = this.newTodaySafeData
      this.EvchartData1.datasets[0].data = this.EvFireData
      this.EvchartData1.datasets[1].data = this.EvEmData
      this.EvchartData1.datasets[2].data = this.EvSafeData
      this.EvchartData1.labels = this.newEvChartLabelArr
      this.TodayEventData.datasets[0].data = this.TodayFireData
      this.TodayEventData.datasets[1].data = this.TodayEmData
      this.TodayEventData.datasets[2].data = this.TodaySafeData
      this.TodayEvchartRedraw();
      this.EvchartRedraw();
      
    },
    //--------------------------배터리 상태 차트--------------------------
    createBtData(){
      let data = {
        type: 'bar',
        labels: [ 'GW', '응급', '활동', '화재', '출입문', '생활'],
        datasets: [{
        label: '양호',
        maxBarThickness: 12,  
        data: this.BtFullData,
        borderRadius: 30,
        backgroundColor: [
          "rgba(19, 126, 255, 0.8)",
          ],
      },{
        label: '부족',
        maxBarThickness: 12,
        data: this.BtLackData,
        borderRadius: 30,
        backgroundColor: [
          'rgba(17, 183, 135, 1)',
          ],
      },{
        label: '교체',
        maxBarThickness: 12,
        data: this.BtChangeData,
        borderRadius: 30,
        backgroundColor: [
          "rgba(255, 60, 166, 0.8)",
          ],
      }]
      }
      let options={
        scales: {
          x: {
            ticks: {
              color: "rgba(255, 255, 255, 1)"
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: "rgba(255, 255, 255, 1)"
            }
          }
        },
        plugins:{
          legend: {
		        display: true,
            fontColor: "#959dad",
            position: 'top',
            align: 'end',
            labels: {
              color: "rgba(255, 255, 255, 1)",
              boxWidth: 8,
              usePointStyle: true
            },
		      },
          tooltip: { boxWidth: 10, bodyFont: { size: 15 } }
        }
      }
      this.BtchartData = data
      this.BtchartOptions = options
      this.BtchartRedraw();
    },
    BtchartRedraw(){
      this.BtchartImage = new Chart(this.$refs.barChart, {
        type:'bar',
        data:this.BtchartData,
        options:this.BtchartOptions
      })      
      this.BtchartImage.update();
    },
    async remakeBtData(){
      this.BtchartImage.destroy();
      let addrCd = ''
      if(this.selectedSidoItems != '' && this.selectedSggItems == ''){
        addrCd = this.sidoCd.substring(0,2)
      }else if(this.selectedSggItems != ''){
        if(this.sggCd.startsWith('0', 4) === true){
          addrCd = this.sggCd.substring(0,4)
        }else{
          addrCd = this.sggCd.substring(0,5)
        }
      }else{
        addrCd = ''
      }
      this.e_date =  moment(this.s_date).add(6,'days').format('YYYY-MM-DD')
      let urlBattery =this.$store.state.serverApi + "/admin/organizations/stat/battery?addrCd="+addrCd+"&orgId="+this.selectedOrgItems+"&startDate="+this.s_date+"&endDate="+this.e_date;
      await axios.get(urlBattery, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            const BttempArr = [];
            this.BtChartItems=[];     
            for(let i=0; i<response.data.data.length; i++) {
              BttempArr.push({
                sensorTypeCd: response.data.data[i].sensorTypeCd,
                statName: response.data.data[i].statName,
                statCnt: response.data.data[i].statCnt,
              });
            } 
            this.BtChartItems=BttempArr;
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });

          let tmpArr1 = []
          let tmpArr2 = []
          let tmpArr3 = []
          this.newBtFullArr = []
          this.newBtLackArr = []
          this.newBtChangeArr = []

          for(let i=0; i<6; i++){
            tmpArr1.push({
              sensorTypeCd: "TPE00"+i,
              statName: "충만",
              statCnt: 0,
            })
          }
          for(let i=0; i<6; i++){
            tmpArr2.push({
              sensorTypeCd: "TPE00"+i,
              statName: "부족",
              statCnt: 0,
            })
          }
          for(let i=0; i<6; i++){
            tmpArr3.push({
              sensorTypeCd: "TPE00"+i,
              statName: "교체",
              statCnt: 0,
            })
          }
          if(this.BtChartItems != ''){
            for(let i=0; i<this.BtChartItems.length; i++){
              if(!this.BtChartItems[i]){
                break;
              }else if(this.BtChartItems[i].statName==="충만"){
                let tmpidx = tmpArr1.findIndex(idx=>{
                  return idx.sensorTypeCd == this.BtChartItems[i].sensorTypeCd
                })
                tmpArr1[tmpidx].statName = this.BtChartItems[i].statName
                tmpArr1[tmpidx].statCnt = this.BtChartItems[i].statCnt
              }else if(this.BtChartItems[i].statName==="부족"){
                let tmpidx = tmpArr2.findIndex(idx=>{
                  return idx.sensorTypeCd == this.BtChartItems[i].sensorTypeCd
                })
                tmpArr2[tmpidx].statName = this.BtChartItems[i].statName
                tmpArr2[tmpidx].statCnt = this.BtChartItems[i].statCnt
              }else if(this.BtChartItems[i].statName==="교체"){
                let tmpidx = tmpArr3.findIndex(idx=>{
                  return idx.sensorTypeCd == this.BtChartItems[i].sensorTypeCd
                })
                tmpArr3[tmpidx].statName = this.BtChartItems[i].statName
                tmpArr3[tmpidx].statCnt = this.BtChartItems[i].statCnt
              }
            }
          }
          if(this.BtChartItems != ''){
            for(let i=0; i<6; i++){
              this.newBtFullArr.push(tmpArr1[i].statCnt)
              this.newBtLackArr.push(tmpArr2[i].statCnt)
              this.newBtChangeArr.push(tmpArr3[i].statCnt)
            }
          }else{
            for(let i=0; i<6; i++){
              this.newBtFullArr.push(tmpArr1.statCnt)
              this.newBtLackArr.push(tmpArr2.statCnt)
              this.newBtChangeArr.push(tmpArr3.statCnt)
            }
          }
      this.BtFullData = this.newBtFullArr
      this.BtLackData = this.newBtLackArr
      this.BtChangeData = this.newBtChangeArr
      this.BtchartData.datasets[0].data = this.BtFullData
      this.BtchartData.datasets[1].data = this.BtLackData
      this.BtchartData.datasets[2].data = this.BtChangeData
      this.BtchartRedraw();
    },
    //--------------------------전원연결 차트--------------------------
    createPwData(){
      this.percentPwGwData = this.PwGwData[0]+this.PwGwData[1]
      this.finalPwGwData1 = [Math.round((this.PwGwData[0]/this.percentPwGwData)*100), Math.round((this.PwGwData[1]/this.percentPwGwData)*100)]
      this.finalPwGwData2 = [Math.round((this.PwGwData[1]/this.percentPwGwData)*100), Math.round((this.PwGwData[0]/this.percentPwGwData)*100)]
      let data1 = {
        type: 'doughnut',
        labels: [],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.finalPwGwData1,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(75, 85, 106, 0.2)"],
        borderColor: 'rgba(255, 255, 255, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 0,
        cutout: '65%', 
        borderRadius: 30
      },
      {
        label: '차단',
        data: this.finalPwGwData2,
        backgroundColor: [ "rgba(173, 176, 187, 0.8)", "rgba(75, 85, 106, 0.2)"],
        borderColor: 'rgba(255, 255, 255, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 0,
        borderRadius: 30,
        cutout: '60%', 
      }]
      }
      this.percentPwEmData = this.PwEmData[0]+this.PwEmData[1]+this.PwEmData[2]
      this.sumPwEmData1 = this.PwEmData[0] + this.PwEmData[1]
      this.sumPwEmData2 = this.PwEmData[1] + this.PwEmData[2]
      this.sumPwEmData3 = this.PwEmData[0] + this.PwEmData[2]
      this.finalPwEmData1 = [Math.round((this.PwEmData[0]/this.percentPwEmData)*100), Math.round((this.sumPwEmData2/this.percentPwEmData)*100)]
      this.finalPwEmData2 = [Math.round((this.PwEmData[1]/this.percentPwEmData)*100), Math.round((this.sumPwEmData3/this.percentPwEmData)*100)]
      this.finalPwEmData3 = [Math.round((this.PwEmData[2]/this.percentPwEmData)*100), Math.round((this.sumPwEmData1/this.percentPwEmData)*100)]
      let data2 = {
        type: 'doughnut',
        labels: [],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.finalPwEmData1,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '60%', 
        borderRadius: 30
      },
      {
        label: '연결',
        data: this.finalPwEmData2,
        backgroundColor: [ "rgba(173, 176, 187, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '53.5%', 
        borderRadius: 30
      },
      {
        label: '연결',
        data: this.finalPwEmData3,
        backgroundColor: [ "rgba(255, 60, 166, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '50%', 
        borderRadius: 30
      }]
      }
      this.percentPwFiData = this.PwFiData[0] + this.PwFiData[1] + this.PwFiData[2]
      this.sumPwFiData1 = this.PwFiData[0] + this.PwFiData[1]
      this.sumPwFiData2 = this.PwFiData[1] + this.PwFiData[2]
      this.sumPwFiData3 = this.PwFiData[0] + this.PwFiData[2]
      this.finalPwFiData1 = [Math.round((this.PwFiData[0]/this.percentPwFiData)*100), Math.round((this.sumPwFiData2/this.percentPwFiData)*100)]
      this.finalPwFiData2 = [Math.round((this.PwFiData[1]/this.percentPwFiData)*100), Math.round((this.sumPwFiData3/this.percentPwFiData)*100)]
      this.finalPwFiData3 = [Math.round((this.PwFiData[2]/this.percentPwFiData)*100), Math.round((this.sumPwFiData1/this.percentPwFiData)*100)]
      let data3 = {
        type: 'doughnut',
        labels: [],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.finalPwFiData1,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '60%', 
        borderRadius: 30
      },
      {
        label: '연결',
        data: this.finalPwFiData2,
        backgroundColor: [ "rgba(173, 176, 187, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '53.5%', 
        borderRadius: 30
      },
      {
        label: '연결',
        data: this.finalPwFiData3,
        backgroundColor: [ "rgba(255, 60, 166, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '50%', 
        borderRadius: 30
      }]
      }
      this.percentPwDoData = this.PwDoData[0] + this.PwDoData[1] + this.PwDoData[2]
      this.sumPwDoData1 = this.PwDoData[0] + this.PwDoData[1]
      this.sumPwDoData2 = this.PwDoData[1] + this.PwDoData[2]
      this.sumPwDoData3 = this.PwDoData[0] + this.PwDoData[2]
      this.finalPwDoData1 = [Math.round((this.PwDoData[0]/this.percentPwDoData)*100), Math.round((this.sumPwDoData2/this.percentPwDoData)*100)]
      this.finalPwDoData2 = [Math.round((this.PwDoData[1]/this.percentPwDoData)*100), Math.round((this.sumPwDoData3/this.percentPwDoData)*100)]
      this.finalPwDoData3 = [Math.round((this.PwDoData[2]/this.percentPwDoData)*100), Math.round((this.sumPwDoData1/this.percentPwDoData)*100)]
      let data4 = {
        type: 'doughnut',
        labels: [],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.finalPwDoData1,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '60%', 
        borderRadius: 30
      },
      {
        label: '연결',
        data: this.finalPwDoData2,
        backgroundColor: [ "rgba(173, 176, 187, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '53.5%', 
        borderRadius: 30
      },
      {
        label: '연결',
        data: this.finalPwDoData3,
        backgroundColor: [ "rgba(255, 60, 166, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '50%', 
        borderRadius: 30
      }]
      }
      this.percentPwAcData = this.PwAcData[0] + this.PwAcData[1] + this.PwAcData[2]
      this.sumPwAcData1 = this.PwAcData[0] + this.PwAcData[1]
      this.sumPwAcData2 = this.PwAcData[1] + this.PwAcData[2]
      this.sumPwAcData3 = this.PwAcData[0] + this.PwAcData[2]
      this.finalPwAcData1 = [Math.round((this.PwAcData[0]/this.percentPwAcData)*100), Math.round((this.sumPwAcData2/this.percentPwAcData)*100)]
      this.finalPwAcData2 = [Math.round((this.PwAcData[1]/this.percentPwAcData)*100), Math.round((this.sumPwAcData3/this.percentPwAcData)*100)]
      this.finalPwAcData3 = [Math.round((this.PwAcData[2]/this.percentPwAcData)*100), Math.round((this.sumPwAcData1/this.percentPwAcData)*100)]
      let data5 = {
        type: 'doughnut',
        labels: [],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.finalPwAcData1,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '60%', 
        borderRadius: 30
      },
      {
        label: '연결',
        data: this.finalPwAcData2,
        backgroundColor: [ "rgba(173, 176, 187, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '53.5%', 
        borderRadius: 30
      },
      {
        label: '연결',
        data: this.finalPwAcData3,
        backgroundColor: [ "rgba(255, 60, 166, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '50%', 
        borderRadius: 30
      }]
      }
      this.percentPwLiData = this.PwLiData[0] + this.PwLiData[1] + this.PwLiData[2]
      this.sumPwLiData1 = this.PwLiData[0] + this.PwLiData[1]
      this.sumPwLiData2 = this.PwLiData[1] + this.PwLiData[2]
      this.sumPwLiData3 = this.PwLiData[0] + this.PwLiData[2]
      this.finalPwLiData1 = [Math.round((this.PwLiData[0]/this.percentPwLiData)*100), Math.round((this.sumPwLiData2/this.percentPwLiData)*100)]
      this.finalPwLiData2 = [Math.round((this.PwLiData[1]/this.percentPwLiData)*100), Math.round((this.sumPwLiData3/this.percentPwLiData)*100)]
      this.finalPwLiData3 = [Math.round((this.PwLiData[2]/this.percentPwLiData)*100), Math.round((this.sumPwLiData1/this.percentPwLiData)*100)]
      let data6 = {
        type: 'doughnut',
        labels: [],
        labelsColor: "rgba(255, 255, 255, 1)",
        datasets: [{
        label: '연결',
        data: this.finalPwLiData1,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '60%', 
        borderRadius: 30
      },
      {
        label: '연결',
        data: this.finalPwLiData2,
        backgroundColor: [ "rgba(173, 176, 187, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '53.5%', 
        borderRadius: 30
      },
      {
        label: '연결',
        data: this.finalPwLiData3,
        backgroundColor: [ "rgba(255, 60, 166, 0.8)", "rgba(75, 85, 106, 0.2)", "rgba(75, 85, 106, 0.2)"],
        borderColor: "rgba(75, 85, 106, 0.2)",
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cutout: '50%', 
        borderRadius: 30
      }]
      }
      let options = {
        responsive: false,
        plugins: { 
        legend: { 
          display: false, 
          color: "rgba(255, 255, 255, 1)", 
          position: "bottom", 
          labels: { boxWidth: 10, padding: 6, usePointStyle: true, pointStyle: "circle", font: { size: 14 }, color:"rgba(255, 255, 255, 1)"}, 
          fullSize: false, 
          align: "center" 
          }, 
          tooltip: { boxWidth: 10, bodyFont: { size: 15 } }
        },
        responsive: true, 
        maintainAspectRatio: true, 
        layout: { 
        padding: { 
          top: 2, 
          bottom: 2 
        } 
        }, 
        elements: { 
        arc: { 
          borderWidth: 2 
        } 
        }, 
        animation: { 
          
          // duration: 10
        } 
      }
      this.PwchartData1 = data1
      this.PwchartData2 = data2
      this.PwchartData3 = data3
      this.PwchartData4 = data4
      this.PwchartData5 = data5
      this.PwchartData6 = data6
      this.PwchartOptions = options
      this.PwchartRedraw();
    },
    PwchartRedraw(){
      this.PwchartImage1 = new Chart(this.$refs.doughnutChart1, {
        type:'doughnut',
        data:this.PwchartData1,
        options:this.PwchartOptions
      })
      this.PwchartImage2 = new Chart(this.$refs.doughnutChart2, {
        type:'doughnut',
        data:this.PwchartData2,
        options:this.PwchartOptions
      })
      this.PwchartImage3 = new Chart(this.$refs.doughnutChart3, {
        type:'doughnut',
        data:this.PwchartData3,
        options:this.PwchartOptions
      })
      this.PwchartImage4 = new Chart(this.$refs.doughnutChart4, {
        type:'doughnut',
        data:this.PwchartData4,
        options:this.PwchartOptions
      })
      this.PwchartImage5 = new Chart(this.$refs.doughnutChart5, {
        type:'doughnut',
        data:this.PwchartData5,
        options:this.PwchartOptions
      })
      this.PwchartImage6 = new Chart(this.$refs.doughnutChart6, {
        type:'doughnut',
        data:this.PwchartData6,
        options:this.PwchartOptions
      })
      this.PwchartImage1.update();
      this.PwchartImage2.update();
      this.PwchartImage3.update();
      this.PwchartImage4.update();
      this.PwchartImage5.update();
      this.PwchartImage6.update();
    },

    async remakePwData(){
      this.PwchartImage1.destroy();
      this.PwchartImage2.destroy();
      this.PwchartImage3.destroy();
      this.PwchartImage4.destroy();
      this.PwchartImage5.destroy();
      this.PwchartImage6.destroy();
      let addrCd = ''
      if(this.selectedSidoItems != '' && this.selectedSggItems == ''){
        addrCd = this.sidoCd.substring(0,2)
      }else if(this.selectedSggItems != ''){
        if(this.sggCd.startsWith('0', 4) === true){
          addrCd = this.sggCd.substring(0,4)
        }else{
          addrCd = this.sggCd.substring(0,5)
        }
      }else{
        addrCd = ''
      }
      this.e_date =  moment(this.s_date).add(6,'days').format('YYYY-MM-DD')
      let urlPower = this.$store.state.serverApi + "/admin/organizations/stat/com?addrCd="+addrCd+"&orgId="+this.selectedOrgItems+"&startDate="+this.s_date+"&endDate="+this.e_date
      await axios.get(urlPower, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            const PwtempArr = [];
            this.PwChartItems=[];     
            for(let i=0; i<response.data.data.length; i++) {
              PwtempArr.push({
                sensorTypeCd: response.data.data[i].sensorTypeCd,
                statName: response.data.data[i].statName,
                statCnt: response.data.data[i].statCnt,
              });
            } 
            this.PwChartItems=PwtempArr;
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
          // 각 statName 별로 넣을 배열 초기화
          let tmpArr1 = []
          let tmpArr1_1 = []
          tmpArr1_1.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr1_2 = []
          tmpArr1_2.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr1_1_1 = []
          let tmpArr1_2_1 = []
          let tmpArr2 = []
          let tmpArr2_1 = []
          tmpArr2_1.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr2_2 = []
          tmpArr2_2.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr2_3 = []
          tmpArr2_3.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr2_1_1 = []
          let tmpArr2_2_1 = []
          let tmpArr2_3_1 = []
          let tmpArr3 = []
          let tmpArr3_1 = []
          tmpArr3_1.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr3_2 = []
          tmpArr3_2.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr3_3 = []
          tmpArr3_3.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr3_1_1 = []
          let tmpArr3_2_1 = []
          let tmpArr3_3_1 = []
          let tmpArr4 = []
          let tmpArr4_1 = []
          tmpArr4_1.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr4_2 = []
          tmpArr4_2.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr4_3 = []
          tmpArr4_3.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr4_1_1 = []
          let tmpArr4_2_1 = []
          let tmpArr4_3_1 = []
          let tmpArr5 = []
          let tmpArr5_1 = []
          tmpArr5_1.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr5_2 = []
          tmpArr5_2.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr5_3 = []
          tmpArr5_3.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr5_1_1 = []
          let tmpArr5_2_1 = []
          let tmpArr5_3_1 = []
          let tmpArr6 = []
          let tmpArr6_1 = []
          tmpArr6_1.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr6_2 = []
          tmpArr6_2.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr6_3 = []
          tmpArr6_3.push({
                  sensorTypeCd: '',
                  statCnt: '',
                  statName: '',
                })
          let tmpArr6_1_1 = []
          let tmpArr6_2_1 = []
          let tmpArr6_3_1 = []


          this.newPwGwArr = []
          this.newPwEmArr = []
          this.newPwFiArr = []
          this.newPwDoArr = []
          this.newPwAcArr = []
          this.newPwLiArr = []

          // api로 불러온 데이터를 센서 타입 코드 별로 배열에 저장
          for(let i=0; i<this.PwChartItems.length; i++){
            if(!this.PwChartItems[i]){
              break;
            }
            else if(this.PwChartItems[i].sensorTypeCd==="TPE000"){
              tmpArr1.push({
                sensorTypeCd: this.PwChartItems[i].sensorTypeCd,
                statCnt: this.PwChartItems[i].statCnt,
                statName: this.PwChartItems[i].statName,
              })
            }
            else if(this.PwChartItems[i].sensorTypeCd==="TPE001"){
              tmpArr2.push({
                sensorTypeCd: this.PwChartItems[i].sensorTypeCd,
                statCnt: this.PwChartItems[i].statCnt,
                statName: this.PwChartItems[i].statName,
              })
            }
            else if(this.PwChartItems[i].sensorTypeCd==="TPE002"){
              tmpArr3.push({
                sensorTypeCd: this.PwChartItems[i].sensorTypeCd,
                statCnt: this.PwChartItems[i].statCnt,
                statName: this.PwChartItems[i].statName,
              })
            }
            else if(this.PwChartItems[i].sensorTypeCd==="TPE003"){
              tmpArr4.push({
                sensorTypeCd: this.PwChartItems[i].sensorTypeCd,
                statCnt: this.PwChartItems[i].statCnt,
                statName: this.PwChartItems[i].statName,
              })
            }
            else if(this.PwChartItems[i].sensorTypeCd==="TPE004"){
              tmpArr5.push({
                sensorTypeCd: this.PwChartItems[i].sensorTypeCd,
                statCnt: this.PwChartItems[i].statCnt,
                statName: this.PwChartItems[i].statName,
              })
            }
            else if(this.PwChartItems[i].sensorTypeCd==="TPE005"){
              tmpArr6.push({
                sensorTypeCd: this.PwChartItems[i].sensorTypeCd,
                statCnt: this.PwChartItems[i].statCnt,
                statName: this.PwChartItems[i].statName,
              })
            }
          }
          // 호출한 api에 센서 타입 코드와 statName이 같을 경우 변수에 저장
          tmpArr1_1_1 = tmpArr1.filter(cd=>{
                return cd.statName === '연결'
              })
          tmpArr1_2_1 = tmpArr1.filter(cd=>{
            return cd.statName === '차단'
          })
          if(tmpArr1_1_1.length !== 0){
            tmpArr1_1 = tmpArr1_1_1
          }
          if(tmpArr1_2_1.length !== 0){
            tmpArr1_2 = tmpArr1_2_1
          }
          tmpArr2_1_1 = tmpArr2.filter(cd=>{
            return cd.statName === 'TAK001'
          })
          tmpArr2_2_1 = tmpArr2.filter(cd=>{
            return cd.statName === 'TAK002'
          })
          tmpArr2_3_1 = tmpArr2.filter(cd=>{
            return cd.statName === 'TAK003'
          })
          if(tmpArr2_1_1.length !== 0){
            tmpArr2_1 = tmpArr2_1_1
          }
          if(tmpArr2_2_1.length !== 0){
            tmpArr2_2 = tmpArr2_2_1
          }
          if(tmpArr2_3_1.length !== 0){
            tmpArr2_3 = tmpArr2_3_1
          }
          tmpArr3_1_1 = tmpArr3.filter(cd=>{
            return cd.statName === 'TAK001'
          })
          tmpArr3_2_1 = tmpArr3.filter(cd=>{
            return cd.statName === 'TAK002'
          })
          tmpArr3_3_1 = tmpArr3.filter(cd=>{
            return cd.statName === 'TAK003'
          })
          if(tmpArr3_1_1.length !== 0){
            tmpArr3_1 = tmpArr3_1_1
          }
          if(tmpArr3_2_1.length !== 0){
            tmpArr3_2 = tmpArr3_2_1
          }
          if(tmpArr3_3_1.length !== 0){
            tmpArr3_3 = tmpArr3_3_1
          }
          tmpArr4_1_1 = tmpArr4.filter(cd=>{
            return cd.statName === 'TAK001'
          })
          tmpArr4_2_1 = tmpArr4.filter(cd=>{
            return cd.statName === 'TAK002'
          })
          tmpArr4_3_1 = tmpArr4.filter(cd=>{
            return cd.statName === 'TAK003'
          })
          if(tmpArr4_1_1.length !== 0){
            tmpArr4_1 = tmpArr4_1_1
          }
          if(tmpArr4_2_1.length !== 0){
            tmpArr4_2 = tmpArr4_2_1
          }
          if(tmpArr4_3_1.length !== 0){
            tmpArr4_3 = tmpArr4_3_1
          }
          tmpArr5_1_1 = tmpArr5.filter(cd=>{
            return cd.statName === 'TAK001'
          })
          tmpArr5_2_1 = tmpArr5.filter(cd=>{
            return cd.statName === 'TAK002'
          })
          tmpArr5_3_1 = tmpArr5.filter(cd=>{
            return cd.statName === 'TAK003'
          })
          if(tmpArr5_1_1.length !== 0){
            tmpArr5_1 = tmpArr5_1_1
          }
          if(tmpArr5_2_1.length !== 0){
            tmpArr5_2 = tmpArr5_2_1
          }
          if(tmpArr5_3_1.length !== 0){
            tmpArr5_3 = tmpArr5_3_1
          }
          tmpArr6_1_1 = tmpArr6.filter(cd=>{
            return cd.statName === 'TAK001'
          })
          tmpArr6_2_1 = tmpArr6.filter(cd=>{
            return cd.statName === 'TAK002'
          })
          tmpArr6_3_1 = tmpArr6.filter(cd=>{
            return cd.statName === 'TAK003'
          })
          if(tmpArr6_1_1.length !== 0){
            tmpArr6_1 = tmpArr6_1_1
          }
          if(tmpArr6_2_1.length !== 0){
            tmpArr6_2 = tmpArr6_2_1
          }
          if(tmpArr6_3_1.length !== 0){
            tmpArr6_3 = tmpArr6_3_1
          }
          
          
          //배열 전체 순환
          
          this.newPwGwArr.push({
            sensorTypeCd: "TPE000",
            statName: null,
            statCnt: 0,
          })
          this.newPwGwArr.push({
            sensorTypeCd: "TPE000",
            statName: null,
            statCnt: 0,
          })
          for(let i=0; i<3; i++){
          this.newPwEmArr.push({
            sensorTypeCd: "TPE001",
            statName: null,
            statCnt: 0,
          })
          this.newPwAcArr.push({
            sensorTypeCd: "TPE002",
            statName: null,
            statCnt: 0,
          })
          this.newPwFiArr.push({
            sensorTypeCd: "TPE003",
            statName: null,
            statCnt: 0,
          })
          this.newPwDoArr.push({
            sensorTypeCd: "TPE004",
            statName: null,
            statCnt: 0,
          })
          this.newPwLiArr.push({
            sensorTypeCd: "TPE005",
            statName: null,
            statCnt: 0,
          })}
        
          this.newPwGwArr[0].statCnt = tmpArr1_1[0].statCnt? tmpArr1_1[0].statCnt : 0
          this.newPwGwArr[1].statCnt = tmpArr1_2[0].statCnt? tmpArr1_2[0].statCnt : 0
          
          this.newPwEmArr[0].statCnt = tmpArr2_1[0].statCnt? tmpArr2_1[0].statCnt : 0
          this.newPwEmArr[1].statCnt = tmpArr2_3[0].statCnt? tmpArr2_3[0].statCnt : 0
          this.newPwEmArr[2].statCnt = tmpArr2_2[0].statCnt? tmpArr2_2[0].statCnt : 0

          this.newPwAcArr[0].statCnt = tmpArr3_1[0].statCnt? tmpArr3_1[0].statCnt : 0
          this.newPwAcArr[1].statCnt = tmpArr3_3[0].statCnt? tmpArr3_3[0].statCnt : 0
          this.newPwAcArr[2].statCnt = tmpArr3_2[0].statCnt? tmpArr3_2[0].statCnt : 0

          this.newPwFiArr[0].statCnt = tmpArr4_1[0].statCnt? tmpArr4_1[0].statCnt : 0
          this.newPwFiArr[1].statCnt = tmpArr4_3[0].statCnt? tmpArr4_3[0].statCnt : 0
          this.newPwFiArr[2].statCnt = tmpArr4_2[0].statCnt? tmpArr4_2[0].statCnt : 0

          this.newPwDoArr[0].statCnt = tmpArr5_1[0].statCnt? tmpArr5_1[0].statCnt : 0
          this.newPwDoArr[1].statCnt = tmpArr5_3[0].statCnt? tmpArr5_3[0].statCnt : 0
          this.newPwDoArr[2].statCnt = tmpArr5_2[0].statCnt? tmpArr5_2[0].statCnt : 0

          this.newPwLiArr[0].statCnt = tmpArr6_1[0].statCnt? tmpArr6_1[0].statCnt : 0
          this.newPwLiArr[1].statCnt = tmpArr6_3[0].statCnt? tmpArr6_3[0].statCnt : 0
          this.newPwLiArr[2].statCnt = tmpArr6_2[0].statCnt? tmpArr6_2[0].statCnt : 0
          

      this.PwGwData = this.newPwGwArr
      this.PwEmData = this.newPwEmArr
      this.PwFiData = this.newPwFiArr
      this.PwDoData = this.newPwDoArr
      this.PwAcData = this.newPwAcArr
      this.PwLiData = this.newPwLiArr

      this.percentPwGwData = this.PwGwData[0].statCnt+this.PwGwData[1].statCnt
      this.finalPwGwData1 = [Math.round((this.PwGwData[0].statCnt/this.percentPwGwData)*100), Math.round((this.PwGwData[1].statCnt/this.percentPwGwData)*100)]
      this.finalPwGwData2 = [Math.round((this.PwGwData[1].statCnt/this.percentPwGwData)*100), Math.round((this.PwGwData[0].statCnt/this.percentPwGwData)*100)]
      this.finalPwGwData1[0] = this.finalPwGwData1[0]? this.finalPwGwData1[0] : 0
      this.finalPwGwData1[1] = this.finalPwGwData1[1]? this.finalPwGwData1[1] : 0
      this.finalPwGwData2[0] = this.finalPwGwData2[0]? this.finalPwGwData2[0] : 0
      this.finalPwGwData2[1] = this.finalPwGwData2[1]? this.finalPwGwData2[1] : 0

      
      this.percentPwEmData = this.PwEmData[0].statCnt+this.PwEmData[1].statCnt+this.PwEmData[2].statCnt
      this.sumPwEmData1 = this.PwEmData[0].statCnt + this.PwEmData[1].statCnt
      this.sumPwEmData2 = this.PwEmData[1].statCnt + this.PwEmData[2].statCnt
      this.sumPwEmData3 = this.PwEmData[0].statCnt + this.PwEmData[2].statCnt
      this.finalPwEmData1 = [Math.round((this.PwEmData[0].statCnt/this.percentPwEmData)*100), Math.round((this.sumPwEmData2/this.percentPwEmData)*100)]
      this.finalPwEmData2 = [Math.round((this.PwEmData[1].statCnt/this.percentPwEmData)*100), Math.round((this.sumPwEmData3/this.percentPwEmData)*100)]
      this.finalPwEmData3 = [Math.round((this.PwEmData[2].statCnt/this.percentPwEmData)*100), Math.round((this.sumPwEmData1/this.percentPwEmData)*100)]
      this.finalPwEmData1[0] = this.finalPwEmData1[0]? this.finalPwEmData1[0] : 0
      this.finalPwEmData1[1] = this.finalPwEmData1[1]? this.finalPwEmData1[1] : 0
      this.finalPwEmData2[0] = this.finalPwEmData2[0]? this.finalPwEmData2[0] : 0
      this.finalPwEmData2[1] = this.finalPwEmData2[1]? this.finalPwEmData2[1] : 0
      this.finalPwEmData3[0] = this.finalPwEmData3[0]? this.finalPwEmData3[0] : 0
      this.finalPwEmData3[1] = this.finalPwEmData3[1]? this.finalPwEmData3[1] : 0

      this.percentPwFiData = this.PwFiData[0].statCnt+this.PwFiData[1].statCnt+this.PwFiData[2].statCnt
      this.sumPwFiData1 = this.PwFiData[0].statCnt + this.PwFiData[1].statCnt
      this.sumPwFiData2 = this.PwFiData[1].statCnt + this.PwFiData[2].statCnt
      this.sumPwFiData3 = this.PwFiData[0].statCnt + this.PwFiData[2].statCnt
      this.finalPwFiData1 = [Math.round((this.PwFiData[0].statCnt/this.percentPwFiData)*100), Math.round((this.sumPwFiData2/this.percentPwFiData)*100)]
      this.finalPwFiData2 = [Math.round((this.PwFiData[1].statCnt/this.percentPwFiData)*100), Math.round((this.sumPwFiData3/this.percentPwFiData)*100)]
      this.finalPwFiData3 = [Math.round((this.PwFiData[2].statCnt/this.percentPwFiData)*100), Math.round((this.sumPwFiData1/this.percentPwFiData)*100)]
      this.finalPwFiData1[0] = this.finalPwFiData1[0]? this.finalPwFiData1[0] : 0
      this.finalPwFiData1[1] = this.finalPwFiData1[1]? this.finalPwFiData1[1] : 0
      this.finalPwFiData2[0] = this.finalPwFiData2[0]? this.finalPwFiData2[0] : 0
      this.finalPwFiData2[1] = this.finalPwFiData2[1]? this.finalPwFiData2[1] : 0
      this.finalPwFiData3[0] = this.finalPwFiData3[0]? this.finalPwFiData3[0] : 0
      this.finalPwFiData3[1] = this.finalPwFiData3[1]? this.finalPwFiData3[1] : 0

      this.percentPwDoData = this.PwDoData[0].statCnt+this.PwDoData[1].statCnt+this.PwDoData[2].statCnt
      this.sumPwDoData1 = this.PwDoData[0].statCnt + this.PwDoData[1].statCnt
      this.sumPwDoData2 = this.PwDoData[1].statCnt + this.PwDoData[2].statCnt
      this.sumPwDoData3 = this.PwDoData[0].statCnt + this.PwDoData[2].statCnt
      this.finalPwDoData1 = [Math.round((this.PwDoData[0].statCnt/this.percentPwDoData)*100), Math.round((this.sumPwDoData2/this.percentPwDoData)*100)]
      this.finalPwDoData2 = [Math.round((this.PwDoData[1].statCnt/this.percentPwDoData)*100), Math.round((this.sumPwDoData3/this.percentPwDoData)*100)]
      this.finalPwDoData3 = [Math.round((this.PwDoData[2].statCnt/this.percentPwDoData)*100), Math.round((this.sumPwDoData1/this.percentPwDoData)*100)]
      this.finalPwDoData1[0] = this.finalPwDoData1[0]? this.finalPwDoData1[0] : 0
      this.finalPwDoData1[1] = this.finalPwDoData1[1]? this.finalPwDoData1[1] : 0
      this.finalPwDoData2[0] = this.finalPwDoData2[0]? this.finalPwDoData2[0] : 0
      this.finalPwDoData2[1] = this.finalPwDoData2[1]? this.finalPwDoData2[1] : 0
      this.finalPwDoData3[0] = this.finalPwDoData3[0]? this.finalPwDoData3[0] : 0
      this.finalPwDoData3[1] = this.finalPwDoData3[1]? this.finalPwDoData3[1] : 0

      this.percentPwAcData = this.PwAcData[0].statCnt+this.PwAcData[1].statCnt+this.PwAcData[2].statCnt
      this.sumPwAcData1 = this.PwAcData[0].statCnt + this.PwAcData[1].statCnt
      this.sumPwAcData2 = this.PwAcData[1].statCnt + this.PwAcData[2].statCnt
      this.sumPwAcData3 = this.PwAcData[0].statCnt + this.PwAcData[2].statCnt
      this.finalPwAcData1 = [Math.round((this.PwAcData[0].statCnt/this.percentPwAcData)*100), Math.round((this.sumPwAcData2/this.percentPwAcData)*100)]
      this.finalPwAcData2 = [Math.round((this.PwAcData[1].statCnt/this.percentPwAcData)*100), Math.round((this.sumPwAcData3/this.percentPwAcData)*100)]
      this.finalPwAcData3 = [Math.round((this.PwAcData[2].statCnt/this.percentPwAcData)*100), Math.round((this.sumPwAcData1/this.percentPwAcData)*100)]
      this.finalPwAcData1[0] = this.finalPwAcData1[0]? this.finalPwAcData1[0] : 0
      this.finalPwAcData1[1] = this.finalPwAcData1[1]? this.finalPwAcData1[1] : 0
      this.finalPwAcData2[0] = this.finalPwAcData2[0]? this.finalPwAcData2[0] : 0
      this.finalPwAcData2[1] = this.finalPwAcData2[1]? this.finalPwAcData2[1] : 0
      this.finalPwAcData3[0] = this.finalPwAcData3[0]? this.finalPwAcData3[0] : 0
      this.finalPwAcData3[1] = this.finalPwAcData3[1]? this.finalPwAcData3[1] : 0

      this.percentPwLiData = this.PwLiData[0].statCnt+this.PwLiData[1].statCnt+this.PwLiData[2].statCnt
      this.sumPwLiData1 = this.PwLiData[0].statCnt + this.PwLiData[1].statCnt
      this.sumPwLiData2 = this.PwLiData[1].statCnt + this.PwLiData[2].statCnt
      this.sumPwLiData3 = this.PwLiData[0].statCnt + this.PwLiData[2].statCnt
      this.finalPwLiData1 = [Math.round((this.PwLiData[0].statCnt/this.percentPwLiData)*100), Math.round((this.sumPwLiData2/this.percentPwLiData)*100)]
      this.finalPwLiData2 = [Math.round((this.PwLiData[1].statCnt/this.percentPwLiData)*100), Math.round((this.sumPwLiData3/this.percentPwLiData)*100)]
      this.finalPwLiData3 = [Math.round((this.PwLiData[2].statCnt/this.percentPwLiData)*100), Math.round((this.sumPwLiData1/this.percentPwLiData)*100)]
      this.finalPwLiData1[0] = this.finalPwLiData1[0]? this.finalPwLiData1[0] : 0
      this.finalPwLiData1[1] = this.finalPwLiData1[1]? this.finalPwLiData1[1] : 0
      this.finalPwLiData2[0] = this.finalPwLiData2[0]? this.finalPwLiData2[0] : 0
      this.finalPwLiData2[1] = this.finalPwLiData2[1]? this.finalPwLiData2[1] : 0
      this.finalPwLiData3[0] = this.finalPwLiData3[0]? this.finalPwLiData3[0] : 0
      this.finalPwLiData3[1] = this.finalPwLiData3[1]? this.finalPwLiData3[1] : 0


      this.PwchartData1.datasets[0].data = this.finalPwGwData1
      this.PwchartData1.datasets[1].data = this.finalPwGwData2
      this.PwchartData2.datasets[0].data = this.finalPwEmData1
      this.PwchartData2.datasets[1].data = this.finalPwEmData2
      this.PwchartData2.datasets[2].data = this.finalPwEmData3
      this.PwchartData3.datasets[0].data = this.finalPwFiData1
      this.PwchartData3.datasets[1].data = this.finalPwFiData2
      this.PwchartData3.datasets[2].data = this.finalPwFiData3
      this.PwchartData4.datasets[0].data = this.finalPwDoData1
      this.PwchartData4.datasets[1].data = this.finalPwDoData2
      this.PwchartData4.datasets[2].data = this.finalPwDoData3
      this.PwchartData5.datasets[0].data = this.finalPwAcData1
      this.PwchartData5.datasets[1].data = this.finalPwAcData2
      this.PwchartData5.datasets[2].data = this.finalPwAcData3
      this.PwchartData6.datasets[0].data = this.finalPwLiData1
      this.PwchartData6.datasets[1].data = this.finalPwLiData2
      this.PwchartData6.datasets[2].data = this.finalPwLiData3
      this.PwchartRedraw();
    },
    //--------------------------A/S 현황--------------------------
    // AS 요청,접수,완료
    getASCount(){
      let addrCd = ''
      if(this.selectedSidoItems != '' && this.selectedSggItems == ''){
        addrCd = this.sidoCd.substring(0,2)
      }else if(this.selectedSggItems != ''){
        if(this.sggCd.startsWith('0', 4) === true){
          addrCd = this.sggCd.substring(0,4)
        }else{
          addrCd = this.sggCd.substring(0,5)
        }
      }else{
        addrCd = ''
      }
      let url =this.$store.state.serverApi + "/admin/organizations/stat/as?orgId="+this.selectedOrgItems+"&addrCd="+addrCd+"&startDate="+this.ASs_date+"&endDate="+this.ASe_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            let rqData = response.data.data
            let gwrqCArrToString = ''
            let fgwrqCArrToString = ''
            let emrqCArrToString = ''
            let femrqCArrToString = ''
            let acrqCArrToString = ''
            let facrqCArrToString = ''
            let firqCArrToString = ''
            let ffirqCArrToString = ''
            let dorqCArrToString = ''
            let fdorqCArrToString = ''
            let lirqCArrToString = ''
            let flirqCArrToString = ''

            let rcData = response.data.data
            let gwrcCArrToString = ''
            let fgwrcCArrToString = ''
            let emrcCArrToString = ''
            let femrcCArrToString = ''
            let acrcCArrToString = ''
            let facrcCArrToString = ''
            let fircCArrToString = ''
            let ffircCArrToString = ''
            let dorcCArrToString = ''
            let fdorcCArrToString = ''
            let lircCArrToString = ''
            let flircCArrToString = ''

            let caData = response.data.data
            let gwcaCArrToString = ''
            let fgwcaCArrToString = ''
            let emcaCArrToString = ''
            let femcaCArrToString = ''
            let accaCArrToString = ''
            let faccaCArrToString = ''
            let ficaCArrToString = ''
            let fficaCArrToString = ''
            let docaCArrToString = ''
            let fdocaCArrToString = ''
            let licaCArrToString = ''
            let flicaCArrToString = ''

            let cpData = response.data.data
            let gwcpCArrToString = ''
            let fgwcpCArrToString = ''
            let emcpCArrToString = ''
            let femcpCArrToString = ''
            let accpCArrToString = ''
            let faccpCArrToString = ''
            let ficpCArrToString = ''
            let fficpCArrToString = '' 
            let docpCArrToString = ''
            let fdocpCArrToString = ''
            let licpCArrToString = ''
            let flicpCArrToString = ''         

            // 요청
            gwrqCArrToString = rqData.filter(cd=>{
            return cd.equipTypeCd ==="EQP001"
            })
            emrqCArrToString = rqData.filter(cd=>{
            return cd.equipTypeCd ==="EQP003"
            })
            acrqCArrToString = rqData.filter(cd=>{
            return cd.equipTypeCd ==="EQP004"
            })
            firqCArrToString = rqData.filter(cd=>{
            return cd.equipTypeCd ==="EQP005"
            })
            dorqCArrToString = rqData.filter(cd=>{
            return cd.equipTypeCd ==="EQP006"
            })
            lirqCArrToString = rqData.filter(cd=>{
            return cd.equipTypeCd ==="EQP007"
            })

            if(gwrqCArrToString.length != ''){
            fgwrqCArrToString = gwrqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(fgwrqCArrToString.length != ''){
            this.gwrqCount = fgwrqCArrToString[0].typeCnt
            }else{
              this.gwrqCount = '0';
            }}else{
              this.gwrqCount = '0';
            }
            if(emrqCArrToString.length != ''){
            femrqCArrToString = emrqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(femrqCArrToString.length != ''){
            this.emrqCount = femrqCArrToString[0].typeCnt
            }else{
              this.emrqCount = '0';
            }}else{
              this.emrqCount = '0';
            }
            if(acrqCArrToString.length != ''){
            facrqCArrToString = acrqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(facrqCArrToString.length != ''){
            this.acrqCount = facrqCArrToString[0].typeCnt
            }else{
              this.acrqCount = '0';
            }}else{
              this.acrqCount = '0';
            }
            if(firqCArrToString.length != ''){
            ffirqCArrToString = firqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(ffirqCArrToString.length != ''){
            this.firqCount = ffirqCArrToString[0].typeCnt
            }else{
              this.firqCount = '0';
            }}else{
              this.firqCount = '0';
            }
            if(dorqCArrToString.length != ''){
            fdorqCArrToString = dorqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(fdorqCArrToString.length != ''){
            this.dorqCount = fdorqCArrToString[0].typeCnt
            }else{
              this.dorqCount = '0';
            }}else{
              this.dorqCount = '0';
            }
            if(lirqCArrToString.length != ''){
            flirqCArrToString = lirqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(flirqCArrToString.length != ''){
            this.lirqCount = flirqCArrToString[0].typeCnt
            }else{
              this.lirqCount = '0';
            }}else{
              this.lirqCount = '0';
            }

            // 접수
            gwrcCArrToString = rcData.filter(cd=>{
            return cd.equipTypeCd ==="EQP001"
            })
            emrcCArrToString = rcData.filter(cd=>{
            return cd.equipTypeCd ==="EQP003"
            })
            acrcCArrToString = rcData.filter(cd=>{
            return cd.equipTypeCd ==="EQP004"
            })
            fircCArrToString = rcData.filter(cd=>{
            return cd.equipTypeCd ==="EQP005"
            })
            dorcCArrToString = rcData.filter(cd=>{
            return cd.equipTypeCd ==="EQP006"
            })
            lircCArrToString = rcData.filter(cd=>{
            return cd.equipTypeCd ==="EQP007"
            })

            if(gwrcCArrToString != ''){
            fgwrcCArrToString = gwrcCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(fgwrcCArrToString != ''){
            this.gwrcCount = fgwrcCArrToString[0].typeCnt
            }else{
              this.gwrcCount = '0';
            }}else{
              this.gwrcCount = '0';
            }
            if(emrcCArrToString != ''){
            femrcCArrToString = emrcCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(femrcCArrToString != ''){
            this.emrcCount = femrcCArrToString[0].typeCnt
            }else{
              this.emrcCount = '0';
            }}else{
              this.emrcCount = '0';
            }
            if(acrcCArrToString != ''){
            facrcCArrToString = acrcCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(facrcCArrToString != ''){
            this.acrcCount = facrcCArrToString[0].typeCnt
            }else{
              this.acrcCount = '0';
            }}else{
              this.acrcCount = '0';
            }
            if(fircCArrToString != ''){
            ffircCArrToString = fircCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(ffircCArrToString != ''){
            this.fircCount = ffircCArrToString[0].typeCnt
            }else{
              this.fircCount = '0';
            }}else{
              this.fircCount = '0';
            }
            if(dorcCArrToString != ''){
            fdorcCArrToString = dorcCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(fdorcCArrToString != ''){
            this.dorcCount = fdorcCArrToString[0].typeCnt
            }else{
              this.dorcCount = '0';
            }}else{
              this.dorcCount = '0';
            }
            if(lircCArrToString != ''){
            flircCArrToString = lircCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(flircCArrToString != ''){
            this.lircCount = flircCArrToString[0].typeCnt
            }else{
              this.lircCount = '0';
            }}else{
              this.lircCount = '0';
            }

            // 취소
            gwcaCArrToString = caData.filter(cd=>{
            return cd.equipTypeCd ==="EQP001"
            })
            emcaCArrToString = caData.filter(cd=>{
            return cd.equipTypeCd ==="EQP003"
            })
            accaCArrToString = caData.filter(cd=>{
            return cd.equipTypeCd ==="EQP004"
            })
            ficaCArrToString = caData.filter(cd=>{
            return cd.equipTypeCd ==="EQP005"
            })
            docaCArrToString = caData.filter(cd=>{
            return cd.equipTypeCd ==="EQP006"
            })
            licaCArrToString = caData.filter(cd=>{
            return cd.equipTypeCd ==="EQP007"
            })
            
            if(gwcaCArrToString != ''){
            fgwcaCArrToString = gwcaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(fgwcaCArrToString != ''){
            this.gwcaCount =fgwcaCArrToString[0].typeCnt
            }else{
              this.gwcaCount = '0';
            }}else{
              this.gwcaCount = '0';
            }
            if(emcaCArrToString != ''){
            femcaCArrToString = emcaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(femcaCArrToString != ''){
            this.emcaCount =femcaCArrToString[0].typeCnt
            }else{
              this.emcaCount = '0';
            }}else{
              this.emcaCount = '0';
            }
            if(accaCArrToString != ''){
            faccaCArrToString = accaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(faccaCArrToString != ''){
            this.accaCount =faccaCArrToString[0].typeCnt
            }else{
              this.accaCount = '0';
            }}else{
              this.accaCount = '0';
            }
            if(ficaCArrToString != ''){
            fficaCArrToString = ficaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(fficaCArrToString != ''){
            this.ficaCount =fficaCArrToString[0].typeCnt
            }else{
              this.ficaCount = '0';
            }}else{
              this.ficaCount = '0';
            }
            if(docaCArrToString != ''){
            fdocaCArrToString = docaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(fdocaCArrToString != ''){
            this.docaCount =fdocaCArrToString[0].typeCnt
            }else{
              this.docaCount = '0';
            }}else{
              this.docaCount = '0';
            }
            
            if(licaCArrToString != ''){
            flicaCArrToString = licaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(flicaCArrToString != ''){
            this.licaCount =flicaCArrToString[0].typeCnt
            }else{
              this.licaCount = '0';
            }}else{
              this.licaCount = '0';
            }

            // 완료
            gwcpCArrToString = cpData.filter(cd=>{
            return cd.equipTypeCd ==="EQP001"
            })
            emcpCArrToString = cpData.filter(cd=>{
            return cd.equipTypeCd ==="EQP003"
            })
            accpCArrToString = cpData.filter(cd=>{
            return cd.equipTypeCd ==="EQP004"
            })
            ficpCArrToString = cpData.filter(cd=>{
            return cd.equipTypeCd ==="EQP005"
            })
            docpCArrToString = cpData.filter(cd=>{
            return cd.equipTypeCd ==="EQP006"
            })
            licpCArrToString = cpData.filter(cd=>{
            return cd.equipTypeCd ==="EQP007"
            })

            if(gwcpCArrToString != ''){
            fgwcpCArrToString = gwcpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(fgwcpCArrToString != ''){
            this.gwcpCount =fgwcpCArrToString[0].typeCnt
            }else{
              this.gwcpCount = '0';
            }}else{
              this.gwcpCount = '0';
            }
            if(emcpCArrToString != ''){
            femcpCArrToString = emcpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(femcpCArrToString != ''){
            this.emcpCount =femcpCArrToString[0].typeCnt
            }else{
              this.emcpCount = '0';
            }}else{
              this.emcpCount = '0';
            }
            if(accpCArrToString != ''){
            faccpCArrToString = accpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(faccpCArrToString != ''){
            this.accpCount =faccpCArrToString[0].typeCnt
            }else{
              this.accpCount = '0';
            }}else{
              this.accpCount = '0';
            }
            if(ficpCArrToString != ''){
            fficpCArrToString = ficpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(fficpCArrToString != ''){
            this.ficpCount =fficpCArrToString[0].typeCnt
            }else{
              this.ficpCount = '0';
            }}else{
              this.ficpCount = '0';
            }
            if(docpCArrToString != ''){
            fdocpCArrToString = docpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(fdocpCArrToString != ''){
            this.docpCount =fdocpCArrToString[0].typeCnt
            }else{
              this.docpCount = '0';
            }}else{
              this.docpCount = '0';
            }
            if(licpCArrToString != ''){
            flicpCArrToString = licpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(flicpCArrToString != ''){
            this.licpCount =flicpCArrToString[0].typeCnt
            }else{
              this.licpCount = '0';
            }}else{
              this.licpCount = '0';
            }

          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    //--------------------------조회버튼 클릭--------------------------
    manageInquiry(){
      if(this.s_date > this.e_date){
        this.errorpopup1 = true
      }/*else if(this.e_date > moment(this.s_date).add(6, 'days').format('YYYY-MM-DD')){
        this.errorpopup2 = true
      }*/else{
      this.checkStartDate = this.s_date
      this.checkEndDate = moment(this.s_date).add(6,'days').format('YYYY-MM-DD')
      this.remakeEuData()
      this.remakeEvData()
      this.remakeBtData()
      this.remakePwData()
      this.getASCount()
      }
    },
    errorpopupClose(input){
        switch(input){
            case 1 : this.errorpopup1 = false; this.s_date=this.checkStartDate; this.e_date=this.checkEndDate; break;
            case 2 : this.errorpopup2 = false; this.s_date=this.checkStartDate; this.e_date=this.checkEndDate; break;
        }
    },
  //   goToDetailView(input) {
  //     console.log(this.$route.path)
  //     console.log(input)
  //     if(input === 1){
  //       this.$router.push({
  //         path : `/as/Request`
  //       })
  //     }else if(input === 2){
  //       this.$router.push({
  //         path : `/as/Confirm`
  //       })
  //     }else if(input === 3){
  //       this.$router.push({
  //         path : `/as/Cancel`
  //       })
  //     }else if(input === 4){
  //       this.$router.push({
  //         path : `/as/Complete`
  //       })
  //     }
  // },
  }
}
</script>
<style>

</style>