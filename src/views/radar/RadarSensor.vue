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
        <span>레이더센서</span>
      </div>
      <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry'>
        <div class="table_wrap">
          <table>
            <colgroup>
              <col style="width:20%;">
              <col style="width:20%;">
              <col style="width:20%">
              <col style="width:24%;">
            </colgroup>
            <thead>
              <th scope="row">호실</th>
              <th scope="row">센서명</th>
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
        </div>
        <div class="list result">
          <table>
            <colgroup>
                <col style="width:6%;">
                <col style="width:7%;">
                <col style="width:5%;">
                <col style="width:8%;">
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:8%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:8%;">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">호실</th>
                <th scope="col">센서명</th>
                <th scope="col">대상자명</th>
                <th scope="col">생년월일</th>
                <th scope="col">나이</th>
                <th scope="col">성별</th>
                <th scope="col">센서상태</th>
                <th scope="col">측정일시</th>
                <th scope="col">심장박동</th>
                <th scope="col">호흡</th>
                <th scope="col">활동량</th>
                <th scope="col">존재감지</th>
                <th scope="col">담당자</th>
              </tr>
            </thead>
          </table>
          <div class="tbody">
            <table>
              <colgroup>
                <col style="width:6%;">
                <col style="width:7%;">
                <col style="width:5%;">
                <col style="width:8%;">
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:8%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:8%;">
              </colgroup>
              <tbody >
                <tr v-for="(item,index) in recipientItems" v-bind:key="index">
                  <td>201</td>
                  <td>배드1</td>
                  <td>윤시내</td>
                  <td>1943-06-06</td>
                  <td>79</td> 
                  <td>여</td>
                  <td>작동중</td>
                  <td>2022-10-28 00:53:30</td>
                  <td>78</td>
                  <td>28</td>
                  <td>828</td>
                  <td style="color:blue">감지</td>
                  <td>최수진</td>
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
      roomid:'', roomNm:'', sensorLocCd:'',

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
      let uri = this.$store.state.serverApi
      +"/admin/sensors/radars?pageIndex="+this.page+"&recordCountPerPage=30"
      +"&roomId="+this.roomid
      +"&roomNm="+this.roomNm
      +"&sensorLocCd="+this.sensorLocCd
      +"&measureStartDate="+this.s_date
      +"&measureEndDate="+this.e_date
      
      axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(response => {
          this.recipientItems = response.data.data
          console.log(this.recipientItems)
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
  },
}
</script>
<style>
</style>