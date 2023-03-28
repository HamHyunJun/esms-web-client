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
      <div id="" class="popupLayer" v-if="errorpopup3 == true">
        <div class="popup_wrap type-02">
          <div class="title_wrap">
            <div class="title">경고</div>
            <button type="button" class="btn_close" @click="errorpopup3 = false">닫기</button>
          </div>
          <div class="popup_cnt">
            <p class="alert_txt">선택하신 응급알람을 취소하시겠습니까?</p>
          </div>
          <div class="popbtn_area type-02">
            <button type="button" class="btn form3" @click="saveState()">확인</button>
            <button type="button" class="btn form2" @click="errorpopup3 = false">취소</button>
          </div>
        </div>
      </div>
      <div class="list_title_wrap">
        <span>이벤트 리포트</span>
        <i class="ico_nav"></i>
        <span class="on">응급 알람</span>
      </div>
      <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry'>
        <div class="table_wrap">
          <table>
            <colgroup>
              <col style="width:14.6%;">
              <col style="width:14.6%;">
              <col style="width:14.6%">
              <col style="width:13%;">
              <col style="width:13%;">
              <col style="width:8%;">
              <col style="width:auto;">
            </colgroup>
            <thead>
              <th scope="row">시/도</th>
              <th scope="row">시/군/구</th>
              <th scope="row">관리기관</th>
              <th scope="row">대상자명</th>
              <th scope="row">응급구분</th>
              <th scope="row">응급상태</th>
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
                  <input v-model="selectedRecipientNm" type="text" value="">
                </td>
                <td>
                  <select v-model="selectedTypeItems">
                    <option v-for="(type, index) in typeItems" :value="type.value" v-bind:key="index">{{type.label}}</option>
                  </select>
                </td>
                <td>
                  <select v-model="selectedStateItems">
                    <option v-for="(state, index) in stateItems" :value="state.value" v-bind:key="index">{{state.label}}</option>
                  </select>
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
        <div class="btn_area" >
          <button type="button" class="btn" @click="manageInquiry" >조회</button>
        </div>
      </div>
      <div class="one_box box_style">
        <div class="result_txt">
          <p>조회결과 : <strong class="num">{{!this.NCount? 0 : this.NCount}}</strong>건</p>
          <div class="btn_area">
            <button type="button" class="btn" @click="checkSaveState()">알람취소</button>
          </div>
        </div>
        <div class="list result">
          <table>
            <colgroup>
              <col style="width:2%;">
              <col style="width:3%;">
              <col style="width:8%;">
              <col style="width:5%;">
              <col style="width:3%;">
              <col style="width:18%;">
              <col style="width:7%;">
              <col style="width:5%;">
              <col style="width:7%;">
              <col style="width:5%;">
              <col style="width:4%;">
              <col style="width:5%;">
              <col style="width:8%;">
              <col style="width:8%;">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">선택</th>
                <th scope="col">순번</th>
                <th scope="col">관리기관</th>
                <th scope="col">대상자명</th>
                <th scope="col">나이</th>
                <th scope="col">주소</th>
                <th scope="col">대상자 전화번호</th>
                <th scope="col">응급요원명</th>
                <th scope="col">응급요원 전화번호</th>
                <th scope="col">응급구분</th>
                <th scope="col">응급상태</th>
                <th scope="col">테스트구분</th>
                <th scope="col">발생일시</th>
                <th scope="col">종료일시</th>
              </tr>
            </thead>
          </table>
          <div class="tbody">
            <table>
              <colgroup>
                <col style="width:2%;">
                <col style="width:3%;">
                <col style="width:8%;">
                <col style="width:5%;">
                <col style="width:3%;">
                <col style="width:18%;">
                <col style="width:7%;">
                <col style="width:5%;">
                <col style="width:7%;">
                <col style="width:5%;">
                <col style="width:4%;">
                <col style="width:5%;">
                <col style="width:8%;">
                <col style="width:8%;">
              </colgroup>
              <tbody >
                <tr v-for="(item,index) in recipientItems" v-bind:key="index">
                  <td v-if="item.signalStateCd === 'STE001'">
                    <div class="chk_area radio">
                      <input type="radio" name="saveChangeData" :id="`radio_${index}`" v-model="saveChangeData" :value="index">
                      <label :for="`radio_${index}`" class="chk"><i class="ico_chk"></i></label>
                    </div>
                  </td>
                  <td v-else></td>
                  <td>{{num(index+1)}}</td>
                  <td>{{item.orgNm}}</td>
                  <td>{{item.recipientNm}}</td>
                  <td>{{makeAge(item.birthday) }}</td>
                  <!--<td><a href="#" style="float:left">{{item.addr}}</a></td> -->
                  <td>{{item.addr}}</td> 
                  <td>{{changeRecipientPhoneno(item.recipientPhoneno)}}</td>
                  <td>{{item.managerNm}}</td>
                  <td>{{changeRecipientPhoneno(item.managerMobileNumber)}}</td>
                  <td>{{sensorNmChange(item.typeNm)}}</td>
                  <td>{{item.signalStateNm}}</td>
                  <td>{{!item.testYn? '실제상황':'테스트'}}</td>
                  <td>{{item.occurDtime}}</td>
                  <td>{{item.closeDtime}}</td>
                </tr>                                
              </tbody>
                <!--  
                  <tbody v-else>
                        데이터가 없습니다
                  </tbody>
                -->
            </table>
          </div>
        </div>
        <div class="pagination mt0">
          <pagination
            :pageSetting="pageDataSetting(total, limit, block, this.page)"
            @paging="pagingMethod"
          />
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
import pagination from "../pages/pagination.vue"

export default {
  name: 'UserListComponent',
  components :{
    HeaderComp,
    pagination
  },
  data() {
    return{
      orgNm:'',orgId:'', sido:'', sidoCd:'', sgg:'', sggCd:'', s_date: '', e_date: '',
      sidoItems:[], sggItems:[], orgmItems:[], typeItems:[], number:[], stateItems:[], changeStateItems:[], recipientItems:[],
      orgSido:'', orgSgg:'', orgCode:'',
      selectedSidoItems:'', selectedSggItems:'', selectedOrgItems:'', selectedRecipientNm:'', selectedTypeItems:'', selectedStateItems:'',
      cBirthday:'', cAddr: '', NCount : 0,
      errorpopup1: false, errorpopup2: false, errorpopup3: false,
      saveChangeData: null, updDtime:'',
      searchCheck1 : 1, searchCheck2 : 0,
      checkStartDate:moment().subtract(6,'days').format('YYYY-MM-DD'),
      checkEndDate:moment().format('YYYY-MM-DD'),
      routeQueryCount:0,

      listData: [],
      total: '',
      page: 1,
      limit: 30,
      block: 10,
    }
  },
  created() {
    this.s_date=moment().subtract(6, 'days').format('YYYY-MM-DD');
    this.e_date=moment().format('YYYY-MM-DD');
    this.getSidoData();
    this.getSggData();
    this.getOrgmData();
    this.getTypeData();
    this.getStateData();
    this.cBirthday=moment().format('YYYY-MM-DD');
    this.getRecipientData();
  },

    mounted() {
      this.pagingMethod(this.page)
    },
  methods:{
    pagingMethod(page) {
        // this.listData = this.recipientItems.slice(
        //   (page - 1) * this.limit,
        //   page * this.limit
        // )
        this.page = page
        this.getRecipientData()
        this.pageDataSetting(this.total, this.limit, this.block, page)
      },
      pageDataSetting(total, limit, block, page) {
        const totalPage = Math.ceil(total / limit)
        let currentPage = page
        const first =
          currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null
        const end =
          totalPage !== currentPage
            ? parseInt(currentPage, 10) + parseInt(1, 10)
            : null
 
        let startIndex = (Math.ceil(currentPage / block) - 1) * block + 1
        let endIndex =
          startIndex + block > totalPage ? totalPage : startIndex + block - 1
        let list = []
        for (let index = startIndex; index <= endIndex; index++) {
          list.push(index)
        }
        return { first, end, totalPage, list, currentPage }
      },
      num(index){
      if(this.page !== 1){
        for(let i=1; i<this.page; i++){
        index=index+30
        }
      }
      return index
    },
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
    //구분 목록
    getTypeData() {
      axios.get(this.$store.state.serverApi +"/admin/codes?cmmnCdGroup=ALARM.TYPECD", {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          this.typeItems=[];
          this.typeItems.push({label: '전체', value: ''});
          for(let i=0; i<response.data.data.length; i++) {
            this.typeItems.push({
              label: response.data.data[i].cmmnCdNm,
              value: response.data.data[i].cmmnCd
            });
          }  
          for(let i=0; i<this.typeItems.length; i++){
            if(this.typeItems[i].label === '응급버튼'){
              this.typeItems[i].label = '응급호출기'
            }else if(this.typeItems[i].label === '화재감지'){
              this.typeItems[i].label = '화재감지기'
            }
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    //상태 목록
    getStateData() {
      axios.get(this.$store.state.serverApi +"/admin/codes?cmmnCdGroup=ALARM.STATECD", {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          this.stateItems=[];
          this.changeStateItems=[];
          this.stateItems.push({label: '전체', value: ''});
          for(let i=0; i<response.data.data.length; i++) {
            this.stateItems.push({
              label: response.data.data[i].cmmnCdNm,
              value: response.data.data[i].cmmnCd
            });
            this.changeStateItems.push({
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
      // if(this.$route.query.state !== undefined && this.routeQueryCount === 0){
      //   this.selectedStateItems = this.$route.query.state
      //   this.routeQueryCount = 1
      // }
      let uri = this.$store.state.serverApi+"/admin/emergencys?pageIndex="+this.page+"&recordCountPerPage=30"+"&userId="+this.$store.state.userId+"&occurStartDate="+occurStartDate+"&occurEndDate="+occurEndDate;
      if(this.selectedSidoItems != '' || this.selectedRecipientNm != '' || this.selectedTypeItems != '' || this.selectedStateItems != ''){
        uri = this.$store.state.serverApi
        +"/admin/emergencys?pageIndex="+this.page+"&recordCountPerPage=30"
        +"&userId="+this.$store.state.userId
        +"&addrCd="+addrCd
        +"&orgId="+this.selectedOrgItems
        +"&typeCd="+this.selectedTypeItems
        +"&signalStateCd="+this.selectedStateItems
        +"&recipientNm="+this.selectedRecipientNm
        +"&occurStartDate="+occurStartDate
        +"&occurEndDate="+occurEndDate;
      }
      axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(response => {
          this.recipientItems = response.data.data
          this.NCount = response.data.totalCount
          this.total = this.NCount
        //   if(this.searchCheck1 === 1){
        //     this.searchCheck1 = 0
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
    sensorNmChange(input){
        let result = input
        switch(input){
            case "응급버튼" : result='응급호출기'; break;
            case "화재감지" : result='화재감지기'; break;
        }
        return result
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
        this.searchCheck2 = 1
        // this.pagingMethod(this.page)
        this.page = 1
        this.checkStartDate = this.s_date
        this.checkEndDate = this.e_date
        this.getRecipientData();   
        
      }
    },
    checkSaveState(){
      if(this.saveChangeData===null||this.saveChangeData===undefined){
        alert("변경하시고자 하는 값을 선택해 주세요"); 
        return;
      }else{
        this.errorpopup3 = true
      }
    },
    saveState(){
      let url = this.$store.state.serverApi+`/admin/emergencys/${this.recipientItems[this.saveChangeData].emergSignalId}/cancel`
      this.updDtime = moment().format('YYYY-MM-DD HH:mm:ss')
      let data ={
        alarmId:this.recipientItems[this.saveChangeData].emergSignalId,
        updDtime:this.updDtime,
        updId:this.$store.state.userId
      }
      axios.patch(url, data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
      .then(res => {
        let resData = res.data.data
        if(resData){
          alert("응급알람이 취소되었습니다.")
          this.errorpopup3 = false
          this.getRecipientData()
        }
      })
      .catch(error => {
          console.log("fail to load")
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    
  },
}
</script>
<style>
</style>