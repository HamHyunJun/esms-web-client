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
                <span>시스템관리</span>
                <i class="ico_nav"></i>
                <span class="on">로그 관리</span>
            </div>
            <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry'>
                <div class="table_wrap type-02">
                    <table>
                        <colgroup>
                            <col style="width:48.5%;">
                            <col style="width:15%;">
                            <col style="width:15%;">
                            <col style="width:23.5%">
                        </colgroup>
                        <thead>
                            <th scope="row">로그구분</th>
                            <th scope="row">태블릿 아이디</th>
                            <th scope="row">고객 아이디</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="btn_area log">
                                        <button type="button" @click="log(1)" @change="onChange($event)" class="btn" value="1" :class="logtoggle===1?'btn on':'btn'" >서버로그</button>
                                        <button type="button" @click="log(2)" @change="onChange($event)" class="btn" value="2" :class="logtoggle===2?'btn on':'btn'">장비로그</button>
                                    </div>
                                </td>
                                <td>
                                    <input type="text" value="" v-model="selectedtabletId">
                                </td>
                                <td>
                                    <input type="text" value="" v-model="selectedrecipientId">
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
                    <button type="button" class="btn form2" v-on:click="initSet">초기화</button>
                </div> 
            </div>
            <div class="one_box box_style">
                <div class="result_txt" v-if="logtoggle===1">
                  <p>조회결과 : <strong class="num">{{!this.NCount? 0 : this.NCount}}</strong>건</p>
                </div>
                <div class="result_txt" v-if="logtoggle===2">
                  <p>조회결과 : <strong class="num">{{!this.ENCount? 0 : this.ENCount}}</strong>건</p>
                </div>
                <div class="list result" v-if="logtoggle===1"><!-- 로그 선택시 -->
                  <table>
                    <colgroup>
                      <col style="width:6%;">
                      <col style="width:10%;">
                      <col style="width:10%;">
                      <col style="width:12%;">
                      <col style="width:12%;">
                      <col style="width:auto;">
                      <col style="width:20%;">
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col">순번</th>
                        <th scope="col">아이디</th>
                        <th scope="col">Application</th>
                        <th scope="col">구분</th>
                        <th scope="col">IP</th>
                        <th scope="col">내용</th>
                        <th scope="col">로그일시</th>
                      </tr>
                    </thead>
                  </table>
                  <div class="tbody">
                    <table>
                      <colgroup>
                        <col style="width:6%;">
                        <col style="width:10%;">
                        <col style="width:10%;">
                        <col style="width:12%;">
                        <col style="width:12%;">
                        <col style="width:auto;">
                        <col style="width:20%;">
                      </colgroup>
                      <tbody >
                        <tr v-for="(item,index) in listData" v-bind:key="index">
                          <td>{{num(index+1)}}</td>
                          <td>{{item.userId}}</td>
                          <td>{{item.applicationNm}}</td>
                          <td>{{item.actionDetails}}</td>
                          <td>{{item.accessIp}}</td>
                          <td>{{item.logDetails}}</td>
                          <td>{{item.logDtime}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="list result" v-if="logtoggle===2"><!-- 통신로그 선택시 -->
                  <table>
                    <colgroup>
                      <col style="width:auto;">
                      <col style="width:15%;">
                      <col style="width:15%;">
                      <col style="width:15%;">
                      <col style="width:15%;">
                      <col style="width:auto;">
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col">로그일</th>
                        <th scope="col">출발지</th>
                        <th scope="col">목적지</th>
                        <th scope="col">태블릿아이디</th>
                        <th scope="col">고객아이디</th>
                        <th scope="col">로그</th>
                      </tr>
                    </thead>
                  </table>
                  <div class="tbody">
                    <table>
                      <colgroup>
                        <col style="width:auto;">
                        <col style="width:15%;">
                        <col style="width:15%;">
                        <col style="width:15%;">
                        <col style="width:15%;">
                        <col style="width:auto;">
                      </colgroup>
                      <tbody>
                        <tr v-for="(item,index) in listData" v-bind:key="index">
                          <td>{{item.logDtime}}</td>
                          <td>{{item.logSource}}</td>
                          <td>{{item.logTarget}}</td>
                          <td>{{item.tabletId}}</td>
                          <td>{{item.recipientId}}</td>
                          <td>{{item.logDetails}}</td>
                        </tr>
                      </tbody>
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
import log1 from "./detailpage/Log1.vue";
import log2 from "./detailpage/Log2.vue";
import pagination from "../pages/pagination.vue"


export default {
    name: 'ManageLog',
    components : {
        HeaderComp,
        pagination,
        log1,
        log2,
    },
    data(){
      return{
        tabletId: '', recipientId: '', s_date: '', e_date: '', ls_date:'', le_date:'',
        isTablet: false, isCustomer: false,
        isLog: true, isComLog: false,
        logItems: [], comLogItems: [],
        logtoggle: 1, selectedtabletId: '', selectedrecipientId: '',
        NCount:0, ENCount:0,
        errorpopup1: false, errorpopup2: false, 
        searchCheck1 : 1, searchCheck2 : 0,
        checkStartDate:moment().subtract(6,'days').format('YYYY-MM-DD'),
        checkEndDate:moment().format('YYYY-MM-DD'),

        listData: [],
        total: '',
        page: 1,
        limit: 30,
        block: 10
      }
    },
    created(){
      this.s_date=moment().subtract(6, 'days').format('YYYY-MM-DD');
      this.e_date=moment().format('YYYY-MM-DD');
      this.getLogData();
      this.getEquLogData();
      
    },
    methods:{
      pagingMethod(page) {
        if(this.logtoggle === 1){
        this.listData = this.logItems.slice(
          (page - 1) * this.limit,
          page * this.limit
        )
        }else if(this.logtoggle === 2){
          this.listData = this.comLogItems.slice(
          (page - 1) * this.limit,
          page * this.limit
          )
        }
        this.page = page
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
      getLogData() {
      let uri = this.$store.state.serverApi + "/admin/logs/servers?pageIndex=1&recordCountPerPage=1000"
      +"&startDate="+this.s_date
      +"&endDate="+this.e_date;;
      axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(response => {
            this.logItems = response.data.data
            this.NCount =this.logItems.length
            this.total = this.logItems.length
            this.page = 1
            this.pagingMethod(this.page)
        //     if(this.searchCheck1 === 1){
        //     this.searchCheck1 = 0
        // }
        // if(this.logItems.length !== 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     alert("성공적으로 조회 되었습니다.")
        //     this.searchCheck2 = 0
        // }else if(this.logItems.length === 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     alert("조회 결과가 존재하지 않습니다.")
        //     this.searchCheck2 = 0
        // }
          })          
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      },
      getEquLogData() {
      let uri = this.$store.state.serverApi+"/admin/logs/equipments?pageIndex=1&recordCountPerPage=1000"
      +"&startDate="+this.s_date
      +"&endDate="+this.e_date
      +"&recipientId=" + this.selectedrecipientId
      +"&tabletId=" + this.selectedtabletId;

        axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(response => {
            this.comLogItems = response.data.data
            this.ENCount =this.comLogItems.length
            this.total = this.comLogItems.length
            this.page = 1
            this.pagingMethod(this.page)
        //     if(this.searchCheck1 === 1){
        //     this.searchCheck1 = 0
        // }
        // if(this.comLogItems.length !== 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     alert("성공적으로 조회 되었습니다.")
        //     this.searchCheck2 = 0
        // }else if(this.comLogItems.length === 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     alert("조회 결과가 존재하지 않습니다.")
        //     this.searchCheck2 = 0
        // }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      },
      onChange(event) {
      let optionValue = event.target.value;
      switch (optionValue) {
        case "1":
          this.logtoggle=1
          this.isLog=true; this.isComLog=false;
          this.isTablet=false; this.isCustomer=false;
          this.getLogData();
          break;
        case "2":
          this.logtoggle=2
          this.isLog=false; this.isComLog=true;
          this.isTablet=true; this.isCustomer=true;
          this.getEquLogData();
          break;
      }
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
        this.checkStartDate = this.s_date
        this.checkEndDate = this.e_date
      if(this.logtoggle===1){
        this.getLogData();
      } else {
        this.getEquLogData();
      }
      }
    },
      initSet() {
      this.s_date=moment().subtract(6, 'days').format('YYYY-MM-DD');
      this.e_date=moment().format('YYYY-MM-DD');
      if(this.logtoggle===1){
      this.getLogData();
      }else {
      this.getEquLogData();
      }
    },
    log(value){
      switch (value){
          case 1 : this.logtoggle=1; this.getLogData(); break;
          case 2 : this.logtoggle=2; this.getEquLogData(); break;
      }
    },
    }
}
</script>
<style>
</style>