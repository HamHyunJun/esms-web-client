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
                <span>A/S 관리</span>
                <i class="ico_nav"></i>
                <span class="on">A/S 요청</span>
            </div>
            <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry'>
                <div class="table_wrap">
                    <table>
                        <colgroup>
                            <col style="width:18%;">
                            <col style="width:18%;">
                            <col style="width:18%">
                            <col style="width:10%;">
                            <col style="width:15%;">
                            <col style="width:auto;">
                        </colgroup>
                        <thead>
                            <th scope="row">시/도</th>
                            <th scope="row">시/군/구</th>
                            <th scope="row">관리기관</th>
                            <th scope="row">장비구분</th>
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
                                    <select v-model="selectedEquipType">
                                      <option v-for="(equipType, index) in equipTypeList" :value="equipType.value" v-bind:key="index">{{equipType.label}}</option>
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
                    <!-- <p>조회결과 : <strong class = "num">{{!this.NCount? 0 : this.NCount}}</strong>건</p> -->
                    <p>조회결과 : <strong class = "num"></strong>1건</p>
                </div>
                <div class="list result">
                    <table>
                        <colgroup>
                            <col style="width:4%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:auto;">
                            <col style="width:8%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:auto;">
                            <col style="width:10%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">요청ID</th>
                                <th scope="col">대상자명</th>
                                <th scope="col">대상자 전화번호</th>
                                <th scope="col">대상자ID</th>
                                <th scope="col">대상자통합ID</th>
                                <th scope="col">요청자ID</th>
                                <th scope="col">요청자명</th>
                                <th scope="col">요청자전화번호</th>
                                <th scope="col">장비구분</th>
                                <th scope="col">맥주소</th>
                                <th scope="col">시리얼번호</th>
                                <th scope="col">A/S타입</th>
                                <th scope="col">A/S상태</th>
                                <th scope="col">요청내용</th>
                                <th scope="col">요청일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody">
                        <table>
                            <colgroup>
                            <col style="width:4%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:auto;">
                            <col style="width:8%;">
                            <col style="width:6%;">
                            <col style="width:6%;">
                            <col style="width:auto;">
                            <col style="width:10%;">
                            </colgroup>
                            <tbody >
                              <tr v-for="(item,index) in asRequestData" v-bind:key="index" @click="openModal">
                                  <td><a href="#" >{{item.asId}}</a></td>
                                  <td><a href="#" >{{item.recipientName}}</a></td>
                                  <td>{{changeRecipientPhoneno(item.recipientPhone)}}</td>
                                  <td>{{item.recipientId}}</td>
                                  <td>{{item.recipientServerId}}</td>
                                  <td>{{item.requestUserId}}</td>
                                  <td>{{item.requestUserName}}</td>
                                  <td>{{changeRecipientPhoneno(item.requestUserPhone)}}</td>
                                  <td>{{changeEqTypeCode(item.equipTypeCd)}}</td>
                                  <td>{{item.macAddr}}</td>
                                  <td>{{item.serialNo}}</td>
                                  <td>{{changeAsTypeCode(item.asTypeCd)}}</td>
                                  <td>{{changeAsStateCode(item.asStateCd)}}</td>
                                  <td>{{item.requestDesc}}</td>
                                  <td>{{item.updDtime}}</td>
                              </tr>                                
                            </tbody>
                        </table>
                    </div>
                </div>
              <div class="pagination mt0">
                <a href="#" class="front">첫 페이지</a>
                <a href="#" class="prev">이전 페이지</a>
                <a href="#" class="on">1</a>

                <a href="#" class="next">다음 페이지</a>
                <a href="#" class="back">마지막 페이지</a>
              </div>
            </div>
            <div id="" class="popupLayer" v-if="popCheck">
              <div class="popup_wrap">
                  <div class="title_wrap">
                      <div class="title">A/S요청관리</div>
                      <button type="button" class="btn_close" @click="closeModal">닫기</button>
                  </div>
                  <div class="popup_cnt">
                    <div class="input_wrap">
                        <div class="input_area">
                          <p class="input_tit">대상자명</p>
                          <input type="text" >
                        </div>
                        <div class="input_area">
                            <p class="input_tit">대상자 전화번호</p>
                            <input type="text" >
                        </div>
                        <div class="input_area">
                          <p class="input_tit">대상자ID</p>
                          <input type="text" >
                        </div>
                    </div>
                    <div class="input_wrap">
                        <div class="input_area">
                          <p class="input_tit">대상자통합ID</p>
                          <input type="text" >
                        </div>
                        <div class="input_area">
                          <p class="input_tit">요청자ID</p>
                          <input type="text" >
                        </div>
                        <div class="input_area">
                            <p class="input_tit">요청자명</p>
                            <input type="text" >
                        </div>
                    </div>
                    <div class="input_wrap">
                        <div class="input_area">
                          <p class="input_tit">요청자전화번호</p>
                          <input type="text" >
                        </div>
                        <div class="input_area">
                            <p class="input_tit">장비구분</p>
                            <input type="text" >
                        </div>
                        <div class="input_area">
                            <p class="input_tit">맥주소</p>
                            <input type="text" >
                        </div>
                    </div>
                    <div class="input_wrap">
                      <div class="input_area">
                          <p class="input_tit">맥주소</p>
                          <input type="text" >
                        </div>
                        <div class="input_area">
                            <p class="input_tit">시리얼번호</p>
                            <input type="text" >
                        </div>
                        <div class="input_area">
                            <p class="input_tit">as타입</p>
                            <input type="text" >
                        </div>    
                    </div>
                    <div class="input_wrap">
                      <div class="input_area">
                          <p class="input_tit">요청내용</p>
                          <input type="text" >
                        </div>
                        <div class="input_area">
                            <p class="input_tit">요청일시</p>
                            <input type="text" >
                        </div>
                        <div class="input_area">
                            <p class="input_tit">as상태</p>
                            <select name="state" id="state">
                              <option value="">요청</option>
                              <option value="">접수</option>
                              <option value="">완료</option>
                              <option value="">취소</option>
                            </select>
                        </div>    
                    </div>    
                  </div>
                  <div class="popbtn_area">
                      <button type="button" class="btn" @click="closeModal">취소</button>
                      <button type="button" class="btn form2" >저장</button>
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
        errorpopup1: false, errorpopup2: false, asRequestData: null,popCheck:false,
        equipTypeList:[{value:'', label:'전체'},{value:'EQP001', label:'게이트웨이'},{value:'EQP002', label:'태블릿'},{value:'EQP003', label:'응급호출기'},
        {value:'EQP004', label:'활동감지기'},{value:'EQP005', label:'화재감지기'},{value:'EQP006', label:'출입문감지기'},{value:'EQP007', label:'생활안심센서'},], selectedEquipType:'',
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
    errorpopupClose(input){
        switch(input){
            case 1 : this.errorpopup1 = false; this.s_date=this.checkStartDate; this.e_date=this.checkEndDate; break;
            case 2 : this.errorpopup2 = false; this.s_date=this.checkStartDate; this.e_date=this.checkEndDate; break;
        }
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
    changeEqTypeCode(input){
      let result=''
      switch (input){
          case "EQP001" : result='게이트웨이'; break;
          case "EQP002" : result='태블릿'; break;
          case "EQP003" : result='응급호출기'; break;
          case "EQP004" : result='활동감지기'; break;
          case "EQP005" : result='화재감지기'; break;
          case "EQP006" : result='출입문감지기'; break;
          case "EQP007" : result='생활안심센서'; break;
        }
        return result
    },
    changeAsStateCode(input){
      let result=''
      switch (input){
          case "STE005" : result='AS요청'; break;
          case "STE006" : result='AS접수'; break;
          case "STE007" : result='AS완료'; break;
          case "STE008" : result='AS취소'; break;
        }
        return result
    },
    changeAsTypeCode(input){
      let result=''
      switch (input){
          case "TPE001" : result='배터리부족'; break;
          case "TPE002" : result='고장'; break;
        }
        return result
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