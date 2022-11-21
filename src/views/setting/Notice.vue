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
            <div id="" class="popupLayer" v-if="writeNotice == true">
                <div class="popup_wrap">
                    <div class="title_wrap">
                        <div class="title">공지사항 작성</div>
                        <button type="button" class="btn_close" @click="writeNotice = false">닫기</button>
                    </div>
                    <div class="popup_cnt">
                        <div class="input_wrap">
                            <div class="input_area">
                                <p class="input_tit">시/도</p>
                                <select v-model="selectedUpdateSidoItems" @change="onChangeSgg($event)">
                                  <option v-for="(sido, index) in sidoItems" :value="sido.value" v-bind:key="index">{{sido.label}}</option>
                                </select>
                            </div>
                            <div class="input_area">
                                <p class="input_tit">시/군/구</p>
                                <select v-model="selectedUpdateSggItems" @change="onChangeOrg($event)">
                                  <option v-for="(sgg, index) in sggItems" :value="sgg.value" v-bind:key="index">{{sgg.label}}</option>
                                </select>
                            </div>
                            <div class="input_area">
                                <p class="input_tit">관리기관</p>
                                <select v-model="selectedUpdateOrgItems">
                                  <option v-for="(orgm, index) in orgmItems" :value="orgm.value" v-bind:key="index">{{orgm.label}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="input_wrap type-03">
                            <div class="input_area">
                              <p class="input_tit">제목</p>
                              <input type="text" v-model="selectedUpdateTitle">
                            </div>
                        </div>
                        <div class="input_wrap type-03">
                            <div class="input_area">
                                <div class="tit_area">
                                    <p class="input_tit">공지내용</p>
                                    <p class="file_txt">Add a file: <i class="ico_file"></i><em>{{file_name}}</em></p><!--em태그 안에 업로드한 파일 이름 입력-->
                                </div>
                                <textarea name="" id="" v-model="selectedUpdateDetails">1.공지내용</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="popbtn_wrap">
                      <div class="popbtn_area left">
                            <button type="button" class="btn" @click="deleteVoice()">삭제</button>
                            <div class="input_area file">
                                <input type="file" name="FileBtn" id="FileBtn" @change="handleFileChange">
                                <label for="FileBtn" class="btn form2">파일 업로드</label>
                            </div>
                        </div>
                        <div class="popbtn_area right">
                            <button type="button" class="btn" @click="writeNotice = false">취소</button>
                            <button type="button" class="btn form2" @click="UploadData()">저장</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list_title_wrap">
                <span>시스템관리</span>
                <i class="ico_nav"></i>
                <span class="on">공지사항</span>
            </div>
            <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry'>
                <div class="table_wrap type-02">
                    <table>
                        <colgroup>
                            <col style="width:18%;">
                            <col style="width:18%;">
                            <col style="width:18%;">
                            <col style="width:18%;">
                            <col style="width:auto;">
                        </colgroup>
                        <thead>
                            <th scope="row">시/도</th>
                            <th scope="row">시/군/구</th>
                            <th scope="row">관리기관</th>
                            <th scope="row">제목</th>
                            <th scope="row">등록일자</th>
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
                                    <input v-model="selectedTitle" type="text" value="">
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
                    <button type="button" class="btn form2" @click="writeNoticeReset()">작성</button>
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
                            <col style="width:8%;">
                            <col style="width:8%;">
                            <col style="width:9%;">
                            <col style="width:8%;">
                            <col style="width:9%;">
                            <col style="width:3%;">
                            <col style="width:auto;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">순번</th>
                                <th scope="col">관리기관</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성자</th>
                                <th scope="col">등록일시</th>
                                <th scope="col">수정일시</th>
                                <th scope="col"></th>
                                <th scope="col">공지내용</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody">
                        <table>
                            <colgroup>
                            <col style="width:6%;">
                            <col style="width:8%;">
                            <col style="width:8%;">
                            <col style="width:9%;">
                            <col style="width:8%;">
                            <col style="width:9%;">
                            <col style="width:3%;">
                            <col style="width:auto;">
                            </colgroup>
                            <tbody >
                                <tr v-for="(item,index) in listData" v-bind:key="index">
                                    <td>{{num(index+1)}}</td>
                                    <td>{{item.orgNm}}</td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.regId}}</td>
                                    <td>{{item.regDtime}}</td>
                                    <td>{{item.updDtime}}</td>
                                    <td></td>
                                    <td style="text-align:left">{{item.details}}</td>
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
import HeaderComp from "../pages/HeaderComp.vue";
import axios from "axios";
import moment from "moment";
import pagination from "../pages/pagination.vue"

export default {
    name: 'Notice',
    components : {
        HeaderComp,
        pagination
    },
    data(){
      return{
        sido:'', sidoCd:'', sgg:'', sggCd:'', s_date: '', e_date: '',
        sidoItems:[], sggItems:[], orgmItems:[], orgmItems2:[], noticItems:[], 
        orgSido:'', orgSgg:'', orgCode:'',selectedOrgItems:'', selectedSidoItems:'', selectedSggItems:'', selectedTitle: '', selectedTitle: '', selectedDetail: '',
        selectedUpdateSidoItems:'', selectedUpdateSggItems:'', selectedUpdateOrgItems:'', selectedUpdateTitle:'', selectedUpdateDetails:'',
        NCount: 0,
        errorpopup1: false, errorpopup2: false, writeNotice: false,
        noticeId:'', orgdata:'', orgNm:'',
        searchCheck1 : 1, searchCheck2 : 0,
        file_name:'', file_size:'', voiceFile:'',
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
      this.getSidoData();
      this.getSggData();
      this.getOrgmData();
      this.getnoticeData();
      this.s_date=moment().subtract(6, 'days').format('YYYY-MM-DD');
      this.e_date=moment().format('YYYY-MM-DD');
      

//      this.getnoticeData();
    },
    methods:{
      pagingMethod(page) {
        this.listData = this.noticItems.slice(
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
    handleFileChange(e){
      if(e.target.files[0].type !== 'audio/midi' && e.target.files[0].type !== 'audio/mpeg' && e.target.files[0].type !== 'audio/x-m4a' && e.target.files[0].type !== 'audio/mp3' 
      && e.target.files[0].type !== 'audio/webm' && e.target.files[0].type !== 'audio/ogg' && e.target.files[0].type !== 'audio/wav'){
          alert("음성 파일은 midi/mpeg/mp3/m4a/webm/ogg/wav 파일만 가능합니다.\n음성 파일을 다시 확인하여 주세요")
          return false
      }
      
      let fileLength = e.target.files[0].name.length
      let fileDot = e.target.files[0].name.indexOf('.')
      let fileType = e.target.files[0].name.substring(fileDot+1,fileLength).toLowerCase()
      
      if(e.target.files[0]){
        this.voiceFile = e.target.files[0]
        this.file_name = e.target.files[0].name;
        this.file_size = e.target.files[0].size
      }
    },
    deleteVoice(){
        this.voiceFile = ''
        this.file_name = ''
        this.file_size = ''
    },
    writeNoticeReset(){
      this.voiceFile = ''
      this.file_name = ''
      this.selectedUpdateSidoItems = ''
      this.selectedUpdateSggItems = ''
      this.selectedUpdateOrgItems = ''
      this.selectedUpdateTitle = ''
      this.selectedUpdateDetails = ''
      this.writeNotice = true
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
      let uri =this.$store.state.serverApi + "/admin/address/sgg";
      if(this.sidoCd != ''){
        uri += "?sidoCd="+this.sidoCd;
      }else{
        this.selectedSggItems = ''
        this.sggItems=[];
        this.sggItems.push({label: '전체', value: ''});
        return ; 
      }
      axios.get(uri, {headers: {"Authorization": sessionStorage.getItem("token")}})
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
      let uri =this.$store.state.serverApi + "/admin/organizations";
      if(this.sggCd != ''){
        if(this.sggCd.startsWith('0', 4) === true){
          sggCode = this.sggCd.substring(0,4)
        }else{
          sggCode = this.sggCd.substring(0, 5)
        }
        uri += "?sggCd="+sggCode;
      }else{
        this.selectedOrgItems = ''
        this.orgmItems=[];
        this.orgmItems.push({label: '전체', value: ''});
        return ; 
      }
      axios.get(uri, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          const tmpArr = [{label: '전체', value: ''}];
          let tmpResult2 = [{label: '전체', value: ''}];
          this.orgmItems=[];
          for(let i=0; i<response.data.data.length; i++) {
            tmpArr.push({
              label: response.data.data[i].orgNm,
              value: response.data.data[i].orgId,
              value2: response.data.data[i].typeCd,
            });
          }
          let tmpResult = tmpArr
          this.orgmItems = [...tmpResult2,...tmpResult]
          this.orgmItems = tmpArr;
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
      getnoticeData(){
      let addrCd = ''
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
      let uri = this.$store.state.serverApi 
      +"/admin/notices?pageIndex=1&recordCountPerPage=1000"
      +"&addrCd="+addrCd
      +"&title="+this.selectedTitle
      +"&startDate="+this.s_date
      +"&endDate="+this.e_date
      axios.get(uri, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            this.noticItems = response.data.data
            this.NCount =this.noticItems.length
            this.total = this.noticItems.length
            this.page = 1
            this.pagingMethod(this.page)
            for(let i=0; i<this.noticItems.length; i++){
              this.noticeId = this.noticItems[i].noticeId
            }
        //     if(this.searchCheck1 === 1){
        //     this.searchCheck1 = 0
        // }
        // if(this.noticItems.length !== 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     alert("성공적으로 조회 되었습니다.")
        //     this.searchCheck2 = 0
        // }else if(this.noticItems.length === 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     alert("조회 결과가 존재하지 않습니다.")
        //     this.searchCheck2 = 0
        // }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
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
    initSet() {
      this.s_date=moment().subtract(6, 'days').format('YYYY-MM-DD');
      this.e_date=moment().format('YYYY-MM-DD');
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
        this.getnoticeData();
      }
    },
    async UploadData(){
      if(this.selectedUpdateTitle === ''){
        alert("제목을 입력하여 주세요");
        return;
      }else if(this.selectedUpdateDetails === ''){
        alert("내용을 입력하여 주세요");
        return;
      }
      this.$store.state.userId = sessionStorage.getItem("userId")

      let uri =this.$store.state.serverApi + "/admin/organizations?recordCountPerPage=99999";
      await axios.get(uri, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          this.orgmItems2=[];
          for(let i=0; i<response.data.data.length; i++) {
            this.orgmItems2.push({
              label: response.data.data[i].orgNm,
              value: response.data.data[i].orgId,
              value2: response.data.data[i].typeCd,
              value3: response.data.data[i].typeNm
            });
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      if(this.selectedUpdateSidoItems==='' && this.selectedUpdateSggItems==='' && this.selectedUpdateOrgItems===''){
        this.orgdata = this.orgmItems2.filter(cd=>{
          return cd.value === 'ORG0000001'
        })
        this.selectedUpdateOrgItems === null
      }else{
        this.orgdata = this.orgmItems2.filter(cd=>{
          return cd.value === this.selectedUpdateOrgItems
        })
      }

      let objectData = {
        orgId: this.orgdata[0].value,
        orgNm: this.orgdata[0].label,
        title: this.selectedUpdateTitle,
        typeCd: this.orgdata[0].value2,
        typeNm: this.orgdata[0].value3,
        details: this.selectedUpdateDetails,
        regId: this.$store.state.userId
      }
      let form = new FormData()
      form.append('details', this.selectedUpdateDetails)
      form.append('orgId', this.orgdata[0].value)
      form.append('title', this.selectedUpdateTitle)
      form.append('typeCd', this.orgdata[0].value2)
      form.append('regId', this.$store.state.userId)
      form.append('filename', this.voiceFile)
      form.append('exeOrgId', this.orgdata[0].value)


      uri =this.$store.state.serverApi + "/admin/noticesnew";
      axios.post(uri,form,{
        headers: {
        'Content-Type': 'multipart/form-data',
        'Accept':'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("token")}
        })
        .then(res => {
          let resData = res.data.data
          if(resData){
              alert("저장이 완료되었습니다.")
              console.log(resData)
              this.writeNotice = false
              this.getnoticeData()
          }
          // this.getCSensorsData = res.data.data
        })
        .catch(error => {
          console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

    
      // const uri = this.$store.state.serverApi+'/admin/notices?orgId='+objectData.orgId
      // +"&title="+objectData.title
      // +"&details="+objectData.details

      // axios.post(uri,objectData,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
      //     .then(response => {
      //       let resData = response.data.data
      //       console.log(uri)
      //       if(resData){
      //         alert("저장이 완료되었습니다.")
      //         this.writeNotice = false
      //       }
      //     })
      //     .catch(error => {
      //       this.errorMessage = error.message;
      //       console.error("There was an error!", error);
      //     });
    }
    }
}
</script>
<style>
</style>