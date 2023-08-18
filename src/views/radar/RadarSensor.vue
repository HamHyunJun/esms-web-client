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
        <i class="ico_nav"></i>
        <span class="on">60GHz Radar</span>
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
              <th scope="row">센서위치</th>
              <th scope="row">대상자명</th>              
            </thead>
            <tbody>
              <tr>
                <td>
                  <select v-model="selectedRoomNmItem">
                    <option v-for="(roomName, index) in RoomNameItem" :value="roomName.value" v-bind:key="index">{{roomName.label}}</option>
                  </select>
                </td>
                <td>
                  <select v-model="selectedLocateItem">
                    <option v-for="(locate, index) in LocateItem" :value="locate.value" v-bind:key="index">{{locate.label}}</option>
                  </select>
                </td>
                <td>
                  <select v-model="selectedRecipientNm">
                    <option v-for="(recipientName, index) in RecipientNameItem" :value="recipientName.value" v-bind:key="index">{{recipientName.label}}</option>
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
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:7%;">
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:8%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:7%;">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">호실</th>
                <th scope="col">센서위치</th>
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
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:7%;">
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:5%;">
                <col style="width:8%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:6%;">
                <col style="width:7%;">
              </colgroup>
              <tbody >
                <tr v-for="(item,index) in recipientItems" v-bind:key="index">
                  <td>{{item.roomNm}}</td>
                  <td>{{changeSensor(item.sensorLocCd)}}</td>
                  <td>{{changeNm(item.macAddr)}}</td>
                  <td>{{changeBirthday(item.macAddr)}}</td>
                  <td>{{changeOld(item.macAddr)}}</td> 
                  <td>{{changeSex(item.macAddr)}}</td>
                  <td>작동중</td>
                  <td>{{item.measureDtime}}</td>
                  <td>{{item.hr}}</td>
                  <td>{{item.br}}</td>
                  <td>{{item.act}}</td>
                  <td v-if="item.pd === '1'" style="color:#FFFF00">감지</td>
                  <td v-else style="color:red">미감지</td>
                  <td>{{changeManager(item.macAddr)}}</td>
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
      RoomNameItem:[{label:'전체', value:''},{label:'202', value:'71'},{label:'아이오비', value:'70'},{label:'박해만', value:'75'}],
      RecipientNameItem:[{label:'전체', value:''},{label:'박해만', value:'847127fffe4cfcc9'},{label:'김기영', value:'847127fffe4cfcd4'},{label:'배현석', value:'847127fffe4cfcbe'}],
      LocateItem:[{label:'전체', value:''}], selectedRoomNmItem:'', selectedLocateItem:'',
      orgSido:'', orgSgg:'', orgCode:'',
      selectedSidoItems:'', selectedSggItems:'', selectedOrgItems:'', selectedRecipientNm:'', selectedMacAddr:'',
      NCount : 0,
      errorpopup1: false, errorpopup2: false, errorpopup3: false,
      searchCheck1 : 1, searchCheck2 : 0,
      checkStartDate:moment().subtract(1,'days').format('YYYY-MM-DD'),
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
    this.s_date=moment().subtract(1, 'days').format('YYYY-MM-DD');
    this.e_date=moment().format('YYYY-MM-DD');
    this.getSidoData();
    this.getSggData();
    this.getOrgmData();
    this.getLocateData();
    this.cBirthday=moment().format('YYYY-MM-DD');
    this.getRecipientData();
  },

    mounted() {
      this.pagingMethod(this.page)
    },
  methods:{
    pagingMethod(page) {
        this.listData = this.recipientItems.slice(
          (page - 1) * this.limit,
          page * this.limit
        )
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
    getLocateData() {
      let url =this.$store.state.serverApi + "/admin/codes?cmmnCdGroup=SENSOR.LOCATECD";
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          for(let i=0; i<response.data.data.length; i++) {
            this.LocateItem.push({
              label: response.data.data[i].cmmnCdNm,
              value: response.data.data[i].cmmnCd,
            });
          } 
          for(let i=0; i<this.LocateItem.length; i++){
            if(this.LocateItem[i].label === '거실'){
              this.LocateItem[i].label = '배드1'
            }else if(this.LocateItem[i].label === '안방'){
              this.LocateItem[i].label = '배드2'
            }
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async getRecipientData() {      
      // if(this.$route.query.state !== undefined && this.routeQueryCount === 0){
      //   this.selectedStateItems = this.$route.query.state
      //   this.routeQueryCount = 1
      // }

      // let uri = this.$store.state.serverApi
      // +"/admin/sensors/radars?pageIndex="+this.page+"&recordCountPerPage=30"
      // +"&roomId="+this.roomid
      // +"&roomNm="+this.roomNm
      // +"&sensorLocCd="+this.sensorLocCd
      // +"&measureStartDate="+this.s_date
      // +"&measureEndDate="+this.e_date
      let uri = this.$store.state.serverApi
      +"/admin/sensors/radars?recordCountPerPage=30&pageIndex="+(this.page - 1)
      +"&userId="+this.$store.state.userId
      +"&roomId="+this.selectedRoomNmItem
      +"&sensorLocCd="+this.selectedLocateItem
      +"&macAddr="+this.selectedRecipientNm
      +"&measureStartDate="+this.s_date
      +"&measureEndDate="+this.e_date
      await axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
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
    errorpopupClose(input){
        switch(input){
            case 1 : this.errorpopup1 = false; this.s_date=this.checkStartDate; this.e_date=this.checkEndDate; break;
            case 2 : this.errorpopup2 = false; this.s_date=this.checkStartDate; this.e_date=this.checkEndDate; break;
        }
    },
    changeSensor(input){
      let result = ''
      switch(input){
        case 'LOC001' : result='배드1'; break;
        case 'LOC002' : result='거실2'; break;
        case 'LOC003' : result='배드2'; break;
        case 'LOC004' : result='안방2'; break;
        case 'LOC005' : result='화장실'; break;
        case 'LOC006' : result='화장실2'; break;
        case 'LOC007' : result='현관'; break;
        case 'LOC008' : result='뒷문'; break;
        case 'LOC009' : result='주방'; break;
        case 'LOC010' : result='주방2'; break;
        case 'LOC011' : result='작은방'; break;
        case 'LOC012' : result='작은방2'; break;
      }
      return result
    },
    changeNm(input){
      let result = ''
      switch(input){
        case '847127fffe4cfcc9' : result='박해만'; break;
        case '847127fffe4cfcd4' : result='김기영'; break;
        case '847127fffe4cfcbe' : result='배현석'; break;
      }
      return result
    },
    changeBirthday(input){
      let result = ''
      switch(input){
        case '847127fffe4cfcc9' : result='1970-01-01'; break;
        case '847127fffe4cfcd4' : result='1961-11-12'; break;
        case '847127fffe4cfcbe' : result='1954-02-05'; break;
      }
      return result
    },
    changeOld(input){
      let result = ''
      switch(input){
        case '847127fffe4cfcc9' : result='53'; break;
        case '847127fffe4cfcd4' : result='61'; break;
        case '847127fffe4cfcbe' : result='69'; break;
      }
      return result
    },
    changeSex(input){
      let result = ''
      switch(input){
        case '847127fffe4cfcc9' : result='남'; break;
        case '847127fffe4cfcd4' : result='남'; break;
        case '847127fffe4cfcbe' : result='남'; break;
      }
      return result
    },
    changeManager(input){
      let result = ''
      switch(input){
        case '847127fffe4cfcc9' : result='홍수호'; break;
        case '847127fffe4cfcd4' : result='이현정'; break;
        case '847127fffe4cfcbe' : result='김미혜'; break;
      }
      return result
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