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
                <span>시스템관리</span>
                <i class="ico_nav"></i>
                <span class="on">IP-PBX 관리</span>
            </div>
            <!-- <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry'>
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
                            <th scope="row">관리지역명</th>
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
            </div> -->
            <div class="one_box box_style">
                <div class="result_txt">
                  <p>조회결과 : <strong class = "num">{{!this.NCount? 0 : this.NCount}}</strong>건</p>
                  <div class="btn_area">
                    <button type="button" class="btn" @click="saveIPPBX()">저장</button>
                  </div>
                </div>
                <div class="list result">
                    <table>
                        <colgroup>
                          <col style="width:4%;">
                          <col style="width:6%;">
                          <col style="width:8%;">
                          <col style="width:10%;">
                          <col style="width:8%;">
                          <col style="width:8%;">
                          <col style="width:8%;">
                          <col style="width:8%;">
                          <col style="width:12%;">
                          <col style="width:12%;">
                        </colgroup>
                        <thead>
                            <tr>
                              <th scope="col">선택</th>
                              <th scope="col">순번</th>
                              <th scope="col">지역명</th>
                              <th scope="col">지역번호</th>
                              <th scope="col">IP-PBX-화재</th>
                              <th scope="col">IP-PBX-응급</th>
                              <th scope="col">시작우편번호</th>
                              <th scope="col">종료우편번호</th>
                              <th scope="col">등록일시</th>
                              <th scope="col">수정일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody">
                        <table>
                            <colgroup>
                            <col style="width:4%;">
                            <col style="width:6%;">
                            <col style="width:8%;">
                            <col style="width:10%;">
                            <col style="width:8%;">
                            <col style="width:8%;">
                            <col style="width:8%;">
                            <col style="width:8%;">
                            <col style="width:12%;">
                            <col style="width:12%;">
                            </colgroup>
                            <tbody >
                                <tr v-for="(item,index) in recipientItems" v-bind:key="index">
                                    <td>
                                        <div class="chk_area radio">
                                            <input type="radio" name="saveChangeData" :id="`radio1_${index}`" v-model="saveChangeData" :value="index" @click="reset(index)">
                                            <label :for="`radio1_${index}`" class="chk"><i class="ico_chk"></i></label>
                                        </div>
                                    </td>
                                    <td>{{index+1}}</td>
                                    <td>{{item.numberAreaString}}</td>
                                    <td>{{item.numberArea}}</td><!--[this.saveChangeData]-->
                                    <td v-if="saveChangeData === index">
                                      <div class="input_area" style="margin-left:10px; margin-right:10px;">
                                        <input type="text" name="" :id="`radio1_${index}`" v-model="numberFire" >
                                      </div>
                                    </td>
                                    <td v-else>{{changeRecipientPhoneno(item.numberFire)}}</td>
                                    <td v-if="saveChangeData === index">
                                      <div class="input_area" style="margin-left:10px; margin-right:10px;">
                                        <input type="text" name="" id="" v-model="numberEmg">
                                      </div>
                                    </td>
                                    <td v-else>{{changeRecipientPhoneno(item.numberEmg)}}</td>
                                    <td v-if="saveChangeData === index">
                                      <div class="input_area" style="margin-left:10px; margin-right:10px;">
                                        <input type="text" name="" id="" v-model="firstZip">
                                      </div>
                                    </td>
                                    <td v-else>{{item.firstZip}}</td>
                                    <td v-if="saveChangeData === index">
                                      <div class="input_area" style="margin-left:10px; margin-right:10px;">
                                        <input type="text" name="" id="" v-model="lastZip">
                                      </div>
                                    </td>
                                    <td v-else>{{item.lastZip}}</td>
                                    
                                    <td>{{item.regDtime}}</td>
                                    <td>{{item.updDtime}}</td>
                                </tr>                                
                            </tbody>
                  
                        </table>
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
    name: 'Ippbx',
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
        errorpopup1: false, errorpopup2: false,
        saveChangeData: null,
        numberFire:null, numberEmg:null, firstZip:null, lastZip:null,
        radioCheck:'' ,radioCount:0,
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
        +"/admin/ippbx/list.do"
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
    // changeNumber2: function(event) {
    //   this.$emit('input', event.target.value);
    // },
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
        this.getRecipientData();
      }
    },
    reset(index){
      this.radioCheck = this.recipientItems[index].numberAreaString
      this.numberFire = this.recipientItems[index].numberFire
      this.numberEmg = this.recipientItems[index].numberEmg
      this.firstZip = this.recipientItems[index].firstZip
      this.lastZip = this.recipientItems[index].lastZip
      if(this.recipientItems[index].numberAreaString === this.radioCheck){
        this.saveChangeData = ''
        this.radioCheck = ''
      }
    },
    saveIPPBX(){
      if(this.saveChangeData===null||this.saveChangeData===undefined){
        alert("변경하시고자 하는 값을 선택해 주세요"); 
        return;
      }
      let tmpSaveData = this.recipientItems[this.saveChangeData]
      let tmpObjectData = {
        areaNumberId: this.recipientItems[this.saveChangeData].areaNumberId , 
        firstZip: this.recipientItems[this.saveChangeData].firstZip ,
        lastZip: this.recipientItems[this.saveChangeData].lastZip ,
        numberArea: this.recipientItems[this.saveChangeData].numberArea ,
        numberAreaString: this.recipientItems[this.saveChangeData].numberAreaString ,
        numberEmg: this.recipientItems[this.saveChangeData].numberEmg ,
        numberFire: this.recipientItems[this.saveChangeData].numberFire ,
        regDtime: this.recipientItems[this.saveChangeData].regDtime ,
        updDtime: this.recipientItems[this.saveChangeData].updDtime ,
      }
      tmpObjectData.numberFire = this.numberFire
      tmpObjectData.numberEmg = this.numberEmg
      tmpObjectData.firstZip = this.firstZip
      tmpObjectData.lastZip = this.lastZip

      const url = this.$store.state.serverApi+`/admin/ippbx/update.do?areaNumberId=${this.recipientItems[this.saveChangeData].areaNumberId}
      &firstZip=${this.firstZip}
      &lastZip=${this.lastZip}
      &numberFire=${this.numberFire}
      &numberEmg=${this.numberEmg}`

        axios.post(url,tmpObjectData,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let resData = res.data.data
            if(resData){
                alert("저장이 완료되었습니다.")
                this.getRecipientData()
                this.saveChangeData = ''
                this.radioCheck = ''
            }
            // this.getCSensorsData = res.data.data
          })
          .catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });

    }
  },
}
</script>
<style>
</style>