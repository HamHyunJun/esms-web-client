<template>
  <div>
    <!--<HeaderComp></HeaderComp>-->
    <div v-if="!this.pending" style="text-align: center;">
      <img src="../../assets/images/loading.png"  />
    </div>
          <!-- <div class="abtn"><CButton color="primary" @click="openUploadPopup" class="mr-1">엑셀 업로드</CButton></div>
          <div class="abtn"><CButton color="primary" @click="excelDownload" class="mr-1">엑셀 다운로드</CButton></div>
          <div class="abtn">
            <CButton color="primary" @click="addCustomer = true" class="mr-1">고객추가</CButton>
          </div> -->
          <!--여기-->
    <div v-else  class="container">
      <div id="" class="popupLayer" v-if="modalOpen" >
        <div class="popup_wrap">
            <div class="title_wrap">
                <div class="title">대상자 등록</div>
                <button type="button" class="btn_close" @click="closeModal">닫기</button>
            </div>
            <div class="popup_cnt">
              <div class="input_wrap type-02">
                <div class="input_area">
                  <p class="input_tit">아래의 항목을 작성하여 주세요.(* 필수항목)</p>
                </div>
              </div>
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">대상자명 *</p>
                    <div class="add_btn_input">
                      <input type="text" v-model="selectedUpdateRecipient">
                      <!-- <button type="button" class="input_btn">중복 확인</button> -->
                    </div>
                  </div>
                  <div class="input_area half">
                    <p class="input_tit">생년월일 *</p>
                    <input type="text" @keyup="getBirthdayMask(selectedUpdateBirthday)" v-model="selectedUpdateBirthday" maxlength="10">
                  </div>
                  <div class="btn_area half">
                      <p class="input_tit">성별 *</p>
                      <div class="toggle_btn">
                          <button type="button" :class="this.userGender ===1 ? 'btn on':'btn'" @click="selectGender(1)">남</button>
                          <button type="button" :class="this.userGender ===2 ? 'btn on':'btn'" @click="selectGender(2)">여</button>
                      </div>
                  </div>
                </div>
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">휴대폰번호 *</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="selectedUpdatePhoneNumber" maxlength="11">
                  </div>
                  <div class="input_area">
                        <p class="input_tit">사용자 구분 *</p>
                        <select v-model="selectedUpdateUserType">
                          <option v-for="(recipetype, index) in TypeItems2" :value="recipetype.value" v-bind:key="index">{{recipetype.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">우편번호 *</p>
                    <div class="add_btn_input">
                      <input type="text" value="" v-model="selectedUpdateZipCode">
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
                        <p class="input_tit">상세주소 *</p>
                        <input type="text" value="" v-model="selectedUpdateAddrDetail">
                    </div>
                </div>
                <div class="input_wrap">
                    <div class="input_area">
                        <p class="input_tit">시/도 *</p>
                        <select v-model="selectedUpdateSidoItems" @change="onChangeSgg($event)">
                          <option v-for="(sido, index) in sidoItems2" :value="sido.value" v-bind:key="index">{{sido.label}}</option>
                        </select>
                    </div>
                    <div class="input_area">
                        <p class="input_tit">시/군/구 *</p>
                        <select v-model="selectedUpdateSggItems" @change="onChangeOrg($event)">
                          <option v-for="(sgg, index) in sggItems2" :value="sgg.value" v-bind:key="index">{{sgg.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="input_wrap">  
                  <div class="input_area">
                      <p class="input_tit">관리기관 *</p>
                        <select v-model="selectedUpdateOrgItems">
                          <option v-for="(orgm, index) in orgmItems2" :value="orgm.value" v-bind:key="index">{{orgm.label}}</option>
                        </select>
                  </div>
                </div>
            </div>
            <div class="popbtn_area">
              <button type="button" class="btn form2" @click="regUser()">등록</button>
              <button type="button" class="btn" @click="closeModal">취 소</button>
            </div>
        </div>
      </div>
      <div id="" class="popupLayer" v-if="changeOpen === true" >
        <div class="popup_wrap">
            <div class="title_wrap">
                <div class="title">대상자 수정</div>
                <button type="button" class="btn_close" @click="changeOpen = false">닫기</button>
            </div>
            <div class="popup_cnt">
              <div class="input_wrap type-02">
                <div class="input_area">
                  <p class="input_tit">아래의 항목을 작성하여 주세요.(* 필수항목)</p>
                </div>
              </div>
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">대상자명 *</p>
                    <div class="add_btn_input">
                      <input type="text" v-model="selectChangeRecipient">
                      <!-- <button type="button" class="input_btn">중복 확인</button> -->
                    </div>
                  </div>
                  <div class="input_area half">
                    <p class="input_tit">생년월일 *</p>
                    <input type="text" @keyup="getBirthdayMask(selectChangeBirthday)" v-model="selectChangeBirthday" maxlength="10">
                  </div>
                  <div class="btn_area half">
                      <p class="input_tit">성별 *</p>
                      <div class="toggle_btn">
                          <button type="button" :class="this.userGender ===1 ? 'btn on':'btn'" @click="selectGender(1)">남</button>
                          <button type="button" :class="this.userGender ===2 ? 'btn on':'btn'" @click="selectGender(2)">여</button>
                      </div>
                  </div>
                </div>
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">우편번호 *</p>
                    <div class="add_btn_input">
                      <input type="text" value="" v-model="selectChangeZipCode" disabled>
                      <button type="button" class="input_btn" @click="search" disabled>검색</button>
                    </div>
                  </div>
                  <div class="input_area">
                    <p class="input_tit">주소 *</p>
                    <input type="text" value="" v-model="selectChangeAddr" disabled>
                  </div>
                </div>
                <div class="input_wrap type-02">
                    <div class="input_area" >
                        <p class="input_tit">상세주소 *</p>
                        <input type="text" value="" v-model="selectChangeAddrDetail">
                    </div>
                </div>
                <div class="input_wrap">
                  <div class="input_area">
                    <p class="input_tit">휴대폰번호 *</p>
                    <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  v-model="selectChangePhoneNumber" maxlength="11">
                  </div>
                  <div class="input_area">
                        <p class="input_tit">사용자 구분 *</p>
                        <select v-model="selectChangeRecipeType">
                          <option v-for="(recipetype, index) in TypeItems2" :value="recipetype.value" v-bind:key="index">{{recipetype.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="input_wrap">
                    <div class="input_area">
                        <p class="input_tit">시/도 *</p>
                        <input type="text" v-model="selectChangeSido" disabled>
                    </div>
                    <div class="input_area">
                        <p class="input_tit">시/군/구 *</p>
                        <input type="text" v-model="selectChangeSgg" disabled>
                    </div>
                </div>
                <div class="input_wrap">  
                  <div class="input_area">
                      <p class="input_tit">관리기관 *</p>
                      <input type="text" v-model="selectChangeOrg" disabled>
                  </div>
                  <div class="input_area">
                      <p class="input_tit">상태 구분</p>
                        <select v-model="selectChangeState">
                          <option v-for="(state, index) in statusItems2" :value="state.value" v-bind:key="index">{{state.label}}</option>
                        </select>
                  </div>
                </div>
                <!-- 대상자 정보 수정 시 필요 -->
                <!-- <div class="input_wrap">
                    <div class="input_area">
                        <p class="input_tit">시/도</p>
                        <select v-model="selectChangeSido" @change="onChangeSgg($event)">
                          <option v-for="(sido, index) in sidoItems2" :value="sido.value" v-bind:key="index">{{sido.label}}</option>
                        </select>
                    </div>
                    <div class="input_area">
                        <p class="input_tit">시/군/구</p>
                        <select v-model="selectChangeSgg" @change="onChangeOrg($event)">
                          <option v-for="(sgg, index) in sggItems2" :value="sgg.value" v-bind:key="index">{{sgg.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="input_wrap">  
                  <div class="input_area">
                      <p class="input_tit">관리기관</p>
                        <select v-model="selectChangeOrg">
                          <option v-for="(orgm, index) in orgmItems2" :value="orgm.value" v-bind:key="index">{{orgm.label}}</option>
                        </select>
                  </div>
                  <div class="input_area">
                      <p class="input_tit">상태 구분</p>
                        <select v-model="selectChangeState">
                          <option v-for="(state, index) in statusItems2" :value="state.value" v-bind:key="index">{{state.label}}</option>
                        </select>
                  </div>
                </div> -->
            </div>
            <div class="popbtn_area">
              <button type="button" class="btn form2" @click="changeUser()">수정</button>
              <button type="button" class="btn" @click="changeOpen = false">취 소</button>
            </div>
        </div>
      </div>
      <div class="list_title_wrap">
        <span>대상자 관리</span>
        <i class="ico_nav"></i>
        <span class="on">대상자조회</span>
      </div>
      <div class="box_search_wrap add_btn box_style" @keypress.enter='manageInquiry()'>
        <div class="table_wrap">
            <table>
                <colgroup>
                    <col style="width:20%">
                    <col style="width:20%">
                    <col style="width:20%">
                    <col style="width:8%">
                    <col style="width:15%">
                    <col style="width:15%">
                    <col style="width:15%">
                    <col style="width:20%">
                    <col style="width:auto;">
                </colgroup>
                <thead>
                    <th scope="row">시/도</th>
                    <th scope="row">시/군/구</th>
                    <th scope="row">관리기관</th>
                    <th scope="row">성별</th>
                    <th scope="row">구분</th>
                    <th scope="row">바이오센서</th>
                    <th scope="row">상태</th>
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
                        <select v-model="selectedUserSex">
                          <option v-for="(sex, index) in sexItems" :value="sex.value" v-bind:key="index">{{sex.label}}</option>
                        </select>
                      </td>
                      <td>
                        <select v-model="selectedUserType">
                          <option v-for="(type, index) in TypeItems" :value="type.value" v-bind:key="index">{{type.label}}</option>
                        </select>
                      </td>
                      <td>
                        <select v-model="selectedRadorSensorYn">
                          <option v-for="(rador, index) in radorSensorItems" :value="rador.value" v-bind:key="index">{{rador.label}}</option>
                        </select>
                      </td>
                      <td>
                        <select v-model="selectedUserState">
                          <option v-for="(state, index) in statusItems" :value="state.value" v-bind:key="index">{{state.label}}</option>
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
              <button type="button" style="margin-right:10px" class="btn" @click="changeData()">수정</button>
              <button type="button" style="margin-right:10px" class="btn" @click="createData()">등록</button>
            </div>
        </div>
        <div class="list result">
            <table>
                <colgroup>
                    <col style="width:3%;">
                    <col style="width:5%;">
                    <col style="width:8%;">
                    <col style="width:4%;">
                    <col style="width:4%;">
                    <col style="width:8%;"><!--전번-->
                    <col style="width:6%;">
                    <col style="width:6%;">
                    <col style="width:6%;">
                    <col style="width:auto;">
                    <col style="width:8%;">
                    <col style="width:6%;">
                    <col style="width:6%;">
                    <col style="width:6%;"><!--등록시간-->
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">선택</th>
                        <th scope="col">대상자명<a href="#"><img @click="sortList(1)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">생년월일<a href="#"><img @click="sortList(3)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">나이<a href="#"><img @click="sortList(4)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">성별<a href="#"><img @click="sortList(5)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">전화번호<a href="#"><img @click="sortList(6)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">구분<a href="#"><img @click="sortList(7)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">바이오센서<a href="#"><img @click="sortList(8)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">상태<a href="#"><img @click="sortList(9)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">주소<a href="#"><img @click="sortList(10)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">관리기관<a href="#"><img @click="sortList(11)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">생활관리사<a href="#"><img @click="sortList(12)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">설치일시<a href="#"><img @click="sortList(13)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                        <th scope="col">등록일자<a href="#"><img @click="sortList(14)" src = "@/assets/images/sortArrow.png" style="width: 18px; height: 50%"/></a></th>
                    </tr>
                </thead>
            </table>
            <div class="tbody">
                <table>
                    <colgroup>
                        <col style="width:3%;">
                        <col style="width:5%;">
                        <col style="width:8%;">
                        <col style="width:4%;">
                        <col style="width:4%;">
                        <col style="width:8%;"><!--전번-->
                        <col style="width:6%;">
                        <col style="width:6%;">
                        <col style="width:6%;">
                        <col style="width:auto;">
                        <col style="width:8%;">
                        <col style="width:6%;">
                        <col style="width:6%;">
                        <col style="width:6%;"><!--등록시간-->
                    </colgroup>
                    <tbody>
                        <tr v-for="(item,index) in recipientItems" v-bind:key="index" >
                            <td>
                              <div class="chk_area radio">
                                <input type="radio" name="saveChangeData" :id="`radio1_${index}`" v-model="saveChangeData" :value="index">
                                <label :for="`radio1_${index}`" class="chk"><i class="ico_chk"></i></label>
                              </div>
                            </td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{item.recipientNm}}</a></td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{item.birthday}}</a></td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{makeAge(item.birthday)}}</a></td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{item.sex==="M"?'남':'여'}}</a></td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{changeRecipientPhoneno(item.recipientPhoneno)}}</a></td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{item.typeNm}}</a></td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{item.radorSensorYn==="Y"?'사용':'미사용'}}</a></td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{item.stateNm}}</a></td>
                            <td style="text-align: left;" v-if="item.addr.length < 55"><a href="#" style="margin-right:10px;" @click="goToDetailView(item.recipientId)">{{item.addr}}</a></td>
                            <td style="text-align: left;" v-else><a href="#" style="margin-right:10px;" @click="goToDetailView(item.recipientId)">{{item.addr.substring(0,55)+"..."}}</a></td>
                            <td style="text-align: left;"><a href="#" @click="goToDetailView(item.recipientId)">{{item.orgNm}}</a></td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{item.managerNm}}</a></td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{!item.installDtime? item.updDtime : item.installDtime}}</a></td>
                            <td><a href="#" @click="goToDetailView(item.recipientId)">{{$moment(item.regDtime).format('YYYY-MM-DD')}}</a></td>
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
    <!--<CRow>
      <CCol>
        <CCard>
          <CForm class="opt_select">
            <CSelect
                class="paddingSel"
                style="width: 300px"
                label="기관관리"
                :options="orgmItems"
                @change="onChangeOrg($event)"
                :value.sync="modelOrg"
            />
            <CSelect
                class="paddingSel"
                style="width: 140px"
                label="구분"
                :options="partItems"
                @change="onChangePart($event)"
                :value.sync="modelPart"
            />
            <CSelect
                class="paddingSel"
                style="width: 150px"
                label="상태"
                :options="statusItems"
                @change="onChangeStatus($event)"
                :value.sync="modelStatus"
            />
            <CInput
                type="text"
                style="width: 200px"
                class="paddingSel"
                label="이름"
                v-model="modelName"
            />
            <CButton block color="primary" class="searchBtn" v-on:click="manageInquiry">검색</CButton>
            <CButton block variant="outline" color="primary" class="initBtn"  v-on:click="initSet">초기화</CButton>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CCard>
          CCardHeader class="header-del">
            <slot name="header">
              <strong style="color:#5d66ff;">{{caption}}</strong>
              <div class="pbtn">해제</div>
            </slot>
          </CCardHeader
          <CCardBody>
            <CDataTable
                class="mb-0 table-clear thBorder tdBorder thText"
                hover
                :items="recipientItems"
                :fields="recipientFields"
                head-color="light"
                sorting
            >
              <td slot="detail" style="text-align: center;width: 90px;" slot-scope="{item}">
                <CButton color="info" variant="outline" style="padding: 0.15rem 0.55rem" v-on:click="detailCustomerView(item.recipientId, item.orgNm)">상세</CButton>
              </td>
              <td slot="delete" style="text-align: center;width: 90px;" slot-scope="{item}">
                <CButton color="info" variant="outline" style="padding: 0.15rem 0.55rem" v-on:click="detailCustomerView(item.recipientId, item.orgNm)">해제</CButton>
              </td>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CModal
        class="addCustomer"
        title="고객추가"
        :show.sync="addCustomer"
    >
      <CContainer>
        <CCard class="cardModal" >
          <CCardBody class="cbody">
            <CRow>
              <CCol md="3">
              </CCol>
              <CCol md="9">
                <CRow>
                  <CCol>이름</CCol>
                  <CCol>생년월일</CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CInput type="text" v-model="cName" style="width: 130px" />
                  </CCol>
                  <CCol>
                    <CInput type="date" v-model="cBirthday" style="width: 190px" />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="3">
              </CCol>
              <CCol md="9">
                <CRow>
                  <CCol>휴대폰번호</CCol>
                  <CCol>성별</CCol>
                  <CCol>사회복지사</CCol>
                </CRow>
                <CRow>
                  <CCol><CInput type="text" v-model="cPhone" style="width: 130px" /></CCol>
                  <CCol>
                    <CSelect
                        :options="sexItems"
                        v-model="cSex"
                        @change="onChangeSex($event)"
                        style="width: 105px"
                    /></CCol>
                  <CCol><CInput type="text" v-model="cSocial" style="width: 110px" /></CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="3">
              </CCol>
              <CCol md="9">
                <CRow>
                  <CCol>
                    <CSelect
                        label="구분"
                        :options="partItems"
                        v-model="cPart"
                        @change="onChangePart($event)"
                        style="width: 105px"
                    />
                  </CCol>
                  <CCol>
                    <CSelect
                        label="상태"
                        :options="statusItems"
                        @change="onChangeStatus($event)"
                        v-model="cStatus"
                        style="width: 105px"
                    />
                  </CCol>
                  <CCol>
                    <CSelect
                        label="미감지주기"
                        :options="cycleItems"
                        @change="onChangeCycle($event)"
                        v-model="cCycle"
                        style="width: 105px"
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="12">
                <CRow>
                  <CCol md="2">주소</CCol>
                  <CCol md="10" class="emailBtn">
                    <CButton block color="primary" @click="findPostCode" style="width: 120px;">우편번호찾기</CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="2"><CInput type="text" v-model="cAddr" style="width: 80px" /></CCol>
                  <CCol md="10"><CInput type="text" v-model="cDetail" style="width: 465px" /></CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CButton block color="primary" @click="customAdd">추가</CButton>
              </CCol>
              <CCol md="6">
                <CButton block variant="outline" @click="customCancel" color="primary">취소</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </CModal>

    <CModal
        class="addCustomer"
        title="엑셀파일 업로드"
        :show.sync="fileUpload"
    >
      <CContainer>
        <CCard class="cardModal" >
          <CCardBody class="cbody">
            <CRow>
              <CCol md="12">
                <CInput
                    type="file"
                    class="paddingSel"
                    label="파일선택"
                    v-model="fileName"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CButton block color="primary" @click="excelUpload">업로드</CButton>
              </CCol>
              <CCol md="6">
                <CButton block variant="outline" @click="fileUpload = false" color="primary">취소</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </CModal>-->
  </div>

</template>

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
  watch:{
      selectedUpdateAddr:"onChangeSgg",
      selectedUpdateSggItems:"onChangeOrg",
    },
  data () {
    return {
      pending:true, cName: '', cBirthday: '', cPhone: '', cSex: '', cSocial: '', cPart: '', cStatus: '', cCycle: '', cAddr: '', cDetail: '',
      caption: '', fileName: '',
      counter: 0,pageIndex: 1,
      orgmItems: [], orgmItems2: [], partItems: [], statusItems: [], statusItems2: [], cycleItems: [], sexItems:[{label:'전체', value:''},{label: '남', value: 'M'}, {label: '여', value: 'F'}],
      orgCode: '', partCode: '', statusCode: '', sexCode: '', cycleCode: '',
      modelOrg: '', modelPart: '', modelStatus: '', modelName: '', TypeItems:[], TypeItems2:[], radorSensorItems:[{label:'전체', value:''},{label:'사용', value:'Y'},{label:'미사용', value:'N'}],
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
      selectedSidoItems:null, selectedSggItems:null, selectedOrgItems:null, selectedUserSex:null, selectedUserType:null, selectedUserState:null, selectedRadorSensorYn:null,

      //대상자 등록
      selectedUpdateZipCode:'', selectedUpdateAddr:'', selectedUpdateAddrDetail:'', selectedUpdateBirthday:'', selectedUpdateRecipient:'',
      selectedUpdatePhoneNumber:'', selectedUpdateSidoItems:'', selectedUpdateSggItems:'', selectedUpdateOrgItems:'', selectedUpdateUserType:'',
      selectedUpdateUserState:'', selectedUpdateOrgNm:'',
      //사용자 정보 변경
      selectChangeRecipient: null, selectChangeBirthday: null, selectChangeAddrDetail: null, selectChangeZipCode: null, selectChangeSex: null,
      selectChangePhoneNumber: null, selectChangeSido: null, selectChangeSgg: null, selectChangeOrg: null, selectChangeAddr: null,
      selectChangeRecipeType: null, saveChangeData:null, changeRecipientItems:[], selectChangeState:null, selectChangeOrgNm:null,

      selectedUserOrg: null, userState:[{value:'STE001', text: '승인'},{value:'STE002', text: '서비스중'},{value:'STE003', text: '서비스종료'},],
      selectedRecipeType: null, recipeType:[{value:'', text: '선택'},{value:'TPE001', text: '고령자'},{value:'TPE002', text: '장애인'},],
      userGender: 1 ,
      sortCount: 0,
      searchCheck1:1,
      searchCheck2:0,
      NCount:'',
      sortCount:0, sortNmCount:0,

      UpdateAddr:[], UpdateAddr1:'', UpdateAddr2:'', UpdateAddr3:'',
      
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
      this.selectedRadorSensorYn = ''
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
          console.log(tempArr)
          let tmpResult = tempArr.filter(cd=>{
            return cd.value2 === this.sidoCd
          });
          this.sggItems = [...tmpResult2,...tmpResult]
          this.sggItems2 = [...tmpResult3,...tmpResult]
          this.sggItems3 = tempArr
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
    onChangeSido(event){
      this.getSggData()
      this.orgSido = event.target.value;
    },
  // onChangePart(event) {
  //     this.partCode = event.target.value;
  // },
  // onChangeStatus(event) {
  //     this.statusCode = event.target.value;
  // },
  // initSet() {
  //     this.orgCode='';
  //     this.partCode='';
  //     this.statusCode='';
  //     this.sexCode='';
  //     this.cycleCode='';
  //     this.modelName='';
  //     this.modelOrg="전체";
  //     this.modelPart="전체";
  //     this.modelStatus="전체";
  // },
  // getFilteredRecipientData(){
    
  //   const regExp1 = this.selectedOrgItems !=='' ? new RegExp(this.selectedOrgItems, 'gi') : '';
  //   const regExp2 = this.filterName !=='' ? new RegExp(this.filterName, 'gi') : '';
    
  //   let tmpData = this.recipientItems
    
  //   if( this.filterName || this.selectedOrgItems ){
      
  //     this.recipientItems = tmpData.filter(ri=>{
  //     return ri.orgId.match(regExp1)&&ri.recipientNm.match(regExp2)
  //   })
  //   }else 
  //     return this.recipientItems = this.recipientOrginItems
  // },
  getRecipientData() {
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
    if(this.selectedOrgItems == '' && this.filterName == ''&& this.selectedSidoItems == ''&& this.selectedSggItems == '' && this.selectedUserType =='' && this.selectedUserState =='' && this.selectedUserSex =='' && this.selectedRadorSensorYn == ''){
      uri = this.$store.state.serverApi + "/admin/recipients?pageIndex="+this.page+"&recordCountPerPage=30"
    } else {
      uri = this.$store.state.serverApi + "/admin/recipients?pageIndex="+this.page+"&recordCountPerPage=30";
      uri += "&addrCd="+addrCd;
      if(this.selectedUserType != '') uri += "&typeCd="+this.selectedUserType;
      if(this.selectedUserState != '') uri += "&stateCd="+this.selectedUserState;
      if(this.selectedOrgItems != '') uri += "&orgId=" + this.selectedOrgItems;
      if(this.filterName != '') uri += "&recipientNm=" + this.filterName;
      if(this.selectedUserSex != '') uri += "&sex=" + this.selectedUserSex
      if(this.selectedRadorSensorYn != '') uri += "&radorSensorYn=" + this.selectedRadorSensorYn

      // var fIdx = uri.indexOf("&", 0);
      // var uriArray = uri.split('');
      // uriArray.splice(fIdx, 1);
      // uri = uriArray.join('');
    }

    axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(response => {
          this.recipientItems = response.data.data
          this.recipientOrginItems = response.data.data
          this.NCount = response.data.totalCount
          this.total = this.NCount
          // this.recipientItems = [];
          // for(let i=0; i<response.data.data.length; i++) {
          //   this.recipientItems.push({
          //     recipientId:response.data.data[i].recipientId,
          //     orgNm:response.data.data[i].orgNm,
          //     typeNm:response.data.data[i].typeNm,
          //     stateNm:response.data.data[i].stateNm,
          //     activeUnsensingCycle:response.data.data[i].activeUnsensingCycle,
          //     recipientNm:response.data.data[i].recipientNm,
          //     sex:response.data.data[i].sex,
          //     addr:response.data.data[i].addr,
          //     careLevelNm:response.data.data[i].careLevelNm,
          //     managerNm:response.data.data[i].managerNm,
          //     detail:'',
          //     delete:''
          //   })
          // }
          // if(this.searchCheck1 === 1){
          //   this.searchCheck1 = 0
          // }
          // if(this.recipientItems.length !== 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
          //   alert("성공적으로 조회 되었습니다.")
          //   this.searchCheck2 = 0
          // }else if(this.recipientItems.length === 0 && this.searchCheck1 === 0 && this.searchCheck2 === 1){
          //   alert("조회 결과가 존재하지 않습니다.")
          //   this.searchCheck2 = 0
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
  makeAge(birthDay){
    let tmp1 = this.$moment(birthDay).format('YYYY')
    let tmp2 = this.$moment()
    return tmp2.diff(tmp1, 'years');
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
  createData(){
    this.selectedUpdateZipCode = ''
    this.selectedUpdateAddr = ''
    this.selectedUpdateAddrDetail = ''
    this.selectedUpdateBirthday = ''
    this.selectedUpdateRecipient = ''
    this.selectedUpdatePhoneNumber = ''
    this.selectedUpdateSidoItems = ''
    this.selectedUpdateSggItems = ''
    this.selectedUpdateOrgItems = ''
    this.selectedUpdateUserType = ''
    this.selectedUpdateUserState = ''
    this.modalOpen = true;
  },
  closeModal(){
    this.modalOpen = false;
  },
  async changeData(){
    if(this.saveChangeData===null||this.saveChangeData===undefined){
        alert("변경하시고자 하는 대상자를 선택해 주세요"); 
        return;
    }
    let changeDatatmp = this.recipientItems[this.saveChangeData]
    this.selectChangeRecipient = changeDatatmp.recipientNm
    this.selectChangeBirthday = changeDatatmp.birthday
    this.selectChangeSex = changeDatatmp.sex
    if(this.selectChangeSex === 'M'){
      this.userGender = 1
    }else if(this.selectChangeSex === 'F'){
      this.userGender = 2
    }
    this.selectChangeZipCode = changeDatatmp.zipCode
    this.selectChangeAddr = changeDatatmp.addr
    this.selectChangeAddrDetail = changeDatatmp.addrDetail
    this.selectChangePhoneNumber = changeDatatmp.recipientPhoneno
    this.selectChangeRecipeType = changeDatatmp.typeCd
    this.selectChangeSido = this.sidoItems2.filter(cd=>{
      return cd.value.substring(0,2) === changeDatatmp.addrCd.substring(0,2)
    })
    let url =this.$store.state.serverApi + "/admin/address/sgg?sidoCd="+this.selectChangeSido[0].value;
      await axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
        .then(response => {
          for(let i=0; i<response.data.data.length; i++) {
            this.sggItems3.push({
              label: response.data.data[i].sgg,
              value: response.data.data[i].sggCd,
              value2: response.data.data[i].sidoCd
            });
          } 
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    this.selectChangeSido = this.selectChangeSido[0].label
    this.selectChangeSgg = this.sggItems3.filter(cd=>{
      return cd.value.substring(0,5) === changeDatatmp.addrCd.substring(0,5)
    })
    this.selectChangeSgg = this.selectChangeSgg[0].label
    //this.selectChangeSgg = changeDatatmp.addrCd.substring(0,5)
    this.selectChangeOrg = changeDatatmp.orgNm
    // 대상자 정보 수정 시
    // this.selectChangeSido = ''
    // this.selectChangeSgg = ''
    // this.selectChangeOrg = ''
    this.recipientId = changeDatatmp.recipientId
    this.selectChangeState = changeDatatmp.stateCd
    this.changeOpen = true;
  },

  selectGender(input){
    this.userGender = input;
  },
  search(){ 
    
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
        
        this.selectedUpdateZipCode = data.zonecode; //
        this.selectChangeZipCode = data.zonecode;
        this.selectedUpdateAddr = data.roadAddress;
        this.selectChangeAddr = data.roadAddress;

        this.selectedUpdateSidoItems = ''
        

        this.UpdateAddr = this.selectedUpdateAddr.split(' ')
        this.UpdateAddr1 = this.UpdateAddr[0]
        this.UpdateAddr2 = this.UpdateAddr[1]
        this.UpdateAddr3 = this.UpdateAddr[2]

        if(this.UpdateAddr1 === '서울'){
          this.UpdateAddr1 += '특별시'

        }else if(this.UpdateAddr1 === '부산' || this.UpdateAddr1 === '대구' || this.UpdateAddr1 === '인천' || this.UpdateAddr1 === '광주' || this.UpdateAddr1 === '대전' || this.UpdateAddr1 === '울산'){
          this.UpdateAddr1 += '광역시'
        }else if(this.UpdateAddr1 === '경기' || this.UpdateAddr1 === '강원'){
          this.UpdateAddr1 += '도'
        }else if(this.UpdateAddr1 === '충북'){
          this.UpdateAddr1 = '충청북도'
        }else if(this.UpdateAddr1 === '충남'){
          this.UpdateAddr1 = '충청남도'
        }else if(this.UpdateAddr1 === '전북'){
          this.UpdateAddr1 = '전라북도'
        }else if(this.UpdateAddr1 === '전남'){
          this.UpdateAddr1 = '전라남도'
        }else if(this.UpdateAddr1 === '경북'){
          this.UpdateAddr1 = '경상북도'
        }else if(this.UpdateAddr1 === '경남'){
          this.UpdateAddr1 = '경상남도'
        }  
        let UpdateAutoSido = []

        UpdateAutoSido = this.sidoItems.filter(cd=>{
          return cd.label === this.UpdateAddr1
        })
        this.selectedUpdateSidoItems = UpdateAutoSido[0].value



//        this.selectedAddr = data.jibunAddress;
        
        // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
        if(roadAddr !== ''){
            this.selectedUpdateAddr += extraRoadAddr;
            this.selectChangeAddr += extraRoadAddr;
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
      if(this.UpdateAddr3.substr(-1) === '구'){
            this.UpdateAddr2 = this.UpdateAddr2+' '+this.UpdateAddr3
      }

      UpdateAutoSgg = this.sggItems.filter(cd=>{
        return cd.label === this.UpdateAddr2
      })

      this.selectedUpdateSggItems = UpdateAutoSgg[0].value
    },
    async regUser(){
      //여기
      this.selectedUpdateOrgNm = this.orgmItems2.filter(cd=>{
        return cd.value === this.selectedUpdateOrgItems
      })
      if(this.userGender === 1){
        this.selectSex = 'M'
      }else{
        this.selectSex = 'F'
      }
      
      if(this.selectedUpdateRecipient === ''){
        alert("대상자명 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateBirthday === ''){
        alert("생년월일 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateZipCode === ''){
        alert("우편번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateAddr === ''){
        alert("주소 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateAddrDetail === ''){
        alert("상세주소 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdatePhoneNumber === ''){
        alert("휴대폰번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateUserType === ''){
        alert("사용자 구분 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateSidoItems === ''){
        alert("시/도 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateSggItems === ''){
        alert("시/군/구 항목을 작성하여 주세요")
        return false
      }else if(this.selectedUpdateOrgItems === ''){
        alert("관리리관명 항목을 작성하여 주세요")
        return false
      }

      if(this.selectedUpdatePhoneNumber.length < 3){
        alert("전화번호는 세자리 이상을 입력해 주세요")
        return false;
      }
      if(this.selectedUpdateBirthday.substring(0,4) < '1000' || this.selectedUpdateBirthday.substring(0,4) > this.e_date.substring(0,4) ||
      this.selectedUpdateBirthday.substring(5,7) > '12' || this.selectedUpdateBirthday.substring(5,7) === '00' ||
      this.selectedUpdateBirthday.substring(8,10) > '31' || this.selectedUpdateBirthday.substring(8,10) === '00' || this.selectedUpdateBirthday.length < 10){
        alert("생년월일을 정확히 입력하여 주세요")
        return false
      }
      let data= {
        activeUnsensingCycle: 60,//완
        addr: this.selectedUpdateAddr,//완
        addrCd: this.selectedUpdateSggItems,//이부분 진행해야함
        addrDetail: this.selectedUpdateAddrDetail,//완
        addrXCoordinate: "",//완
        addrYCoordinate: "",//완
        birthday: this.$moment(this.selectedUpdateBirthday).format('YYYY-MM-DD'),//완, yyyymmdd
        careLevelCd: "LVL001",//고정
        installFileNo: "1", //우선 고정
        measureCycle: 240,//완
        orgId: this.selectedUpdateOrgItems,//완
        orgNm: this.selectedUpdateOrgNm[0].label,
        recipientNm: this.selectedUpdateRecipient,//완
        recipientPhoneno: this.selectedUpdatePhoneNumber,//완
        sex: this.userGender===1?"M":this.userGender===2?"F":"", //완
        sigunguCd: this.selectedUpdateSggItems,//완
        stateCd: "STE001" , //완
        typeCd: this.selectedUpdateUserType,//고정
        zipCode: this.selectedUpdateZipCode,//완
        regId: this.$store.state.userId//완
      }      
       const url  = this.$store.state.serverApi + `/admin/recipients`
         ///sensors/{sensorId}/gw-send-cycle
         await axios.post(url,data,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
           .then(res => {
             let resData = res.data.data
            // this.getCSensorsData = res.data.data
             if(resData){
                 alert("저장이 완료되었습니다.")
             }
             this.modalOpen = false
             this.getRecipientData()
           })
           .catch(error => {
               console.log("fail to load")
             this.errorMessage = error.message;
             console.error("There was an error!", error);
           });
    },
    changeUser(){
      //여기
      this.selectChangeOrgNm = this.orgmItems2.filter(cd=>{
        return cd.value === this.selectChangeOrg
      })
      // if(this.selectChangeZipCode === '' || this.selectChangeAddr === '' || this.selectChangeAddrDetail === '' ||
      // this.selectChangeBirthday === '' || this.selectChangeRecipient === '' || this.selectChangePhoneNumber === '' ||
      // this.selectChangeSido === '' || this.selectChangeSgg === '' || this.selectChangeOrg === '' ||
      // this.selectChangeRecipeType === '' || this.selectChangeState === ''){
      //   alert("모든 항목을 작성하여 주세요");
      //   return false;
      // }
      if(this.selectChangeRecipient === ''){
        alert("대상자명 항목을 작성하여 주세요")
        return false
      }else if(this.selectChangeBirthday === ''){
        alert("생년월일 항목을 작성하여 주세요")
        return false
      }else if(this.selectChangeZipCode === ''){
        alert("우편번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectChangeAddr === ''){
        alert("주소 항목을 작성하여 주세요")
        return false
      }else if(this.selectChangeAddrDetail === ''){
        alert("상세주소 항목을 작성하여 주세요")
        return false
      }else if(this.selectChangePhoneNumber === ''){
        alert("휴대폰번호 항목을 작성하여 주세요")
        return false
      }else if(this.selectChangeRecipeType === ''){
        alert("사용자 구분 항목을 작성하여 주세요")
        return false
      }else if(this.selectChangeSido === ''){
        alert("시/도 항목을 작성하여 주세요")
        return false
      }else if(this.selectChangeSgg === ''){
        alert("시/군/구 항목을 작성하여 주세요")
        return false
      }else if(this.selectChangeOrg === ''){
        alert("관리리관명 항목을 작성하여 주세요")
        return false
      }else if(this.selectChangeState === ''){
        alert("상태구분 항목을 작성하여 주세요")
        return false
      }

      if(this.selectChangePhoneNumber.length < 3){
        alert("전화번호는 세자리 이상을 입력해 주세요")
        return false;
      }
      if(this.selectChangeBirthday.length < 10){
        alert("생년월일 여덟 자리를 모두 입력해 주세요")
        return false
      }
      if(this.selectChangeBirthday.substring(0,4) < '1000' || this.selectChangeBirthday.substring(0,4) > this.e_date.substring(0,4) ||
      this.selectChangeBirthday.substring(5,7) > '12' || this.selectChangeBirthday.substring(5,7) === '00' ||
      this.selectChangeBirthday.substring(8,10) > '31' || this.selectChangeBirthday.substring(8,10) === '00' || this.selectChangeBirthday.length < 10){
        alert("생년월일을 정확히 입력하여 주세요")
        return false
      }
      let data= {
        activeUnsensingCycle: 60,//완
        addr: this.selectChangeAddr,//완
        //addrCd: this.selectChangeSgg,//대상자 정보 수정 시
        addrDetail: this.selectChangeAddrDetail,//완
        addrXCoordinate: "",//완
        addrYCoordinate: "",//완
        birthday: this.$moment(this.selectChangeBirthday).format('YYYY-MM-DD'),//완, yyyymmdd
        careLevelCd: "LVL001",//고정
        installFileNo: "1", //우선 고정
        measureCycle: 240,//완
        //orgId: this.selectChangeOrg,//완//대상자 정보 수정 시
        //orgNm: this.selectChangeOrgNm[0].label,//대상자 정보 수정 시
        recipientNm: this.selectChangeRecipient,//완
        recipientPhoneno: this.selectChangePhoneNumber,//완
        sex: this.userGender===1?"M":this.userGender===2?"F":"", //완
        //sigunguCd: this.selectChangeSgg,//대상자 정보 수정 시 
        stateCd: this.selectChangeState , //완
        typeCd: this.selectChangeRecipeType,//고정
        zipCode: this.selectChangeZipCode,//완
        regId: this.$store.state.userId//완
      }
       const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}`       
         // /sensors/{sensorId}/gw-send-cycle
         axios.post(url,data,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
           .then(res => {
             let resData = res.data.data
            // this.getCSensorsData = res.data.data
             if(resData){
                 alert("수정이 완료되었습니다.")
                 this.changeOpen = false
                 this.getRecipientData()
             }
           })
           .catch(error => {
               console.log("fail to load")
             this.errorMessage = error.message;
             console.error("There was an error!", error);
           });
    },
    sortList(input){
      let arr = []
      if(this.sortCount !== 1){
        if(input === 1){  // 대상자명 오름차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.recipientNm<b.recipientNm?-1:a.recipientNm>b.recipientNm?1:0;
          })
          this.sortCount = 1
          this.sortNmCount = 1
          this.recipientItems = arr
        }else if(input === 2){  // 대상자ID 오름차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return a.recipientId - b.recipientId
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 3){  // 생년월일 오름차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return new Date(a.birthday) - new Date(b.birthday)
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 4){  // 나이 오름차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return new Date(a.birthday) - new Date(b.birthday)
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 5){  // 성별 오름차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return a.sex<b.sex?-1:a.sex>b.sex?1:0;
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 6){  // 전화번호 오름차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return a.recipientPhoneno - b.recipientPhoneno
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 7){  // 구분 오름차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.typeNm<b.typeNm?-1:a.typeNm>b.typeNm?1:0;
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 8){  // 바이오센서 오름차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return a.radorSensorYn<b.radorSensorYn?-1:a.radorSensorYn>b.radorSensorYn?1:0;
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 9){  // 상태 오름차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.stateNm<b.stateNm?-1:a.stateNm>b.stateNm?1:0;
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 10){  // 주소 오름차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.addr<b.addr?-1:a.addr>b.addr?1:0;
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 11){  // 관리기관 오름차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.orgNm<b.orgNm?-1:a.orgNm>b.orgNm?1:0;
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 12){  // 생활관리사 오름차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.managerNm<b.managerNm?-1:a.managerNm>b.managerNm?1:0;
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 13){  // 등록일자 오름차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return new Date(a.updDtime) - new Date(b.updDtime)
          })
          this.sortCount = 1
          this.recipientItems = arr
        }else if(input === 14){  // 등록일자 오름차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return new Date(a.regDtime) - new Date(b.regDtime)
          })
          this.sortCount = 1
          this.recipientItems = arr
        }
      }else{
        this.sortCount = 0
        if(input === 1){  // 대상자명 내림차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.recipientNm>b.recipientNm?-1:a.recipientNm<b.recipientNm?1:0;
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 2){  // 대상자ID 내림차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return b.recipientId - a.recipientId
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 3){  // 생년월일 내림차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return new Date(b.birthday) - new Date(a.birthday)
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 4){  // 나이 내림차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return new Date(b.birthday) - new Date(a.birthday)
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 5){  // 성별 내림차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.sex>b.sex?-1:a.sex<b.sex?1:0;
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 6){  // 전화번호 내림차순
          arr = this.recipientItems.slice().sort(function (a,b){
            return b.recipientPhoneno - a.recipientPhoneno
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 7){  // 구분 내림차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.typeNm>b.typeNm?-1:a.typeNm<b.typeNm?1:0;
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 8){  // 바이오센서 내림차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return a.radorSensorYn>b.radorSensorYn?-1:a.radorSensorYn<b.radorSensorYn?1:0;
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 9){  // 상태 내림차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.stateNm>b.stateNm?-1:a.stateNm<b.stateNm?1:0;
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 10){  // 주소 내림차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.addr>b.addr?-1:a.addr<b.addr?1:0;
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 11){  // 관리기관 내림차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.orgNm>b.orgNm?-1:a.orgNm<b.orgNm?1:0;
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 12){  // 생활관리사 내림차순
          arr = this.recipientItems.slice().sort(function ascending(a,b){
            return a.managerNm>b.managerNm?-1:a.managerNm<b.managerNm?1:0;
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 13){  // 등록일자 내림차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return new Date(b.updDtime) - new Date(a.updDtime)
          })
          this.sortCount = 0
          this.recipientItems = arr
        }else if(input === 14){  // 등록일자 내림차순
          arr = this.recipientItems.slice().sort(function(a,b){
            return new Date(b.regDtime) - new Date(a.regDtime)
          })
          this.sortCount = 0
          this.recipientItems = arr
        }
      }
    },
    manageInquiry() {
      this.searchCheck2 = 1
      this.page = 1
      this.getRecipientData();
    },
    // getPartData() {
    //   axios.get(this.$store.state.serverApi + "/codes?cmmnCdGroup=RECIPIENT.TYPECD", {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
    //       .then(response => {
    //         this.partItems=[];
    //         this.partItems.push({label: '전체', value: ''});
    //         for(let i=0; i<response.data.data.length; i++) {
    //           this.partItems.push({
    //             label: response.data.data[i].cmmnCdNm,
    //             value: response.data.data[i].cmmnCd
    //           });
    //         }
    //       })
    //       .catch(error => {
    //         this.errorMessage = error.message;
    //         console.error("There was an error!", error);
    //       });
    // },
    // getCycleData() {
    //   axios.get(this.$store.state.serverApi + "/codes?cmmnCdGroup=RECIPIENT.LEVELCD", {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
    //       .then(response => {
    //         this.cycleItems=[];
    //         this.cycleItems.push({label: '전체', value: ''});
    //         for(let i=0; i<response.data.data.length; i++) {
    //           this.cycleItems.push({
    //             label: response.data.data[i].cmmnCdNm,
    //             value: response.data.data[i].cmmnCd
    //           });
    //         }
    //       })
    //       .catch(error => {
    //         this.errorMessage = error.message;
    //         console.error("There was an error!", error);
    //       });
    // },
    // getStatusData() {
    //   axios.get(this.$store.state.serverApi + "/codes?cmmnCdGroup=RECIPIENT.STATECD", {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
    //       .then(response => {
    //         this.statusItems=[];
    //         this.statusItems.push({label: '전체', value: ''});
    //         for(let i=0; i<response.data.data.length; i++) {
    //           this.statusItems.push({
    //             label: response.data.data[i].cmmnCdNm,
    //             value: response.data.data[i].cmmnCd
    //           });
    //         }
    //       })
    //       .catch(error => {
    //         this.errorMessage = error.message;
    //         console.error("There was an error!", error);
    //       });
    // },
    // say: function (message) {
    //   alert(message)
    // },
    // detailCustomerView(recipId, orgm) {
    //   sessionStorage.setItem("recipid", recipId);
    //   sessionStorage.setItem("orgm", orgm);
    //   this.$router.push('detailView');
    // },
    
    // onChangePart(event) {
    //   this.partCode = event.target.value;
    // },
    // onChangeStatus(event) {
    //   this.statusCode = event.target.value;
    // },
    // onChangeSex(event) {
    //   this.sexCode = event.target.value;
    // },
    // onChangeCycle(event) {
    //   this.cycleCode = event.target.value;
    // },
    // manageInquiry() {
    //   this.getRecipientData();
    // },
    // findPostCode() {
    //   axios.get("https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do");
    // },
    // initSet() {
    //   this.orgCode='';
    //   this.partCode='';
    //   this.statusCode='';
    //   this.sexCode='';
    //   this.cycleCode='';
    //   this.modelName='';
    //   this.modelOrg="전체";
    //   this.modelPart="전체";
    //   this.modelStatus="전체";
    // },
    


    // openUploadPopup() {
    //   this.fileUpload=true;
    // },
    // excelUpload() {
    //   let bodyFormData = new FormData();
    //   bodyFormData.append('file', this.fileName);

    //   const headers = {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': "Bearer " + sessionStorage.getItem("token")
    //   }
    //   let self = this;
    //   axios({
    //     method: "post",
    //     url: this.$store.state.serverApi + '/recipient/excel/upload',
    //     data: bodyFormData,
    //     headers: headers,
    //   })
    //   .then(function (response) {
    //     if(response.data.data() == true){
    //       self.fileUpload=false;
    //     }
    //   })
    //   .catch(function (response) {
    //     //handle error
    //   });

    // },
    // excelDownload() {
    //   let uri = this.$store.state.serverApi + '/sensors/excel/download';
    //   axios.get(uri, {
    //     file_name: "test.xlsx"
    //   }, {
    //     responseType: 'blob'
    //   }).then((response) => {

    //     const url = URL.createObjectURL(new Blob([response.data], {
    //       type: 'application/vnd.ms-excel'
    //     }))
    //     const link = document.createElement('a')
    //     link.href = url
    //     link.setAttribute('download', "test.xlsx")
    //     document.body.appendChild(link)
    //     link.click()
    //   });
    // },
    // customAdd() {
    //   if(this.orgCode == '') {
    //     alert("관리기관을 선택하여 주세요.");
    //     return;
    //   }

    //   let bodyFormData = new FormData();
    //   bodyFormData.append('orgId', this.orgCode);
    //   bodyFormData.append('recipientNm', this.cName);
    //   bodyFormData.append('birthday', this.cBirthday);
    //   bodyFormData.append('sex', this.sexCode);
    //   bodyFormData.append('addr', this.cAddr);
    //   bodyFormData.append('addrDetail', this.cDetail);
    //   bodyFormData.append('recipientPhoneno', this.cPhone);
    //   bodyFormData.append('typeCd', this.partCode);
    //   bodyFormData.append('stateCd', this.statusCode);
    //   bodyFormData.append('activeUnsensingCycle', this.cycleCode);
    //   bodyFormData.append('sigunguCd', '????');

    //   const headers = {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': "Bearer " + sessionStorage.getItem("token")
    //   }
    //   let self = this;
    //   axios({
    //     method: "post",
    //     url: this.$store.state.serverApi + '/recipients',
    //     data: bodyFormData,
    //     headers: headers,
    //   })
    //   .then(function (response) {
    //     if(response.data.totalCount > 0){
    //       self.getRecipientData();
    //       self.addCustomer=false;
    //     }
    //   })
    //   .catch(function (response) {
    //     //handle error
    //   });
    // },
    // customCancel() {
    //   this.addCustomer=false;
    // },
    
  },
  mounted(){
    
    const script = document.createElement("script");
    script.src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    
    document.head.appendChild(script);
    
  },
  
}
</script>
<style>
@import '../../assets/scss/common.css';
@import '../../assets/scss/sub.css';
.tdBorder table td {
  border-top: 0px;
  border-bottom: 1px solid;
  border-bottom-color: #d8dbe0;
}
.table-clear td {
  border: 1px;
}
.header-del {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.opt_select {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.paddingSel {
  padding: 20px;
}
.cardModal {
  border: none;
  margin-bottom: 0;
}
.addCustomer .modal-dialog{
  max-width: 650px;
}
.emailBtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 3px;
}
.modal-footer {
  display: none;
}
.searchBtn {
  width: 70px;
  right: 115px;
  position: absolute;
  margin-top: 10px;
}
.initBtn {
  width: 70px;
  right: 22px;
  position: absolute;
  margin-top: -1px;
  margin-top: 45px;
}
</style>
