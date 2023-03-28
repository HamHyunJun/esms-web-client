<template>
    <div>
        <div class="tabcontent">
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
            <div id="tab02" class="tabcnt01">
                <div class="list_top">
                    <div class="date_warp">
                        <div class="customerBts" style="justify-content: flex-start;">
                            <input type="date" v-model="occurStartDate"/>
                            <span class="tilde">~</span>
                            <input type="date" v-model="occurEndDate" :max="this.$moment().format('YYYY-MM-DD')"/>
                            <button type="button" class="btn" @click="manageInquiry()">조회</button>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <table>
                        <colgroup>
                            <col style="width:8%;">
                            <col style="width:8%;">
                            <col style="width:14%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:auto;">
                            <col style="width:auto;">
                            <col style="width:auto;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <th scope="col">순번</th>
                                <th scope="col">응급구분</th>
                                <th scope="col">MAC Addr</th>
                                <th scope="col">상태</th>
                                <th scope="col">테스트구분</th>
                                <th scope="col">신호발생일시</th>
                                <th scope="col">발생보고일시</th>
                                <th scope="col">신호종료일시</th>
                                <th scope="col">종료보고일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody htype-01">
                      <div v-if="this.pending" style="text-align: center;">
                        <img src="../../../assets/images/loading.png"  />
                      </div>
                        <table>
                            <colgroup>
                                <col style="width:8%;">
                                <col style="width:8%;">
                                <col style="width:14%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:auto;">
                                <col style="width:auto;">
                                <col style="width:auto;">
                                <col style="width:auto;">
                            </colgroup>
                            <tbody>
                                <tr v-for="(item,index) in listData" v-bind:key="index">
                                    <td>{{num(index+1)}}</td>
                                    <td>{{sensorNmChange(item.typeNm)}}</td>
                                    <td>{{item.macAddr}}</td>
                                    <td>{{item.signalStateNm}}</td>
                                    <td>{{!item.testYn ? '실제상황':'테스트'}}</td> 
                                    <td>{{item.occurDtime}}</td>
                                    <td>{{item.startReportDtime}}</td>
                                    <td v-if="item.signalStateCd !== 'STE001'">{{item.closeDtime}}</td>
                                    <td v-else></td>
                                    <td v-if="item.signalStateCd !== 'STE001'">{{item.endReportDtime}}</td>
                                    <td v-else></td>
                                    <!-- <td>{{item.occurDtime}}</td>
                                    <td>{{item.occurDtime}}</td>
                                    <td v-if="item.signalStateCd !== 'STE001'">{{item.closeDtime}}</td>
                                    <td v-else></td>
                                    <td v-if="item.signalStateCd !== 'STE001'">{{item.closeDtime}}</td>
                                    <td v-else></td> -->
                                </tr>   
                                
                            </tbody>
                        </table>
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
    </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import pagination from "../../pages/pagination.vue"

 export default {
   name: "Tap2",
   components: {
      pagination
    },
   props:{
     recipientId: String
   },
   data () {
     return {
      emergencys: null,
      occurStartDate:moment().subtract(6,'days').format('YYYY-MM-DD'),
      occurEndDate: moment().format('YYYY-MM-DD'),
      searchCheck1:1,searchCheck2:0,
      errorpopup1: false, errorpopup2: false,
      checkStartDate:moment().subtract(6,'days').format('YYYY-MM-DD'),
      checkEndDate:moment().format('YYYY-MM-DD'),
      pending:false,

      listData: [],
      total: '',
      page: 1,
      limit: 30,
      block: 10
     }
   },
  methods: {
    delay(){
        this.pending = true
    },
    pagingMethod(page) {
        this.listData = this.emergencys.slice(
          (page - 1) * this.limit,
          page * this.limit
        )
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
    errorpopupClose(input){
        switch(input){
            case 1 : this.errorpopup1 = false; this.occurStartDate=this.checkStartDate; this.occurEndDate=this.checkEndDate; break;
            case 2 : this.errorpopup2 = false; this.occurStartDate=this.checkStartDate; this.occurEndDate=this.checkEndDate; break;
        }
    },
    manageInquiry() {
        if(this.occurStartDate > this.occurEndDate){
        this.errorpopup1 = true
      }/*else if(this.occurEndDate > moment(this.occurStartDate).add(6, 'days').format('YYYY-MM-DD')){
        this.errorpopup2 = true
      }*/else{
        this.searchCheck2 = 1
        this.checkStartDate = this.occurStartDate
        this.checkEndDate = this.occurEndDate
        this.getEmergencysData()
      }
        
    },
    async getEmergencysData(){
      this.delay()
        const url  = this.$store.state.serverApi + `/admin/emergencys?recipientId=${this.recipientId}&pageIndex=1&recordCountPerPage=1000&occurStartDate=${this.occurStartDate}&occurEndDate=${this.occurEndDate}`
        
        await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.emergencys = res.data.data
            this.total = this.emergencys.length
            this.page = 1
            this.pagingMethod(this.page)
            if(this.searchCheck1 === 1){
                this.searchCheck1 = 0
            }
            this.pending = false
            // if(this.emergencys.length !== 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
            //     alert("성공적으로 조회 되었습니다.")
            //     this.searchCheck2 = 0
            // }else if(this.emergencys.length === 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
            //     alert("조회 결과가 존재하지 않습니다.")
            //     this.searchCheck2 = 0
            // }
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
          
    },
    sensorNmChange(input){
        let result = input
        switch(input){
            case "응급버튼" : result='응급호출기'; break;
            case "화재감지" : result='화재감지기'; break;
        }
        return result
     },

   },
   created() {
    this.getEmergencysData();
  }
 }
 </script>

<style scoped>


 </style>
                
            