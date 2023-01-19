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
            <div id="tab01" class="tabcnt01" style="display:block;">
                <div class="list_top">
                    <i class="search_ico"></i>
                    <div class="fillter_wrap">
                        <div class="select_area">
                            <select name="code1" id="code1" ref="code1" v-model="code1" @change="filterChange(1)">
                                <option v-for="(items, index ) in envData" v-bind:value="items.value" v-bind:key="index"> 
                                    {{ items.text }}
                                </option>
                                
                            </select>
                        </div>
                        <div class="select_area">
                            <select name="code2" id="code2" ref="code2" v-model="code2" @change="filterChange(2)">
                                <option v-for="(items, index ) in bioData" v-bind:value="items.value" v-bind:key="index"> 
                                    {{ items.text }}
                                </option>
                                <!-- <option value="">바이오 정보</option>
                                <option value="">전체</option>
                                <option value="TPE005">심장박동</option>
                                <option value="TPE011">호흡</option>
                                <option value="TPE012">활동량</option> -->
                            </select>
                        </div>
                        <div class="select_area">
                            <select name="code3" id="code3" ref="code3" v-model="code3" @change="filterChange(3)">
                                <option v-for="(items, index ) in actPData" v-bind:value="items.value" v-bind:key="index"> 
                                    {{ items.text }}
                                </option>
                                <!-- <option value="">활동감지기(P)정보</option>
                                <option value="">전체</option>
                                <option value="TPE002">거실</option>
                                <option value="TPE002">화장실</option>                                               -->
                            </select>
                        </div>
                        <div class="select_area">
                            <select name="code4" id="code4" ref="code4" v-model="code4" @change="filterChange(4)">
                                <option v-for="(items, index ) in doorData" v-bind:value="items.value" v-bind:key="index"> 
                                    {{ items.text }}
                                </option>
                                <!-- <option value="">도어감지기 정보</option>
                                <option value="">전체</option>
                                <option value="TPE004">뒷문</option>
                                <option value="TPE004">대문</option> -->
                            </select>
                        </div>
                    </div>
                    <div class="date_warp">
                        <div class="customerBts" style="justify-content: flex-start;">
                            <input type="date" v-model="measureStartDate"  />
                            <span class="tilde">~</span>
                            <input type="date" v-model="measureEndDate" :max="this.$moment().format('YYYY-MM-DD')"/>
                            <button type="button" class="btn" @click="manageInquiry(code1,code2,code3,code4)">조회</button>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <table>
                        <colgroup>
                            <col style="width:10%;">
                            <col style="width:15%;">
                            <col v-if="sensorList === 'act' || sensorList === 'door'" style="width:15%;">
                            <col style="width:25%;">
                            <col style="width:25%;">
                            <col style="width:25%;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <th scope="col">순번</th>
                                <th scope="col">설치장소</th>
                                <th v-if="sensorList === 'act' || sensorList === 'door'" scope="col">관리번호</th>
                                <th scope="col">측정일시</th>
                                <th scope="col">보고일시</th>
                                <!-- <th scope="col">{{
                                    code1==="TPE006"? '온도' :
                                    code1==="TPE008"? '조도' :
                                    code1==="TPE007"? '습도' :
                                    code1==="TPE005"? '심장박동' :
                                    code1==="TPE011"? '호흡' :
                                    code1==="TPE012"? '활동량' : '온도'
                                    }}</th> -->
                                <th scope="col">{{this.labelText}}</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody htype-05">
                        <div v-if="this.pending" style="text-align: center;">
                        <img src="../../../assets/images/loading.png"  />
                    </div>
                        <table>
                            <colgroup>
                                <col style="width:10%;">
                                <col style="width:15%;">
                                <col v-if="sensorList === 'act' || sensorList === 'door'" style="width:15%;">
                                <col style="width:25%;">
                                <col style="width:25%;">
                                <col style="width:25%;">
                            </colgroup>
                            <tbody>
                                <tr  v-for="(item,index) in listData" v-bind:key="index">
                                    <td>{{num(index+1)}}</td>
                                    <td>{{locationCode(item.sensorLocCd)}}</td>
                                    <td v-if="sensorList === 'act' || sensorList === 'door'">{{item.sensorIndex}}</td>
                                    <td>{{item.measureDtime}}</td>
                                    <td>{{item.reportDtime}}</td>
                                    <!-- <td>{{item.measureDtime}}</td>
                                    <td v-if="sensorList === 'door'">{{item.reportDtime}}</td>
                                    <td v-else>{{item.reportDtime}}</td> -->
                                    <td>{{item.measureValue}}</td>
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
   name: "Tap1",
   components: {
      pagination
    },
   props:{
     recipientId: String
   },
   data () {
        return {
        sensorsData: [],
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        measureStartDate:moment().subtract(6,'days').format('YYYY-MM-DD'),
        measureEndDate: moment().format('YYYY-MM-DD'),
        checkStartDate:moment().subtract(6,'days').format('YYYY-MM-DD'),
        checkEndDate:moment().format('YYYY-MM-DD'),
        labelText:'정보',
        codeText:'°C',
        envData:[{text: '환경 정보', value:''},{text: '온도', value: 2},{text: '조도', value: 3},{text: '습도', value: 4}, ],
        bioData:[{text: '바이오 정보', value: ''},{text: '심장박동', value: 6},{text: '호흡', value: 7},{text: '활동량', value: 8}, ],
        actPData:[{text: '활동감지기(P) 정보', value: ''},{text: '전체', value: 9},{text: '거실', value: 10},{text: '거실2', value: 11},{text: '안방', value: 12},{text: '안방2', value: 13}
        ,{text: '화장실', value: 14},{text: '화장실2', value: 15},{text: '주방', value: 16},{text: '주방2', value: 17},{text: '작은방', value: 18},{text: '작은방2', value: 19} ],
        doorData:[{text: '도어감지기 정보', value: ''},{text: '전체', value:20},{text: '현관', value: 21},{text: '뒷문', value: 22}, ],
        selectedValue : null,
        pending:false,
        sensorsTmp1Data: [],
        sensorsTmp2Data: [],
        sensorsTmp3Data: [],
        locCode: '',
        //{text: '전체', value: 1},{text: '전체', value: 5},
        searchCheck1 : 1, searchCheck2 : 0, sensorList:'',
        errorpopup1: false, errorpopup2: false,

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
        this.listData = this.sensorsData.slice(
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
            case 1 : this.errorpopup1 = false; this.measureStartDate=this.checkStartDate; this.measureEndDate=this.checkEndDate; break;
            case 2 : this.errorpopup2 = false; this.measureStartDate=this.checkStartDate; this.measureEndDate=this.checkEndDate; break;
        }
    },
    filterChange(input){
        switch (input){
          case 1 : this.code2='';this.code3='';this.code4=''; break;
          case 2 : this.code1='';this.code3='';this.code4=''; break;
          case 3 : this.code1='';this.code2='';this.code4=''; break;
          case 4 : this.code1='';this.code2='';this.code3=''; break;
        }
        
    },
    manageInquiry(input,input2,input3,input4) {
        if(this.measureStartDate > this.measureEndDate){
        this.errorpopup1 = true
      }else if(this.measureEndDate > moment(this.measureStartDate).add(6, 'days').format('YYYY-MM-DD')){
        this.errorpopup2 = true
      }else{
        this.searchCheck2 = 1
        this.checkStartDate = this.measureStartDate
        this.checkEndDate = this.measureEndDate
        this.getSensorsData(input,input2,input3,input4);
      }
        
    },
    async getSensorsData(input,input2,input3,input4){
        let code = input ? input : input2 ? input2 : input3 ? input3 :  input4 
        this.delay()
        //드롭다운 코드화 및 값 설정
        // switch (code){
        //   case 1 : this.selectedValue = 'all'; break;
        //   case 2 : this.selectedValue = 'TPE006'; break;
        //   case 3 : this.selectedValue = 'TPE008'; break;
        //   case 4 : this.selectedValue = 'TPE007'; break;
        //   case 6 : this.selectedValue = 'TPE005'; break;
        //   case 7 : this.selectedValue = 'TPE011'; break;
        //   case 8 : this.selectedValue = 'TPE012'; break;
        //   case 9 : this.selectedValue = 'TPE002'; break;
        //   case 10 : this.selectedValue = 'TPE002'; break;
        //   case 11 : this.selectedValue = 'TPE002'; break;
        //   case 12 : this.selectedValue = 'TPE004'; break;
        //   case 13 : this.selectedValue = 'TPE004'; break;
        //   case 14 : this.selectedValue = 'TPE004'; break;
        // }
        switch (code){
          case 1 : this.selectedValue = 'all'; break;
          case 2 : this.selectedValue = 'TPE006'; break;
          case 3 : this.selectedValue = 'TPE008'; break;
          case 4 : this.selectedValue = 'TPE007'; break;
          case 6 : this.selectedValue = 'TPE005'; break;
          case 7 : this.selectedValue = 'TPE011'; break;
          case 8 : this.selectedValue = 'TPE012'; break;
          case 9 : this.selectedValue = 'TPE002'; break;
          case 10 : this.selectedValue = 'TPE002'; break;
          case 11 : this.selectedValue = 'TPE002'; break;
          case 12 : this.selectedValue = 'TPE002'; break;
          case 13 : this.selectedValue = 'TPE002'; break;
          case 14 : this.selectedValue = 'TPE002'; break;
          case 15 : this.selectedValue = 'TPE002'; break;
          case 16 : this.selectedValue = 'TPE002'; break;
          case 17 : this.selectedValue = 'TPE002'; break;
          case 18 : this.selectedValue = 'TPE002'; break;
          case 19 : this.selectedValue = 'TPE002'; break;
          case 20 : this.selectedValue = 'TPE004'; break;
          case 21 : this.selectedValue = 'TPE004'; break;
          case 22 : this.selectedValue = 'TPE004'; break;
        }
        //드롭다운 코드화 및 라벨 설정
    //     switch (code){
    //       case 2 : this.labelText="온도"; this.codeText=" °C"; break;
    //       case 3 : this.labelText="조도"; this.codeText=" lx"; break;
    //       case 4 : this.labelText="습도"; this.codeText=" %"; break;
    //       case 6 : this.labelText="심장박동"; this.codeText=" 회"; break;
    //       case 7 : this.labelText="호흡"; this.codeText=" 회"; break;
    //       case 8 : this.labelText="활동량"; this.codeText=" "; break;
    //       case 9 : this.labelText="횟수"; this.codeText=" 회"; break; // 활동감지기 전체
    //       case 10 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC005"; break; //화장실
    //       case 11 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC001"; break; //거실
    //       case 12 : this.labelText="상태"; this.codeText=" "; break; //도어감지기 전체
    //       case 13 : this.labelText="상태"; this.codeText=" "; this.locCode="LOC007"; break; //현관
    //       case 14 : this.labelText="상태"; this.codeText=" "; this.locCode="LOC008"; break;  //뒷문
    //   }
      switch (code){
          case 2 : this.labelText="온도"; this.codeText=" °C"; break;
          case 3 : this.labelText="조도"; this.codeText=" lx"; break;
          case 4 : this.labelText="습도"; this.codeText=" %"; break;
          case 6 : this.labelText="심장박동"; this.codeText=" 회"; break;
          case 7 : this.labelText="호흡"; this.codeText=" 회"; break;
          case 8 : this.labelText="활동량"; this.codeText=" "; break;
          case 9 : this.labelText="횟수"; this.codeText=" 회"; break; // 활동감지기 전체
          case 10 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC001"; break; //거실
          case 11 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC002"; break; //거실2
          case 12 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC003"; break; //안방
          case 13 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC004"; break; //안방2
          case 14 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC005"; break; //화장실
          case 15 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC006"; break; //화장실2
          case 16 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC009"; break; //주방
          case 17 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC0010"; break; //주방2
          case 18 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC0011"; break; //작은방
          case 19 : this.labelText="횟수"; this.codeText=" 회"; this.locCode="LOC0012"; break; //작은방2
          case 20 : this.labelText="상태"; this.codeText=" "; break; //도어감지기 전체
          case 21 : this.labelText="상태"; this.codeText=" "; this.locCode="LOC007"; break; //현관
          case 22 : this.labelText="상태"; this.codeText=" "; this.locCode="LOC008"; break;  //뒷문
      }
        //TPE011
        //&sensorLocCd=${code2}

        /*case "LOC001" : result="거실"; break;
          case "LOC002" : result="거실2" ;break;
          case "LOC003" : result="안방"; break;
          case "LOC004" : result="안방2" ;break;
          case "LOC005" : result="화장실" ;break;
          case "LOC006" : result="화장실2" ;break;
          case "LOC007" : result="현관" ;break;
          case "LOC008" : result="뒷문" ;break;
          case "LOC009" : result="주방" ;break;
          case "LOC010" : result="주방2" ;break;
          case "LOC011" : result="작은방" ;break;
          case "LOC012" : result="작은방2" ;break;
           */
        let url=''
        if(code ===8 ){
            url = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/sensors/actmeasures?sensorTypeCd=${this.selectedValue}&measureStartDate=${this.measureStartDate}&measureEndDate=${this.measureEndDate}`
        }else if(code ===10 || code ===11 || code ===12 || code ===13 || code ===14 || code ===15
         || code ===16 || code ===17 || code ===18 || code ===19 || code ===21 || code ===22){
            url = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/sensors/measures?sensorTypeCd=${this.selectedValue}&sensorLocCd=${this.locCode}&measureStartDate=${this.measureStartDate}&measureEndDate=${this.measureEndDate}`
        }else{
            url = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/sensors/measures?sensorTypeCd=${this.selectedValue}&measureStartDate=${this.measureStartDate}&measureEndDate=${this.measureEndDate}`
        }
        //const url  = `/admin/recipients/${this.recipientId}/sensors`
        if(code !== 1 &&code !== 5){
            await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                let tmpData = []
                let tmp = []
                this.sensorsData = []
                let lengthTmp = []
                lengthTmp = res.data
                console.log(lengthTmp)
                if(lengthTmp.totalCount === 0){
                    this.pending = false
                    console.log("this1")
                }
                
                if(this.selectedValue==="TPE006"||this.selectedValue==="TPE007"||this.selectedValue==="TPE008"){
                    for(let i=0; i <lengthTmp.totalCount ;i++ ){
                        tmpData = res.data.data[i]
                        tmp = res.data.data[i].measureValue.split(',')
                        for(let j=tmp.length-1; j >=0 ;j-- ){
                            this.sensorsData.push({
                            sensorId: tmpData.sensorId,
                            sensorTypeCd: tmpData.sensorTypeCd,
                            measureValue: tmp[j] + this.codeText,
                            testYn: tmpData.testYn,
                            sensorLocCd: tmpData.sensorLocCd,
                            measureDtime: moment(tmpData.measureDtime).subtract(tmpData.intervalTime*(tmp.length-1), 's').add(tmpData.intervalTime*j, 's').format('YYYY-MM-DD HH:mm:ss'),
                            regDtime : tmpData.regDtime,
                            reportDtime : tmpData.reportDtime
                        })
                        this.sensorList = ''
                        }
                    }
                    this.pending=false
                    console.log(this.sensorsData[0])
                }else if(this.selectedValue==="TPE005"||this.selectedValue==="TPE011"){
                    for(let i=0; i <lengthTmp.totalCount ;i++ ){
                        tmpData = res.data.data[i]
                        tmp = res.data.data[i].measureValue.split(',')
                        for(let j=tmp.length-1; j >=0 ;j-- ){
                            this.sensorsData.push({
                                sensorId: tmpData.sensorId,
                                sensorTypeCd: tmpData.sensorTypeCd,
                                measureValue: tmp[j] + this.codeText,
                                testYn: tmpData.testYn,
                                sensorLocCd: tmpData.sensorLocCd,
                                measureDtime: moment(tmpData.measureDtime).subtract(tmpData.intervalTime*(tmp.length-1), 's').add(tmpData.intervalTime*j, 's').format('YYYY-MM-DD HH:mm:ss'),
                                regDtime : tmpData.regDtime,
                                reportDtime : tmpData.reportDtime
                            })
                        }
                        this.sensorList = ''
                        this.pending=false
                    }
                }else if(this.selectedValue==="TPE012"){
                    for(let i=0; i <lengthTmp.totalCount ;i++ ){
                        tmpData = res.data.data[i]
                        tmp = res.data.data[i].measureValue.split(',')
                        for(let j=tmp.length-1; j >=0 ;j-- ){
                            this.sensorsData.push({
                                sensorId: tmpData.sensorId,
                                sensorTypeCd: tmpData.sensorTypeCd,
                                measureValue: tmp[j] + this.codeText,
                                testYn: tmpData.testYn,
                                sensorLocCd: tmpData.sensorLocCd,
                                measureDtime: moment(tmpData.measureDtime).subtract(tmpData.intervalTime*(tmp.length-1), 's').add(tmpData.intervalTime*j, 's').format('YYYY-MM-DD HH:mm:ss'),
                                regDtime : tmpData.regDtime,
                                reportDtime : tmpData.reportDtime
                            })
                        
                        }
                        this.sensorList = ''
                        this.pending=false
                    }
                }else if(this.selectedValue==="TPE002"){
                    for(let i=0; i <lengthTmp.totalCount ;i++ ){
                        tmpData = res.data.data[i]
                        tmp = res.data.data[i].measureValue.split(',')
                        for(let j=tmp.length-1; j >=0 ;j-- ){
                            this.sensorsData.push({
                            sensorIndex: tmpData.sensorIndex,
                            sensorId: tmpData.sensorId,
                            sensorTypeCd: tmpData.sensorTypeCd,
                            measureValue: tmp[j] + this.codeText,
                            testYn: tmpData.testYn,
                            sensorLocCd: tmpData.sensorLocCd,
                            measureDtime: moment(tmpData.measureDtime).subtract(tmpData.intervalTime*(tmp.length-1), 's').add(tmpData.intervalTime*j, 's').format('YYYY-MM-DD HH:mm:ss'),
                            regDtime : tmpData.regDtime,
                            reportDtime : tmpData.reportDtime
                        })
                        }
                        this.sensorList = 'act'
                        this.pending=false
                    }
                }else if(this.selectedValue==="TPE004"){
                    for(let i=0; i <lengthTmp.totalCount ;i++ ){
                        tmpData = res.data.data[i]
                        tmp = res.data.data[i].measureValue.split(',')
                        for(let j=tmp.length-1; j >=0 ;j-- ){
                            this.sensorsData.push({
                                sensorIndex: tmpData.sensorIndex,
                                sensorId: tmpData.sensorId,
                                sensorTypeCd: tmpData.sensorTypeCd,
                                measureValue: tmp[j]==='0'?'닫힘': '열림',
                                testYn: tmpData.testYn,
                                sensorLocCd: tmpData.sensorLocCd,
                                measureDtime: moment(tmpData.measureDtime).subtract(tmpData.intervalTime*(tmp.length-1), 's').add(tmpData.intervalTime*j, 's').format('YYYY-MM-DD HH:mm:ss'),
                                regDtime : tmpData.regDtime,
                                reportDtime : tmpData.reportDtime
                            })     
                        }
                        this.sensorList = 'door'
                        this.pending=false
                    }
                }
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
        }else if (code === 1 ){
            //TPE 006
            url = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/sensors/measures?sensorTypeCd=TPE006&measureStartDate=${this.measureStartDate}&measureEndDate=${this.measureEndDate}`
            await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                let tmpData = []
                let tmp = []
                this.sensorsTmp1Data= []
                let lengthTmp = []
                lengthTmp = res.data
                if(lengthTmp.totalCount === 0){
                    this.pending = false
                }
                for(let i=0; i <lengthTmp.totalCount ;i++ ){
                    tmpData = res.data.data[i]
                    tmp = res.data.data[i].measureValue.split(',')
                    for(let j=0; j <tmp.length ;j++ ){
                        this.sensorsTmp1Data.push({
                            sensorId: tmpData.sensorId,
                            sensorTypeCd: tmpData.sensorTypeCd,
                            measureValue1: tmp[j] + ' °C',
                            testYn: tmpData.testYn,
                            sensorLocCd: tmpData.sensorLocCd,
                            measureDtime: moment(tmpData.measureDtime).subtract( 10*j, 'm').format('YYYY-MM-DD HH:mm:ss'),
                            regDtime : tmpData.regDtime,
                        })
                    }
                }
                console.log(this.sensorsTmp1Data)
                this.sensorList = ''
                this.pending=false
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
            //TPE 008
            url = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/sensors/measures?sensorTypeCd=TPE008&measureStartDate=${this.measureStartDate}&measureEndDate=${this.measureEndDate}`
            await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                let tmpData = []
                let tmp = []
                this.sensorsTmp2Data= []
                let lengthTmp = []
                lengthTmp = res.data
                if(lengthTmp.totalCount === 0){
                    this.pending = false
                }
                for(let i=0; i <lengthTmp.totalCount ;i++ ){
                    tmpData = res.data.data[i]
                    tmp = res.data.data[i].measureValue.split(',')
                    for(let j=0; j <tmp.length ;j++ ){
                        this.sensorsTmp2Data.push({
                            sensorId: tmpData.sensorId,
                            sensorTypeCd: tmpData.sensorTypeCd,
                            measureValue2: tmp[j] + ' lx',
                            testYn: tmpData.testYn,
                            sensorLocCd: tmpData.sensorLocCd,
                            measureDtime: moment(tmpData.measureDtime).subtract( 10*j, 'm').format('YYYY-MM-DD HH:mm:ss'),
                            regDtime : tmpData.regDtime,
                        })
                    
                    }
                }
                this.sensorList = ''
                this.pending=false
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
            //TPE 007
            url = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/sensors/measures?sensorTypeCd=TPE007&measureStartDate=${this.measureStartDate}&measureEndDate=${this.measureEndDate}`
            await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                let tmpData = []
                let tmp = []
                this.sensorsTmp3Data= []
                let lengthTmp = []
                lengthTmp = res.data
                if(lengthTmp.totalCount === 0){
                    this.pending = false
                }
                for(let i=0; i <lengthTmp.totalCount ;i++ ){
                    tmpData = res.data.data[i]
                    tmp = res.data.data[i].measureValue.split(',')
                    for(let j=0; j <tmp.length ;j++ ){
                        this.sensorsTmp3Data.push({
                            sensorId: tmpData.sensorId,
                            sensorTypeCd: tmpData.sensorTypeCd,
                            measureValue3: tmp[j] + ' %',
                            testYn: tmpData.testYn,
                            sensorLocCd: tmpData.sensorLocCd,
                            measureDtime: moment(tmpData.measureDtime).subtract( 10*j, 'm').format('YYYY-MM-DD HH:mm:ss'),
                            regDtime : tmpData.regDtime,
                        })
                    
                    }
                }
                this.sensorList = ''
                this.pending=false
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
            let tmpArr = [...this.sensorsTmp1Data,...this.sensorsTmp2Data,...this.sensorsTmp3Data]
            let tmpArr2 = []
            tmpArr.forEach(element => {
               tmpArr2.push({
                   measureDtime: element.measureDtime,
                   measureValue1: 0,
                   measureValue2: 0,
                   measureValue3: 0,
                   regDtime: element.regDtime,
                   sensorLocCd: element.sensorLocCd,
                   }) 
            });
            
            let setObj = new Set(tmpArr2)
            let setArr = [...setObj]
            console.log("setArr")
            console.log(setArr)
            setArr.forEach(item=>{
                for(let i = 0 ; i<this.sensorsTmp1Data.length ; i++ ){
                    if(item.measureDtime ===this.sensorsTmp1Data[i].measureDtime){
                        item.measureValue1 = this.sensorsTmp1Data[i].measureValue1
                    }
                }
                for(let j = 0 ; j<this.sensorsTmp2Data.length ; j++ ){
                    if(item.measureDtime ===this.sensorsTmp2Data[j].measureDtime){
                        item.measureValue2 = this.sensorsTmp1Data[j].measureValue2
                    }
                }
                for(let k = 0 ; k<this.sensorsTmp3Data.length ; k++ ){
                    if(item.measureDtime ===this.sensorsTmp3Data[k].measureDtime){
                        item.measureValue3 = this.sensorsTmp1Data[k].measureValue3
                    }
                }

            })
            
            
            tmpArr2.from(new Set(tmpArr))
            console.log(tmpArr2)
        }
        if(this.searchCheck1 === 1){
            this.searchCheck1 = 0
        }
        this.total = this.sensorsData.length
          this.page = 1
          this.pagingMethod(this.page)
          console.log(this.searchCheck1)
          console.log(this.searchCheck2)
        // if(this.sensorsData.length !== 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     alert("성공적으로 조회 되었습니다.")
        //     this.searchCheck2 = 0
        // if(this.sensorsData.length === 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     //this.pending=false
        //     alert("조회 결과가 존재하지 않습니다.")
        //     this.searchCheck2 = 0
        // }
    },
    getfilteringData(){
        const url  = `/admin/recipients/${this.recipientId}/sensors/measures?sensorTypeCd=TPE006&measureStartDate=2022-03-30&measureEndDate=2022-04-04`
        //const url  = `/admin/recipients/${this.recipientId}/sensors`
        axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.sensorsData = res.data.data
            
            console.log(this.sensorsData)
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    locationCode(input){
        let result=''
        switch (input){
          case "LOC001" : result="거실"; break;
          case "LOC002" : result="거실2" ;break;
          case "LOC003" : result="안방"; break;
          case "LOC004" : result="안방2" ;break;
          case "LOC005" : result="화장실" ;break;
          case "LOC006" : result="화장실2" ;break;
          case "LOC007" : result="현관" ;break;
          case "LOC008" : result="뒷문" ;break;
          case "LOC009" : result="주방" ;break;
          case "LOC010" : result="주방2" ;break;
          case "LOC011" : result="작은방" ;break;
          case "LOC012" : result="작은방2" ;break;
      }
        return result
    },

    makeTime(){
        //measureStartDate, measureEndDate
    },
    

   },
   created() {
       
    this.getSensorsData(2,'','','');
  }
 }
 </script>

<style scoped>


 </style>