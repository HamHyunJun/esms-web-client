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
            <div class="list_title_wrap">
                <span>스마트 스위치</span>
                <i class="ico_nav"></i>
                <span class="on">스위치 관리</span>
            </div>
            <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry'>
                <div class="table_wrap">
                    <table>
                        <colgroup>
                            <col style="width:20%;">
                            <col style="width:20%;">
                            <col style="width:20%">
                            <col style="width:15%;">
                            <col style="width:auto;">
                        </colgroup>
                        <thead>
                            <th scope="row">시/도</th>
                            <th scope="row">시/군/구</th>
                            <th scope="row">관리기관</th>
                            <th scope="row">대상자명</th>
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
                                    <input type="text" value="" v-model="selectedRecipientNm">
                                </td>
                                <td>
                                    <div class="date_warp">
                                        <div class="customerBts" style="justify-content: flex-start;">
                                            <input type="date" v-model="s_date"/>
                                            <span class="tilde">~</span>
                                            <input type="date" v-model="e_date" :max="this.$moment().format('YYYY-MM-DD')"/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="btn_area">
                    <button type="button" class="btn" v-on:click="manageInquiry">조회</button>
                </div>
            </div>
            <div class="one_box box_style">
                <div class="result_txt">
                    <p>조회결과 : <strong class = "num">{{!this.NCount? 0 : this.NCount}}</strong>건</p>
                </div>
                <div class="list result">
                    <table>
                        <colgroup>
                            <col style="width:5%;">
                            <col style="width:10%;">
                            <col style="width:7%;">
                            <col style="width:7%;">
                            <col style="width:7%;">
                            <col style="width:auto%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">순번</th>
                                <th scope="col">관리기관</th>
                                <th scope="col">대상자명</th>
                                <th scope="col">나이</th>
                                <th scope="col">대상자 전화번호</th>
                                <th scope="col">주소</th>
                                <th scope="col">설치위치</th>
                                <th scope="col">구분</th>
                                <th scope="col">발생일시</th>
                                <th scope="col">서버보고일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody">
                        <table>
                            <colgroup>
                                <col style="width:5%;">
                                <col style="width:10%;">
                                <col style="width:7%;">
                                <col style="width:7%;">
                                <col style="width:7%;">
                                <col style="width:auto%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                            </colgroup>
                            <tbody >
                              <!-- <tr v-for="(item,index) in asRequestData" v-bind:key="index" @click="openModal">
                                  <td>{{num(index+1)}}</td>
                                  <td>{{item.recipientId}}</td>
                                  <td>{{item.recipientServerId}}</td>
                                  <td>{{item.requestUserId}}</td>
                                  <td>{{item.requestUserName}}</td>
                                  <td>{{changeRecipientPhoneno(item.requestUserPhone)}}</td>
                                  <td>{{changeEqTypeCode(item.equipTypeCd)}}</td>
                                  <td>{{item.macAddr}}</td>
                              </tr>-->
                              <tr>
                                    <td>1</td>
                                    <td>버드내노인복지관</td>
                                    <td>손아영</td>
                                    <td>58</td>
                                    <td>010-7777-0000</td>
                                    <td>경기 수원시 팔달구 월드컵로 310 (우만동)</td>
                                    <td>거실</td>
                                    <td>꺼짐</td>
                                    <td>2023-05-08 10:13:10</td>
                                    <td>2023-05-08 10:12:23</td>
                              </tr>
                              <tr>
                                    <td>1</td>
                                    <td>버드내노인복지관</td>
                                    <td>손아영</td>
                                    <td>58</td>
                                    <td>010-7777-0000</td>
                                    <td>경기 수원시 팔달구 월드컵로 310 (우만동)</td>
                                    <td>거실</td>
                                    <td>켜짐</td>
                                    <td>2023-05-08 08:27:30</td>
                                    <td>2023-05-08 08:28:04</td>
                              </tr>   
                            </tbody>
                        </table>
                    </div>
                </div>
              <div class="pagination mt0">
                <a href="#" class="front">첫 페이지</a>
                <a href="#" class="prev">이전 페이지</a>
                <a href="#" class="on">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">6</a>
                <a href="#">7</a>
                <a href="#">8</a>
                <a href="#">9</a>
                <a href="#">10</a>
                <a href="#" class="next">다음 페이지</a>
                <a href="#" class="back">마지막 페이지</a>
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
import axios from "axios";
import moment from "moment";
import HeaderComp from "../pages/HeaderComp.vue";

export default {
    name: 'ActivityDetection',
    components :{
      HeaderComp
    },
    data() {
      return{
        orgNm:'',orgId:'', sido:'', sidoCd:'', sgg:'', sggCd:'', s_date: '', e_date: '',
        selectedSidoItems:'', selectedSggItems:'', selectedOrgItems:'',
        sidoItems:[], sggItems:[], orgmItems:[], recipientItems:[],
        orgSido:'', orgSgg:'', orgCode:'',
        cBirthday:'', cAddr: '', NCount: 0,
        selectedSidoItems:'', selectedSggItems:'', selectedOrgItems:'', selectedRecipientNm: '',
        errorpopup1: false, errorpopup2: false, asRequestData: null,popCheck: false,
        checkStartDate:moment().subtract(6,'days').format('YYYY-MM-DD'),
        checkEndDate:moment().format('YYYY-MM-DD'),
      }
    },
    created() {
      this.getSidoData();
      this.getSggData();
      this.getOrgmData();
      this.getRecipientData();
      this.s_date=moment().subtract(6, 'days').format('YYYY-MM-DD');
      this.e_date=moment().format('YYYY-MM-DD');
      this.cBirthday=moment().format('YYYY-MM-DD');
      this.getAsRequestList();
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
    errorpopupClose(input){
        switch(input){
            case 1 : this.errorpopup1 = false; this.s_date=this.checkStartDate; this.e_date=this.checkEndDate; break;
            case 2 : this.errorpopup2 = false; this.s_date=this.checkStartDate; this.e_date=this.checkEndDate; break;
        }
    },

    // 시/군/구 목록
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
    // 관리 기관 목록
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
    getRecipientData() {
      let addrCd = ''
      let occurStartDate = this.s_date
      let occurEndDate = this.e_date
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
      let uri = ''
        uri = this.$store.state.serverApi
        +"/admin/emergencys/active-unsensing-events?pageIndex=1&recordCountPerPage=1000"
        +"&addrCd="+addrCd
        +"&orgId="+this.selectedOrgItems
        +"&recipientNm="+this.selectedRecipientNm
        +"&occurStartDate="+occurStartDate
        +"&occurEndDate="+occurEndDate;
      axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(response => {
            this.recipientItems = response.data.data
            this.NCount = this.recipientItems.length
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    changeRecipientPhoneno(phone){
      if(phone){
        let changeNumber = phone.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        return changeNumber
      }else{
        return ''
      }
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
    makeAge(birthDay){
      let tmp1 = this.$moment(birthDay).format('YYYY')
      let tmp2 = this.$moment()
      return tmp2.diff(tmp1, 'years');
    },
    manageInquiry() {
      if(this.s_date > this.e_date){
        this.errorpopup1 = true
      }/*else if(this.e_date > moment(this.s_date).add(6, 'days').format('YYYY-MM-DD')){
        this.errorpopup2 = true
      }*/else{
        this.checkStartDate = this.s_date
        this.checkEndDate = this.e_date
        this.getRecipientData();
      }
    },
    changeRecipientPhoneno(phone){
      if(phone){
        let changeNumber = phone.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        return changeNumber
      }else{
        return ''
      }
    },
    num(index){
      if(this.page !== 1){
        for(let i=1; i<this.page; i++){
        index=index+30
        }
      }
      return index
    },
    async getAsRequestList(){
        const url  = this.$store.state.serverApi + `/admin/as/list.do?asStateCd=STE005&pageIndex=0&recordCountPerPage=1000`
            await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                this.asRequestData = res.data.data
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
      },
      closeModal() {this.popCheck = false;},
      openModal() {this.popCheck = true;},


  },
}
</script>
<style>
</style>