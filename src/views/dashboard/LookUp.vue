<template>
  <div>
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
    </div>
</template>


<script>
import axios from "axios";
import moment from "moment";
import { eventBus } from "@/main.js";


export default {
  name: "LookUp",
  data () {
    return {
      modelSido:'', modelSgg:'', modelOrg:'', orgNm:'', orgId:'', sido:'', sidoCd:'', sgg:'', sggCd:'', s_date: '', e_date: '',
      sidoItems:[], sggItems:[], orgmItems:[], totalItems:[], EvChartItems:[], BtChartItems:[],
      isSido:true, isSgg:true, isOrg:true,
      orgSido:'', orgSgg:'', orgId:'',
      setCount: 0, setEMCount: 0, setLMCount: 0,
      selectedSidoItems:'', selectedSggItems:'', selectedOrgItems:'',
    }
  },
  
  methods:{
    // 시/도 목록
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

    // 시/군/구 목록
    getSggData() {
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

    // 관리 기관 목록

    getOrgmData() {
      let url =this.$store.state.serverApi + "/admin/organizations";
      if(this.sggCd != ''){
        let sggCode = this.sggCd.substring(0, 5);
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

    onChangeSido(event){
      this.getSggData()
      this.orgSido = event.target.value;
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

    initSet() {
      this.modelSido="전체";
      this.modelSgg="전체";
      this.modelOrg="전체";
      this.s_date=moment().subtract(6, 'days').format('YYYY-MM-DD');
      this.e_date=moment().format('YYYY-MM-DD');
    },
    sendDataToEventStatus(){
      eventBus.$emit('EvLookUp', this.EvChartItems, this.s_date)
    },
    sendDataToBattery(){
      eventBus.$emit('BtLookUp', this.BtChartItems, this.s_date)
    },
    sendDataToPower(){
      eventBus.$emit('PwLookUp', this.PwChartItems, this.s_date)
    },
    sendDataToChart(){
      eventBus.$emit('CtLookUp', this.CtChartItems, this.s_date)
    },

    manageInquiry() {
      let addrCode =  this.sggCd.substring(0,5);
      let urlEventStatus = this.$store.state.serverApi + "/admin/organizations/stat/alarm?startDate="+this.s_date+"&endDate="+this.e_date+"&addrCd="+addrCode;
      let urlBattery =this.$store.state.serverApi + "/admin/organizations/stat/battery?startDate="+this.s_date+"&endDate="+this.e_date;
      let urlPower = this.$store.state.serverApi + "/admin/organizations/stat/rssi?startDate="+this.s_date+"&endDate="+this.e_date+"&addrCd="+addrCode;
      let urlChart = this.$store.state.serverApi + "/admin/organizations/stat/oper?startDate="+this.s_date+"&endDate="+this.e_date+"&addrCd="+addrCode;

      axios.get(urlEventStatus, {headers: {"Authorization": sessionStorage.getItem("token")}})
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
            this.sendDataToEventStatus();
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      axios.get(urlBattery, {headers: {"Authorization": sessionStorage.getItem("token")}})
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
            this.sendDataToBattery();
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      axios.get(urlPower, {headers: {"Authorization": sessionStorage.getItem("token")}})
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
            this.sendDataToPower();
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      axios.get(urlChart, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            const CttempArr = [];
            this.CtChartItems=[];     
            for(let i=0; i<response.data.data.length; i++) {
              CttempArr.push({
                statDate: response.data.data[i].statDate,
                installCnt: response.data.data[i].installCnt,
                operCnt: response.data.data[i].operCnt,
              });
            } 
            this.CtChartItems=CttempArr;
            this.sendDataToChart();
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },


    getTotalCount(){
      let url =this.$store.state.serverApi + "/admin/organizations/stat/total?startDate="+this.s_date+"&endDate="+this.e_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            let totalCData = response.data.data
            let totalCArrToString = ''
            totalCArrToString = totalCData.filter(cd=>{
            return cd.typeCd ==="1"
            })
            this.setCount =totalCArrToString[0].typeCnt
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getEMCount(){
      let url =this.$store.state.serverApi + "/admin/organizations/stat/total?startDate="+this.s_date+"&endDate="+this.e_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            let EMCData = response.data.data
            let EMCArrToString = ''
            EMCArrToString = EMCData.filter(cd=>{
            return cd.typeCd ==="2"
            })
            this.setEMCount =EMCArrToString[0].typeCnt
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },getLMCount(){
      let url =this.$store.state.serverApi + "/admin/organizations/stat/total?startDate="+this.s_date+"&endDate="+this.e_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            let LMCData = response.data.data
            let LMCArrToString = ''
            LMCArrToString = LMCData.filter(cd=>{
            return cd.typeCd ==="3"
            })
            this.setLMCount =LMCArrToString[0].typeCnt
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    }
  },
  created(){
    this.getSidoData();
    this.getSggData();
    this.getOrgmData();
    this.s_date=moment().subtract(6, 'days').format('YYYY-MM-DD');
    this.e_date=moment().format('YYYY-MM-DD');
    this.getTotalCount();
    this.getEMCount();
    this.getLMCount();
  }
}
</script>

<style>
@import '../../assets/scss/common.css';
@import '../../assets/scss/sub.css';
.tdBorder table td {
  border-top: 0px;
  border-bottom: 1px solid;
  border-bottom-color: #d8dbe0;
}
.table-clear td {
  border: 1px;
}
.header-del {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.opt_select {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.paddingSel {
  padding: 20px;
}
.cardModal {
  border: none;
  margin-bottom: 0;
}
.addCustomer .modal-dialog{
  max-width: 650px;
}
.emailBtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 3px;
}
.modal-footer {
  display: none;
}
.searchBtn {
  width: 70px;
  right: 115px;
  position: absolute;
  margin-top: 10px;
}
.initBtn {
  width: 70px;
  right: 22px;
  position: absolute;
  margin-top: -1px;
  margin-top: 45px;
}
</style>