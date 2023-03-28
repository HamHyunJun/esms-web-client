<template>
  <div class="wrap">
    <!--<HeaderComp></HeaderComp>-->
    <div class="container type-02">
      <div id="" class="popupLayer" v-if="requestRecordpopup === true">
        <div class="popup_wrap" style="width:100%">
          <div class="title_wrap">
            <div class="title">로그 수집 이력</div>
            <button type="button" class="btn_close" @click="requestRecordpopup = false">닫기</button>
          </div>
          <div class="popbtn_wrap" style="margin-bottom:20px;">
                  <div class="list result" style="margin-left:-30px; width:107%">
                    <table>
                      <colgroup>
                        <!--<col style="width:10%;">-->
                        <col style="width:5%;">
                        <col style="width:10%;">
                        <col style="width:7%;">
                        <col style="width:5%;">
                        <col style="width:9%;">
                        <col style="width:5%;">
                        <col style="width:9%;">
                      </colgroup>
                      <thead>
                        <tr>
                          <!-- <th scope="col">대상자ID</th> -->
                          <th scope="col">대상자명</th>
                          <th scope="col">로그파일명</th>
                          <th scope="col">파일사이즈</th>
                          <th scope="col">상태</th>
                          <th scope="col">요청일시</th>
                          <th scope="col">요청자ID</th>
                          <th scope="col">처리완료일시</th>
                        </tr>
                      </thead>
                    </table>
                    <div class="tbody">
                      <table>
                        <colgroup>
                          <!--<col style="width:10%;">-->
                          <col style="width:5%;">
                          <col style="width:10%;">
                          <col style="width:7%;">
                          <col style="width:5%;">
                          <col style="width:9%;">
                          <col style="width:5%;">
                          <col style="width:9%;">
                        </colgroup>
                        <tbody >    
                          <tr v-for="(item,index) in requestRecordItems" v-bind:key="index">
                            <!--<td>{{item.recipientId}}</td>-->
                            <td>{{recordNm}}</td>
                            <td><a v-bind:href="fileUrl(item.fileName)" >{{item.fileName}}</a></td>
                            <td v-if="item.fileSize">{{fileSizeChange(item.fileSize)}} KB</td>
                            <td v-else>{{item.fileSize}}</td>
                            <td>{{changeStateCd(item.stateCd)}}</td>
                            <td>{{item.regDtime}}</td>
                            <td>{{item.regId}}</td>
                            <td v-if="item.stateCd === 'STE001'"></td>
                            <td v-else>{{item.updDtime}}</td>
                          </tr>                                   
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> 
            </div>
          </div>
          <div id="" class="popupLayer" v-if="requestpopup == true">
              <div class="popup_wrap type-02">
                <div class="title_wrap">
                  <div class="title">경고</div>
                  <button type="button" class="btn_close" @click="requestpopup = false">닫기</button>
                </div>
                <div class="popup_cnt">
                  <p class="alert_txt">앱 로그 수집요청을 진행하시겠습니까?</p>
                </div>
                <div class="popbtn_area type-02">
                  <button type="button" class="btn form2" @click="equestAppLog()">확인</button>
                  <button type="button" class="btn form" @click="requestpopup = false">취소</button>
                </div>
              </div>
            </div>
            <div class="list_title_wrap">
              <span>시스템관리</span>
              <i class="ico_nav"></i>
              <span class="on">앱로그수집</span>
            </div>
            <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry()'>
        <div class="table_wrap">
            <table>
                <colgroup>
                    <col style="width:20%">
                    <col style="width:20%">
                    <col style="width:20%">
                    <col style="width:15%">
                </colgroup>
                <thead>
                    <th scope="row">시/도</th>
                    <th scope="row">시/군/구</th>
                    <th scope="row">관리기관</th>
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
                          <input type="text" value=" " v-model="filterName" >
                      </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="btn_area">
            <button type="button" class="btn" @click="manageInquiry()">조회</button>
        </div>
      </div>
            <div class="one_box box_style">
        <div class="result_txt">
            <p>조회결과 : {{ this.NCount ? this.NCount : 0}}건</p>
            <div class="btn_area">
              <button type="button" class="btn" @click="equestAppLogPopup()">로그수집요청</button>
            </div>
        </div>
        <div class="list result">
            <table>
                <colgroup>
                    <col style="width:8%;">
                    <col style="width:15%;">
                    <col style="width:8%;">
                    <col style="width:auto;">
                    <col style="width:15%;">
                    <col style="width:15%;">
                    <col style="width:7%;">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">선택</th>
                        <th scope="col">관리기관</th>
                        <th scope="col">대상자명</th>
                        <th scope="col">주소</th>
                        <th scope="col">Mac Address</th>
                        <th scope="col">시리얼번호</th>
                        <th scope="col">수집이력조회</th>
                    </tr>
                </thead>
            </table>
            <div class="tbody">
                <table>
                    <colgroup>
                        <col style="width:8%;">
                        <col style="width:15%;">
                        <col style="width:8%;">
                         <col style="width:auto;">
                        <col style="width:15%;">
                        <col style="width:15%;">
                       
                        <col style="width:7%;">
                    </colgroup>
                    <tbody>
                        <tr v-for="(item,index) in recipientItems" v-bind:key="index">
                            <td>
                              <div class="chk_area radio">
                                <input type="radio" name="saveChangeData" :id="`radio1_${index}`" v-model="saveChangeData" :value="index" @click="radioReset()">
                                <label :for="`radio1_${index}`" class="chk"><i class="ico_chk"></i></label>
                              </div>
                            </td>
                            <td>{{item.orgNm}}</td>
                            <td>{{item.recipientNm}}</td>
                            <td>{{item.addr}}</td>
                            <td>{{item.macAddr}}</td>
                            <td>{{item.serialNo}}</td>
                            <td>
                                <div class="result_txt">
                                  <div class="btn_area">
                                    <button type="button" style="margin-right:10px;" class="btn" @click="requestRecordReset(index)">이력조회</button>
                                  </div>
                                </div>
                            </td>
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
import pagination from "../pages/pagination.vue"

export default {
  name: "AllView",
  components :{
    HeaderComp,
    pagination
  },
  data () {
    return {
      pending:true, cName: '', cBirthday: '', cPhone: '', cSex: '', cSocial: '', cPart: '', cStatus: '', cCycle: '', cAddr: '', cDetail: '',
      caption: '', fileName: '',
      counter: 0,pageIndex: 1,
      orgmItems: [], orgmItems2: [], partItems: [], statusItems: [], statusItems2: [], cycleItems: [], sexItems:[{label:'전체', value:''},{label: '남', value: 'M'}, {label: '여', value: 'F'}],
      orgCode: '', partCode: '', statusCode: '', sexCode: '', cycleCode: '',
      modelOrg: '', modelPart: '', modelStatus: '', modelName: '', TypeItems:[], TypeItems2:[],
      orgNm:'',orgId:'', sido:'', sidoCd:'', sgg:'', sggCd:'', s_date: '', e_date: '',
      sidoItems:[], sidoItems2:[], sggItems:[], sggItems2:[], sggItems3:[],  actItems:[], recipientItems:[],recipientOrginItems:[], orgSido:'', orgSgg:'', filterName:'', modalOpen:false, changeOpen:false,
      recipientFields: [
        { key: 'orgNm', label: '기관관리', _classes: 'text-center' },
        { key: 'typeNm', label: '구분', _classes: 'text-center' },
        { key: 'stateNm', label: '상태' , _classes: 'text-center'},
        { key: 'activeUnsensingCycle', label: '미감지주기', _classes: 'text-center' },
        { key: 'recipientNm', label: '이름', _classes: 'text-center' },
        { key: 'sex', label: '성별', _classes: 'text-center' },
        { key: 'addr', label: '주소', _classes: 'text-center' },
        { key: 'careLevelNm', label: '기기', _classes: 'text-center' },
        { key: 'managerNm', label: '사회복지사', _classes: 'text-center' },
        { key: 'birthday', label: '생일', _classes: 'text-center' },
      
        { key: 'detail', label: '', _classes: 'text-center' },
        { key: 'delete', label: '', _classes: 'text-center' },    
      ],
      addCustomer: false, fileUpload: false,selectedUpdateSggItems:null,
      //대상자 조회
      selectedSidoItems:null, selectedSggItems:null, selectedOrgItems:null, selectedUserSex:null, selectedUserType:null, selectedUserState:null,

      //대상자 등록
      selectedUpdateZipCode:'', selectedUpdateAddr:'', selectedUpdateAddrDetail:'', selectedUpdateBirthday:'', selectedUpdateRecipient:'',
      selectedUpdatePhoneNumber:'', selectedUpdateSidoItems:'', selectedUpdateSggItems:'', selectedUpdateOrgItems:'', selectedUpdateUserType:'',
      selectedUpdateUserState:'', selectedUpdateOrgNm:'',
      //사용자 정보 변경
      selectChangeRecipient: null, selectChangeBirthday: null, selectChangeAddrDetail: null, selectChangeZipCode: null, selectChangeSex: null,
      selectChangePhoneNumber: null, selectChangeSido: null, selectChangeSgg: null, selectChangeOrg: null, selectChangeAddr: null,
      selectChangeRecipeType: null, saveChangeData:null, changeRecipientItems:[], selectChangeState:null, selectChangeOrgNm:null,

      requestRecordpopup:false, requestRecordItems:[], recordNm:'', requestpopup:false,

      selectedUserOrg: null, userState:[{value:'STE001', text: '승인'},{value:'STE002', text: '서비스중'},{value:'STE003', text: '서비스종료'},],
      selectedRecipeType: null, recipeType:[{value:'', text: '선택'},{value:'TPE001', text: '고령자'},{value:'TPE002', text: '장애인'},],
      userGender: 1 ,
      sortCount: 0,
      searchCheck1:1,
      searchCheck2:0,
      NCount:'',
      
      listData: [],
      total: '',
      page: 1,
      limit: 30,
      block: 10
    }
  },
  created() {
    this.pending = false
    this.getSidoData();
    this.getSggData();
    this.getOrgmData();
    this.getTypeData();
    this.getStatusData();
    this.getRecipientData();
    //this.getPartData();
    
    //this.getCycleData();
    this.cBirthday=moment().format('YYYY-MM-DD');
    this.s_date=moment().subtract(7, 'days').format('YYYY-MM-DD');
    this.e_date=moment().format('YYYY-MM-DD');
    this.pending = true
  },
  methods: {
    pagingMethod(page) {
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
    getSidoData() {
      this.selectedSidoItems = ''
      this.selectedUserSex = ''
    axios.get(this.$store.state.serverApi + "/admin/address/sido", {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            this.sidoItems=[];
            this.sidoItems2=[];
            this.sidoItems.push({label: '전체', value: ''});
            this.sidoItems2.push({label: '선택', value: ''});
            for(let i=0; i<response.data.data.length; i++) {
              this.sidoItems.push({
                label: response.data.data[i].sido,
                value: response.data.data[i].sidoCd
              });
              this.sidoItems2.push({
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
      this.selectedUpdateSggItems = ''
      this.sggItems3=[];
      let url =this.$store.state.serverApi + "/admin/address/sgg";
      if(this.sidoCd != ''){
        url += "?sidoCd="+this.sidoCd;
      }else{
        this.selectedSggItems = ''
        this.sggItems=[];
        this.sggItems2=[];
        
        this.sggItems.push({label: '전체', value: ''});
        this.sggItems2.push({label: '선택', value: ''});
        return ; 
      }
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          const tempArr = [{label: '전체', value: ''}];
          let tmpResult2 = [{label: '전체', value: ''}];
          let tmpResult3 = [{label: '선택', value: ''}];
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
          this.sggItems2 = [...tmpResult3,...tmpResult]
          this.sggItems3 = tempArr
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    // 관리 기관 목록
  getOrgmData() {
    this.selectedOrgItems = ''
    this.selectedUpdateOrgItems = ''
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
        this.selectedUpdateOrgItems = ''
        this.orgmItems=[];
        this.orgmItems2=[];
        this.orgmItems.push({label: '전체', value: ''});
        this.orgmItems2.push({label: '선택', value: ''});
        return ; 
      }
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          const tmpArr = [{label: '전체', value: ''}];
          const tmpArr2 = [{label: '선택', value: ''}];
          let tmpResult2 = [{label: '전체', value: ''}];
          let tmpResult3 = [{label: '선택', value: ''}];
          this.orgmItems=[];
          this.orgmItems2=[];
          for(let i=0; i<response.data.data.length; i++) {
            tmpArr.push({
              label: response.data.data[i].orgNm,
              value: response.data.data[i].orgId,
            });
            tmpArr2.push({
              label: response.data.data[i].orgNm,
              value: response.data.data[i].orgId,
            });
          } 
          let tmpResult = tmpArr
          this.orgmItems = [...tmpResult2,...tmpResult]
        this.orgmItems=tmpArr;
        this.orgmItems2=tmpArr2;
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    getStatusData() {
      this.selectedUserState = ''
      let url = this.$store.state.serverApi + "/admin/codes?cmmnCdGroup=RECIPIENT.STATECD"
       axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
           .then(response => {
             this.selectChangeState = null;
             this.statusItems=[];
             this.statusItems2=[];
             this.statusItems.push({label: '전체', value: ''});
             this.statusItems2.push({label: '선택', value: ''});
             for(let i=0; i<response.data.data.length; i++) {
               this.statusItems.push({
                 label: response.data.data[i].cmmnCdNm,
                 value: response.data.data[i].cmmnCd
               });
               this.statusItems2.push({
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
     getTypeData() {
      this.selectedUserType = ''
      this.selectedUpdateUserType =''
      let url = this.$store.state.serverApi + "/admin/codes?cmmnCdGroup=RECIPIENT.TYPECD"
       axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
           .then(response => {
             this.TypeItems=[];
             this.TypeItems2=[];
             this.TypeItems.push({label: '전체', value: ''});
             this.TypeItems2.push({label: '선택', value: ''});
             for(let i=0; i<response.data.data.length; i++) {
               this.TypeItems.push({
                 label: response.data.data[i].cmmnCdNm,
                 value: response.data.data[i].cmmnCd
               });
               this.TypeItems2.push({
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
    onChangeSido(event){
      this.getSggData()
      this.orgSido = event.target.value;
    },
  async getRecipientData() {
    let uri = '';
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
        uri = this.$store.state.serverApi
        +"/admin/gateways/firmware/targetlist?pageIndex=1&recordCountPerPage=500"
        +"&addrCd="+addrCd
        +"&orgId="+this.selectedOrgItems
        +"&recipientNm="+this.filterName
        +"&updateVersion=applog"
    await axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(response => {
          this.recipientItems = response.data.data
          this.recipientOrginItems = response.data.data
          this.NCount = response.data.totalCount
          this.total = this.NCount
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
  },
  async equestAppLog(){
    if(this.$store.state.userId !== 'admin'){
      alert("앱 로그 수집 요청은 admin 계정만 가능합니다")
      this.requestpopup = false
      this.saveChangeData = ''
      return false
    }
    let uri = this.$store.state.serverApi+`/admin/logs/applog/requestAppLog?recipientId=${this.recipientItems[this.saveChangeData].recipientId}&userId=${this.$store.state.userId}`
    await axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(response => {
          let tmpArr = response.data.data
          if(tmpArr){
            alert("성공적으로 요청되었습니다")
            this.saveChangeData = ''
            this.requestpopup = false
            return false
          }else{
            alert("요청이 실패하였습니다.")
            this.saveChangeData = ''
            this.requestpopup = false
            return false
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
  },
  async equestAppLogPopup(){
    if(this.saveChangeData === '' || this.saveChangeData === null || this.saveChangeData === undefined){
      alert("로그수집 대상자를 선택해 주세요")
      return false
    }
    this.requestpopup = true
    
  },
  async requestRecordReset(index){
    this.recordNm = this.recipientItems[index].recipientNm
    let url  = this.$store.state.serverApi + `/admin/logs/applog/logFileList?recipientId=${this.recipientItems[index].recipientId}`
    await axios.get(url,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
    .then(res => {
      this.requestRecordItems = res.data.data
    })
    .catch(error => {
        console.log("fail to load")
        this.errorMessage = error.message;
        console.error("There was an error!", error);
    });
    this.requestRecordpopup = true
  },
  changeRecipientPhoneno(phone){
    if(phone){
      let changeNumber = phone.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
      return changeNumber
    }else{
      return ''
    }
    
  },
  makeAge(birthDay){
    let tmp1 = this.$moment(birthDay).format('YYYY')
    let tmp2 = this.$moment()
    return tmp2.diff(tmp1, 'years');
  },
  fileUrl(index){
    let FilesUrl = this.$store.state.serverApi+'/files/applogs/'+index
    return FilesUrl
  },
  fileSizeChange(input){
    let result = ''
    result = Math.round(input/1024)
    return result
  },
  getMask(birthday){
      let res = ''
      birthday = birthday.replace(/[^0-9]/g, '')
      if(birthday.length <5){
        res = birthday
      }else{
        if(birthday.length < 7){
          res = birthday.substring(0,4) + '-' + birthday.substring(4)
        }else if(birthday.length < 9){
          res = birthday.substring(0,4) + '-' + birthday.substring(4,6) + '-' + birthday.substring(6)
        }
      }
      return res
    },
  getBirthdayMask(input){
      let res = this.getMask(input)
      this.selectedUpdateBirthday = res
      this.selectChangeBirthday = res
  },
  goToDetailView(recipientId) {
    this.$router.push({
      path : `/customer/DetailView/${recipientId}`
    })
  },
  radioReset(){
    this.saveChangeData = ''
  },
  changeStateCd(input){
    let result = ''
    switch(input){
        case "STE001" : result='수집요청중'; break;
        case "STE002" : result='수집완료'; break;
        case "STE003" : result='수집실패'; break;
    }
    return result
  },
  selectGender(input){
    this.userGender = input;
  },
    sort(){
      // let test = [{name:'이용' ,birthday:"14", test:'3'},{name:'현준' ,birthday:"17", test:'22'}, {name:'길동' ,birthday:"2", test:'1'},]
      // test.sort(function(a, b){
      //   return b.test - a.test
      // })
      this.sortCount++
      if(this.sortCount === 1){
        this.recipientItems.sort(function(a, b){      
         return makeAge(a.birthday) - makeAge(b.birthday)
        })
      }else if(this.sortCount === 2){
        this.recipientItems.sort(function(a, b){
          return b.recipientId - a.recipientId
        })
        this.sortCount = 0
      }
      // this.recipientItems.sort()
      // let sortArr = []
      // for(let i=0; i<this.recipientItems.length; i++){
      //   sortArr[i]=this.makeAge(this.recipientItems[i].birthday)
        
      // }
      // sortArr.sort();
    },
    manageInquiry() {
      this.searchCheck2 = 1
      this.page = 1
      this.getRecipientData();
    },
  },

  
}
</script>
<style>
</style>