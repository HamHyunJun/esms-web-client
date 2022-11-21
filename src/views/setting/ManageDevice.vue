<template>
    <div class="wrap">
        <!--<HeaderComp></HeaderComp>-->
        <div class="container type-02">
          <div id="" class="popupLayer" v-if="errorpopup1 == true">
                <div class="popup_wrap type-02">
                    <div class="title_wrap">
                        <div class="title">경고</div>
                        <button type="button" class="btn_close" @click="errorpopup1 = false">닫기</button>
                    </div>
                    <div class="popup_cnt">
                        <p class="alert_txt">조회 종료일자가 시작일자보다 빠릅니다<br/>일자를 다시 선택하여 주십시요</p>
                    </div>
                    <div class="popbtn_area type-02">
                        <button type="button" class="btn form2" @click="errorpopup1 = false">확인</button>
                    </div>
                </div>
            </div>
            <div id="" class="popupLayer" v-if="errorpopup2 == true">
                <div class="popup_wrap type-02">
                    <div class="title_wrap">
                        <div class="title">경고</div>
                        <button type="button" class="btn_close" @click="errorpopup2 = false">닫기</button>
                    </div>
                    <div class="popup_cnt">
                        <p class="alert_txt">일주일단위로 조회 가능합니다<br/>일자를 다시 선택하여 주십시요</p>
                   </div>
                    <div class="popbtn_area type-02">
                        <button type="button" class="btn form2" @click="errorpopup2 = false">확인</button>
                    </div>
                </div>
            </div>
            <div class="list_title_wrap">
                <span>이벤트 리포트</span>
                <i class="ico_nav"></i>
                <span class="on">장비 점검 대상</span>
            </div>
            <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry'>
                <div class="table_wrap">
                    <table>
                        <colgroup>
                            <col style="width:13%;">
                            <col style="width:13%;">
                            <col style="width:13%">
                            <col style="width:15%;">
                            <col style="width:8%;" v-if="equipList === 'sensor'">
                            <col style="width:8%;">
                            <col style="width:12%;">
                            <col style="width:18%;">
                        </colgroup>
                        <thead>
                            <th scope="row">시/도</th>
                            <th scope="row">시/군/구</th>
                            <th scope="row">관리기관</th>
                            <th scope="row">장비구분</th>
                            <th scope="row" v-if="equipList === 'sensor'">센서타입</th>
                            <th scope="row">점검구분</th>
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
                                    <select v-model="selectedOrgItems" >
                                      <option v-for="(orgm, index) in orgmItems" :value="orgm.value" v-bind:key="index">{{orgm.label}}</option>
                                    </select>
                                </td>
                                <td>
                                  <div class="btn_area" >
                                    <button type="button" style="width:40%" @click="eList(1)" :class="equipList === 'gateway'? 'btn on' :'btn'">게이트웨이</button>
                                    <button type="button" style="width:28%" @click="eList(2)" :class="equipList === 'tablet'? 'btn on' :'btn'">테블릿</button>
                                    <button type="button" style="width:32%" @click="eList(3)" :class="equipList === 'sensor'? 'btn on' :'btn'">센서</button>
                                  </div>
                                    <!-- <select v-model="selectedTypeItems">
                                      <option v-for="(type, index) in typeItems" :value="type.value" v-bind:key="index">{{type.label}}</option>
                                    </select> -->
                                </td>
                                <td v-if="equipList === 'sensor'">
                                    <select v-model="selectedTypeItems">
                                      <option v-for="(sensor, index) in sensorItems" :value="sensor.value" v-bind:key="index">{{sensor.label}}</option>
                                    </select>
                                </td>
                                <td>
                                  <select v-model="selectedCheckTypeItems">
                                    <option v-for="(check, index) in checktypeItems" :value="check.value" v-bind:key="index">{{check.label}}</option>
                                  </select>
                                </td>
                                <td>
                                    <input type="text" value="" v-model="selectedRecipientNm">
                                </td>
                                <td>
                                    <div class="date_warp">
                                        <div class="customerBts" style="justify-content: flex-start;">
                                            <input type="date" v-model="s_date" />
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
                    <p>조회결과 : <strong class="num">{{!this.NCount? 0 : this.NCount}}</strong>건</p>
                </div>
                <div class="list result">
                    <table>
                        <colgroup>
                            <col style="width:3%;">
                            <col style="width:12%;">
                            <col style="width:4%;">
                            <col style="width:4%;">
                            <col style="width:auto;">
                            <col style="width:10%;">
                            <col style="width:4%;">
                            <col style="width:8%;">
                            <col style="width:5%;">
                            <col style="width:5%;" v-if="equipList === 'sensor'">
                            <col style="width:5%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">순번</th>
                                <th scope="col">관리기관</th>
                                <th scope="col">대상자명</th>
                                <th scope="col">나이</th>
                                <th scope="col">주소</th>
                                <th scope="col">대상자 전화번호</th>
                                <th scope="col">응급요원명</th>
                                <th scope="col">응급요원 전화번호</th>
                                <th scope="col">장비구분</th>
                                <th scope="col" v-if="equipList === 'sensor'">센서타입</th>
                                <th scope="col">점검구분</th>
                                <th scope="col">상태측정일시</th>
                                <th scope="col">서버보고일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody">
                        <table>
                            <colgroup>
                                <col style="width:3%;"> <!--순번-->
                                <col style="width:12%;"> <!--순번-->
                                <col style="width:4%;"> <!--대상자명-->
                                <col style="width:4%;"> <!--나이-->
                                <col style="width:auto;"> <!--주소-->
                                <col style="width:10%;"> <!--대상자 전화번호-->
                                <col style="width:4%;"> <!--응급관리요원-->
                                <col style="width:8%;"> <!--응급관리요원 전화번호-->
                                <col style="width:5%;"> <!--장비구분-->
                                <col style="width:5%;" v-if="equipList === 'sensor'"> <!--센서타입-->
                                <col style="width:5%;"> <!--점검구분-->
                                <col style="width:10%;"> <!--상태측정일시-->
                                 <col style="width:10%;"> <!--서버보고일시-->
                            </colgroup>
                            <tbody >
                                <tr v-for="(item,index) in recipientItems" v-bind:key="index">
                                    <td><a href="#">{{index+1}}</a></td> <!--순번-->
                                    <td><a href="#">{{item.orgNm}}</a></td> <!--순번-->
                                    <td><a href="#">{{item.recipientNm}}</a></td> <!--대상자명-->
                                    <td><a href="#">{{makeAge(item.birthday) }}</a></td> <!--나이-->
                                    <td><a href="#" >{{item.addr}}</a></td> <!--주소-->
                                    <td><a href="#">{{changeRecipientPhoneno(item.recipientPhoneno)}}</a></td> <!--대상자 전화번호-->
                                    <td><a href="#">{{item.relationNm}}</a></td> <!--응급관리요원-->
                                    <td><a href="#">{{changeRecipientPhoneno(item.relationPhone)}}</a></td> <!--응급관리요원 전화번호-->
                                    <td><a href="#">{{equipList === 'sensor'? '센서' : item.equipTypeName}}</a></td> <!--장비구분-->
                                    <td v-if="equipList === 'sensor'"><a href="#">{{item.equipTypeName}}</a></td> <!--센서타입-->
                                    <td><a href="#">{{item.checkTypeName}}</a></td> <!--점검구분-->
                                    <td><a href="#">{{item.stateMeasureDtime}}</a></td> <!--상태측정일시-->
                                    <td><a href="#">{{item.updDtime}}</a></td> <!--서버보고일시-->
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
    name: 'EquipmentFailure',
    components :{
      HeaderComp
    },
    data() {
      return{
        orgNm:'',orgId:'', sido:'', sidoCd:'', sgg:'', sggCd:'', s_date: '', e_date: '',
        sidoItems:[], sggItems:[], orgmItems:[], typeItems:[], recipientItems:[],copyRecipientItems:[],
        orgSido:'', orgSgg:'', orgCode:'',
        cBirthday:'', cAddr: '', NCount:0,
        selectedTypeItems:'', selectedCheckTypeItems:'',
        selectedSidoItems:'', selectedSggItems:'', selectedOrgItems:'', selectedRecipientNm: '',
        equipList: 'gateway',
        sensorItems:[], checktypeItems: [],
        errorpopup1: false, errorpopup2: false,
        searchCheck1 : 1, searchCheck2 : 0,

      }
    },
    created() {
    this.getSidoData();
    this.getSggData();
    this.getOrgmData();
    this.getTypeData();
    this.getsensorData();
    this.getcheckTypeData(1);
    this.getRecipientData();
    this.s_date=moment().subtract(6, 'days').format('YYYY-MM-DD');
    this.e_date=moment().format('YYYY-MM-DD');
    this.cBirthday=moment().format('YYYY-MM-DD');
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
      let sggCode = ''
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

    // 장비구분
    getTypeData() {
    axios.get(this.$store.state.serverApi +"/admin/codes?cmmnCdGroup=SENSOR.TYPECD", {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            this.typeItems=[];
            this.typeItems.push({label: '전체', value: ''});
            for(let i=0; i<response.data.data.length; i++) {
              this.typeItems.push({
                label: response.data.data[i].cmmnCdNm,
                value: response.data.data[i].cmmnCd
              });
            }  
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getRecipientData() {
      let uri = '';
      let addrCode = '';
      let occurStartDate = this.s_date;
      let occurEndDate = this.e_date;
      if(this.selectedSidoItems != '' && this.selectedSggItems == ''){
        addrCode = this.sidoCd.substring(0, 2);
      }else if(this.selectedSggItems != ''){
        if(this.sggCd.startsWith('0', 4) === true){
          addrCode = this.sggCd.substring(0,4)
        }else{
          addrCode = this.sggCd.substring(0,5)
        }
      }else{
        addrCode = '';
      }
      if(this.equipList == 'gateway' ){
        uri = this.$store.state.serverApi 
        +"/admin/equipment/gateway-checklist?pageIndex=1&recordCountPerPage=1000"
        +"&addrCd="+addrCode
        +"&orgId="+this.selectedOrgItems
        +"&recipientNm="+this.selectedRecipientNm
        +"&checkTypeCd="+this.selectedCheckTypeItems
        +"&occurStartDate="+occurStartDate
        +"&occurEndDate="+occurEndDate;
      }else if(this.equipList == 'tablet'){
        uri = this.$store.state.serverApi 
        +"/admin/equipment/tablet-checklist?pageIndex=1&recordCountPerPage=1000"
        +"&addrCd="+addrCode
        +"&orgId="+this.selectedOrgItems
        +"&recipientNm="+this.selectedRecipientNm
        +"&checkTypeCd="+this.selectedCheckTypeItems
        +"&occurStartDate="+occurStartDate
        +"&occurEndDate="+occurEndDate;
      }else{
        uri = this.$store.state.serverApi 
        +"/admin/equipment/sensor-checklist?pageIndex=1&recordCountPerPage=1000"
        +"&addrCd="+addrCode
        +"&orgId="+this.selectedOrgItems
        +"&recipientNm="+this.selectedRecipientNm
        +"&checkTypeCd="+this.selectedCheckTypeItems
        +"&occurStartDate="+occurStartDate
        +"&occurEndDate="+occurEndDate;
      }
      axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(response => {
            this.recipientItems = response.data.data
            this.NCount =this.recipientItems.length
            // if(this.searchCheck1 === 1){
            // this.searchCheck1 = 0
            // }
            // if(this.recipientItems.length !== 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
            //     alert("성공적으로 조회 되었습니다.")
            //     this.searchCheck2 = 0
            // }else if(this.recipientItems.length === 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
            //     alert("조회 결과가 존재하지 않습니다.")
            //     this.searchCheck2 = 0
            // }
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
        this.searchCheck2 = 1
        this.getRecipientData();
      }
    },
    getsensorData() {
    axios.get(this.$store.state.serverApi +"/admin/codes?cmmnCdGroup=SENSOR.TYPECD", {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            this.sensorItems=[];
            this.sensorItems.push({label: '전체', value: ''});
            for(let i=0; i<response.data.data.length; i++) {
              this.sensorItems.push({
                label: response.data.data[i].cmmnCdNm,
                value: response.data.data[i].cmmnCd
              });
            }  
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getcheckTypeData(value) {
      let uri = ''
      if(value === 1){
        uri = this.$store.state.serverApi + "/admin/codes?cmmnCdGroup=GATEWAY.INSPCD";
      }else if(value === 2){
        uri = this.$store.state.serverApi + "/admin/codes?cmmnCdGroup=TABLET.INSPCD";
      }else{
        uri = this.$store.state.serverApi + "/admin/codes?cmmnCdGroup=SENSOR.INSPCD";
      }
      axios.get(uri, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            this.checktypeItems=[];
            this.checktypeItems.push({label: '전체', value: ''});
            for(let i=0; i<response.data.data.length; i++) {
              this.checktypeItems.push({
                label: response.data.data[i].cmmnCdNm,
                value: response.data.data[i].cmmnCd
              });
            }  
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    eList(value){
      switch (value){
          case 1 : this.equipList="gateway"; break;
          case 2 : this.equipList="tablet"; break;
          case 3 : this.equipList="sensor"; break;
      }
      this.getcheckTypeData(value);
    },
    },
}
</script>
<style>
</style>