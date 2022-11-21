<template>
  <div class="wrap">
    <!--<HeaderComp></HeaderComp>-->
    <div class="container type-02">
      <div id="" class="popupLayer" v-if="writeCus === true">
        <div class="popup_wrap">
          <div class="title_wrap">
            <div class="title">사용자 등록</div>
            <button type="button" class="btn_close" @click="writeCus = false">닫기</button>
          </div>
          <div class="popup_cnt">
            <div class="input_wrap type-02">
              <div class="input_area">
                <p class="input_tit">아래의 항목을 작성하여 주세요.(* 필수항목)</p>
              </div>
            </div>
            <div class="input_wrap">
              <div class="input_area">
                <p class="input_tit"> 사용자ID *</p>
                <div class="add_btn_input">
                  <input type="text"  v-model="selectedUpdateUserId"/>
                  <button type="button" class="input_btn" @click="checkId()">ID 중복 체크</button>
                </div>
              </div>
              <div class="input_area">
                <p class="input_tit">이름 *</p>
                <input type="text" value="" v-model="selectedUpdateUserNm">
              </div>
            </div>
            <div class="input_wrap">
              <div class="input_area">
                <p class="input_tit">Password *</p>
                <input type="password" id="password" v-model="selectedUpdatePassword" />
              </div>
              <div class="input_area">
                <p class="input_tit">Password 확인 *</p>
                <input type="password" value="" v-model="selectedUpdatePasswordCheck" />
              </div>
            </div>
            <div class="input_wrap">
              <div class="input_area">
                <p class="input_tit">생년월일 *</p>
                <input type="text"  @keyup="getBirthdayMask(selectedUpdateBirthday)" value="" v-model="selectedUpdateBirthday" maxlength="10">
              </div>
              <div class="btn_area">
                <p class="input_tit">성별 *</p>
                <div class="toggle_btn">
                  <button type="button" @click="sextoggle(1)" :class="bodysex===1? 'btn on' : 'btn'">남</button>
                  <button type="button" @click="sextoggle(2)" :class="bodysex===2? 'btn on' : 'btn'">여</button>
                </div>
              </div>
            </div>
            <div class="input_wrap">
              <div class="input_area">
                <p class="input_tit">이메일 *</p>
                <div class="add_btn_input">
                  <input type="text" value="" v-model="selectedUpdateEmail">
                  <button type="button" class="input_btn" @click="checkEmail()">중복 체크</button>
                </div>
              </div>
              <div class="input_area">
                <p class="input_tit">휴대폰번호 *</p>
                <input type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"  v-model="selectedUpdateMobileNumber" maxlength="11" >
              </div>
            </div>
            <div class="input_wrap">
              <div class="input_area">
                <p class="input_tit">우편번호 *</p>
                <div class="add_btn_input">
                  <input type="text" value=""  v-model="selectedUpdateZipcode">
                  <button type="button" class="input_btn" @click="search">검색</button>
                </div>
              </div>
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
                <p class="input_tit">관리기관 *</p>
                <select v-model="selectedUpdateOrgItems">
                  <option v-for="(orgm, index) in orgmItems" :value="orgm.value" v-bind:key="index">{{orgm.label}}</option>
                </select>
              </div>
              <!-- <div class="input_area">
                <p class="input_tit">관리지역</p>
                <select v-model="selectedUpdateChargeRegion">
                  <option v-for="(charge, index) in chargeRegionItems" :value="charge.value" v-bind:key="index">{{charge.label}}</option>
                </select>
              </div> -->
            </div>
                       
            <!-- <div class="input_wrap col3"> -->
              <div class="input_wrap">
                <div class="input_area">
                  <p class="input_tit">사용자 구분 *</p>
                  <select v-model="selectedUpdateUserType">
                    <option v-for="(userType, index) in userTypeItems" :value="userType.value" v-bind:key="index">{{userType.label}}</option>
                  </select>
                </div>
                <div class="input_area">
                  <p class="input_tit">재직 상태 *</p>
                  <select v-model="selectedUpdateEmployStateCd">
                    <option v-for="(employ, index) in employStateItems" :value="employ.value" v-bind:key="index">{{employ.label}}</option>
                  </select>
                </div>
              </div>
              <!-- <div class="input_wrap col3"> -->
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">부서명</p>
                    <input type="text" value="" v-model="selectedUpdateDeptNm">
                  </div>
                  <div class="input_area">
                    <p class="input_tit">사무실 전화번호</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  value="" v-model="selectedUpdatePhoneNumber" maxlength="11">
                  </div>
                </div>
                <!-- <div class="input_wrap">
                    <div class="input_area">
                        <p class="input_tit">등록자 ID</p>
                        <select>
                          <option value=""></option>
                        </select>
                    </div>
                    <div class="input_area">
                        <p class="input_tit">등록자 일시</p>
                        <div class="date_warp">
                            <input type="date">
                        </div>
                    </div>
                </div> -->
              </div>
              <div class="popbtn_area">
                <button type="button" class="btn form2" @click="uploadData()">등록</button>
                <button type="button" class="btn" @click="writeCus = false">취소</button>
              </div>
            </div>
          </div>
          <div id="" class="popupLayer" v-if="detailCus === true">
            <div class="popup_wrap">
              <div class="title_wrap">
                  <div class="title">사용자 상세 정보</div>
                  <button type="button" class="btn_close" @click="detailCus = false">닫기</button>
              </div>
              <div class="popup_cnt">
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">사용자ID</p>
                    <div class="add_btn_input">
                      <input type="text" value="" v-model="selectedDetailUserId" disabled>
                      <!-- <button type="button" class="input_btn" @click="checkId()">ID 중복 체크</button> -->
                    </div>
                  </div>
                  <div class="input_area">
                    <p class="input_tit">이름</p>
                    <input type="text" value="" v-model="selectedDetailUserNm" disabled>
                  </div>
                  <!-- <div class="input_area">
                    <p class="input_tit">Password</p>
                    <input type="password" value="" v-model="selectedUpdatePassword">
                  </div> -->
                </div>
                <div class="input_wrap">
                  <!-- <div class="input_area">
                    <p class="input_tit">Password 확인</p>
                    <input type="password" value="">
                  </div> -->
                  
                </div>
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">생년월일</p>
                    <input type="text" value="" v-model="selectedDetailBirthday" disabled>
                  </div>
                  <div class="btn_area">
                    <p class="input_tit">성별</p>
                    <div class="toggle_btn">
                        <button type="button"  :class="DetailBodysex===1? 'btn on' : 'btn'">남</button>
                        <button type="button"  :class="DetailBodysex===2? 'btn on' : 'btn'">여</button>
                    </div>
                  </div>
                </div>
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">이메일</p>
                    <input type="text" value="" v-model="selectedDetailEmail" disabled>
                  </div>
                  <div class="input_area">
                    <p class="input_tit">휴대폰번호</p>
                    <input type="text"  value="" v-model="selectedDetailMobileNumber" disabled />
                  </div>
                </div>
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">우편번호</p>
                    <div class="add_btn_input">
                      <input type="text" value="" v-model="selectedDetailAddrNumber" disabled>
                      <!-- <button type="button" class="input_btn">검색</button> -->
                    </div>
                  </div>
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
                <!-- <div class="input_wrap">
                    <div class="input_area">
                        <p class="input_tit">시/도</p>
                        <input type="text" value="" v-model="selectedDetailSidoItems">
                    </div>
                    <div class="input_area">
                        <p class="input_tit">시/군/구</p>
                        <input type="text" value="" v-model="selectedDetailSggItems">
                    </div>
                </div> -->
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">관리기관</p>
                    <input type="text" value="" v-model="selectedDetailOrgItems" disabled>
                  </div>
                  <!-- <div class="input_area">
                      <p class="input_tit">관리지역</p>
                      <input type="text" value="" v-model="selectedDetailChargeRegion">
                  </div> -->
                </div>
                <!-- <div class="input_wrap col3"> -->
                  <div class="input_wrap">
                    <div class="input_area">
                      <p class="input_tit">사용자 구분</p>
                      <input type="text" value="" v-model="selectedDetailUserType" disabled>
                    </div>
                    <div class="input_area">
                      <p class="input_tit">재직 상태</p>
                      <input type="text" value="" v-model="selectedDetailEmployStateCd" disabled>
                    </div>
                  </div>
                  <!-- <div class="input_wrap col3"> -->
                    <div class="input_wrap">
                      <div class="input_area">
                        <p class="input_tit">부서명</p>
                        <input type="text" value="" v-model="selectedDetailDeptNm" disabled>
                      </div>
                      <div class="input_area">
                        <p class="input_tit">사무실 전화번호</p>
                        <input type="text" value="" v-model="selectedDetailPhoneNumber" disabled>
                      </div>
                    </div>
                      <div class="input_wrap">
                        <div class="input_area">
                          <p class="input_tit">사용자 상태</p>
                          <input type="text" value="" v-model="selectedDetailUseYn" disabled>
                        </div>
                      </div>
                      <div class="input_wrap">
                        <div class="input_area">
                          <p class="input_tit">등록자 ID</p>
                          <input type="text" value="" v-model="selectedDetailRegDUserNm" disabled>
                        </div>
                        <div class="input_area">
                          <p class="input_tit">등록 일자</p>
                          <div class="date_warp">
                              <input type="date" v-model="selectedDetailRegDtime" disabled>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="popbtn_area">
                      <button type="button" class="btn form2" @click="detailCus = false, changeFormat()">수정</button>
                      <button type="button" class="btn form3" @click="deleteCus = true">삭제</button>
                    </div>
            </div>
          </div>


            <div id="" class="popupLayer" v-if="changeCus === true">
                <div class="popup_wrap">
                    <div class="title_wrap">
                        <div class="title">사용자 정보 수정</div>
                        <button type="button" class="btn_close" @click="changeCus = false">닫기</button>
                    </div>
                    <div class="popup_cnt">
                      <div class="input_wrap type-02">
                        <div class="input_area">
                          <p class="input_tit">아래의 항목을 작성하여 주세요.(* 필수항목)</p>
                        </div>
                      </div>
                        <div class="input_wrap">
                          <!-- <div class="input_area">
                            <p class="input_tit">＊ 사용자ID</p>
                            <div class="add_btn_input">
                              <input type="text" value="" v-model="selectedChangeUserId">
                              <button type="button" class="input_btn" @click="checkId2()">ID 중복 체크</button>
                            </div>
                          </div> -->
                          <div class="input_area">
                            <p class="input_tit">이름 *</p>
                            <input type="text" value="" v-model="selectedChangeUserNm">
                          </div>
                          <div class="input_area">
                            <p class="input_tit">생년월일 *</p>
                            <input type="text" @keyup="getBirthdayMask(selectedChangeBirthday)" value="" v-model="selectedChangeBirthday" maxlength="10">
                          </div>
                          <!-- <div class="input_area">
                            <p class="input_tit">Password</p>
                            <input type="password" value="" v-model="selectedChangePassword">
                          </div> -->
                        </div>
                        <div class="input_wrap">
                          <!-- <div class="input_area">
                            <p class="input_tit">Password 확인</p>
                            <input type="password" value="">
                          </div> -->
                          
                        </div>
                        <div class="input_wrap">
                          <div class="input_area">
                            <p class="input_tit">이메일 *</p>
                            <div class="add_btn_input">
                            <input type="text" value="" v-model="selectedChangeEmail">
                            <button type="button" class="input_btn" @click="checkEmail2()">중복 체크</button>
                            </div>
                          </div>
                          <div class="btn_area">
                              <p class="input_tit">성별 *</p>
                              <div class="toggle_btn">
                                  <button type="button" @click="sextoggle(1)" :class="bodysex===1? 'btn on' : 'btn'">남</button>
                                  <button type="button" @click="sextoggle(2)" :class="bodysex===2? 'btn on' : 'btn'">여</button>
                              </div>
                          </div>
                        </div>
                        <div class="input_wrap">
                          
                          <div class="input_area">
                            <p class="input_tit">휴대폰번호 *</p>
                            <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  value="" v-model="selectedChangeMobileNumber" maxlength="11">
                          </div>
                        </div>
                        <div class="input_wrap">
                          <div class="input_area">
                            <p class="input_tit">우편번호 *</p>
                            <div class="add_btn_input">
                              <input type="text" value="" v-model="selectedChangeZipcode">
                              <button type="button" class="input_btn" @click="search">검색</button>
                            </div>
                          </div>
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
                                <p class="input_tit">관리기관 *</p>
                                <select v-model="selectedChangeOrgItems">
                                  <option v-for="(orgm, index) in orgmItems" :value="orgm.value" v-bind:key="index">{{orgm.label}}</option>
                                </select>
                            </div>
                            <!-- <div class="input_area">
                                <p class="input_tit">관리지역</p>
                                <select v-model="selectedChangeChargeRegion">
                                  <option v-for="(charge, index) in chargeRegionItems" :value="charge.value" v-bind:key="index">{{charge.label}}</option>
                                </select>
                            </div> -->
                        </div>
                        <!-- <div class="input_wrap col3"> -->
                          <div class="input_wrap">
                            <div class="input_area">
                                <p class="input_tit">사용자 구분 *</p>
                                <select v-model="selectedChangeUserType">
                                  <option v-for="(userType, index) in userTypeItems" :value="userType.value" v-bind:key="index">{{userType.label}}</option>
                                </select>
                            </div>
                            <div class="input_area">
                                <p class="input_tit">재직 상태 *</p>
                                <select v-model="selectedChangeEmployStateCd">
                                  <option v-for="(employ, index) in employStateItems" :value="employ.value" v-bind:key="index">{{employ.label}}</option>
                                </select>
                            </div>
                        </div>
                        <!-- <div class="input_wrap col3"> -->
                          <div class="input_wrap">
                            <div class="input_area">
                                <p class="input_tit">부서명</p>
                                <input type="text" value="" v-model="selectedChangeDeptNm">
                            </div>
                            <div class="input_area">
                                <p class="input_tit">사무실 전화번호</p>
                                <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  value="" v-model="selectedChangePhoneNumber" maxlength="11">
                            </div>
                        </div>
                        <div class="input_wrap">
                          <div class="input_area">
                              <p class="input_tit">사용자 상태 *</p>
                              <select v-model="selectedChangeUseYn">
                              <option v-for="(useyn, index) in useYnItems" :value="useyn.value" v-bind:key="index">{{useyn.label}}</option>
                            </select>
                          </div>
                        </div>
                        <!-- <div class="input_wrap">
                            <div class="input_area">
                                <p class="input_tit">등록자 ID</p>
                                <select>
                                  <option value=""></option>
                                </select>
                            </div>
                            <div class="input_area">
                                <p class="input_tit">등록자 일시</p>
                                <div class="date_warp">
                                    <input type="date">
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="popbtn_area">
                      <button type="button" class="btn form2" @click="changeCusSuccess()">수정</button>
                      <button type="button" class="btn" @click="changeCus = false, detailCus = true">취소</button>
                    </div>
                </div>
            </div>

            

            
            <div id="" class="popupLayer" v-if="deleteCus == true">
              <div class="popup_wrap type-02">
                <div class="title_wrap">
                  <div class="title">경고</div>
                  <button type="button" class="btn_close" @click="deleteCus = false">닫기</button>
                </div>
                <div class="popup_cnt">
                  <p class="alert_txt">선택하신 사용자를 삭제하시겠습니까?</p>
                </div>
                <div class="popbtn_area type-02">
                  <button type="button" class="btn form3" @click="deleteCusSuccess()">확인</button>
                  <button type="button" class="btn form2" @click="deleteCusFail()">취소</button>
                </div>
              </div>
            </div>
            <div class="list_title_wrap">
                <span>시스템관리</span>
                <i class="ico_nav"></i>
                <span class="on">사용자관리</span>
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
                            <th scope="row">사용자명</th>
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
                                    <input v-model="selectedUserNm" type="text" value="">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="btn_area">
                    <button type="button" class="btn" v-on:click="manageInquiry">조회</button>
                </div>
            </div>
            <div class="one_box box_style ">
                <div class="result_txt">
                    <p>사용자 정보</p>
                    <div class="btn_area">
                      <button type="button" style="margin-right:10px" class="btn" @click="createData()">등록</button>
                    </div>
                </div>
                <div class="list result">
                    <table>
                        <colgroup>
                                <col style="width:5%;">
                                <col style="width:5%;">
                                <col style="width:5%;">
                                <col style="width:8%;">
                                <col style="width:8%;">
                                <col style="width:16%;">
                                <col style="width:10%;">
                                <col style="width:12%;">
                                <col style="width:12%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">순번</th>
                                <th scope="col">사용자ID</th>
                                <th scope="col">사용자명</th>
                                <th scope="col">사용자구분</th>
                                <th scope="col">전화번호</th>
                                <th scope="col">핸드폰번호</th>
                                <th scope="col">이메일주소</th>
                                <th scope="col">현재상태</th>
                                <th scope="col">등록일시</th>
                                <th scope="col">로그인일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody">
                        <table>
                            <colgroup>
                                <col style="width:5%;">
                                <col style="width:5%;">
                                <col style="width:5%;">
                                <col style="width:8%;">
                                <col style="width:8%;">
                                <col style="width:16%;">
                                <col style="width:10%;">
                                <col style="width:12%;">
                                <col style="width:12%;">
                            </colgroup>
                            <tbody >
                                <tr v-for="(item,index) in listData" v-bind:key="index" @click="detailCuspopup(index)">
                                  <td>{{num(index+1)}}</td>
                                  <td>{{item.userId}}</td>
                                  <td>{{item.userNm}}</td>
                                  <td>{{item.userTypeNm}}</td>
                                  <td>{{changeRecipientPhoneno(item.phoneNumber)}}</td>
                                  <td>{{changeRecipientPhoneno(item.mobileNumber)}}</td>
                                  <td>{{item.email}}</td>
                                  <td>{{item.employStateNm}}</td>
                                  <td>{{item.regDtime}}</td>
                                  <td>{{item.loginDtime}}</td>
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
//import { cilAlignCenter } from '@coreui/icons';


export default {
    name: 'UserListComponent',
    components : {
        HeaderComp,
        pagination
    },
    watch:{
      selectedUpdateAddr:"onChangeSgg",
      selectedChangeAddr:"onChangeSgg",
      selectedUpdateSggItems:"onChangeOrg",
      selectedChangeSggItems:"onChangeOrg"
    },
    data(){
      return{
        sido:'', sidoCd:'', sgg:'', sggCd:'',
        sidoItems:[], sggItems:[], orgmItems:[], chargeRegionItems:[], noticItems:[], TorgItems:[], userItems:[], employStateItems:[], userTypeItems:[],
        useYnItems:[{value:'', label:'전체'},{value: 0, label:'미사용'},{value:1, label:'사용'}],
        orgSido:'', orgSgg:'', orgCode:'',
        selectedSidoItems:'', selectedSggItems:'', selectedOrgItems:'', selectedUserNm: '', userId:'', userId2:'', useremail:'', useremail2:'', 
        checkUserItems:[], checkUserItems2:[],checkEmailItems:[] ,checkEmailItems2:[], checkUserId:'ok', checkUserId2:'ok', checkemaildata:'ok', checkemaildata2:'ok',
        bodysex:1,
        
        //사용자 등록
        selectedUpdateUserNm:'', selectedUpdateBirthday:'', selectedUpdateMobileNumber:'', selectedUpdateSex:'',
        selectedUpdateEmail:'', selectedUpdateUserId:'', selectedUpdatePassword:'', selectedUpdateZipcode:'',
        selectedUpdateAddr:'', selectedUpdateDetailAddr:'', selectedUpdateSidoItems:'', selectedUpdateSggItems:'', 
        selectedUpdateOrgItems:'', selectedUpdateChargeRegion:'', selectedUpdateUserType:'', selectedUpdateDeptNm:'',
        selectedUpdatePhoneNumber:'', selectedUpdateRegDUserNm:'', selectedUpdateRegDtime:'', selectedUpdateEmployStateCd:'',
        selectedUpdateUseYn:1, selectedUpdatePasswordCheck:'',

        
        selectedDetailUserNm:'', selectedDetailBirthday:'', selectedDetailMobileNumber:'', selectedDetailSex:'',
        selectedDetailEmail:'', selectedDetailUserId:'', selectedDetailPassword:'', selectedDetailAddrNumber:'',
        selectedDetailAddr:'', selectedDetailDetailAddr:'', selectedDetailSidoItems:'', selectedDetailSggItems:'', 
        selectedDetailOrgItems:'', selectedDetailChargeRegion:'', selectedDetailUserType:'', selectedDetailDeptNm:'',
        selectedDetailPhoneNumber:'', selectedDetailRegDUserNm:'', selectedDetailRegDtime:'', selectedDetailEmployStateCd:'',
        selectedDetailUseYn:1, DetailBodysex:1, DetailChargeRegion:[], DetailChargeRegion2:[], DetailTypeCd:[],

        selectedChangeUserNm:'', selectedChangeBirthday:'', selectedChangeMobileNumber:'', selectedChangeSex:'',
        selectedChangeEmail:'', selectedChangeUserId:'', selectedChangePassword:'', selectedChangeZipcode:'',
        selectedChangeAddr:'', selectedChangeDetailAddr:'', selectedChangeSidoItems:'', selectedChangeSggItems:'', 
        selectedChangeOrgItems:'', selectedChangeChargeRegion:'', selectedChangeUserType:'', selectedChangeDeptNm:'',
        selectedChangePhoneNumber:'', selectedChangeRegDUserNm:'', selectedChangeRegDtime:'', selectedChangeEmployStateCd:'',
        selectedChangeUseYn:1, selectedChangePasswordCheck:'',
        

        selectedUserId:'',selectedphoneNumber:'',selectedmobileNumber:'',selectedEmail:'',selectedemployStateNm:'', selectedEmployStateCd:'',
        selectDetailsido:'',selectDetailSgg:'',selectDetailOrg:'',
        writeCus: false, changeCus: false, deleteCus: false, detailCus: false,
        saveChangeData: null,selectUserData: null,
        detailArr:[],
        check:'',
        birthdayHyphen:'', e_date: '',
        searchCheck1 : 1, searchCheck2 : 0,

        UpdateAddr:[], UpdateAddr1:'', UpdateAddr2:'', UpdateAddr3:'',
        ChangeAddr:[], ChangeAddr1:'', ChangeAddr2:'', ChangeAddr3:'',

        listData: [],
        total: '',
        page: 1,
        limit: 30,
        block: 10
      }
    },
    created(){
      this.e_date=moment().format('YYYY-MM-DD');
      this.getSidoData();
      this.getSggData();
      this.getOrgmData();
      this.getUserData();
      this.getEmployState();
      this.userTypeData();
    },
    methods:{
      pagingMethod(page) {
        this.listData = this.userItems.slice(
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
        this.selectedUpdateChargeRegion = ''
        this.sggItems=[];
        this.chargeRegionItems=[];
        this.sggItems.push({label: '전체', value: ''});
        this.chargeRegionItems.push({label:'전체', value:''});
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
          this.chargeRegionItems = [...tmpResult2,...tmpResult]
          this.autoUpdateSgg()
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
      this.selectedChangeOrgItems = ''
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
      getUserData() {
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
      let uri = this.$store.state.serverApi + "/admin/users?pageIndex=1&recordCountPerPage=1000"+"&orgId="+this.selectedOrgItems+"&sggCd="+addrCd+"&userNm="+this.selectedUserNm;
      axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(response => {
            this.userItems = response.data.data
            this.total = this.userItems.length
            this.page = 1
            this.pagingMethod(this.page)
        //     if(this.searchCheck1 === 1){
        //     this.searchCheck1 = 0
        // }
        // if(this.userItems.length !== 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     alert("성공적으로 조회 되었습니다.")
        //     this.searchCheck2 = 0
        // }else if(this.userItems.length === 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
        //     alert("조회 결과가 존재하지 않습니다.")
        //     this.searchCheck2 = 0
        // }
          })          
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      },
    getEmployState() {
      let uri = this.$store.state.serverApi + "/admin/codes?cmmnCdGroup=EMPLOY.STATECD";
      axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(response => {
          this.selectedemployStateNm = ''
          this.employStateItems.push({label: '전체', value: ''})
          for(let i=0; i<response.data.data.length; i++) {
            this.employStateItems.push({
              label: response.data.data[i].cmmnCdNm,
              value: response.data.data[i].cmmnCd,
            });
          } 
        })          
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      },
      onChangeSido(event){
      this.orgSido = event.target.value;
      this.getSggData()
      
    },
    onChangeSgg(event){
      let address = []
      if(typeof event === 'object'){
        this.sidoCd = event.target.value
      }else if(typeof event === 'string'){
      address = event.split(' ')
      let address1 = address[0]
      if(address1 === '서울'){
        address1 += '특별시'
      }else if(address1 === '부산' || address1 === '대구' || address1 === '인천' || address1 === '광주' || address1 === '대전' || address1 === '울산'){
        address1 += '광역시'
      }else if(address1 === '경기' || address1 === '강원'){
        address1 += '도'
      }else if(address1 === '충북'){
        address1 = '충청북도'
      }else if(address1 === '충남'){
        address1 = '충청남도'
      }else if(address1 === '전북'){
        address1 = '전라북도'
      }else if(address1 === '전남'){
        address1 = '전라남도'
      }else if(address1 === '경북'){
        address1 = '경상북도'
      }else if(address1 === '경남'){
        address1 = '경상남도'
      }  
      let addressSido = []
      addressSido = this.sidoItems.filter(cd=>{
        return cd.label === address1
      })
        this.sidoCd = addressSido[0].value
      }
      this.getSggData()
      this.sggCd = ''
      this.getOrgmData()
    },
    onChangeOrg(event) {
      if(typeof event === 'object'){
        this.sggCd = event.target.value
      }else if(typeof event === 'string'){
        this.sggCd = event
      }
      this.getOrgmData()
    },
    // 등록 시 등록 변수 초기화
    createData(){
      this.selectedUpdateUserNm = ''
      this.selectedUpdateBirthday = ''
      this.selectedUpdateMobileNumber = ''
      this.selectedUpdateSex = ''
      this.selectedUpdateEmail = ''
      this.selectedUpdateUserId = ''
      this.selectedUpdatePassword = ''
      this.selectedUpdatePasswordCheck = ''
      this.selectedUpdateZipcode = ''
      this.selectedUpdateAddr = ''
      this.selectedUpdateDetailAddr = ''
      this.selectedUpdateSidoItems = ''
      this.selectedUpdateSggItems = ''
      this.selectedUpdateOrgItems = ''
      this.selectedUpdateDetailOrg = ''
      this.selectedUpdateUserType = ''
      this.selectedUpdateDeptNm = ''
      this.selectedUpdatePhoneNumber = ''
      this.selectedUpdateRegDUserNm = ''
      this.selectedUpdateRegDtime = ''
      this.selectedUpdateEmployStateCd = ''
      this.checkUserId = 'None'
      this.checkemaildata = 'None'
      this.writeCus = true
    },
    // 사용자 등록 내용 부분
    async uploadData(){
      this.$store.state.userId = sessionStorage.getItem("userId")
      let num = this.selectedUpdatePassword.search(/[0-9]/g);
      let eng = this.selectedUpdatePassword.search(/[a-z]/ig);
      let spe = this.selectedUpdatePassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

      if(this.selectedUpdatePassword.length < 8){
        alert("비밀번호는 8자리 이상 입력하여 주세요")
        return false
      }else if(this.selectedUpdatePassword.search(/\s/) != -1){
        alert("비밀번호는 공백 없이 입력하여 주세요")
        return false
      }else if(num < 0 || eng < 0 || spe < 0){
        alert("비밀번호는 영문,숫자,특수문자를 혼합하여 주세요")
        return false
      }
      if(this.bodysex === 1){
        this.selectedUpdateSex = 'M'
      }else{
        this.selectedUpdateSex = 'F'
      }
      if(this.selectedUpdateUserId === ''){
        alert("사용자ID 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateUserNm === ''){
        alert("이름 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdatePassword === ''){
        alert("Password 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdatePasswordCheck === ''){
        alert("Password 확인 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateBirthday === ''){
        alert("생년월일 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateEmail === ''){
        alert("이메일 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateMobileNumber === ''){
        alert("휴대폰번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateSidoItems === '' && this.selectedUpdateUserType !== 'TPE001'){
        alert("시/도 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateSggItems === '' && this.selectedUpdateUserType !== 'TPE001'){
        alert("시/군/구 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateOrgItems === '' && this.selectedUpdateUserType !== 'TPE001'){
        alert("관기기관 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateZipcode === ''){
        alert("우편번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateAddr === ''){
        alert("주소 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateUserType === ''){
        alert("사용자 구분 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateEmployStateCd === ''){
        alert("재직 상태 항목을 작성하여 주세요")
        return false
      }
      if(this.checkUserId === 'None'){
        alert("아이디를 다시 확인하여 주세요")
        return false
      }
      if(this.checkemaildata === 'None'){
        alert("이메일을 다시 확인하여 주세요")
        return false
      }
      if(this.selectedUpdatePassword !== this.selectedUpdatePasswordCheck){
        alert("비밀번호가 다릅니다. 다시 확인하여 주세요")
        return false
      }
      // if(this.selectedUpdatePhoneNumber.length < 3){
      //   alert("전화번호는 세자리 이상을 입력해 주세요")
      //   return false;
      // }
      if(this.selectedUpdateMobileNumber.length < 3){
        alert("전화번호는 세자리 이상을 입력해 주세요")
        return false;
      }
      if(this.selectedUpdateBirthday.substring(0,4) < '1000' || this.selectedUpdateBirthday.substring(0,4) > this.e_date.substring(0,4) ||
      this.selectedUpdateBirthday.substring(5,7) > '12' || this.selectedUpdateBirthday.substring(5,7) === '00' ||
      this.selectedUpdateBirthday.substring(8,10) > '31' || this.selectedUpdateBirthday.substring(8,10) === '00' || this.selectedUpdateBirthday.length < 10){
        alert("생년월일을 정확히 입력하여 주세요")
        return false
      }
      //if(this.selectedUpdateBirthday)
      this.$store.state.userId = sessionStorage.getItem("userId")
      
      let data = {
        addr:this.selectedUpdateAddr,
        addrCd:this.selectedUpdateSggItems,
        addrDetail:this.selectedUpdateDetailAddr,
        birthday:this.selectedUpdateBirthday,
        chargeRegion:this.selectedUpdateSggItems,
        email:this.selectedUpdateEmail,
        employStateCd:this.selectedUpdateEmployStateCd,
        mobileNumber:this.selectedUpdateMobileNumber,
        orgId:this.selectedUpdateOrgItems,
        password:this.selectedUpdatePassword,
        phoneNumber:this.selectedUpdatePhoneNumber,
        sex:this.selectedUpdateSex,
        useYn:this.selectedUpdateUseYn,
        userId:this.selectedUpdateUserId,
        userNm:this.selectedUpdateUserNm,
        userTypeCd:this.selectedUpdateUserType,
        zipCode:this.selectedUpdateZipcode,
        regId:this.$store.state.userId,
        deptNm:this.selectedUpdateDeptNm,
      }
        let url = this.$store.state.serverApi+`/admin/users`
        await axios.post(url,data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
              let resData = res.data.data
              console.log(resData)
              if(resData){
                alert("성공적으로 등록되었습니다.")
                this.writeCus = false
                this.selectedUpdatePhoneNumber=''
                this.selectedUpdateMobileNumber=''
                this.getUserData()
              }
            })
            .catch(error => {
                console.log("fail to load")
              this.errorMessage = error.message;
              console.error("There was an error!", error);
            });
    },
    // 사용자 상세 정보
    async detailCuspopup(index){
      this.detailArr=this.userItems[index]
      this.selectUserData = this.userItems[index]
      let url =this.$store.state.serverApi + "/admin/address/sgg";
      await axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          for(let i=0; i<response.data.data.length; i++) {
            this.DetailChargeRegion2.push({
              label: response.data.data[i].sgg,
              value: response.data.data[i].sggCd,
            });
          } 
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      // let detailorg = this.detailArr.chargeRegion
      // console.log(detailorg)
      // this.DetailChargeRegion = this.DetailChargeRegion2.filter(cd=>{
      //   return cd.value === detailorg
      // })
      let detailtyppe = this.detailArr.userTypeCd
      this.DetailTypeCd = this.userTypeItems.filter(cd=>{
        return cd.value === detailtyppe
      })
      this.selectedDetailSidoItems = this.detailArr.sido
      this.selectedDetailSggItems = this.detailArr.sgg
      this.selectedDetailOrgItems = this.detailArr.orgNm
      this.selectedDetailUserNm = this.detailArr.userNm
      this.selectedDetailUserId = this.detailArr.userId
      this.selectedDetailPhoneNumber = this.detailArr.phoneNumber
      this.selectedDetailMobileNumber = this.changeRecipientPhoneno(this.detailArr.mobileNumber)
      this.selectedDetailEmail = this.detailArr.email
      this.selectedDetailEmployStateCd = this.detailArr.employStateNm
      this.selectedDetailBirthday = this.detailArr.birthday
      this.selectedDetailSex = this.detailArr.sex
      if(this.selectedDetailSex === 'M'){
        this.DetailBodysex = 1
      }else if(this.selectedDetailSex === 'F'){
        this.DetailBodysex = 2
      }
      this.selectedDetailAddrNumber = this.detailArr.zipCode
      this.selectedDetailAddr = this.detailArr.addr
      this.selectedDetailDetailAddr = this.detailArr.addrDetail
      // this.selectedDetailChargeRegion = this.DetailChargeRegion[0].label
      this.selectedDetailUserType = this.DetailTypeCd[0].label
      this.selectedDetailDeptNm = this.detailArr.deptNm
      this.selectedDetailRegDUserNm = this.detailArr.regId
      this.selectedDetailRegDtime = this.detailArr.regDtime.substring(0,10)
      this.selectedDetailUseYn=this.chnageUseYn(this.detailArr.useYn)

      this.detailCus = true
    },
    // 사용자 등록 시 ID 체크
    async checkId(){
      if(this.selectedUpdateUserId === ''){
        alert("아이디를 입력하여 주세요.")
        return false;
      }
      let url = this.$store.state.serverApi+`/admin/users`
      await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.checkUserItems = res.data.data
          })
          .catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });

          this.userId = this.checkUserItems.filter(cd=>{
            return cd.userId === this.selectedUpdateUserId
          })
          if(this.userId[0]){ 
            alert("이미 등록된 아이디 입니다.")
            return this.checkUserId = 'None'
          }else{
            alert("사용 가능한 아이디 입니다.")
            return this.checkUserId = 'ok'
          }
    },
    // 사용자 수정 시 ID 체크
    async checkId2(){
      if(this.selectedChangeUserId === ''){
        alert("아이디를 입력하여 주세요.")
        return false;
      }
      let url = this.$store.state.serverApi+`/admin/users`
      await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.checkUserItems2 = res.data.data
            console.log(this.checkUserItems2)
          })
          .catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
          this.userId2 = this.checkUserItems2.filter(cd=>{
            return cd.userId === this.selectedChangeUserId
          })
          if(this.userId2[0]){
            alert("이미 등록된 아이디 입니다.")
            return this.checkUserId2 = 'None'
          }else{
            alert("사용 가능한 아이디 입니다.")
            return this.checkUserId2 = 'ok'
          }
    },
    // 사용자 등록 시 email 체크
    async checkEmail(){
      if(this.selectedUpdateEmail === ''){
        alert("이메일을 입력하여 주세요.")
        return false
      }
      let url = this.$store.state.serverApi+`/admin/users`
      await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.checkEmailItems = res.data.data
          })
          .catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
          this.useremail = this.checkEmailItems.filter(cd=>{
            return cd.email === this.selectedUpdateEmail
          })
          if(this.useremail[0]){
            alert("이미 등록된 이메일 입니다.")
            return this.checkemaildata = 'None'
          }else{
            alert("사용 가능한 이메일 입니다.")
            return this.checkemaildata = 'ok'
          }
    },
    // 사용자 수정 시 email 체크
    async checkEmail2(){
      if(this.selectedChangeEmail === ''){
        alert("이메일을 입력하여 주세요.")
        return false;
      }
      let url = this.$store.state.serverApi+`/admin/users`
      await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.checkEmailItems2 = res.data.data
            console.log(this.checkEmailItems2)
          })
          .catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
          this.useremail2 = this.checkEmailItems2.filter(cd=>{
            return cd.email === this.selectedChangeEmail
          })
          if(this.useremail2[0]){
            alert("이미 등록된 이메일 입니다.")
            return this.checkemaildata2 = 'None'
          }else{
            alert("사용 가능한 이메일 입니다.")
            return this.checkemaildata2 = 'ok'
          }
    },
    // 사용자 정보 수정 시 상세 정보 값 띄우기 및 일부 초기화
    changeFormat(){
      this.selectedChangeUserId = this.selectUserData.userId
      this.selectedChangeUserNm = this.selectUserData.userNm
      this.selectedChangePassword = ''
      this.selectedChangeBirthday = this.selectUserData.birthday
      this.selectedChangeSex = this.selectUserData.sex
      if(this.selectedChangeSex === 'M'){
        this.bodysex = 1
      }else{
        this.bodysex =2
      }
      this.selectedChangeEmail = this.selectUserData.email
      this.selectedChangeMobileNumber = this.selectUserData.mobileNumber
      this.selectedChangeZipcode = this.selectUserData.zipCode
      this.selectedChangeAddr = this.selectUserData.addr
      this.selectedChangeDetailAddr = this.selectUserData.addrDetail
      this.selectedChangeSidoItems = ''
      this.selectedChangeSggItems = ''
      this.selectedChangeOrgItems = ''
      // this.selectedChangeChargeRegion = ''
      this.selectedChangeUserType = this.selectUserData.userTypeCd
      this.selectedChangeEmployStateCd = this.selectUserData.employStateCd
      this.selectedChangeDeptNm = this.selectUserData.deptNm
      this.selectedChangePhoneNumber = this.selectUserData.phoneNumber
      this.selectedChangeUseYn = this.selectUserData.useYn
      this.changeCus = true
    },
    // 사용자 정보 수정 확인
    changeCusSuccess(){
      this.$store.state.userId = sessionStorage.getItem("userId")
      // if(this.checkUserId2 === 'None'){
      //   alert("아이디를 다시 확인하여 주세요")
      //   return false
      // }
      if(this.checkemaildata2 === 'None'){
        alert("이메일을 다시 확인하여 주세요")
        return false
      }
      if(this.bodysex === 1){
        this.selectedChangeSex = 'M'
      }else{
        this.selectedChangeSex = 'F'
      }
      
      if(this.selectedChangeUserNm === ''){
        alert("이름 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeBirthday === ''){
        alert("생년월일 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeEmail === ''){
        alert("이메일 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeMobileNumber === ''){
        alert("휴대폰번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeSidoItems === '' && this.selectedChangeUserType !== 'TPE001'){
        alert("시/도 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeSggItems === '' && this.selectedChangeUserType !== 'TPE001'){
        alert("시/군/구 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeOrgItems === '' && this.selectedChangeUserType !== 'TPE001'){
        alert("관기기관 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeZipcode === ''){
        alert("우편번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeAddr === ''){
        alert("주소 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeUserType === ''){
        alert("사용자 구분 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeEmployStateCd === ''){
        alert("재직 상태 항목을 작성하여 주세요")
        return false
      }else if(this.selectedChangeUseYn === ''){
        alert("사용자 상태 항목을 작성하여 주세요")
        return false
      }
      

      if(this.selectedChangeMobileNumber.length < 3){
        alert("전화번호는 세자리 이상을 입력해 주세요")
        return false;
      }
      if(this.selectedChangeBirthday.substring(0,4) < '1000' || this.selectedChangeBirthday.substring(0,4) > this.e_date.substring(0,4) ||
      this.selectedChangeBirthday.substring(5,7) > '12' || this.selectedChangeBirthday.substring(5,7) === '00' ||
      this.selectedChangeBirthday.substring(8,10) > '31' || this.selectedChangeBirthday.substring(8,10) === '00' || this.selectedChangeBirthday.length < 10){
        alert("생년월일을 정확히 입력하여 주세요")
        return false
      }
      
      let data = {
        addr:this.selectedChangeAddr,
        addrCd:this.selectedChangeSggItems,
        addrDetail:this.selectedChangeDetailAddr,
        birthday:this.selectedChangeBirthday,
        chargeRegion:this.selectedChangeSggItems,
        email:this.selectedChangeEmail,
        employStateCd:this.selectedChangeEmployStateCd,
        mobileNumber:this.selectedChangeMobileNumber,
        orgId:this.selectedChangeOrgItems,
        phoneNumber:this.selectedChangePhoneNumber,
        sex:this.selectedChangeSex,
        useYn:this.selectedChangeUseYn,
        userId:this.selectedChangeUserId,
        userNm:this.selectedChangeUserNm,
        userTypeCd:this.selectedChangeUserType,
        zipCode:this.selectedChangeZipcode,
        regId:this.$store.state.userId,
        deptNm:this.selectedChangeDeptNm,
      }

        let url = this.$store.state.serverApi+`/admin/users/${this.selectedChangeUserId}`
        axios.post(url,data, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
              let resData = res.data.data
              console.log(resData)
              if(resData){
                alert("성공적으로 변경되었습니다")
                this.changeCus = false
                this.detailCus = false
                this.selectedChangePhoneNumber=''
                this.selectedChangeMobileNumber=''
                this.getUserData()
              }
            })
            .catch(error => {
                console.log("fail to load")
              this.errorMessage = error.message;
              console.error("There was an error!", error);
            });
    },
    // 사용자 정보 삭제
    async deleteCusSuccess(){
      let url = this.$store.state.serverApi+`/admin/users/${this.selectedDetailUserId}`
      await axios.delete(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
           .then(res => {
              alert("성공적으로 삭제되었습니다")
              this.deleteCus = false
              this.detailCus = false
              this.getUserData()
           })
           .catch(error => {
               console.log("fail to load")
             this.errorMessage = error.message;
             console.error("There was an error!", error);
           });
    },
    // 사용자 정보 삭제 취소
    deleteCusFail(){
      alert("취소되었습니다")
      this.deleteCus = false
    },
    // 휴대폰 - 입력
    changeRecipientPhoneno(phone){
        if(phone){
            let changeNumber = phone.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
            return changeNumber
        }else{
            return ''
        }
    },
    // 검색
    manageInquiry() {
      this.searchCheck2 = 1
        this.getUserData();
        
    },
    // 성별 체크
    sextoggle(value){
      switch(value){
        case 1 : this.bodysex=1; break;
        case 2 : this.bodysex=2; break;
      }
    },
    // 사용자 데이터 리스트 업
    userTypeData(){
      let url =this.$store.state.serverApi + "/admin/codes?cmmnCdGroup=USER.TYPECD";
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          const tmpArr = [{label: '전체', value: ''}];
          this.userTypeItems=[];
          for(let i=0; i<response.data.data.length; i++) {
            tmpArr.push({
              label: response.data.data[i].cmmnCdNm,
              value: response.data.data[i].cmmnCd,
            });
          } 
          this.userTypeItems = tmpArr
          console.log(this.userTypeItems)
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    // useYn 체크
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
    getMask(birthday){
      let res = ''
      // if(!birthday){
      //   return birthday
      // } 
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
      this.selectedChangeBirthday = res
    },
    // inputBirthday(check){
    //   console.log("this. ====")
    //   let birth = this.check.replace(/[^0-9]/g, '');
    //   let birthday = ''
    //   console.log(birth)
    //   if(birth.length<5){
    //     return birth
    //   }else if(birth.length < 7){
    //     birthday += birth.substring(0,4)
    //     birthday += '-'
    //     birthday += birth.substring(4)
    //   }else{
    //     birthday += birth.substring(0,4)
    //     birthday += '-'
    //     birthday += birth.substring(4,6)
    //     birthday += '-'
    //     birthday += birth.substring(6)
    //   }
    //   check.value = birthday
    // },
    // 주소 검색
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
        this.selectedChangeZipcode = data.zonecode;
        this.selectedUpdateAddr = data.roadAddress;
        this.selectedChangeAddr = data.roadAddress;

        this.selectedUpdateSidoItems = ''
        this.selectedChangeSidoItems = ''

        this.UpdateAddr = this.selectedUpdateAddr.split(' ')
        this.UpdateAddr1 = this.UpdateAddr[0]
        this.UpdateAddr2 = this.UpdateAddr[1]
        this.UpdateAddr3 = this.UpdateAddr[2]
        this.ChangeAddr = this.selectedChangeAddr.split(' ')
        this.ChangeAddr1 = this.ChangeAddr[0]
        this.ChangeAddr2 = this.ChangeAddr[1]
        this.ChangeAddr3 = this.ChangeAddr[2]
        if(this.UpdateAddr1 === '서울' || this.ChangeAddr1 === '서울'){
          this.UpdateAddr1 += '특별시'
          this.ChangeAddr1 += '특별시'
        }else if(this.UpdateAddr1 === '부산' || this.UpdateAddr1 === '대구' || this.UpdateAddr1 === '인천' || this.UpdateAddr1 === '광주' || this.UpdateAddr1 === '대전' || this.UpdateAddr1 === '울산'
         || this.ChangeAddr1 === '부산' || this.ChangeAddr1 === '대구' || this.ChangeAddr1 === '인천' || this.ChangeAddr1 === '광주' || this.ChangeAddr1 === '대전' || this.ChangeAddr1 === '울산'){
          this.UpdateAddr1 += '광역시'
          this.ChangeAddr1 += '광역시'
        }else if(this.UpdateAddr1 === '경기' || this.UpdateAddr1 === '강원' || this.ChangeAddr1 === '경기' || this.ChangeAddr1 === '강원'){
          this.UpdateAddr1 += '도'
          this.ChangeAddr1 += '도'
        }else if(this.UpdateAddr1 === '충북' || this.ChangeAddr1 === '충북'){
          this.UpdateAddr1 = '충청북도'
          this.ChangeAddr1 = '충청북도'
        }else if(this.UpdateAddr1 === '충남' || this.ChangeAddr1 === '충남'){
          this.UpdateAddr1 = '충청남도'
          this.ChangeAddr1 = '충청남도'
        }else if(this.UpdateAddr1 === '전북' || this.ChangeAddr1 === '전북'){
          this.UpdateAddr1 = '전라북도'
          this.ChangeAddr1 = '전라북도'
        }else if(this.UpdateAddr1 === '전남' || this.ChangeAddr1 === '전남'){
          this.UpdateAddr1 = '전라남도'
          this.ChangeAddr1 = '전라남도'
        }else if(this.UpdateAddr1 === '경북' || this.ChangeAddr1 === '경북'){
          this.UpdateAddr1 = '경상북도'
          this.ChangeAddr1 = '경상북도'
        }else if(this.UpdateAddr1 === '경남' || this.ChangeAddr1 === '경남'){
          this.UpdateAddr1 = '경상남도'
          this.ChangeAddr1 = '경상남도'
        }  
        let UpdateAutoSido = []
        let ChangeAutoSido = []
        UpdateAutoSido = this.sidoItems.filter(cd=>{
          return cd.label === this.UpdateAddr1
        })
        ChangeAutoSido = this.sidoItems.filter(cd=>{
          return cd.label === this.ChangeAddr1
        })
        this.selectedUpdateSidoItems = UpdateAutoSido[0].value
        this.selectedChangeSidoItems = ChangeAutoSido[0].value
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
    autoUpdateSgg(){
      let UpdateAutoSgg = []
      let ChangeAutoSgg = []
      if(this.UpdateAddr3.substr(-1) === '구'){
            this.UpdateAddr2 = this.UpdateAddr2+' '+this.UpdateAddr3
      }
      if(this.ChangeAddr3.substr(-1) === '구'){
            this.ChangeAddr2 = this.ChangeAddr2+' '+this.ChangeAddr3  
      }
      UpdateAutoSgg = this.sggItems.filter(cd=>{
        return cd.label === this.UpdateAddr2
      })
      ChangeAutoSgg = this.sggItems.filter(cd=>{
        return cd.label === this.ChangeAddr2
      })
      this.selectedUpdateSggItems = UpdateAutoSgg[0].value
      this.selectedChangeSggItems = ChangeAutoSgg[0].value
    },
    },
    mounted(){
    
    const script = document.createElement("script");
    script.src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    
    document.head.appendChild(script);
    
  },
  // watch:{
  //   selectedUpdatePhoneNumber:function(){
  //     let tmp = this.selectedUpdatePhoneNumber.charAt(this.selectedUpdatePhoneNumber.length-1)
  //     let regex = /^[0-9]/g;

  //     if(!this.selectedUpdatePhoneNumber&&!tmp.match(regex) )//{alert("숫자만 입력 할 수 있습니다.") }
  //     return this.selectedUpdatePhoneNumber = this.selectedUpdatePhoneNumber.replace(/[^0-9]/g, '');
  //   },
  //   selectedUpdateMobileNumber:function(){
  //     let tmp2 = this.selectedUpdateMobileNumber.charAt(this.selectedUpdateMobileNumber.length-1)
  //     let regex2 = /^[0-9]/g;

  //     if(!this.selectedUpdateMobileNumber&&!tmp2.match(regex2) )//{alert("숫자만 입력 할 수 있습니다.") }
  //     return this.selectedUpdateMobileNumber = this.selectedUpdateMobileNumber.replace(/[^0-9]/g, '');
  //   },
  //   selectedChangePhoneNumber:function(){
  //     let tmp3 = this.selectedChangePhoneNumber.charAt(this.selectedChangePhoneNumber.length-1)
  //     let regex3 = /^[0-9]/g;

  //     if(!this.selectedChangePhoneNumber&&!tmp3.match(regex3) )//{alert("숫자만 입력 할 수 있습니다.") }
  //     return this.selectedChangePhoneNumber = this.selectedChangePhoneNumber.replace(/[^0-9]/g, '');
  //   },
  //   selectedChangeMobileNumber:function(){
  //     let tmp4 = this.selectedChangeMobileNumber.charAt(this.selectedChangeMobileNumber.length-1)
  //     let regex4 = /^[0-9]/g;

  //     if(!this.selectedChangeMobileNumber&&!tmp4.match(regex4) )//{alert("숫자만 입력 할 수 있습니다.") }
  //     return this.selectedChangeMobileNumber = this.selectedChangeMobileNumber.replace(/[^0-9]/g, '');
  //   }
  // }
}
</script>
<style>
</style>