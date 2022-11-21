<template>
  <div class="wrap">
    <!--<HeaderComp></HeaderComp>-->
    <div v-if="!this.pending" style="text-align: center;">
      <img src="../../assets/images/loading.png"  />
    </div>
    <div v-else class="container">
      
      <div class="box_search_wrap box_style">
          <table>
              <colgroup>
                  <col style="width:4%;">
                  <col style="width:5%;">
                  <col style="width:4%;">
                  <col style="width:24%;">
                  <col style="width:3.5%;">
                  <col style="width:6%;">
                  <col style="width:4.5%;">
                  <col style="width:7.5%;">
                  <col style="width:5.3%;">
              </colgroup>
              <thead>
                  <th scope="row">대상자 이름</th>
                  <th scope="row">생년월일</th>
                  <th scope="row">나이</th>
                  <th scope="row">주소</th>
                  <th scope="row">성별</th>
                  <th scope="row">전화번호</th>
                  <th scope="col">활동미감지(분)</th>
                  <th scope="col">관리기관</th>
                  <th scope="col">바이오 센서</th>
              </thead>
              <tbody>
                <tr>
                    <td>
                        <input type="text" :value="this.bodyData? this.bodyData.recipientNm : ''">
                    </td>
                    <td>
                        <input type="text" :value=" this.bodyData? this.bodyData.birthday : ''">
                    </td>
                    <td>
                        <input type="text" class="size-1" :value="this.bodyData? makeAge(this.bodyData.birthday) : ''">
                    </td>
                    <td>
                        <input type="text" class="size-4" :value="this.bodyData? this.bodyData.addr : ''">
                        <input type="text" class="size-2" :value="this.bodyData? this.bodyData.addrDetail : ''">
                    </td>
                    <td>
                        <div class="btn_area">
                          <button type="button" :class="this.bodyData && this.bodyData.sex === 'M'? 'btn on' :'btn'">남</button>
                          <button type="button" :class="this.bodyData && this.bodyData.sex === 'F'? 'btn on' :'btn'">여</button>
                        </div>
                    </td>
                    <td>
                        <input type="text" :value="this.bodyData? changeRecipientPhoneno(this.bodyData.recipientPhoneno) : ''">
                    </td>
                    <td>
                        <input type="text" class="size-1" :value="this.bodyData? this.bodyData.activeUnsensingCycle : ''">
                    </td>
                    <td>
                        <input type="text" class="size-3" :value="this.bodyData? this.bodyData.orgNm : ''">
                    </td>
                    <td>
                        <div class="btn_area">
                          <button type="button" :class="this.bodyData && this.bodyData.radorSensorYn === 'Y'? 'btn on' :'btn'">사용</button>
                          <button type="button" :class="this.bodyData && this.bodyData.radorSensorYn === 'N'? 'btn on' :'btn'">미사용</button>
                        </div>
                    </td>
                </tr>
            </tbody>
          </table>
      </div>
      
      <div class="box_wrap">
          <div class="box_l">
              <div class="box_style box_col">
                  <div class="info_wrap_1">
                      <div class="tab">
                          <ul class="tabnav">
                              <li :class="menutoggle===1?'active':''"><a href="#" @click="menu(1)">현재상태</a></li>
                              <li :class="menutoggle===3?'active':''"><a href="#" @click="menu(3)">말벗</a></li>
                              <li :class="menutoggle===2?'active':''"><a href="#" @click="menu(2)">응급요원</a></li>
                              <li :class="menutoggle===4?'active':''"><a href="#" @click="menu(4)">생활관리사</a></li>
                              <li :class="menutoggle===5?'active':''"><a href="#" @click="menu(5)">응급번호</a></li>
                          </ul>
                          <div class="tabcontent">
                            <!-- :recipientId="this.recipientId" -->
                            <menu1 :recipientId="this.recipientId" v-if="this.menutoggle===1"></menu1>
                            <menu3 ref="menu3"
                                   v-if="this.menutoggle===3" 
                                   :recipientId="this.recipientId" 
                                   :menu3Refresh="this.menu3Refresh"
                                   @sendData3="getFromMenuData" 
                                   @openPop="openModal3"
                                   @openPopMsg="openModalMsg"
                                   @sendMenu3Lending="menu3Lending"></menu3>  
                            <menu2 ref="menu2"
                                   :recipientId="this.recipientId" 
                                   v-if="this.menutoggle===2"
                                   :menu2Refresh="this.menu2Refresh"
                                   @sendData2="getFromMenuData" 
                                   @openPop="openModal2"
                                   @openPopMsg="openModalMsg"
                                   @sendMenu2Lending="menu2Lending"
                                    ></menu2>  
                            <menu4 ref="menu4"
                                   :recipientId="this.recipientId" 
                                   v-if="this.menutoggle===4"
                                   :menu4Refresh="this.menu4Refresh"
                                   @sendData4="getFromMenuData" 
                                   @openPop="openModal4"
                                   @openPopMsg="openModalMsg"
                                   @sendMenu4Lending="menu4Lending"
                                   ></menu4>
                            <menu5 ref="menu5"
                                   :recipientId="this.recipientId" 
                                   v-if="this.menutoggle===5"
                                   :menu5Refresh="this.menu5Refresh"
                                   @sendData5="getFromMenuData" 
                                   @openPop="openModal5"
                                   @openPopMsg="openModalMsg"
                                   @sendMenu5Lending="menu5Lending"
                                   ></menu5>

                                
                          </div>
                      </div><!--tab-->
                  </div>
              </div>
              
              <div class="box_style box_col map map_box">
                  <div id="map"></div>
              </div>
          </div>
          <div class="box_style box_r">
              <div class="info_wrap_2">
                  <div class="tab">
                      <ul class="tabnav">
                          <li :class="taptoggle===1?'active':''"><a href="#" @click="tap(1)">수집정보</a></li>
                          <li :class="taptoggle===2?'active':''"><a href="#" @click="tap(2)">응급신호</a></li>
                          <li :class="taptoggle===3?'active':''"><a href="#" @click="tap(3)">통화이력</a></li>
                          <li :class="taptoggle===4?'active':''"><a href="#" @click="tap(4)">연결장비</a></li>
                          <li :class="taptoggle===5?'active':''"><a href="#" @click="tap(5)">주기설정</a></li>
                      </ul>
                      <tap1 v-if="this.taptoggle===1" :recipientId="this.recipientId"></tap1>
                      <tap2 v-if="this.taptoggle===2" :recipientId="this.recipientId"></tap2>
                      <tap3 v-if="this.taptoggle===3" :recipientId="this.recipientId"></tap3>
                      <tap4 v-if="this.taptoggle===4" :recipientId="this.recipientId"></tap4>
                      <tap5 v-if="this.taptoggle===5" :recipientId="this.recipientId"></tap5>
                  </div><!--tab-->
              </div>
          </div>
      </div>
    </div>
    <div id="" class="popupLayer" v-if="popCheck3">
      <!-- 말벗 추가 -->
      <div class="popup_wrap">
          <div class="title_wrap">
              <div class="title">{{this.msg}} 추가</div>
              <button type="button" class="btn_close" @click="closeModal">닫기</button>
          </div>
          <div class="popup_cnt">
            <div class="input_wrap col3">
                <div class="input_area">
                  <p class="input_tit">이름</p>
                  <input type="text" v-model="managerName">
                </div>
                <!-- <div class="input_area">
                    <p class="input_tit">생년월일</p>
                    <input type="text" value="">
                </div> -->
                <div class="input_area">
                    <p class="input_tit">휴대폰번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="managerPhone" minlength="3" maxlength="11">
                </div>
                <div class="input_area">
                    <p class="input_tit">관계</p>
                    <select name="managerRelationCd" id="managerRelationCd" v-model="managerRelationCd" > <!--v-model="managerRelationNm"-->
                      <option v-for="(items, index ) in relationArr" v-bind:value="items.value" v-bind:key="index"> 
                          {{ items.text }}
                      </option>
                    </select> 
                </div>
            </div>
            <!-- <div class="input_wrap type-02">
                <div class="input_area">
                    <p class="input_tit">이메일</p>
                    <input type="text" v-model="managerEMail">
                </div>
                <div class="btn_area">
                    <p class="input_tit">생년월일</p>
                    <div class="toggle_btn">
                        <button type="button" class="btn on">남</button>
                        <button type="button" class="btn">여</button>
                    </div>
                </div> 
            </div>-->
            <!--<div class="input_wrap type-02">
                <div class="input_area">
                    <p class="input_tit">관리기관</p>
                    <input type="text" v-model="managerRelationOrg">
                         <option value="">경기도 용인시 사회복지관 2관</option> 
                    </select> 
                </div>
                 <div class="input_area size-s">
                    <p class="input_tit">담당지역</p>
                    <input type="text" value="풍덕천 1동">
                </div> 
            </div>-->
              <!-- <div class="input_wrap">
                  <div class="input_area">
                      <p class="input_tit">상태</p>
                      <select name="" id="">
                          <option value="">근무중</option>
                      </select>
                  </div>
                  <div class="input_area">
                      <p class="input_tit">입사일</p>
                      <input type="text" value="2022.06.23">
                  </div>
                  <div class="input_area">
                      <p class="input_tit">퇴사일</p>
                      <input type="text" disabled>
                  </div>
              </div> -->
          </div>
          <div class="popbtn_area">
            <button type="button" class="btn form2" @click="insertManager()">추가</button>
            <button type="button" class="btn" @click="closeModal">취소</button>
          </div>
      </div>
    </div>
    <!-- 응급요원 추가 팝업 -->
    <div id="" class="popupLayer" v-if="popCheck2">
      <div class="popup_wrap">
          <div class="title_wrap col3">
              <div class="title">{{this.msg}} 추가</div>
              <button type="button" class="btn_close" @click="closeModal">닫기</button>
          </div>
          <div class="popup_cnt">
            <div class="input_wrap col3">
              <div class="input_area">
                  <p class="input_tit">응급요원선택</p>
                  <select v-model="selectedEm" @change="ifselectem($event.target.selectedIndex)">
                    <option v-for="(em, index) in emData" :value="em.value" v-bind:key="index">{{em.label}}</option>
                  </select> 
                </div>
                <div class="input_area" v-if="this.emdisable===false">
                  <p class="input_tit">응급요원명</p>
                  <input type="text" v-model="managerName">
                </div>
                <div class="input_area" v-else>
                  <p class="input_tit">응급요원ID</p>
                  <input type="text" v-model="managerId" disabled>
                </div>
                <div class="input_area" v-if="this.emdisable===false">
                    <p class="input_tit">휴대폰번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="managerPhone" minlength="3" maxlength="11">
                </div>
                <div class="input_area" v-else>
                    <p class="input_tit">휴대폰번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="managerPhone" minlength="3" disabled>
                </div>
            </div>
          </div>
          <div class="popbtn_area">
            <button type="button" class="btn form2" @click="insertEmergencyManager()">추가</button>
            <button type="button" class="btn" @click="closeModal">취소</button>
          </div>
      </div>
    </div>
    <div id="" class="popupLayer" v-if="popCheck2_2">
      <div class="popup_wrap">
          <div class="title_wrap col3">
              <div class="title">{{this.msg}} 수정</div>
              <button type="button" class="btn_close" @click="closeModal">닫기</button>
          </div>
          <div class="popup_cnt">
            <div class="input_wrap col3">
              <div class="input_area">
                  <p class="input_tit">응급요원선택</p>
                  <select v-model="selectedEm" @change="ifselectem($event.target.selectedIndex)">
                    <option v-for="(em, index) in emData" :value="em.value" v-bind:key="index">{{em.label}}</option>
                  </select> 
                </div>
                <div class="input_area" v-if="this.emdisable===false">
                  <p class="input_tit">응급요원명</p>
                  <input type="text" v-model="managerName">
                </div>
                <div class="input_area" v-else>
                  <p class="input_tit">응급요원ID</p>
                  <input type="text" v-model="managerId" disabled>
                </div>
                <div class="input_area" v-if="this.emdisable===false">
                    <p class="input_tit">휴대폰번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="managerPhone" minlength="3" maxlength="11">
                </div>
                <div class="input_area" v-else>
                    <p class="input_tit">휴대폰번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="managerPhone" minlength="3" disabled>
                </div>
            </div>
          </div>
          <div class="popbtn_area">
            <button type="button" class="btn form2" @click="changeEmergencyManager()">수정</button>
            <button type="button" class="btn" @click="closeModal">취소</button>
          </div>
      </div>
    </div>
    <!-- 생활관리사 추가 팝업 -->
    <div id="" class="popupLayer" v-if="popCheck4">
      <div class="popup_wrap">
          <div class="title_wrap">
              <div class="title">{{this.msg}} 추가</div>
              <button type="button" class="btn_close" @click="closeModal">닫기</button>
          </div>
          <div class="popup_cnt">
            <div class="input_wrap col3">
              <div class="input_area">
                  <p class="input_tit">생활관리사선택</p>
                  <select v-model="selectedLi" @change="ifselectli($event.target.selectedIndex)">
                    <option v-for="(li, index) in liData" :value="li.value" v-bind:key="index">{{li.label}}</option>
                  </select> 
                </div>
                <div class="input_area" v-if="this.lidisable===false">
                  <p class="input_tit">생활관리사명</p>
                  <input type="text" v-model="managerName">
                </div>
                <div class="input_area" v-else>
                  <p class="input_tit">생활관리사ID</p>
                  <input type="text" v-model="managerId" disabled>
                </div>
                <div class="input_area" v-if="this.lidisable===false">
                    <p class="input_tit">휴대폰번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="managerPhone" minlength="3" maxlength="11">
                </div>
                <div class="input_area" v-else>
                    <p class="input_tit">휴대폰번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="managerPhone" minlength="3" disabled>
                </div>
            </div>
          </div>
          <div class="popbtn_area">
            <button type="button" class="btn form2" @click="insertCareManager()">추가</button>
              <button type="button" class="btn" @click="closeModal">취소</button>
          </div>
      </div>
    </div>
    <div id="" class="popupLayer" v-if="popCheck4_2">
      <div class="popup_wrap">
          <div class="title_wrap">
              <div class="title">{{this.msg}} 수정</div>
              <button type="button" class="btn_close" @click="closeModal">닫기</button>
          </div>
          <div class="popup_cnt">
            <div class="input_wrap col3">
              <div class="input_area">
                  <p class="input_tit">생활관리사선택</p>
                  <select v-model="selectedLi" @change="ifselectli($event.target.selectedIndex)">
                    <option v-for="(li, index) in liData" :value="li.value" v-bind:key="index">{{li.label}}</option>
                  </select> 
                </div>
                <div class="input_area" v-if="this.lidisable===false">
                  <p class="input_tit">생활관리사명</p>
                  <input type="text" v-model="managerName">
                </div>
                <div class="input_area" v-else>
                  <p class="input_tit">생활관리사ID</p>
                  <input type="text" v-model="managerId" disabled>
                </div>
                <div class="input_area" v-if="this.lidisable===false">
                    <p class="input_tit">휴대폰번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="managerPhone" minlength="3" maxlength="11">
                </div>
                <div class="input_area" v-else>
                    <p class="input_tit">휴대폰번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="managerPhone" minlength="3" disabled>
                </div>
            </div>
          </div>
          <div class="popbtn_area">
            <button type="button" class="btn form2" @click="changeCareManager()">수정</button>
              <button type="button" class="btn" @click="closeModal">취소</button>
          </div>
      </div>
    </div>
    <div id="" class="popupLayer" v-if="popCheck5">
      <div class="popup_wrap" style="width:580px">
          <div class="title_wrap">
              <div class="title">{{this.msg}} 추가</div>
              <button type="button" class="btn_close" @click="closeModal">닫기</button>
          </div>
          <div class="popup_cnt" align="center">
            <div class="input_wrap col3">
                <!-- <div class="input_area">
                  <p class="input_tit">이름</p>
                  <input type="text" v-model="managerName">
                </div> -->
                <div class="input_area" style="width:200px">
                  <p class="input_tit">구분</p>
                  <select name="emerManagerRelationCd" id="emerManagerRelationCd" v-model="emerManagerRelationCd" > <!--v-model="managerRelationNm"-->
                    <option v-for="(items, index ) in emerRelationArr" v-bind:value="items.value" v-bind:key="index"> 
                    {{ items.text }}
                    </option>
                  </select>
                </div> 
                <div class="input_area" style="width:200px">
                    <p class="input_tit">전화번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="managerPhone" minlength="3" maxlength="11">
                </div>
            </div>
          </div>
          <div class="popbtn_area">
            <button type="button" class="btn form2" @click="insertEmergency()">추가</button>
            <button type="button" class="btn" @click="closeModal">취소</button>  
          </div>
      </div>
    </div>
    <!-- <CRow>
      <CCol xs="12" lg="5">
        <CCard class="mx-6 mb-0" >
          <CCardBody class="p-6">
            <CForm>
              <CRow>
                <CCol md="3">
                </CCol>
                <CCol md="9">
                  <CRow>
                    <CCol>휴대폰번호</CCol>
                    <CCol>성별</CCol>
                    <CCol>미감지주기</CCol>
                  </CRow>
                  <CRow>
                    <CCol><CInput v-model="d_phone" type="text" /></CCol>
                    <CCol><CInput v-model="d_sex" type="text" /></CCol>
                    <CCol><CInput v-model="d_endcycle" type="text" /></CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="3">
                </CCol>
                <CCol md="9">
                  <CRow>
                    <CCol>구분</CCol>
                    <CCol>상태</CCol>
                  </CRow>
                  <CRow>
                    <CCol><CInput type="text" v-model="d_part" /></CCol>
                    <CCol><CInput type="text" v-model="d_status" /></CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="12">
                  <CRow>
                    <CCol md="2">주소</CCol>
                    <CCol md="10"></CCol>
                  </CRow>
                  <CRow>
                    <CCol md="2"><CInput type="text" v-model="d_zipCode" /></CCol>
                    <CCol md="10"><CInput type="text" v-model="d_address"  /></CCol>
                  </CRow>
                </CCol>
              </CRow>

            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" lg="7">
        <CTabs>
          <CTab title="응급요원" active >
            <CEmPerson/>
          </CTab>
          <CTab title="가족" >
            <CFamily/>
          </CTab>
          <CTab title="사회복지사" >
            <CSocilaWork/>
          </CTab>
        </CTabs>

      </CCol>
    </CRow>
    <br>
    <CRow>
      <CCol xs="12" lg="12">
        <CTabs>
          <CTab title="수집정보">
            <CCollectInfo/>
          </CTab>
          <CTab title="응급신호">
            <CEmSignal/>
          </CTab>
          <CTab title="방문일지" active>
            <CVisitLog/>
          </CTab>
          <CTab title="통화이력">
            <CCallHistory/>
          </CTab>
          <CTab title="연결장비">
            <CConnectDevice/>
          </CTab>
          <CTab title="주기설정">
            <CCycleSetting/>
          </CTab>
        </CTabs>
      </CCol>
    </CRow> -->
  </div>
</template>

<script>
// import CEmPerson from "./detailpage/EmPerson";
// import CVisitLog from "./detailpage/VisitLog";
// import CCollectInfo from "./detailpage/CollectInfo";
// import CFamily from "./detailpage/Family";
// import CSocilaWork from "./detailpage/SocilaWork";
// import CEmSignal from "./detailpage/EmSignal";
// import CCallHistory from "./detailpage/CallHistory";
// import CConnectDevice from "./detailpage/ConnectDevice";
// import CCycleSetting from "./detailpage/CycleSetting";
import axios from "axios";
import HeaderComp from "../pages/HeaderComp.vue";
import tap1 from "./detailpage/Tap1.vue";
import tap2 from "./detailpage/Tap2.vue";
import tap3 from "./detailpage/Tap3.vue";
import tap4 from "./detailpage/Tap4.vue";
import tap5 from "./detailpage/Tap5.vue";
import menu1 from "./detailpage/Menu1.vue";
import menu2 from "./detailpage/Menu2.vue";
import menu3 from "./detailpage/Menu3.vue";
import menu4 from "./detailpage/Menu4.vue";
import menu5 from "./detailpage/Menu5.vue";
export default {
  name: "DetailView",
  data () {
    return {
      pending:true,
      d_phone: '', d_sex: '', d_endcycle: '', d_part: '', d_status: '', d_zipCode: '', d_address: '', personinfo: '',
      recipientId: '',taptoggle:1, bodyData : null,  menutoggle: 1,popCheck3:false,popCheck2:false,popCheck2_2:false,popCheck4:false,popCheck4_2:false,popCheck5:null,insertData:null,msg: null,
      managerName: null, managerId:null, managerPhone: null,managerRelationNm: null,managerRelationCd:null,emerManagerRelationCd:"TPE001", menu3Refresh:1,menu2Refresh:1,menu4Refresh:1,menu5Refresh:1,
      relationArr : [{value:'', text: '선택'},{value:'RL001', text: '남편'},{value:'RL002', text: '와이프'},{value:'RL003', text: '아들'},{value:'RL004', text: '딸'},{value:'RL005', text: '사위'},{value:'RL006', text: '며느리'},{value:'RL007', text: '손자'},{value:'RL008', text: '손녀'},{value:'RL009' , text:'기타'},],
      //emerRelationArr: [{value:'TPE001', text: '119번호'},{value:'TPE002', text: '센터번호'},{value:'TPE003', text: '중앙모니터링센터'},{value:'TPE004', text: 'IP-PBX화재'},{value:'TPE005', text: 'IP-PBX응급'}],
      emerRelationArr: [{value:'TPE001', text: '119번호'},{value:'TPE002', text: '센터번호'},{value:'TPE004', text: 'IP-PBX화재'},{value:'TPE005', text: 'IP-PBX응급'}],
      menu5Data: null,
      emData:[], emorgId:null, selectedEm:null, emdisable:false,
      liData:[], liorgId:null, selectedLi:null, lidisable:false,
      selectchangeEm:null, selectchangeEmdisable:false,
      selectchangeLi:null, selectchangeLidisable:false,
      selectedIndex:0, TabletsData:null,
      updateData:'', changeData:'', changeRegSn:'',
    }
  },
  components: {
    // CEmPerson,
    // CVisitLog,
    // CCollectInfo,
    // CFamily,
    // CSocilaWork,
    // CEmSignal,
    // CCallHistory,
    // CConnectDevice,
    // CCycleSetting,
    HeaderComp,
    tap1,
    tap2,
    tap3,
    tap4,
    tap5,
    menu1,
    menu2,
    menu3,
    menu4,
    menu5,
  },
  methods: {
    getFromMenuData(data) {
      let changeEmNm=''
      let changeLiNm=''
      if(data.length !== 1){
        if(this.menutoggle===2){  // 응급요원 등록
          this.popCheck2 = true
        }else if(this.menutoggle===4){  // 생활관리사 등록
          this.popCheck4 = true
        }
        
      }else{
        if(this.menutoggle===2){  // 응급요원 수정
          if(data[0].managerId === '' || data[0].managerId === null || data[0].managerId === undefined){
            this.emdisable = false
            this.managerName = data[0].relationNm
            this.managerPhone = data[0].relationPhone
            this.managerId = data[0].managerId
          }else{
            this.emdisable = true
            changeEmNm = this.emData.filter(cd=>{
            return cd.label === data[0].relationNm
          })
            this.selectedEm = changeEmNm[0].value
            this.managerName = data[0].relationNm
            this.managerPhone = data[0].relationPhone
            this.managerId = data[0].managerId
          }
          this.changeRegSn = data[0].regSn
          this.popCheck2_2 = true
        }else if(this.menutoggle===4){  // 생활관리사 수정
          if(data[0].managerId === '' || data[0].managerId === null || data[0].managerId === undefined){
            this.lidisable = false
            this.managerName = data[0].relationNm
            this.managerPhone = data[0].relationPhone
            this.managerId = data[0].managerId
          }else{
            this.lidisable = true
            changeLiNm = this.liData.filter(cd=>{
            return cd.label === data[0].relationNm
          })
            this.selectedLi = changeLiNm[0].value
            this.managerName = data[0].relationNm
            this.managerPhone = data[0].relationPhone
            this.managerId = data[0].managerId
          }
          this.changeRegSn = data[0].regSn
          this.popCheck4_2 = true
        }
      }
      if(this.menutoggle===5){this.menu5Data = data;} 
      } ,
    openModal5(data) {this.popCheck5 = data},
    openModal4(data) {/*console.log("modal4open");this.popCheck4 = data*/},
    openModal3(data) {this.popCheck3 = data},
    openModal2(data){},
    openModalMsg(data) { this.msg = data},
    menu5Lending(data) {this.menu5Refresh = data},
    menu4Lending(data) {this.menu4Refresh = data},
    menu3Lending(data) {this.menu3Refresh = data},
    menu2Lending(data) {this.menu2Refresh = data},
    closeModal() {this.managerId=null; this.managerPhone = null; this.managerName = null; this.popCheck3 = false;this.popCheck2 = false;this.popCheck2_2 = false; this.popCheck4 = false; this.popCheck4_2= false; this.popCheck5 = false;  this.selectedEm=''; this.selectedLi='';
    this.emdisable=false; this.lidisable=false; this.managerRelationCd = null; this.managerRelationCd=''},

    // 대상자 정보
    async getRecipientInfo() {
      this.managerRelationCd = ''
      //this.$store.mutation.logout
      //let uri = this.$store.state.serverApi + "/recipients/" + sessionStorage.getItem("recipid");
      let uri = this.$store.state.serverApi + "/admin/recipients/" + this.recipientId
      
      await axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.bodyData = res.data.data
            this.emorgId = this.bodyData.orgId
            this.getEmuserInfo()
            this.getLiuserInfo()
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    // 응급요원 정보
    async getEmuserInfo(){
      this.selectedEm = ''
      let uri = this.$store.state.serverApi + "/admin/users?orgId=" + this.emorgId + "&userTypeCd=TPE005"
      await axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
          const emArr = [{label: '선택', value: '', value2:''}];
          // let tmpResult2 = [{label: '전체', value: ''}];
          this.emData=[];
          for(let i=0; i<res.data.data.length; i++) {
          emArr.push({
            label: res.data.data[i].userNm,
            value: res.data.data[i].userId,
            value2: res.data.data[i].mobileNumber,
          });
        } 
        this.emData = emArr
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    ifselectem(selectedIndex){
      if(selectedIndex === 0){
        this.emdisable = false
        this.managerName = ''
        this.managerId = ''
        this.managerPhone = ''
      }else{
        this.emdisable = true
        this.managerName = this.emData[selectedIndex].label
        this.managerId = this.emData[selectedIndex].value
        this.managerPhone = this.emData[selectedIndex].value2
      }
    },
    async getLiuserInfo(){
      this.selectedLi = ''
      let uri = this.$store.state.serverApi + "/admin/users?orgId=" + this.emorgId + "&userTypeCd=TPE004"
      await axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
          const liArr = [{label: '선택', value: '', value2:''}];
          // let tmpResult2 = [{label: '전체', value: ''}];
          this.liData=[];
          for(let i=0; i<res.data.data.length; i++) {
          liArr.push({
            label: res.data.data[i].userNm,
            value: res.data.data[i].userId,
            value2: res.data.data[i].mobileNumber,
          });
        } 
        this.liData = liArr
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    ifselectli(selectedIndex){
      if(selectedIndex === 0){
        this.lidisable = false
        this.managerName = ''
        this.managerId = ''
        this.managerPhone = ''
      }else{
        this.lidisable = true
        this.managerName = this.liData[selectedIndex].label
        this.managerId = this.liData[selectedIndex].value
        this.managerPhone = this.liData[selectedIndex].value2
      }
      
      
    },
    tap(value){
      switch (value){
          case 1 : this.taptoggle=1 ;break;
          case 2 : this.taptoggle=2 ;break;
          case 3 : this.taptoggle=3 ;break;
          case 4 : this.taptoggle=4 ;break;
          case 5 : this.taptoggle=5 ;break;
      }
    },
    menu(value){
      switch (value){
          case 1 : this.menutoggle=1 ;break;
          case 2 : this.menutoggle=2 ;break;
          case 3 : this.menutoggle=3 ;break;
          case 4 : this.menutoggle=4 ;break;
          case 5 : this.menutoggle=5 ;break;
      }
    },
    
    makeAge(birthDay){
      let tmp1 = this.$moment(birthDay).format('YYYY')
      let tmp2 = this.$moment()
      return tmp2.diff(tmp1, 'years');
    },
    makeMapData(){
        let addr = ''
        if(!this.bodyData){
          console.log("지도 오류 주소코딩중...")
          addr =  '경기도 과천시 별양로 85(별양동, 주공아파트)'
        }else {
          addr = this.bodyData.addr
        }
        const container = document.getElementById("map");
        const mapOptions = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 5
        }
        let map = new kakao.maps.Map(container, mapOptions)
        let geocoder =  new daum.maps.services.Geocoder();
        geocoder.addressSearch(addr, (result, status)=>{
          if(status === kakao.maps.services.Status.OK){
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            let marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });
            // let infowindow = new kakao.maps.InfoWindow({
            //     content: `'<div style="width:150px;text-align:center;padding:6px 0;">이름 입력</div>'`
            // });
            // infowindow.open(map, marker);
            map.setCenter(coords);
          }
          else
            console.log("fail")
        })
    },
    changeRecipientPhoneno(phone){
      if(phone){
        let changeNumber = phone.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        return changeNumber
      }else{
        return ''
      }
    
    },
    insertManager(){
      // /recipients/{recipientId}/phoneNumbers
      
      let uri = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/save`
      if(this.managerName === null || this.managerName === undefined || this.managerName === ''){
        alert("이름을 작성하여 주세요.")
        return false
      }else if(this.managerPhone === null || this.managerPhone === undefined || this.managerPhone === ''){
        alert("휴대폰번호를 작성하여 주세요.")
        return false
      }else if(this.managerRelationCd === null || this.managerRelationCd === undefined || this.managerRelationCd === ''){
        alert("관계를 선택하여 주세요.")
        return false
      }
      this.managerRelationNm = this.relationArr.filter(cd=>{
       return cd.value === this.managerRelationCd
      })[0].text
      
      if(this.managerPhone.length<3){ alert("전화번호는 세자리 이상을 입력해 주세요"); return false;}
      if(this.managerPhone.length>11){ alert("전화번호는 최대 11자리까지 입력 가능합니다."); return false;}
      let data = {
        recipientId: this.recipientId,
        relationNm: this.managerName,
        relationPhone: this.managerPhone,
        relationCd: this.managerRelationCd, 
        relationCdNm: this.managerRelationNm,
        typeCd: "TPE008"
      }
      axios.post(uri,data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.insertData = res.data.data
            this.$refs.menu3.sendMenu3Lending();
            this.popCheck3 = false
            
            alert("성공적으로 등록되었습니다.")
            this.managerPhone = null; this.managerName = null; this.managerRelationCd = '';
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
          
    },
    insertEmergencyManager(){
      // /recipients/{recipientId}/phoneNumbers
      if(this.managerName === '' || this.managerName === null || this.managerName === undefined){
        alert("응급요원명을 작성하여 주세요")
        return false
      }else if(this.managerPhone === '' || this.managerPhone === null || this.managerPhone === undefined){
        alert("휴대폰번호를 작성하여 주세요")
        return false  
      }

      let uri = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/save`
      if(this.managerPhone.length<3){ alert("전화번호는 세자리 이상을 입력해 주세요"); return false;}
      let data = {
        recipientId: this.recipientId,
        relationNm: this.managerName,
        relationPhone: this.managerPhone,
        //relationCd: this.managerRelationCd, 
        //relationCdNm: this.managerRelationNm,
        managerId: this.managerId,
        typeCd: "TPE007"
      }

      axios.post(uri,data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.insertData = res.data.data
            this.$refs.menu2.sendMenu2Lending();
            this.popCheck2 = false
            
            alert("성공적으로 등록되었습니다.")
            this.managerPhone = null; this.managerName = null; this.managerId = null; this.selectedEm = ''; this.emdisable=false;
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    changeEmergencyManager(){
      if(this.managerName === '' || this.managerName === null || this.managerName === undefined){
        alert("응급요원명을 작성하여 주세요")
        return false
      }else if(this.managerPhone === '' || this.managerPhone === null || this.managerPhone === undefined){
        alert("휴대폰번호를 작성하여 주세요")
        return false  
      }
      if(this.selectedEm === '' || this.selectedEm === null | this.selectedEm === undefined){
        this.managerId = ''
      }
      let data = {
        recipientId: this.recipientId,
        relationNm: this.managerName,
        relationPhone: this.managerPhone,
        //relationCd: this.managerRelationCd, 
        //relationCdNm: this.managerRelationNm,
        managerId: this.managerId,
        typeCd: "TPE007"
      }
      const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/${this.changeRegSn}/update`
        axios.post(url,data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
        this.$refs.menu2.sendMenu2Lending();
        this.popCheck2_2 = false
        alert("성공적으로 수정되었습니다")
        this.managerPhone = null; this.managerName = null; this.managerId = null; this.selectedEm = ''; this.emdisable=false;
        }).catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
        });
    },
    insertCareManager(){
      if(this.managerName === '' || this.managerName === null || this.managerName === undefined){
        alert("생활관리사명을 작성하여 주세요")
        return false
      }else if(this.managerPhone === '' || this.managerPhone === null || this.managerPhone === undefined){
        alert("휴대폰번호를 작성하여 주세요")
        return false  
      }
      // /recipients/{recipientId}/phoneNumbers
      let uri = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/save`
      if(this.managerPhone.length<3){ alert("전화번호는 세자리 이상을 입력해 주세요"); return false;}
      let data = {
        recipientId: this.recipientId,
        relationNm: this.managerName,
        relationPhone: this.managerPhone,
        relationCd: this.managerRelationCd, 
        relationCdNm: this.managerRelationNm,
        managerId: this.managerId,
        typeCd: "TPE006"
      }
      axios.post(uri,data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.insertData = res.data.data
            this.$refs.menu4.sendMenu4Lending();
            this.popCheck4 = false
            
            alert("성공적으로 등록되었습니다.")
            this.managerPhone = null; this.managerName = null; this.managerId = null; this.selectedLi = ''; this.lidisable=false;
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    changeCareManager(){
      if(this.managerName === '' || this.managerName === null || this.managerName === undefined){
        alert("생활관리사명을 작성하여 주세요")
        return false
      }else if(this.managerPhone === '' || this.managerPhone === null || this.managerPhone === undefined){
        alert("휴대폰번호를 작성하여 주세요")
        return false  
      }
      if(this.selectedLi === '' || this.selectedLi === null | this.selectedLi === undefined){
        this.managerId = ''
      }
      let data = {
        recipientId: this.recipientId,
        relationNm: this.managerName,
        relationPhone: this.managerPhone,
        //relationCd: this.managerRelationCd, 
        //relationCdNm: this.managerRelationNm,
        managerId: this.managerId,
        typeCd: "TPE006"
      }
      const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/${this.changeRegSn}/update`
        axios.post(url,data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
        this.$refs.menu4.sendMenu4Lending();
        this.popCheck4_2 = false
        alert("성공적으로 수정되었습니다")
        this.managerPhone = null; this.managerName = null; this.managerId = null; this.selectedLi = ''; this.lidisable=false;
        }).catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
        });
    },
    insertEmergency(){
      if(this.managerPhone === null || this.managerPhone === undefined || this.managerPhone === ''){
        alert("전화번호를 작성하여 주세요.")
        return false
      }
      // /recipients/{recipientId}/phoneNumbers
      //this.menu5Data
      let uri = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/save`
      if(this.managerPhone.length<3){ alert("전화번호는 세자리 이상을 입력해 주세요"); return false;}
      let data = {
        recipientId: this.recipientId,
        relationNm: this.emerCodeLabel(this.emerManagerRelationCd),
        relationPhone: this.managerPhone,
        relationCd: this.managerRelationCd, 
        relationCdNm: this.managerRelationNm,
        typeCd: this.emerManagerRelationCd
      }
      let chkData = []
      chkData = this.menu5Data.filter(cd=>{
          return cd.typeCd == this.emerManagerRelationCd
        })
      if(chkData.length === 0 ){
        axios.post(uri,data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.insertData = res.data.data
            this.$refs.menu5.sendMenu5Lending();
            this.popCheck5 = false
            
            alert("성공적으로 등록되었습니다.")
            this.managerPhone = null; this.managerName = null;
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      }else{
        alert("이미 등록된 전화번호 타입입니다.")
      }
      
      
          
    },
    emerCodeLabel(value){
    let result
      switch (value){
          case "TPE001" : result="119번호" ; break;
          case "TPE002" : result="센터번호" ;break;
          case "TPE003" : result="중앙모니터링센터" ;break;
          case "TPE004" : result="IP-PBX화재" ;break;
          case "TPE005" : result="IP-PBX응급" ;break;
      }
      return result
    },
  },
  created() {
    this.pending = false;
    this.recipientId = this.$route.params.recipientId
    this.getRecipientInfo();
    this.getEmuserInfo();
    this.getLiuserInfo();
    this.pending = true;
  },
  mounted(){
    
    const script = document.createElement("script");
    script.src="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=dafa9c5bd954ba036f344060208e1e83&libraries=services";
    script.addEventListener("load", ()=>{
      kakao.maps.load(this.makeMapData)
    })
    document.head.appendChild(script);
    
  },
  watch:{
    // managerPhone:function(){
    //   let tmp = this.managerPhone.charAt(this.managerPhone.length-1)
    //   let regex = /^[0-9]/g;

    //   if(!this.managerPhone&&!tmp.match(regex) ){alert("숫자만 입력 할 수 있습니다.") }
    //   return this.managerPhone = this.managerPhone.replace(/[^0-9]/g, '');
    // }
  }

}
</script>

<style scoped>
@import '../../assets/scss/common.css';
@import '../../assets/scss/sub.css';
#map{
  width : 720px;
  height : 400px;
}
</style>
