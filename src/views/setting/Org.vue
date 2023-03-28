<template>
    <div class="wrap">
        <!--<HeaderComp></HeaderComp>-->
        <div class="container type-02">
          <div id="" class="popupLayer" v-if="writeOrg === true">
            <!--관리 기관 등록-->
                <div class="popup_wrap">
                    <div class="title_wrap">
                        <div class="title">관리기관 등록</div>
                        <button type="button" class="btn_close" @click="writeOrg = false">닫기</button>
                    </div>
                    <div class="popup_cnt">
                      <div class="input_wrap type-02">
                        <div class="input_area">
                          <p class="input_tit">아래의 항목을 작성하여 주세요.(* 필수항목)</p>
                        </div>
                      </div>
                        <div class="input_wrap">
                            <div class="input_area">
                                <p class="input_tit">시/도 *</p>
                                <select v-model="selectedUpdateSidoItems" @change="onChangeSgg($event)">
                                  <option v-for="(sido, index) in sidoItems" :value="sido.value" v-bind:key="index">{{sido.label}}</option>
                                </select>
                            </div>
                            <div class="input_area">
                                <p class="input_tit">시/군/구 *</p>
                                <select v-model="selectedUpdateSggItems" @change="onChangeOrg($event)">
                                  <option v-for="(sgg, index) in sggItems" :value="sgg.value" v-bind:key="index">{{sgg.label}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <div class="input_area">
                                <p class="input_tit">관리기관명 *</p>
                                <input type="text" value="" v-model="selectedUpdateOrgItems">
                            </div>
                            <div class="input_area">
                                <p class="input_tit">대표 전화번호 *</p>
                                <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  value="" v-model="selectedUpdatePhoneNumber" maxlength="11">
                            </div>
                        </div>
                        <div class="input_wrap">
                            <div class="input_area">
                                <p class="input_tit">관리기관 구분 *</p>
                                <select v-model="selectedUpdateTypeCd">
                                  <option v-for="(orgType, index) in orgTypeItems" :value="orgType.value" v-bind:key="index">{{orgType.label}}</option>
                                </select>
                            </div>
                            <div class="input_area">
                                <p class="input_tit">상위기관 *</p>
                                <select v-model="selectedUpdateUpperOrgId">
                                  <option v-for="(upperOrg, index) in upperOrgItems" :value="upperOrg.value" v-bind:key="index">{{upperOrg.label}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="input_wrap">
                          <div class="input_area">
                            <p class="input_tit">우편번호 *</p>
                            <div class="add_btn_input">
                              <input type="text" value="" v-model="selectedUpdateZipcode">
                              <button type="button" class="input_btn" @click="search()">검색</button>
                            </div>
                          </div>
                        </div>
                        <div class="input_wrap type-02">
                            <div class="input_area">
                            <p class="input_tit">주소 *</p>
                            <input type="text" value="" v-model="selectedUpdateAddr">
                          </div>
                        </div> 
                        <div class="input_wrap type-02">
                            <div class="input_area" >
                                <p class="input_tit">상세주소</p>
                                <input type="text" value="" v-model="selectedUpdateDetailAddr">
                            </div>
                        </div>                 
                    </div>
                    <div class="popbtn_area">
                        <button type="button" class="btn form2" @click="uploadData()">등 록</button>
                        <button type="button" class="btn" @click="writeOrg = false">취 소</button>
                    </div>
                </div>
            </div>

          <!--관리 기관 상세 정보-->
            <div id="" class="popupLayer" v-if="detailOrg === true">
              <div class="popup_wrap">
                  <div class="title_wrap">
                      <div class="title">관리기관 상세정보</div>
                      <button type="button" class="btn_close" @click="detailOrg = false">닫기</button>
                  </div>
                  <div class="popup_cnt">
                      <div class="input_wrap">
                          <div class="input_area">
                              <p class="input_tit">시/도</p>
                              <input type="text" value="" v-model="selectedDetailSidoItems" disabled>
                          </div>
                          <div class="input_area">
                              <p class="input_tit">시/군/구</p>
                              <input type="text" value="" v-model="selectedDetailSggItems" disabled>
                          </div>
                      </div>
                      <div class="input_wrap">
                          <div class="input_area">
                              <p class="input_tit">관리기관명</p>
                              <input type="text" value="" v-model="selectedDetailOrgItems" disabled>
                          </div>
                          <div class="input_area">
                              <p class="input_tit">대표 전화번호</p>
                              <input type="text" value="" v-model="selectedDetailPhoneNumber" disabled>
                          </div>
                      </div>
                      <div class="input_wrap">
                          <div class="input_area">
                              <p class="input_tit">관리기관 구분</p>
                              <input type="text" value="" v-model="selectedDetailTypeCd" disabled>
                          </div>
                          <div class="input_area">
                              <p class="input_tit">상위기관</p>
                              <input type="text" value="" v-model="selectedDetailUpperOrgId" disabled>
                          </div>
                      </div>
                      <div class="input_wrap">
                          <div class="input_area">
                              <p class="input_tit">기관 상태</p>
                              <input type="text" value="" v-model="selectedDetailUseYn" disabled>
                          </div>
                      </div>
                      <div class="input_wrap">
                        <div class="input_area">
                          <p class="input_tit">우편번호</p>
                          <div class="add_btn_input">
                            <input type="text" value="" v-model="selectedDetailZipcode" disabled>
                          </div>
                        </div>
                      </div>
                      <div class="input_wrap type-02">
                          <div class="input_area">
                          <p class="input_tit">주소</p>
                          <input type="text" value="" v-model="selectedDetailAddr" disabled>
                        </div>
                      </div> 
                      <div class="input_wrap type-02">
                          <div class="input_area" >
                              <p class="input_tit">상세주소</p>
                              <input type="text" value="" v-model="selectedDetailDetailAddr" disabled>
                          </div>
                      </div>                 
                      <div class="input_wrap">
                          <div class="input_area">
                              <p class="input_tit">등록자 ID</p>
                              <input type="text" value="" v-model="selectedDetailUpdDUser" disabled>
                          </div>
                          <div class="input_area">
                              <p class="input_tit">등록자 일시</p>
                              <div class="date_warp">
                                  <input type="date" v-model="selectedDetailUpdDtime" disabled>
                              </div>
                          </div>
                      </div>
                      
                  </div>
                  <div class="popbtn_area">
                      <button type="button" class="btn form2" @click="changeOrgFormat(), detailOrg = false">수정</button>
                      <button type="button" class="btn form3" @click="deleteOrg = true">삭제</button>
                  </div>
              </div>
            </div>
          <!--관리 기관 정보 수정-->
            <div id="" class="popupLayer" v-if="changeOrg === true">
              <div class="popup_wrap">
                  <div class="title_wrap">
                      <div class="title">관리기관 정보 수정</div>
                      <button type="button" class="btn_close" @click="changeOrg = false">닫기</button>
                  </div>
                  <div class="popup_cnt">
                    <div class="input_wrap type-02">
                        <div class="input_area">
                          <p class="input_tit">아래의 항목을 작성하여 주세요.(* 필수항목)</p>
                        </div>
                      </div>
                      <div class="input_wrap">
                          <div class="input_area">
                              <p class="input_tit">시/도 *</p>
                              <select v-model="selectedChangeSidoItems" @change="onChangeSgg($event)">
                                  <option v-for="(sido, index) in sidoItems" :value="sido.value" v-bind:key="index">{{sido.label}}</option>
                                </select>
                          </div>
                          <div class="input_area">
                              <p class="input_tit">시/군/구 *</p>
                              <select v-model="selectedChangeSggItems" @change="onChangeOrg($event)">
                                  <option v-for="(sgg, index) in sggItems" :value="sgg.value" v-bind:key="index">{{sgg.label}}</option>
                                </select>
                          </div>
                      </div>
                      <div class="input_wrap">
                          <div class="input_area">
                              <p class="input_tit">관리기관명 *</p>
                              <input type="text" value="" v-model="selectedChangeOrgItems">
                          </div>
                          <div class="input_area">
                              <p class="input_tit">대표 전화번호 *</p>
                              <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  value="" v-model="selectedChangePhoneNumber" maxlength="11">
                          </div>
                      </div>
                      <div class="input_wrap">
                        <div class="input_area">
                          <p class="input_tit">관리기관 구분 *</p>
                          <select v-model="selectedChangeTypeCd">
                            <option v-for="(orgType, index) in orgTypeItems" :value="orgType.value" v-bind:key="index">{{orgType.label}}</option>
                          </select>
                        </div>
                        <div class="input_area">
                            <p class="input_tit">상위기관 *</p>
                            <select v-model="selectedChangeUpperOrgId">
                              <option v-for="(upperOrg, index) in upperOrgItems" :value="upperOrg.value" v-bind:key="index">{{upperOrg.label}}</option>
                            </select>
                        </div>
                      </div>
                      <div class="input_wrap">
                          <div class="input_area">
                              <p class="input_tit">기관 상태 *</p>
                              <select v-model="selectedChangeUseYn">
                              <option v-for="(useyn, index) in UseYnItems" :value="useyn.value" v-bind:key="index">{{useyn.label}}</option>
                            </select>
                          </div>
                      </div>
                      <div class="input_wrap">
                        <div class="input_area">
                          <p class="input_tit">우편번호 *</p>
                          <div class="add_btn_input">
                            <input type="text" value="" v-model="selectedChangeZipcodeCd" @click="search">
                            <button type="button" class="input_btn" @click="search()">검색</button>
                          </div>
                        </div>
                      </div>
                      <div class="input_wrap type-02">
                          <div class="input_area">
                          <p class="input_tit">주소 *</p>
                          <input type="text" value="" v-model="selectedChangeAddr">
                        </div>
                      </div> 
                      <div class="input_wrap type-02">
                          <div class="input_area" >
                              <p class="input_tit">상세주소</p>
                              <input type="text" value="" v-model="selectedChangeDetailAddr">
                          </div>
                      </div>                 
                  </div>
                  <div class="popbtn_area">
                    <button type="button" class="btn form2" @click="changeOrgSuccess()">수정</button>
                    <button type="button" class="btn" @click="changeOrg = false, detailOrg = true">취소</button>    
                  </div>
              </div>
            </div>
          
            <!--관리 기관 삭제-->
            <div id="" class="popupLayer" v-if="deleteOrg == true">
              <div class="popup_wrap type-02">
                <div class="title_wrap">
                  <div class="title">경고</div>
                  <button type="button" class="btn_close" @click="deleteOrg = false">닫기</button>
                </div>
                <div class="popup_cnt">
                  <p class="alert_txt">선택하신 관리기관을 삭제하시겠습니까?</p>
                </div>
                <div class="popbtn_area type-02">
                  <button type="button" class="btn form3" @click="deleteOrgSuccess()">확인</button>
                  <button type="button" class="btn form2" @click="deleteOrgFail()">취소</button>
                </div>
              </div>
            </div>
            <div class="list_title_wrap">
                <span>시스템관리</span>
                <i class="ico_nav"></i>
                <span class="on">기관관리</span>
            </div>
            <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry'>
                <div class="table_wrap">
                    <table>
                        <colgroup>
                            <col style="width:25%;">
                            <col style="width:25%;">
                            <col style="width:25%;">
                            <col style="width:25%;">
                        </colgroup>
                        <thead>
                            <th scope="row">시/도</th>
                            <th scope="row">시/군/구</th>
                            <th scope="row">관리기관</th>
                            <th scope="row">관리기관명</th>
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
                                    <input type="text" value="" v-model="selectedOrgNm">
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
                  <p>관리기관 정보</p>
                  <div class="btn_area">
                    <button type="button" style="margin-right:10px" class="btn" @click="createData()">등록</button>
                  </div>
                </div>
                <div class="list result">
                    <table>
                        <colgroup>
                          <col style="width:5%;">
                          
                          <col style="width:8%;">
                          <col style="width:8%;">
                          <col style="width:10%;">
                          <col style="width:14%;">
                          <col style="width:auto;">
                          <col style="width:8%;">
                          <col style="width:8%;">
                          <col style="width:10%;">
                          <col style="width:10%;">
                        </colgroup>
                        <thead>
                            <tr>
                              <th scope="col">순번</th>
                              
                              <th scope="col">시/도</th>
                              <th scope="col">시/군/구</th>
                              <th scope="col">관리기관명</th>
                              <th scope="col">대표 전화번호</th>
                              <th scope="col">주소</th>
                              <th scope="col">세부주소</th>
                              <th scope="col">기관상태</th>
                              <th scope="col">등록일시</th>
                              <th scope="col">수정일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody">
                        <table>
                            <colgroup>
                            <col style="width:5%;">
                            
                            <col style="width:8%;">
                            <col style="width:8%;">
                            <col style="width:10%;">
                            <col style="width:14%;">
                            <col style="width:auto;">
                            <col style="width:8%;">
                            <col style="width:8%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            </colgroup>
                            <tbody >
                                <tr v-for="(item,index) in listData" v-bind:key="index" :ref="`target_${index}`">
                                  <td><a href="#" @click="detailOrgpopup(index)">{{num(index+1)}}</a></td>
                                  <td><a href="#" @click="detailOrgpopup(index)">{{item.sidoName}}</a></td>
                                  <td><a href="#" @click="detailOrgpopup(index)">{{item.sggName}}</a></td>
                                  <td><a href="#" @click="detailOrgpopup(index)">{{item.orgNm}}</a></td>
                                  <td><a href="#" @click="detailOrgpopup(index)">{{changeRecipientPhoneno(item.phoneNumber)}}</a></td>
                                  <td><a href="#" @click="detailOrgpopup(index)">{{item.addr}}</a></td>
                                  <td><a href="#" @click="detailOrgpopup(index)">{{item.addrDetail}}</a></td>
                                  <td><a href="#" @click="detailOrgpopup(index)">{{chnageUseYn(item.useYn)}}</a></td>
                                  <td><a href="#" @click="detailOrgpopup(index)">{{item.regDtime}}</a></td>
                                  <td><a href="#" @click="detailOrgpopup(index)">{{item.updDtime}}</a></td>
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
    name: 'UserListComponent',
    components : {
        HeaderComp,
        pagination
    },
    data(){
      return{
        sido:'', sidoCd:'', sgg:'', sggCd:'',
        sidoName:'',sggName:'', orgNm:'', orgNm2:'', typeNm:'', upperOrgNm:'', orgId:'', updateOrgId:'', orgmItems2:[],
        sidoItems:[], sggItems:[], orgmItems:[], upperOrgItems:[], orgTypeItems:[], noticItems:[], TorgItems:[], 
        UseYnItems:[{value:'', label:'전체'},{value:0, label:'미사용'},{value:1, label:'사용'}],
        orgSido:'', orgSgg:'', orgCode:'', 
        selectedSidoItems:'', selectedSggItems:'', selectedOrgItems:'', selectedOrgNm:'', selectedPhoneNumber:'',

        selectedUpdateSidoItems:'', selectedUpdateSggItems:'', selectedUpdateOrgItems:'',
        selectedUpdateOrgNm:'', selectedUpdatePhoneNumber:'', selectedUpdateTypeCd:'', selectedUpdateUpperOrgId:'',
        selectedUpdateZipcode:'', selectedUpdateAddr:'', selectedUpdateDetailAddr:'',
        selectedUpdateUpdDUser:'',selectedUpdateUpdDtime:'', checkUpdateAdrr:'',

        selectedDetailSidoItems:'', selectedDetailSggItems:'', selectedDetailOrgItems:'',
        selectedDetailOrgNm:'', selectedDetailPhoneNumber:'', selectedDetailTypeCd:'', selectedDetailUpperOrgId:'',
        selectedDetailZipcode:'', selectedDetailAddr:'', selectedDetailDetailAddr:'',
        selectedDetailUpdDUser:'',selectedDetailUpdDtime:'', selectedDetailUseYn:'',
        

        selectedChangeSidoItems:'', selectedChangeSggItems:'', selectedChangeOrgItems:'',
        selectedChangeOrgNm:'', selectedChangePhoneNumber:'', selectedChangeTypeCd:'', selectedChangeUpperOrgId:'',
        selectedChangeZipcodeCd:'', selectedChangeAddr:'', selectedChangeDetailAddr:'',
        selectedChangeUpdDUser:'',selectedChangeUpdDtime:'', selectedChangeUseYn:'',

        selectDetailsido:'',selectDetailSgg:'',selectDetailOrg:'',
        selectedAddr: '', selectedAddrDetail: '',
        writeOrg: false, changeOrg: false, deleteOrg: false, detailOrg: false,
        saveChangeData: null,
        detailOrgId: '',
        detailArr: [],

        zipCode: null,selectedAddr: null, selectedAddrDetail: null, selectUserData: null,
        searchCheck1 : 1, searchCheck2 : 0,

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
      this.getUpperOrgData();
      this.getTorgData();
      this.getOrgType();
      
      //this.getTorgData();
      //this.getUserData();
    },
    methods:{
      pagingMethod(page) {
        this.listData = this.TorgItems.slice(
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
      this.selectedUpdateSggItems = ''
      this.selectedChangeSggItems = ''
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
          // this.orgmItems = [...tmpResult2,...tmpResult]
          this.orgmItems=tmpArr;
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    getUpperOrgData(){
      let url =this.$store.state.serverApi + "/admin/organizations/all?pageIndex=1&recordCountPerPage=1000";
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          const tmpArr = [{label: '전체', value: ''}];
          let tmpResult1 = [{label: '전체', value: ''}];
          let tmpResult2 = [{label: '전체', value: ''}];
          this.upperOrgItems=[];
          for(let i=0; i<response.data.data.length; i++) {
            tmpArr.push({
              label: response.data.data[i].orgNm,
              value: response.data.data[i].orgId,
              value2: response.data.data[i].typeCd
            });
          } 
          /*for(let i =0; i<tmpArr.length; i++){
            this.updateOrgId = tmpArr[i].value
          }*/
          this.updateOrgId = tmpArr[1].value
          let tmp = this.updateOrgId.split('')
          let num = 0
          let found= 0
          let arr = []
          // while(true){
          //   found = this.updateOrgId.indexOf("0", num);
          //   console.log(found)
          //   if(found === -1){
          //     break;
          //   }
          //   num = found+1;
          // }
          // console.log(num)
          // if(num === 10){
          // found = this.updateOrgId.indexOf('0')
          // while(found != -1){
          //   arr.push(found)
          //   found = this.updateOrgId.indexOf('0', found + 1)
          // }
          // num = arr[arr.length-1]
          // }
          for(let i=3; i<this.updateOrgId.length; i++){
            if(tmp[i] === '0'){
              found = i+1
              num = found
            }else if(tmp[i] !== '0' ){
              break;
            }
          }
          let string = this.updateOrgId.substring(0,num)
          let changenum = this.updateOrgId.substring(num)
          num = Number(changenum)+1
          num = String(num)
          this.updateOrgId = string + num
          
          tmpResult1=tmpArr.filter(cd=>{
            return cd.value2 === 'TPE001'
          })
          this.upperOrgItems = [...tmpResult2,...tmpResult1]
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    getOrgType(){
      let url =this.$store.state.serverApi + "/admin/codes?cmmnCdGroup=ORGANIZATION.TYPECD";
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
      .then(response => {
        this.selectedUpdateTypeCd = ''
        this.selectedChangeTypeCd = ''
        const tmpArr = [{label: '전체', value: ''}];
        // let tmpResult2 = [{label: '전체', value: ''}];
        this.orgTypeItems=[];
        for(let i=0; i<response.data.data.length; i++) {
          tmpArr.push({
            label: response.data.data[i].cmmnCdNm,
            value: response.data.data[i].cmmnCd,
          });
        } 
        let tmpResult = tmpArr
        // this.orgTypeItems = [...tmpResult2,...tmpResult]
        this.orgTypeItems=tmpArr;
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    getTorgData() {
      let addrCd = ''
      let sgg = this.sggCd.substring(0,5)
      if(this.selectedSidoItems != '' && this.selectedSggItems == ''){
        sgg = this.sidoCd.substring(0,2)
      }else if(this.selectedSggItems != ''){
          if(this.sggCd.startsWith('0', 4) === true){
          sgg = this.sggCd.substring(0,4)
        }else{
          sgg = this.sggCd.substring(0,5)
        }
      }else{
        sgg = ''
      }
      let uri = this.$store.state.serverApi + "/admin/organizations?pageIndex=1&recordCountPerPage=1000"+"&userId="+this.$store.state.userId+"&orgId="+this.selectedOrgItems+"&orgNm="+this.selectedOrgNm+"&sggCd="+sgg;
      axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(response => {
            this.TorgItems = response.data.data
            this.total = this.TorgItems.length
            this.page = 1
            this.pagingMethod(this.page)
        //     if(this.searchCheck1 === 1){
        //     this.searchCheck1 = 0
        // }
        // if(this.TorgItems.length !== 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     alert("성공적으로 조회 되었습니다.")
        //     this.searchCheck2 = 0
        // }else if(this.TorgItems.length === 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
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
      console.log(this.sidoCd)
      this.getSggData()
      this.sggCd = ''
      this.getOrgmData()
    },
    onChangeOrg(event) {
      this.sggCd = event.target.value
      console.log(this.sggCd)
      this.getOrgmData()
    },
    manageInquiry() {
      this.searchCheck2 = 1
        this.getTorgData();
    },
    // 관리기관 등록 시 변수 초기화
    createData(){
      this.selectedUpdateSidoItems='' 
      this.selectedUpdateSggItems='' 
      this.selectedUpdateOrgItems=''
      this.selectedUpdatePhoneNumber=''
      this.selectedUpdateTypeCd=''
      this.selectedUpdateUpperOrgId=''
      this.selectedUpdateZipcode=''
      this.selectedUpdateAddr=''
      this.selectedUpdateDetailAddr=''
      this.selectedUpdateUpdDUser=''
      this.selectedUpdateUpdDtime=''
      this.writeOrg = true
    }, 
    // 관리기관 등록
    async uploadData(){
      this.$store.state.userId = sessionStorage.getItem("userId")
      let addrCd = ''
      let sgg = this.sggCd.substring(0,5)
      if(this.selectedUpdateSidoItems != '' && this.selectedUpdateSggItems == ''){
        sgg = this.sidoCd.substring(0,2)
      }else if(this.selectedSggItems != ''){
        if(this.sggCd.startsWith('0', 4) === true){
          sgg = this.sggCd.substring(0,4)
        }else{
          if(this.sggCd.startsWith('0', 4) === true){
          sgg = this.sggCd.substring(0,4)
        }else{
          sgg = this.sggCd.substring(0,5)
        }
        }
      }else{
        sgg = ''
      }
      this.sidoName = this.sidoItems.filter(cd=>{
      return cd.value === this.selectedUpdateSidoItems
      })
      this.sggName = this.sggItems.filter(cd=>{
        return cd.value === this.selectedUpdateSggItems
      })
      this.orgNm = this.orgmItems.filter(cd=>{
        return cd.value === this.selectedUpdateOrgItems
      })
      this.typeNm = this.orgTypeItems.filter(cd=>{
        return cd.value === this.selectedUpdateTypeCd
      })
      

      let uri =this.$store.state.serverApi + "/admin/organizations/all?pageIndex=1&recordCountPerPage=1000";
      await axios.get(uri, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          this.orgmItems2=[];
          for(let i=0; i<response.data.data.length; i++) {
            this.orgmItems2.push({
              label: response.data.data[i].orgNm,
              value: response.data.data[i].orgId,
              value2: response.data.data[i].typeCd,
              value3: response.data.data[i].typeNm,
              value4: response.data.data[i].addr
            });
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      // if(this.selectedUpdateOrgItems === ''){
      //   this.orgNm = this.orgmItems2.filter(cd=>{
      //     return cd.value === 'ORG0000001'
      //   })
      //   this.orgNm2 = this.orgmItems2.filter(cd=>{
      //     return cd.value === 'ORG0000001'
      //   })
      //   this.selectedUpdateTypeCd = 'TPE001'
      //   this.typeNm = '관리기관'
      //   this.selectedUpdateOrgItems = ''
      // }
      
        this.orgNm = this.orgmItems2.filter(cd=>{
          return cd.value === this.selectedUpdateOrgItems
        })
        this.orgNm2 = this.orgmItems2.filter(cd=>{
          return cd.value === this.selectedUpdateOrgItems && cd.value2 === this.selectedUpdateTypeCd
        })
        this.checkUpdateAdrr = this.orgmItems2.filter(cd=>{
          return cd.value4 === this.selectedUpdateAddr
        })
      

      if(this.orgNm2.length !== 0){
        alert("이미 등록된 관리기관 입니다.")
        return false
      }
      if(this.checkUpdateAdrr.length !== 0){
        alert("이미 등록된 실행기관 입니다.")
        return false
      }
      
      if(this.selectedUpdateSidoItems === ''){
        alert("시/도 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateSggItems === ''){
        alert("시/군/구 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateOrgItems === '' ){
        alert("관리리관명 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdatePhoneNumber === ''){
        alert("대표전화번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateTypeCd === ''){
        alert("관리기관 구분 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateUpperOrgId === ''){
        alert("상위기관 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateZipcode === ''){
        alert("우편번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateAddr === ''){
        alert("주소 항목을 작성하여 주세요")
        return false
      }

      if(this.selectedUpdatePhoneNumber.length < 3){
        alert("전화번호는 세자리 이상을 입력해 주세요")
        return false;
      }

      let data = {
        sidoName:this.sidoName[0].label,
        addrCd:this.selectedUpdateSggItems,
        sggName:this.sggName[0].label,
        orgId:this.updateOrgId,
        orgNm:this.selectedUpdateOrgItems,
        phoneNumber:this.selectedUpdatePhoneNumber,
        typeCd:this.selectedUpdateTypeCd,
        typeNm:this.typeNm[0].label,
        upperOrgId:this.selectedUpdateUpperOrgId,
        zipcodeCd:this.selectedUpdateZipcode,
        addr:this.selectedUpdateAddr,
        addrDetail:this.selectedUpdateDetailAddr,
        regId:this.$store.state.userId,
      }

      let url = this.$store.state.serverApi+`/admin/organizations`
      axios.post(url,data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
         .then(res => {
           let resData = res.data.data
           if(resData){
             alert("성공적으로 등록되었습니다.")
             this.writeOrg = false
             this.getTorgData()
             this.getUpperOrgData()
           }
         })
         .catch(error => {
             console.log("fail to load")
           this.errorMessage = error.message;
           console.error("There was an error!", error);
         });
    },
    // 관리기관 상세 정보
    detailOrgpopup(index){
      
      // this.selectedDetailUpdDUser
      this.detailArr = this.TorgItems[index]
      this.selectUserData = this.TorgItems[index]
      let upperorg=this.detailArr.upperOrgId
      this.upperOrgNm = this.upperOrgItems.filter(cd=>{
        return cd.value === upperorg
      })
      this.selectedDetailSidoItems='' 
      this.selectedDetailSggItems='' 
      this.selectedDetailOrgItems=''
      this.selectedDetailOrgNm=''
      this.selectedDetailPhoneNumber=''
      this.selectedDetailTypeCd=''
      this.selectedDetailUpperOrgId=''
      this.selectedDetailZipcode=''
      this.selectedDetailAddr=''
      this.selectedDetailDetailAddr=''
      this.selectedDetailUpdDtime = ''
      this.selectedDetailUseYn = ''

      this.selectedDetailSidoItems=this.detailArr.sidoName
      this.selectedDetailSggItems=this.detailArr.sggName
      this.selectedDetailOrgItems=this.detailArr.orgNm
      this.selectedDetailOrgNm=this.detailArr.orgNm
      this.selectedDetailPhoneNumber=this.detailArr.phoneNumber
      this.selectedDetailTypeCd=this.detailArr.typeNm
      this.selectedDetailUpperOrgId=this.upperOrgNm[0].label
      this.selectedDetailZipcode=this.detailArr.zipcodeCd
      this.selectedDetailAddr=this.detailArr.addr
      this.selectedDetailDetailAddr=this.detailArr.addrDetail
      this.selectedDetailUpdDtime=this.detailArr.updDtime.substring(0,10)
      this.selectedDetailUseYn=this.chnageUseYn(this.detailArr.useYn)
      this.selectedDetailUpdDUser=this.detailArr.regId
      this.orgId = this.detailArr.orgId

      this.detailOrg = true
      
    },
    // 관리기관 수정 시 상세정보 불러오기 및 일부 변수 초기화
    changeOrgFormat(){
      this.selectedChangeSidoItems = ''
      this.selectedChangeSggItems = ''
      this.selectedChangeOrgItems = this.selectUserData.orgNm
      this.selectedChangePhoneNumber = this.selectUserData.phoneNumber
      this.selectedChangeTypeCd = this.selectUserData.typeCd
      this.selectedChangeUpperOrgId = this.selectUserData.upperOrgId
      this.selectedChangeZipcodeCd = this.selectUserData.zipCode
      this.selectedChangeAddr = this.selectUserData.addr
      this.selectedChangeDetailAddr = this.selectUserData.addrDetail
      this.selectedChangeUseYn = this.selectUserData.useYn
      this.selectedChangeZipcodeCd = this.selectUserData.zipcodeCd
      this.changeOrg = true
      
    },
    // 관리기관 수정
    async changeOrgSuccess(){
      let uri =this.$store.state.serverApi + "/admin/organizations/all?pageIndex=1&recordCountPerPage=1000";
      await axios.get(uri, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          this.orgmItems2=[];
          for(let i=0; i<response.data.data.length; i++) {
            this.orgmItems2.push({
              label: response.data.data[i].orgNm,
              value: response.data.data[i].orgId,
              value2: response.data.data[i].typeCd,
              value3: response.data.data[i].typeNm,
              sidoName: response.data.data[i].sidoName,
              sggName: response.data.data[i].sggName
            });
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      // if(this.selectedChangeOrgItems === ''){
      //   this.sidoName = this.orgmItems2.filter(cd=>{
      //     return cd.sidoName === '세종특별자치시'
      //   })
      //   this.sggName = this.orgmItems2.filter(cd=>{
      //     return cd.sggName === '세종특별자치구'
      //   })
      //   this.orgNm = this.orgmItems2.filter(cd=>{
      //     return cd.value === 'ORG0000001'
      //   })
      //   this.orgNm2 = this.orgmItems2.filter(cd=>{
      //     return cd.value === 'ORG0000001'
      //   })
      //   this.selectedChangeTypeCd = 'TPE001'
      //   this.selectedChangeOrgItems = ''
      //   this.typeNm = '관리기관'
      // }else{
        this.sidoName = this.sidoItems.filter(cd=>{
        return cd.value === this.selectedChangeSidoItems
        })
        this.sggName = this.sggItems.filter(cd=>{
          return cd.value === this.selectedChangeSggItems
        })
        // this.orgNm = this.orgmItems2.filter(cd=>{
        //   return cd.value === this.selectedChangeOrgItems
        // })
        this.orgNm2 = this.orgmItems2.filter(cd=>{
          return cd.value === this.selectedChangeOrgItems && cd.value2 === this.selectedChangeTypeCd
        })
        this.typeNm = this.orgTypeItems.filter(cd=>{
        return cd.value === this.selectedChangeTypeCd
      })
      // }
      
      if(this.selectedChangeSidoItems === ''){
        alert("시/도 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeSggItems === ''){
        alert("시/군/구 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeOrgItems === ''){
        alert("관리리관명 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangePhoneNumber === ''){
        alert("대표전화번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeTypeCd === ''){
        alert("관리기관 구분 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeUpperOrgId === ''){
        alert("상위기관 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeUseYn === ''){
        alert("기관상태 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeZipcodeCd === ''){
        alert("우편번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeAddr === ''){
        alert("주소 항목을 작성하여 주세요")
        return false
      }
      if(this.selectedChangeTypeCd === 'TPE001' && this.orgNm2.length !== 0){
        alert("이미 등록된 관리기관 입니다.")
        return false
      }
      if(this.selectedChangePhoneNumber.length < 3){
        alert("전화번호는 세자리 이상을 입력해 주세요")
        return false;
      }


      let data = {
        sidoName:this.sidoName[0].label,
        addrCd:this.selectedChangeSggItems,
        sggName:this.sggName[0].label,
        orgId:this.orgId,
        orgNm:this.selectedChangeOrgItems,
        phoneNumber:this.selectedChangePhoneNumber,
        typeCd:this.selectedChangeTypeCd,
        typeNm:this.typeNm[0].label,
        upperOrgId:this.selectedChangeUpperOrgId,
        zipcodeCd:this.selectedChangeZipcodeCd,
        addr:this.selectedChangeAddr,
        addrDetail:this.selectedChangeDetailAddr,
        useYn:this.selectedChangeUseYn
      }

      let url = this.$store.state.serverApi+`/admin/organizations/${this.orgId}`
      axios.post(url,data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let resData = res.data.data
            if(resData){
              alert("성공적으로 변경되었습니다")
              this.getTorgData()
              this.changeOrg = false
              this.detailOrg = false
            }
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });


      
      
    },
    // 관리기관 삭제 취소
    deleteOrgFail(){
      alert("취소되었습니다")
      this.deleteOrg = false
    },
    // 관리기관 삭제
    async deleteOrgSuccess(){
      let url = this.$store.state.serverApi+`/admin/organizations/${this.orgId}`
      await axios.delete(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
           .then(res => {
            alert("기관상태가 미사용으로 변경 되었습니다")
              this.writeOrg = false
              this.deleteOrg = false
              this.detailOrg = false
              this.getTorgData()
            let resData = res.data.data
            if(resData){
              alert("성공적으로 삭제되었습니다")
              this.writeOrg = false
              this.deleteOrg = false
              this.detailOrg = false
              this.getTorgData()
            }
           })
           .catch(error => {
               console.log("fail to load")
             this.errorMessage = error.message;
             console.error("There was an error!", error);
           });
      this.getTorgData()

    },
    
    changeRecipientPhoneno(phone){
        if(phone){
            let changeNumber = phone.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
            return changeNumber
        }else{
            return ''
        }
    },
    chnageUseYn(useYn){
      // switch(value){
      //   case 0 : return '미사용'; break;
      //   case 1 : return '사용'; break;
      // }
      if(useYn){
        if(useYn === '0'){
          return '미사용'
        }else{
          return '사용'
        }
      }
    },
    search(){ 
    //여기
    //@click을 사용할 때 함수는 이렇게 작성해야 한다.
    new window.daum.Postcode({
    oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ''; // 참고 항목 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if(data.buildingName !== '' && data.apartment === 'Y'){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if(extraRoadAddr !== ''){
            extraRoadAddr = ' (' + extraRoadAddr + ')';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        
        this.selectedUpdateZipcode = data.zonecode; //
        this.selectedChangeZipcodeCd = data.zonecode;
        this.selectedUpdateAddr = data.roadAddress;
        this.selectedChangeAddr = data.roadAddress;
//        this.selectedAddr = data.jibunAddress;
        
        // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
        if(roadAddr !== ''){
            this.selectedUpdateAddr += extraRoadAddr;
            this.selectedChangeAddr += extraRoadAddr;
        }

        // var guideTextBox = document.getElementById("guide");
        // // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        // if(data.autoRoadAddress) {
        //     var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
        //     guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
        //     guideTextBox.style.display = 'block';

        // } else if(data.autoJibunAddress) {
        //     var expJibunAddr = data.autoJibunAddress;
        //     guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
        //     guideTextBox.style.display = 'block';
        // } else {
        //     guideTextBox.innerHTML = '';
        //     guideTextBox.style.display = 'none';
        // }

    
    }
    }).open();
    },
    },
    mounted(){
    
    const script = document.createElement("script");
    script.src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    
    document.head.appendChild(script);
    
  },
}
</script>
<style>
</style>