<template>
    <div >
        
            
        <!-- <div v-if="!this.pending" style="text-align: center;">
            <img src="../../../assets/images/loading.png"  />
        </div> -->
        <div class="tabcontent">
            <div id="" class="popupLayer" v-if="firmwareUpgradeCheck === true">
              <div class="popup_wrap type-02">
                <div class="title_wrap">
                  <div class="title">경고</div>
                  <button type="button" class="btn_close" @click="firmwareUpgradeCheck = false">닫기</button>
                </div>
                <div class="popup_cnt">
                  <p class="alert_txt">업그레이드시 5분정도 소요됩니다. <br> 펌웨어 업그레이드를 진행하시겠습니까?</p>
                </div>
                <div class="popbtn_area type-02">
                  <button type="button" class="btn form2" @click="firmwareUpgrade()">확인</button>
                  <button type="button" class="btn" @click="firmwareUpgradeCheck = false">취소</button>
                </div>
              </div>
            </div>
            <div id="" class="popupLayer" v-if="reverseCheckpopup === true">
              <div class="popup_wrap type-02">
                <div class="title_wrap">
                  <div class="title">경고</div>
                  <button type="button" class="btn_close" @click="reverseCheckpopup = false">닫기</button>
                </div>
                <div class="popup_cnt">
                  <p class="alert_txt">역점검 요청을 진행하시겠습니까?</p>
                </div>
                <div class="popbtn_area type-02">
                  <button type="button" class="btn form2" @click="reverseCheck()">확인</button>
                  <button type="button" class="btn" @click="reverseCheckpopup = false">취소</button>
                </div>
              </div>
            </div>
            <div id="" class="popupLayer" v-if="cmdA4postpopup === true">
              <div class="popup_wrap type-02">
                <div class="title_wrap">
                  <div class="title">경고</div>
                  <button type="button" class="btn_close" @click="cmdA4postpopup = false">닫기</button>
                </div>
                <div class="popup_cnt">
                  <p class="alert_txt">cmdA4 전송을 진행하시겠습니까?</p>
                </div>
                <div class="popbtn_area type-02">
                  <button type="button" class="btn form2" @click="cmdA4post()">확인</button>
                  <button type="button" class="btn" @click="cmdA4postpopup = false">취소</button>
                </div>
              </div>
            </div>
            <div id="" class="popupLayer" v-if="beforeGWpopup === true">
        <div class="popup_wrap" style="width:100%">
          <div class="title_wrap">
            <div class="title">상태이력</div>
            <button type="button" class="btn_close" @click="beforeGWpopup = false">닫기</button>
          </div>
          <div class="popbtn_wrap" style="margin-bottom:20px;">
                  <div class="list result" style="margin-left:-30px; width:107%">
                    <table>
                      <colgroup>
                        <!--<col style="width:10%;">-->
                        <col style="width:13%;">
                        <col style="width:10%;">
                        <col style="width:12%;">
                        <col style="width:10%;">
                        <col style="width:12%;">
                        <col style="width:12%;">
                        <col style="width:10%;">
                        <col style="width:14%;">
                        <col style="width:14%;">
                      </colgroup>
                      <thead>
                        <tr>
                          <!-- <th scope="col">대상자ID</th> -->
                          <th scope="col">통신상태</th>
                          <th scope="col">전원연결상태</th>
                          <th scope="col">점검대상여부</th>
                          <th scope="col">배터리</th>
                          <th scope="col">Keep-Alive</th>
                          <th scope="col">신호세기</th>
                          <th scope="col">구분</th>
                          <th scope="col">상태측정일시</th>
                          <th scope="col">서버보고일시</th>
                        </tr>
                      </thead>
                    </table>
                    <div class="tbody">
                      <table>
                        <colgroup>
                          <!--<col style="width:10%;">-->
                            <col style="width:13%;">
                            <col style="width:10%;">
                            <col style="width:12%;">
                            <col style="width:10%;">
                            <col style="width:12%;">
                            <col style="width:12%;">
                            <col style="width:10%;">
                            <col style="width:14%;">
                            <col style="width:14%;">
                        </colgroup>
                        <tbody >    
                          <tr v-for="(item,index) in beforeGWItems" v-bind:key="index">
                            <!--<td>{{item.recipientId}}</td>-->
                            <td>{{item.comStateCd+'('+changecomStateCd(item.comStateCd)+')'}}</td>
                            <td>{{item.powerLinkYn===1?'연결':'차단'}}</td>
                            <td>{{item.checkYnCd===0? '정상':'점검대상'}}</td>
                            <td>{{item.batteryValue+'('+changeTaGaBattery(item.batteryValue)+')'}}</td>
                            <td>{{item.keepAliveRcvYn===0?'정상':item.keepAliveRcvYn===1?'비정상':'미수신'}}</td>
                            <td>{{item.rssi+'('+changeRssi(item.rssi)+')'}}</td>
                            <td>{{item.typeCd==='1'?'주기' : '기타'}}</td>
                            <td>{{item.stateMeasureDtime}}</td>
                            <td>{{item.reportDtime}}</td>
                          </tr>                                   
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> 
            </div>
          </div>
          <div id="" class="popupLayer" v-if="beforeSNpopup === true">
        <div class="popup_wrap" style="width:100%">
          <div class="title_wrap">
            <div class="title">상태이력</div>
            <button type="button" class="btn_close" @click="beforeSNpopup = false">닫기</button>
          </div>
          <div class="popbtn_wrap" style="margin-bottom:20px;">
                  <div class="list result" style="margin-left:-30px; width:107%">
                    <table>
                      <colgroup>
                        <!--<col style="width:10%;">-->
                        <col style="width:13%;">
                        <col style="width:10%;">
                        <col style="width:12%;">
                        <col style="width:10%;">
                        <col style="width:12%;">
                        <col style="width:14%;">
                        <col style="width:14%;">
                      </colgroup>
                      <thead>
                        <tr>
                          <!-- <th scope="col">대상자ID</th> -->
                          <th scope="col">통신상태</th>
                          <th scope="col">배터리</th>
                          <th scope="col">신호세기</th>
                          <th scope="col">점검대상여부</th>
                          <th scope="col">Keep-Alive</th>
                          <th scope="col">상태측정일시</th>
                          <th scope="col">서버보고일시</th>
                        </tr>
                      </thead>
                    </table>
                    <div class="tbody">
                      <table>
                        <colgroup>
                          <!--<col style="width:10%;">-->
                            <col style="width:13%;">
                            <col style="width:10%;">
                            <col style="width:12%;">
                            <col style="width:10%;">
                            <col style="width:12%;">
                            <col style="width:14%;">
                            <col style="width:14%;">
                        </colgroup>
                        <tbody >    
                          <tr v-for="(item,index) in beforeSNItems" v-bind:key="index">
                            <!--<td>{{item.recipientId}}</td>-->
                            <td>{{item.comStateCd+"("+item.comStateNm+")"}}</td>
                            <td>{{item.batteryValue+"("+changeSensorBattery(item.batteryValue)+")"}}</td>
                            <td>{{item.rssi+"("+changeRssi(item.rssi)+")"}}</td>
                            <td>{{item.checkYnCd===0?'정상':'점검대상'}}</td>
                            <td>{{item.keepAliveRcvYn===0?'정상':item.keepAliveRcvYn===1?'비정상':'미수신'}}</td>
                            <td>{{item.stateMeasureDtime}}</td>
                            <td>{{item.reportDtime}}</td>
                          </tr>                                   
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> 
            </div>
          </div>
            <div class="toggle_btn2" style="margin-top : -25px">
                <button type="button" :class="connectTap===3?'btn on':'btn'" @click="dataTogle(3)" style="font-size: 16px;">태블릿</button>
                <button type="button" :class="connectTap===2?'btn on':'btn'" @click="dataTogle(2)" style="font-size: 16px;">게이트웨이</button>
                <button type="button" :class="connectTap===1?'btn on':'btn'" @click="dataTogle(1)" style="font-size: 16px;">센서</button>
            </div>
            <div class="tablist" v-if="connectTap===3">
                <div class="list_top">
                    <div class="title_area">
                        <p class="tit">Tablet PC</p>
                        <div class="toggle_btn">
                            <!-- <button type="button" class="btn on" >기본정보</button>
                            <button type="button" class="btn" >상세정보</button> -->
                        </div>
                    </div>
                </div>
                <div class="list">
                    <table>
                        <colgroup>
                            <col style="width:16%;">
                            <col style="width:16%;">
                            <col style="width:16%;">
                            <col style="width:16%;">
                            <col style="width:16%;">
                            <col style="width:17%;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <th scope="col">전화번호</th>
                                <th scope="col">통신사</th>
                                <th scope="col">모델</th>
                                <th scope="col">앱버전(설치/최신)</th>
                                <th scope="col">OS버전</th>
                                <th scope="col">mac address</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody htype-04">
                        <table>
                            <colgroup>
                                <col style="width:16%;">
                                <col style="width:16%;">
                                <col style="width:16%;">
                                <col style="width:16%;">
                                <col style="width:16%;">
                                <col style="width:17%;">
                            </colgroup>
                            <tbody v-if="!this.getCTabletsData">
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td>{{changeRecipientPhoneno(this.getCTabletsData.phoneNumber)}}</td>
                                    <td>{{this.getCTabletsData.provider}}</td>
                                    <td>{{this.getCTabletsData.modelNm}}</td>
                                    <td>{{this.getCTabletsData.appVersion+'/'+tabletBv(this.getCTabletsData.appBversion)}}</td>
                                    <td>{{this.getCTabletsData.osVersion}}</td>
                                    <td>{{this.getCTabletsData.macAddr}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
            <div class="tablist" v-if="connectTap===2">
                <div class="list_top">
                    <div class="title_area">
                        <p class="tit">게이트웨이</p>
                        <div v-if="!this.getCGatewayData"></div>
                        <!-- <div class="toggle_btn" v-else> -->
                        <div class="toggle_btn" v-else>
                            <!-- <button type="button" class="btn on">기본정보</button> -->
                            <!-- <button type="button" class="btn">상세정보</button> -->
                        </div>
                    </div>
                    <div v-if="!this.getCGatewayData"></div>
                    <div class="btn_area" v-else>
                        <button type="button" class="btn form2" @click="firmwareUpgradeCheck = true">펌웨어 업그레이드</button>
                        <button type="button" class="btn form2" @click="cmdA4popup()">cmdA4전송</button>
                        <button type="button" class="btn form2" @click="reversepopup()">역점검요청</button>
                        <!-- <button type="button" class="btn form2">문열림멘트-ON</button>
                        <button type="button" class="btn form2">자동착신-OFF</button> -->
                    </div>
                    
                </div>
                <div class="list">
                    <table>
                        <colgroup>
                            <col style="width:25%;">
                            <col style="width:25%;">
                            <col style="width:25%;">
                            <col style="width:25%;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <th scope="col">시리얼번호(S/N)</th>
                                <th scope="col">맥 어드레스</th>
                                <th scope="col">펌웨어버전(현재/최신)</th>
                                <th scope="col">HW버전</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody htype-04">
                        <table>
                            <colgroup>
                                <col style="width:25%;">
                                <col style="width:25%;">
                                <col style="width:25%;">
                                <col style="width:25%;">
                            </colgroup>
                            <tbody>
                                <tr >
                                    <td>{{!this.getCGatewayData?'':this.getCGatewayData.serialNo}}</td>
                                    <td>{{!this.getCGatewayData?'':this.getCGatewayData.macAddr}}</td>
                                    <td>{{!this.getCGatewayData?'':this.getCGatewayData.firmwareVersion+'/'+this.firmwareCData}}</td>
                                    <td>{{!this.getCGatewayData?'':this.getCGatewayData.hardwareVersion}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tablist" v-if="connectTap===1">
                <div class="list_top">
                    <div class="title_area">
                        <p class="tit">센서</p>
                        <div v-if="this.getCSensorsData.length === 0"></div>
                        <div class="toggle_btn" v-else>
                            <button type="button" :class="sensorsTap===1? 'btn on':'btn'" @click="sensorsTogle(1)">기본정보</button>
                            <button type="button" :class="sensorsTap===2? 'btn on':'btn'" @click="sensorsTogle(2)" >상세정보</button>
                        </div>
                    </div>
                    <div class="btn_area" v-if="this.sensorsTap===2">
                          <button type="button" style="margin-right:10px" class="btn" @click="changeIncomeNmData()">센서ID 변경</button>
                    </div>
                </div>
                <div class="list" v-if="sensorsTap===1">
                    <table>
                        <colgroup>
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:20%;">
                            <col style="width:20%;">
                            <col style="width:20%;">
                            <col style="width:20%;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <!-- 센서 상세정보 : 순번, 센서종류, 설치장소, 센서설치버전 시리얼번호, MAC Addr-->
                                <th scope="col">순번</th>
                                <th scope="col">센서종류</th>
                                <th scope="col">설치장소</th>
                                <th scope="col">설치버전</th>
                                <th scope="col">시리얼번호</th>
                                <th scope="col">MAC Addr</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody htype-04">
                        <table>
                            <colgroup>
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:20%;">
                                <col style="width:20%;">
                                <col style="width:20%;">
                                <col style="width:20%;">
                            </colgroup>
                            <tbody v-if="!this.getCSensorsData">
                                <tr >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr v-for="(item,index) in getCSensorsData" v-bind:key="index" @click="getBSensers(index,0)">
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{index+1}}</td>
                                    <td v-else>{{index+1}}</td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{sensorNmChange(item.sensorTypeNm)}}</td>
                                    <td v-else>{{sensorNmChange(item.sensorTypeNm)}}</td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{locationCode(item.sensorLocCd)}}</td>
                                    <td v-else>{{locationCode(item.sensorLocCd)}}</td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{item.sensorVersion}}</td>
                                    <td v-else>{{item.sensorVersion}}</td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{item.serialNo}}</td>
                                    <td v-else>{{item.serialNo}}</td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{item.macAddr}}</td>
                                    <td v-else>{{item.macAddr}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="list" v-if="sensorsTap===2">
                    <table>
                        <colgroup>
                            <col style="width:5%;">
                            <col style="width:8%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:16%;">
                            <col style="width:16%;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <!-- 센서 상세정보 : 순번, 센서명, 센서이전버전, 센서설치버전 입고명, 입고일자, 등록일시 -->
                                <th scope="col">선택</th>
                                <th scope="col">순번</th>
                                <th scope="col">센서명</th>
                                <th scope="col">설치버전</th>
                                <th scope="col">최신버전</th>
                                <th scope="col">관리번호</th>
                                <th scope="col">등록일시</th>
                                <th scope="col">수정일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody htype-04">
                        <table>
                            <colgroup>
                                <col style="width:5%;">
                                <col style="width:8%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:16%;">
                                <col style="width:16%;">
                            </colgroup>
                            <tbody v-if="!this.getCSensorsData">
                                <tr >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr v-for="(item,index) in getCSensorsData" v-bind:key="index" @click="getBSensers(index,0)">
                                    <td>
                                      <div class="chk_area radio">
                                        <input type="radio" name="saveChangeData" :id="`radio1_${index}`" v-model="saveChangeData" :value="index" @click="reset(index)">
                                        <label :for="`radio1_${index}`" class="chk"><i class="ico_chk"></i></label>
                                      </div>
                                    </td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{index+1}}</td>
                                    <td v-else>{{index+1}}</td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{sensorNmChange(item.sensorTypeNm)}}</td>
                                    <td v-else>{{sensorNmChange(item.sensorTypeNm)}}</td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{item.sensorVersion}}</td>
                                    <td v-else>{{item.sensorVersion}}</td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{item.previousVersion}}</td>
                                    <td v-else>{{item.previousVersion}}</td>
                                    <td v-if="saveChangeData === index">
                                      <div class="input_area" style="margin-left:0px; margin-right:0px;">
                                        <input type="text" name="" id="" v-model="changeIncomeNm" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
                                      </div>
                                    </td>
                                    <td v-else-if="index===emphasisValue" style="font-weight: bolder">{{!item.incomeNm? '' : item.incomeNm}}</td>
                                    <td v-else>{{!item.incomeNm? '' : item.incomeNm}}</td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{item.regDtime}}</td>
                                    <td v-else>{{item.regDtime}}</td>
                                    <td v-if="index===emphasisValue" style="font-weight: bolder">{{item.updDtime}}</td>
                                    <td v-else>{{item.updDtime}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tablist" v-if="connectTap===2">
                <div class="list_top">
                    <div class="title_area">
                        <p class="tit">장비상태 정보</p>
                        <div class="select_area">
                            <input type="text" name="" id="" :value="connectTap===3?'tablet':connectTap===2?'gateway':'sensors'">
                        </div>
                        <div class="toggle_btn">
                            <button type="button" :class="beforeGatewayToggle===0 ? 'btn on': 'btn'" @click="getNowGatewayToggle">최신정보</button>
                            <button type="button" :class="beforeGatewayToggle===1 ? 'btn on': 'btn'" @click="getBeforeVersionGateway">직전정보</button>
                        </div>
                    </div>
                    <div class="btn_area" style="float:right" v-if="connectTap===2 && beforeGatewayToggle===1">
                      <button type="button" style="margin-right:10px" class="btn form2" @click="beforepopup()">더보기</button>
                    </div>
                </div>
                <div class="list">
                    <table>
                        <colgroup>
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:12%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:8%;">
                            <col style="width:14%;">
                            <col style="width:14%;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <th scope="col">통신상태</th>
                                <th scope="col">전원연결상태</th>
                                <th scope="col">점검대상여부</th>
                                <th scope="col">배터리</th>
                                <th scope="col">Keep-Alive</th>
                                <th scope="col">{{connectTap===3?'사용여부':"신호세기"}}</th>
                                <th scope="col">구분</th>
                                <th scope="col">상태측정일시</th>
                                <th scope="col">서버보고일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody ">
                        <table>
                            <colgroup>
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:12%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:8%;">
                                <col style="width:14%;">
                                <col style="width:14%;">
                            </colgroup>
                            <tbody v-if="connectTap===2 && beforeGatewayToggle===0" >
                                <tr>
                                    <td>{{!this.getCGatewayData2? '':!this.gatewayTakeNm? '':this.getCGatewayData2.comStateCd+"("+this.gatewayTakeNm+")"}}</td>
                                    <td>{{!this.getCGatewayData2? '':this.getCGatewayData2.powerLinkYn===undefined||this.getCGatewayData2.powerLinkYn===null||this.getCGatewayData2.powerLinkYn==='' ? '' : this.getCGatewayData2.powerLinkYn===1?'연결':'차단'}}</td>
                                    <td>{{!this.getCGatewayData2? '':this.getCGatewayData2.checkYnCd===null||this.getCGatewayData2.checkYnCd===undefined||this.getCGatewayData2.checkYnCd===''? '': this.getCGatewayData2.checkYnCd===0? '정상':'점검대상'}}</td>
                                    <td>{{!this.getCGatewayData2? '':this.getCGatewayData2.batteryValue+"("+changeTaGaBattery(getCGatewayData2.batteryValue)+")"}}</td>
                                    <td>{{!this.getCGatewayData2? '':this.getCGatewayData2.keepAliveRcvYn===0?'정상':this.getCGatewayData2.keepAliveRcvYn===1?'비정상':'미수신'}}</td>
                                    <td>{{!this.getCGatewayData2? '':this.getCGatewayData2.rssi+"("+changeRssi(this.getCGatewayData2.rssi)+")"}}</td>
                                    <td>{{!this.getCGatewayData2? '':this.getCGatewayData2.typeCd==='1'?'주기':'기타'}}</td>
                                    <td>{{!this.getCGatewayData2? '':this.getCGatewayData2.stateMeasureDtime}}</td>
                                    <td>{{!this.getCGatewayData2? '':this.getCGatewayData2.reportDtime}}</td>
                                </tr>
                            </tbody>
                            <tbody v-if="this.beforeVersionGatewayData && connectTap===2 && beforeGatewayToggle===1" >
                                <tr>
                                    <td>{{!this.beforeVersionGatewayData? '':!this.beforeGatewayTakeNm? '': this.beforeVersionGatewayData.comStateCd+"("+this.beforeGatewayTakeNm+")"}}</td>
                                    <td>{{!this.beforeVersionGatewayData? '':this.beforeVersionGatewayData.powerLinkYn===undefined||this.beforeVersionGatewayData.powerLinkYn===null||this.beforeVersionGatewayData.powerLinkYn==='' ? '' : this.beforeVersionGatewayData.powerLinkYn===1?'연결':'차단'}}</td>
                                    <td>{{!this.beforeVersionGatewayData? '':this.beforeVersionGatewayData.checkYnCd===null||this.beforeVersionGatewayData.checkYnCd===undefined||this.beforeVersionGatewayData.checkYnCd===''? '': this.beforeVersionGatewayData.checkYnCd===0? '정상':'점검대상'}}</td>
                                    <td>{{!this.beforeVersionGatewayData? '':this.beforeVersionGatewayData.batteryValue+"("+changeTaGaBattery(this.beforeVersionGatewayData.batteryValue)+")"}}</td>
                                    <td>{{!this.beforeVersionGatewayData? '':this.beforeVersionGatewayData.keepAliveRcvYn===0?'정상':this.beforeVersionGatewayData.keepAliveRcvYn===1?'비정상':'미수신'}}</td>
                                    <td>{{!this.beforeVersionGatewayData? '':this.beforeVersionGatewayData.rssi+"("+changeRssi(this.beforeVersionGatewayData.rssi)+")"}}</td>
                                    <td>{{!this.beforeVersionGatewayData? '':this.beforeVersionGatewayData.typeCd==='1'?'주기':'기타'}}</td>
                                    <td>{{!this.beforeVersionGatewayData? '':this.beforeVersionGatewayData.stateMeasureDtime}}</td>
                                    <td>{{!this.beforeVersionGatewayData? '':this.beforeVersionGatewayData.reportDtime}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tablist" v-if="connectTap===3">
                <div class="list_top">
                    <div class="title_area">
                        <p class="tit">장비상태 정보</p>
                        <div class="select_area">
                            <input type="text" name="" id="" :value="connectTap===3?'tablet':connectTap===2?'gateway':'sensors'">
                        </div>
                        <div class="toggle_btn">
                            <button type="button" :class="beforeTabletToggle===0? 'btn on': 'btn'" @click="getNowTabletToggle">최신정보</button>
                            <button type="button" :class="beforeTabletToggle===1? 'btn on': 'btn'" @click="getBeforeVersionTablets">직전정보</button>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <table>
                        <colgroup>
                            <col style="width:14%;">
                            <col style="width:14%;">
                            <col style="width:12%;">
                            <col style="width:18%;">
                            <col style="width:18%;">
                            <col style="width:auto;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <th scope="col">통신상태</th>
                                <th scope="col">점검대상여부</th>
                                <th scope="col">배터리</th>
                                <th scope="col">게이트웨이연결상태</th>
                                <th scope="col">상태측정일시</th>
                                <th scope="col">서버보고일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody ">
                        <table>
                            <colgroup>
                                <col style="width:14%;">
                                <col style="width:14%;">
                                <col style="width:12%;">
                                <col style="width:18%;">
                                <col style="width:18%;">
                                <col style="width:auto;">
                            </colgroup>
                            <tbody v-if="this.getCTabletsData2 && connectTap===3 && beforeTabletToggle===0">
                                <tr>
                                    <td>{{!this.getCTabletsData? '':changeTabletCd(this.getCTabletsData2.comStateCd)+"("+changeTabletCd2(this.getCTabletsData2.comStateCd)+")"}}</td>
                                    <td>{{!this.getCTabletsData? '':this.getCTabletsData2.checkYnCd===null||this.getCTabletsData2.checkYnCd===undefined||this.getCTabletsData2.checkYnCd===''? '': this.getCTabletsData2.checkYnCd===0? '정상':'점검대상'}}</td>
                                    <td>{{!this.getCTabletsData? '':this.getCTabletsData2.batteryValue+"("+changeTaGaBattery(this.getCTabletsData2.batteryValue)+")"}}</td>
                                    <td>{{!this.getCTabletsData? '':this.getCTabletsData2.gwLinkYnNm}}</td>
                                    <td>{{!this.getCTabletsData? '':this.getCTabletsData2.stateMeasureDtime}}</td>
                                    <td>{{!this.getCTabletsData? '':this.getCTabletsData2.regDtime}}</td>
                                </tr>
                            </tbody>
                            <tbody v-if="this.beforeVersionTabletsData && connectTap===3 && beforeTabletToggle===1">
                                <tr>
                                    <td>{{!this.getCTabletsData? '':changeTabletCd(this.beforeVersionTabletsData.comStateCd)+"("+changeTabletCd2(this.beforeVersionTabletsData.comStateCd)+")"}}</td>
                                    <td>{{!this.getCTabletsData? '':this.beforeVersionTabletsData.checkYnCd===null||this.beforeVersionTabletsData.checkYnCd===undefined||this.beforeVersionTabletsData.checkYnCd===''? '': this.beforeVersionTabletsData.checkYnCd===0? '정상':'점검대상'}}</td>
                                    <td>{{!this.getCTabletsData? '':this.beforeVersionTabletsData.batteryValue+"("+changeTaGaBattery(this.beforeVersionTabletsData.batteryValue)+")"}}</td>
                                    <td>{{!this.getCTabletsData? '':this.beforeVersionTabletsData.gwLinkYnNm}}</td>
                                    <td>{{!this.getCTabletsData? '':this.beforeVersionTabletsData.stateMeasureDtime}}</td>
                                    <td>{{!this.getCTabletsData? '':this.beforeVersionTabletsData.regDtime}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tablist" v-if="connectTap===1">
                <div class="list_top">
                    <div class="title_area">
                        <p class="tit">장비상태 정보</p>
                        <div class="select_area">
                            <input type="text" name="" id="" :value="connectTap===3?'tablet':connectTap===2?'gateway':'sensors'">
                        </div>
                        <div class="toggle_btn">
                            <button type="button" :class="beforeSensorToggle===0? 'btn on': 'btn'" @click="getNowSensorToggle">최신정보</button>
                            <button type="button" :class="beforeSensorToggle===1? 'btn on': 'btn'" @click="getBeforeVersionSensors" >직전정보</button>
                        </div>
                    </div>
                    <div class="btn_area" style="float:right" v-if="connectTap===1 && beforeSensorToggle===1">
                      <button type="button" style="margin-right:10px" class="btn form2" @click="beforeSensorpopup()">더보기</button>
                    </div>
                </div>
                <div class="list">
                    <table>
                        <colgroup>
                            <col style="width:14%;">
                            <col style="width:14%;">
                            <col style="width:14%;">
                            <col style="width:14%;">
                            <col style="width:14%;">
                            <col style="width:14%;">
                            <col style="width:auto;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <th scope="col">통신상태</th>
                                <th scope="col">배터리</th>
                                <th scope="col">{{connectTap===3?'사용여부':"신호세기"}}</th>
                                <th scope="col">점검대상여부</th>
                                <th scope="col">Keep-Alive</th>
                                <th scope="col">상태측정일시</th>
                                <th scope="col">서버보고일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody ">
                        <table>
                            <colgroup>
                                <col style="width:14%;">
                                <col style="width:14%;">
                                <col style="width:14%;">
                                <col style="width:14%;">
                                <col style="width:14%;">
                                <col style="width:14%;">
                                <col style="width:auto;">
                            </colgroup>
                            <tbody v-if="this.getBSensorsData && connectTap===1 && beforeSensorToggle===0">
                                <tr>
                                    <td>{{!this.sensorTakeNm? '': this.getBSensorsData.comStateCd===null? '':this.getBSensorsData.comStateCd+"("+this.sensorTakeNm+")"}}</td>
                                    <td>{{!this.getBSensorsData? '':this.getBSensorsData.batteryValue+"("+changeSensorBattery(this.getBSensorsData.batteryValue)+")"}}</td>
                                    <td>{{!this.getBSensorsData? '': this.getBSensorsData.rssi===null? '' : this.getBSensorsData.rssi+"("+changeRssi(this.getBSensorsData.rssi)+")"}}</td>
                                    <td>{{this.getBSensorsData.checkYnCd ===null|| this.getBSensorsData.checkYnCd ===undefined ? '' : this.getBSensorsData.checkYnCd===0?'정상':'점검대상'}}</td>
                                    <td>{{!this.getBSensorsData? '':this.getBSensorsData.keepAliveRcvYn===0?'정상':this.getBSensorsData.keepAliveRcvYn===1?'비정상':'미수신'}}</td>
                                    <td>{{!this.getBSensorsData.stateMeasureDtime? '':this.getBSensorsData.stateMeasureDtime}}</td>
                                    <td>{{!this.getBSensorsData.updDtime? '':this.getBSensorsData.updDtime}}</td>
                                </tr>
                            </tbody>
                            <tbody v-if="this.beforeVersionSensorsData && connectTap===1 && beforeSensorToggle===1">
                                <!-- <tbody v-else> -->
                                <tr>
                                    <td>{{!this.beforeVersionSensorsData.comStateNm? '': this.beforeVersionSensorsData.comStateNm===null? '':this.beforeVersionSensorsData.comStateCd+"("+this.beforeVersionSensorsData.comStateNm+")"}}</td>
                                    <td>{{!this.beforeVersionSensorsData.batteryValue? '':this.beforeVersionSensorsData.batteryValue==='0'?'0': this.beforeVersionSensorsData.batteryValue+"("+changeSensorBattery(this.beforeVersionSensorsData.batteryValue)+")"}}</td>
                                    <td>{{!this.beforeVersionSensorsData? '': this.beforeVersionSensorsData.rssi===null? '': this.beforeVersionSensorsData.rssi+"("+changeRssi(this.beforeVersionSensorsData.rssi)+")"}}</td>
                                    <td>{{this.beforeVersionSensorsData.checkYnCd ===null|| this.beforeVersionSensorsData.checkYnCd ===undefined ? '' : this.beforeVersionSensorsData.checkYnCd===0?'정상':'점검대상'}}</td>
                                    <td>{{!this.beforeVersionSensorsData? '': this.beforeVersionSensorsData.keepAliveRcvYn===0?'정상':this.beforeVersionSensorsData.keepAliveRcvYn===1?'비정상':'미수신'}}</td>
                                    <td>{{!this.beforeVersionSensorsData.stateMeasureDtime? '': this.beforeVersionSensorsData.stateMeasureDtime}}</td>
                                    <td>{{!this.beforeVersionSensorsData.reportDtime? '': this.beforeVersionSensorsData.reportDtime}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

 export default {
   name: "Tap4",
   props:{
     recipientId: String
   },
   data () {
    return {
      getCSensorsData: null, getCSensorsData2:null,
      getCGatewayData: null, getCGatewayData2:null,
      getCTabletsData: null, getCTabletsData2:null,
      getBSensorsData: null,
      beforeVersionSensorsData: null,
      beforeVersionGatewayData: null,
      beforeVersionTabletsData: null,
      connectTap: 1,
      sensorsTap: 1,
      tmpIdx: null,
      pending : false,
      beforeSensorToggle: 0, beforeGatewayToggle: 0, beforeTabletToggle: 0,
      firmwareUpgradeCheck:false,
      checkCorB: false,
      sensorTakeItems:[], gatewayTakeItems:[], beforeGatewayTakeItems:[], tabletTakeItems:[],
      sensorTake:null, sensorTakeNm:null,
      gatewayTake:null, gatewayTakeNm:null, beforeGatewayTake:null, beforeGatewayTakeNm:null,
      tabletTake:null, tabletTakeNm:null, beforeTabletTake:null, beforeTabletTakeNm:null,
      CbatteryValue:null,
      BbatteryValue:null,
      firmwarelist:[], reverseCheckpopup:false, cmdA4postpopup:false,
      firmwareCData:'', beforeGWpopup:false, beforeGWItems:[], beforeSNpopup:false, beforeSNItems:[],
      saveChangeData:'', changeIncomeNm:'',changeIncomeNm2:'', changeSensorId:'', changeSensorData:'', radiocheck:'', inputCheck:'',
      emphasisValue:'',
      indexNum:0,
    }
   },
   created() {
    this.getCSensers();
    this.getCGateway();
    this.getCTablets();
    this.firmwareList();
    //this.getBeforeVersionSensors();
    //this.getBeforeVersionSensors(this.tmpIdx);
    //this.getBeforeVersionTablets();
    //this.getBeforeVersionGateway();
  },
  methods: {
      delay(){
        //   this.pending = true
      },
      // 센서 현재 통신 상태 함수
       async getCSensers(){
        //    this.pending = false;
        let tmpData = null;
        this.emphasisValue = ''
        const url  = this.$store.state.serverApi + `/admin/sensors?recipientId=${this.recipientId}&recordCountPerPage=30` 
         await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            tmpData = res.data.data
            this.getCSensorsData = tmpData
            this.indexNum = this.getCSensorsData[0].sensorId
            this.getBSensorsData = tmpData[0]
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
          console.log(this.getCSensorsData)
          for(let i=0; i<this.getCSensorsData.length; i++){
            if(this.getCSensorsData[i].sensorVersion.length === 6){
                let result
                result = this.getCSensorsData[i].sensorVersion.substring(1,6)
                this.getCSensorsData[i].sensorVersion = result
                console.log(i)
                console.log(this.getCSensorsData[i].sensorVersion)
            }
          }
          const urlC  = this.$store.state.serverApi + `/admin/recipients/sensors/statehistory?sensorId=${this.getBSensorsData.sensorId}`
          console.log(urlC)
          await axios.get(urlC, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            tmpData = res.data.data
            let arr = []
            arr = tmpData.slice().sort(function(a,b){
                return new Date(b.stateMeasureDtime) - new Date(a.stateMeasureDtime)
            })
            console.log(arr)
            if(tmpData[0].reportDtime === tmpData[1].reportDtime){
                this.getCSensorsData2 = tmpData.slice().sort(function(a,b){
                return new Date(b.stateMeasureDtime) - new Date(a.stateMeasureDtime)
                })
            }else{
                this.getCSensorsData2 = tmpData
            }
            console.log(tmpData)
            // console.log(this.getCSensorsData2)
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
        
        //    setTimeout(this.delay, 2000)
          if(this.getBSensorsData.comStateCd){
                this.getSensorTakeData();
            }
    },
    // 센서 통신상태 이름 변경 함수
    async getSensorTakeData(){
        let url = this.$store.state.serverApi + `/admin/codes?cmmnCdGroup=SENSOR.TAKECD`
        await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
            this.sensorTakeItems = res.data.data
        })
        .catch(error => {
          console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        this.sensorTake = this.sensorTakeItems.filter(cd=>{
        return cd.cmmnCd === this.getBSensorsData.comStateCd
        })
        this.sensorTakeNm = this.sensorTake[0].cmmnCdNm
    },
    // 센서 클릭 시 '장비상태정보' 변경 함수
    getBSensers(input,time){
        this.emphasisValue = input
        console.log(input)
        if(!input) input =0;
        if(!time) time =0;
        if(time===0){
            this.getBSensorsData = this.getCSensorsData[input]
            console.log(this.getBSensorsData)
            this.indexNum = this.getBSensorsData.sensorId
            if(this.checkCorB === true){
            this.getBeforeVersionSensors();
        }
        }else{
            this.getBSensorsData = this.beforeVersionSensorsData[input]
            if(this.checkCorB === true){
            this.getBeforeVersionSensors();
        }
        }
        if(this.getBSensorsData.comStateCd){
            this.getSensorTakeData();
        }
        
    },
    // 게이트웨이 현재 통신 상태 함수
     getCGateway(){
        //  this.pending = false;
        const url  = this.$store.state.serverApi + `/admin/gateways/recipient/${this.recipientId}`
         axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.getCGatewayData = res.data.data
            console.log(this.getCGatewayData)
            if(this.getCGatewayData.firmwareVersion.length === 6){
                let result
                result = this.getCGatewayData.firmwareVersion.substring(1,6)
                console.log(result)
                this.getCGatewayData.firmwareVersion = result
            }
            if(this.getCGatewayData.length===0){alert("연결된 게이트웨이가 존재하지 않습니다")}
            this.getCGatewayReal();
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
        //   setTimeout(this.delay, 1500)
    },
    async getCGatewayReal(){
        let gateway = ''
        const url  = this.$store.state.serverApi + `/admin/recipients/gateway/statehistory?gwId=${this.getCGatewayData.gwId}`
            await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                gateway = res.data.data
                this.getCGatewayData2 = gateway[0]
                console.log(gateway)
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
            this.getGatewayTakeData()
    },
    // 게이트웨이 통신상태 이름 변경 함수
    async getGatewayTakeData(){
        let url = this.$store.state.serverApi + `/admin/codes?cmmnCdGroup=GATEWAY.TAKECD`
        await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
            this.gatewayTakeItems = res.data.data
        })
        .catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        this.gatewayTake = this.gatewayTakeItems.filter(cd=>{
            return cd.cmmnCd === this.getCGatewayData2.comStateCd
        })
        this.gatewayTakeNm = this.gatewayTake[0].cmmnCdNm
    },
    // 테블릿 현재 통신 상태 함수
     getCTablets(){
        //  this.pending = false;
        const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/tablets`
         axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            this.getCTabletsData = res.data.data
            if(this.getCTabletsData.length===0){alert("연결된 태블릿이 존재하지 않습니다")}
            this.getCTablet()
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
        //   setTimeout(this.delay, 1500)
    },
    async getCTablet(){
        let tablet=''
        console.log(this.getCTabletsData.tabletId)
        const url  = this.$store.state.serverApi + `/admin/recipients/tablet/statehistory?tabletId=${this.getCTabletsData.tabletId}`
            await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                this.tablet = res.data.data
                this.getCTabletsData2 = this.tablet[0]
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
            this.getTabletTakeData()
    },
    async getTabletTakeData(){
        let url = this.$store.state.serverApi + `/admin/codes?cmmnCdGroup=TABLET.TAKECD`
        await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
            this.tabletTakeItems = res.data.data
        })
        .catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        this.tabletTake = this.tabletTakeItems.filter(cd=>{
            return cd.cmmnCd === this.getCTabletsData2.comStateCd
        })
    },
    // 현재버전 게이트웨이 호출
    getNowGatewayToggle(){
        this.getCGatewayReal()
        this.beforeGatewayToggle = 0
    },
    getNowTabletToggle(){
        this.getCTablet()
        this.beforeTabletToggle = 0
    },
    //현재버전 센서 호출
    async getNowSensorToggle(){
        console.log(this.indexNum)
        if(this.indexNum === 0){
            console.log("this")
        }
        const url  = this.$store.state.serverApi + `/admin/recipients/sensors/statehistory?sensorId=${this.indexNum}`
        await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let tmpData = res.data.data
            this.getBSensorsData = tmpData[0]
            console.log(this.getBSensorsData)
          })
          .catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
        this.beforeSensorToggle= 0
        this.checkCorB = false
    },
    //이전버전 센서 호출
    async getBeforeVersionSensors(){
        this.checkCorB = true
        let beforeSensor = []
        this.beforeSNItems = []
        this.beforeSensorToggle = 1
        this.tmpIdx = this.getCSensorsData[0];
        this.getCSensorsData2 = ''

        let url  = this.$store.state.serverApi + `/admin/recipients/sensors/statehistory?recordCountPerPage=12&sensorId=${this.getBSensorsData.sensorId}`
        await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            beforeSensor = res.data.data
            console.log(beforeSensor)
            this.beforeVersionSensorsData = beforeSensor[1]
            for(let i=2; i<beforeSensor.length; i++){
                this.beforeSNItems.push(beforeSensor[i])
            }
            this.beforeSNItems = this.beforeSNItems.slice().sort(function(a,b){
                return new Date(b.reportDtime) - new Date(a.reportDtime)
            })
            console.log(this.beforeSNItems)
        })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
        });        
    },
    // 이전 버전 테블릿 호출
    async getBeforeVersionTablets(){
        this.beforeTabletToggle = 1
        let beforetablet=[]
        //this.tmpIdx = this.getCSensorsData[0].sensorId;
        const url  = this.$store.state.serverApi + `/admin/recipients/tablet/statehistory?tabletId=${this.getCTabletsData.tabletId}`
            await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                this.beforetablet = res.data.data
                this.beforeVersionTabletsData = this.beforetablet[1]
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
            this.beforeTabletTake = this.tabletTakeItems.filter(cd=>{
                return cd.cmmnCd === this.beforeVersionTabletsData.comStateCd
            })
            
    },
    // 이전 버전 게이트웨이 호출
    async getBeforeVersionGateway(){
        this.beforeGatewayToggle = 1
        //this.tmpIdx = this.getCSensorsData[0].sensorId;
        let beforegateway=[]
        this.beforeGWItems = []
        const url  = this.$store.state.serverApi + `/admin/recipients/gateway/statehistory?recordCountPerPage=12&gwId=${this.getCGatewayData.gwId}`
            await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                beforegateway = res.data.data
                this.beforeVersionGatewayData = beforegateway[1]
                for(let i=2; i<beforegateway.length; i++){
                    this.beforeGWItems.push(beforegateway[i])
                }
                this.beforeGWItems = this.beforeGWItems.slice().sort(function(a,b){
                    return new Date(b.reportDtime) - new Date(a.reportDtime)
                })
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
            console.log(this.beforeGWItems)
            this.beforeGatewayTake = this.gatewayTakeItems.filter(cd=>{
            return cd.cmmnCd === this.beforeVersionGatewayData.comStateCd
        })
        this.beforeGatewayTakeNm = this.beforeGatewayTake[0].cmmnCdNm
    },  
    dataTogle(value){
        switch (value){
          case 1 : this.connectTap=1;break;
          case 2 : this.connectTap=2;break;
          case 3 : this.connectTap=3;break;

      }
    },
    sensorsTogle(value){
        switch (value){
          case 1 : this.sensorsTap=1 ;break;
          case 2 : this.sensorsTap=2 ;break;
      }
    },
    locationCode(input){
        let result=''
        switch (input){
          case "LOC001" : result="거실"; break;
          case "LOC002" : result="거실2";break;
          case "LOC003" : result="안방"; break;
          case "LOC004" : result="안방2";break;
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
    changeRecipientPhoneno(phone){
        if(phone){
            let changeNumber = phone.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
            return changeNumber
        }else{
            return ''
        }
    
    },
    // 센서 배터리 수치값 
    changeSensorBattery(input){
        if(input === null || input === undefined){
          return ''
        }else if(input === 255){
            return '미수신'
        }else if(input >= 95 && input <= 100){
            return '양호'
        }else if(input < 95 && input > 90){
            return '부족'
        }else{
            return '교체'
        }
    },
    // 테블릿, 게이트웨이 수치값
    changeTaGaBattery(input){
        if(input === null || input === undefined || input === ''){
          return ' '
        }else if(input === 255){
            return '미수신'
        }else if(input >= 51 && input <= 100){
            return '양호'
        }else if(input <= 50 && input > 30){
            return '부족'
        }else{
            return '교체'
        }
    },
    // Rssi 수치값
    changeRssi(input){
        if(input === 255){
            return '미수신'
        }else if(input === null || input === undefined || input === ''){
            return ' '
        }else if(input <= 0 && input >= -80) {
			return "양호";
		}else if( input <-80  && input >= -99) {
			return "미약";
		}else {
			return "나쁨";
		}
    },
    beforepopup(){
        this.beforeGWpopup = true
    },
    beforeSensorpopup(){
        this.beforeSNpopup = true
    },
    reversepopup(){
        this.reverseCheckpopup = true
    },
    reverseCheck(){
        let url = this.$store.state.serverApi + `/admin/revcheck/${this.recipientId}/send`
        axios.patch(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
            let revData = ''
            revData = res.data
            if(revData.data === true){
                alert("성공적으로 요청 되었습니다")
                this.reverseCheckpopup = false
            }
        })
        .catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    cmdA4popup(){
        this.cmdA4postpopup = true
    },
    cmdA4post(){
        let url = this.$store.state.serverApi + `/admin/cmda4/${this.recipientId}/send`
        let data ={
            recipientId:this.recipientId,
            cmd:"cmdA4"
        }
        axios.patch(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          let cmdData = ''
          cmdData = res.data
          if(cmdData.data === true){
              alert("성공적으로 전송되었습니다")
              this.cmdA4postpopup = false
          }
        })
        .catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    // async cmdA4post(){
    //     //let url =  this.$store.state.serverApi2 +`/esms/app/batch/baseUnitSensor.do`
    //     let url =  `/esms/app/batch/baseUnitSensor.do`
    //     //const url =` https://cors.bridged.cc/http://210.122.45.62:8081/esms/app/batch/baseUnitSensor.do`
    //     let data ={
    //         recipientId:this.recipientId,
    //         cmd:"cmdA4"
    //     }
    //     console.log(data)
    //     //console.log(url)
    //      await axios.post(url, data)
    //      //axios.post(`/esms/app/batch/baseUnitSensor.do`, data)
    //      .then(res => {
    //          console.log(res)
    //          let cmdData
    //        cmdData = res.data
    //        if(cmdData.isSuccess === true){
    //            alert("성공적으로 전송되었습니다")
    //        }else{
    //            alert("전송이 실패되었습니다")
    //        }
    //        console.log(cmdData)
    //        //if(this.getCTabletsData.length===0){alert("연결된 태블릿이 존재하지 않습니다")}
    //      })
    //      .catch(error => {
    //          console.log("fail to load")
    //        this.errorMessage = error.message;
    //        console.error("There was an error!", error);
    //      });
    // },
    firmwareList(){
        let url  = this.$store.state.serverApi + `/admin/gateways/firmwarelist`
         axios.get(url,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                this.firmwarelist = res.data.data
                this.firmwareCData = this.firmwarelist[0].version
                if(this.firmwareCData.length === 6){
                let result
                result = this.firmwareCData.substring(1,6)
                console.log(result)
                this.firmwareCData = result
            }
                console.log(this.firmwarelist)
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
    },
    firmwareUpgrade(){
        let url  = this.$store.state.serverApi + `/admin/gateways/${this.getCGatewayData.gwId}/firmware-version`
        let gwid = this.getCGatewayData.gwId
        // let data = {
        //     batteryValue: this.getCGatewayData.batteryValue,
        //     comStateCd: this.getCGatewayData.comStateCd,
        //     equipVersionInfoSeq: this.getCGatewayData.equipVersionInfoSeq,
        //     faultYnCd: this.getCGatewayData.faultYnCd,
        //     firmwareVersion: this.getCGatewayData.firmwareVersion,
        //     gwId: this.getCGatewayData.gwId,
        //     gwStateCd: this.getCGatewayData.gwStateCd,
        //     gwTypeCd: this.getCGatewayData.gwTypeCd,
        //     hardwareVersion: this.getCGatewayData.hardwareVersion,
        //     incomeDate: this.getCGatewayData.incomeDate,
        //     incomeNm: this.getCGatewayData.incomeNm,
        //     logLevel: this.getCGatewayData.logLevel,
        //     macAddr: this.getCGatewayData.macAddr,
        //     orgId: this.getCGatewayData.orgId,
        //     orgNm: this.getCGatewayData.orgNm,
        //     powerLinkYn: this.getCGatewayData.powerLinkYn,
        //     recipientId: this.getCGatewayData.recipientId,
        //     recipientNm: this.getCGatewayData.recipientNm,
        //     rssi: this.getCGatewayData.rssi,
        //     serialNo: this.getCGatewayData.serialNo,
        //     stateMeasureDtime: this.getCGatewayData.stateMeasureDtime,
        //     stateSendCycle: this.getCGatewayData.stateSendCycle,
        //     updDtime: this.getCGatewayData.updDtime
        // }
        let data = {
            firmwareVersion:this.firmwarelist[0].version,
            recipientId:this.getCGatewayData.recipientId,
            regId: this.$store.state.userId,
            regNo: this.firmwarelist[0].regNo
        }
            axios.patch(url,data ,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                let firmware = res.data.data
                if(firmware){
                    alert("성공적으로 업그레이드가 요청되었습니다")
                    this.firmwareUpgradeCheck = false
                }
            })
            .catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
    },
    setIncomeNm(incomeNm){
        if(incomeNm){
            let incomeNmOrId = String(incomeNm)
            return incomeNmOrId = incomeNmOrId.padStart(6, 0)
        }
    },
     checkChar(obj){
         var regExp =  /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
         if(regExp.test(obj)){
            alert("특수문자는 입력하실 수 없습니다.")
            this.changeIncomeNm = obj.substring( 0 , obj.length - 1 )
         }
     },
     firmwareBv(input){
        if(input === null || input ===undefined || input === ''){
            input = this.getCGatewayData.firmwareVersion
        }
        return input
     },
     changeTabletCd(input){
        if(input >= -111 && input <= -85){
            return '보통'
        }else if(input < -111){
            return '나쁨'
        }else{
            return '양호'
        }
     },
     changeTabletCd2(input){
        if(input === 'TAK001' || input === 'TAK002' || input === 'TAK003'){
            return ''
        }else{
            return input
        }
     },
     tabletBv(input){
        if(input === null || input ===undefined || input === ''){
            input = this.getCTabletsData.appVersion
        }
        return input
     },
     sensorNmChange(input){
        let result = input
        switch(input){
            case "응급버튼" : result='응급호출기'; break;
            case "활동감지" : result='활동감지기'; break;
            case "도어감지" : result='출입문감지기'; break;
            case "화재감지" : result='화재감지기'; break;
        }
        return result
     },
     changecomStateCd(input){
        let result = ''
        switch(input){
            case "TAK001" : result='정상'; break;
            case "TAK002" : result='비정상'; break;
            case "TAK003" : result='미수신'; break;
        }
        return result
     },
    reset(index){
        this.radiocheck = this.getCSensorsData[index]
        if(this.radiocheck === this.getCSensorsData[index]){
            this.saveChangeData = ''
        }
        /*if(this.getCSensorsData[index].incomeNm){
            this.changeIncomeNm = this.getCSensorsData[index].incomeNm.padStart(6, 0)
            this.changeIncomeNm2 = this.getCSensorsData[index].incomeNm.padStart(6, 0)
        }else if(!this.getCSensorsData[index].incomeNm){
            this.changeIncomeNm = String(this.getCSensorsData[index].sensorId)
            this.changeIncomeNm = this.changeIncomeNm.padStart(6, 0)
            this.changeIncomeNm2 = this.changeIncomeNm.padStart(6, 0)
        }*/
        this.changeIncomeNm = this.getCSensorsData[index].incomeNm
        this.changeIncomeNm2 = this.getCSensorsData[index].incomeNm

        this.changeSensorData = {  
            sensorId: this.getCSensorsData[index].sensorId,
            orgId: this.getCSensorsData[index].orgId,
            orgNm: this.getCSensorsData[index].orgNm,
            gwId: this.getCSensorsData[index].gwId,
            sensorTypeCd: this.getCSensorsData[index].sensorTypeCd,
            sensorTypeNm: this.getCSensorsData[index].sensorTypeNm,
            incomeNm: this.changeIncomeNm,
            incomeDtime: this.getCSensorsData[index].incomeDtime,
            sensorLocCd: this.getCSensorsData[index].sensorLocCd,
            sensorLocNm: this.getCSensorsData[index].sensorLocNm,
            sensorDetectCycle: this.getCSensorsData[index].sensorDetectCycle,
            gwSendCycle: this.getCSensorsData[index].gwSendCycle,
            svrSendCycle: this.getCSensorsData[index].svrSendCycle,
            stateSvrSendCycle: this.getCSensorsData[index].stateSvrSendCycle,
            stateGwSendCycle: this.getCSensorsData[index].stateGwSendCycle,
            sensorStateCd:this.getCSensorsData[index].sensorStateCd,
            sensorStateNm: this.getCSensorsData[index].sensorStateNm,
            serialNo: this.getCSensorsData[index].serialNo,
            macAddr: this.getCSensorsData[index].macAddr,
            recipientId: this.getCSensorsData[index].recipientId,
            recipientNm: this.getCSensorsData[index].recipientNm,
            sensorVersion: this.getCSensorsData[index].sensorVersion,
            previousVersion: this.getCSensorsData[index].previousVersion,
            regDtime:this.getCSensorsData[index].regDtime,
            sensorNickName: this.getCSensorsData[index].sensorNickName,
            unapprovedYn: this.getCSensorsData[index].unapprovedYn,
            comStateCd: this.getCSensorsData[index].comStateCd,
            comStateNm: this.getCSensorsData[index].comStateNm,
            faultYnCd:this.getCSensorsData[index].faultYnCd,
            checkYnCd:this.getCSensorsData[index].checkYnCd,
            rssi:this.getCSensorsData[index].rssi,
            keepAliveRcvYn:this.getCSensorsData[index].keepAliveRcvYn,
            faultYnNm: this.getCSensorsData[index].faultYnNm,
            batteryValue: this.getCSensorsData[index].batteryValue,
            stateMeasureDtime: this.getCSensorsData[index].stateMeasureDtime,
            updDtime: this.getCSensorsData[index].updDtime,
        }
    },
    async changeIncomeNmData(){
        let check
        let check2
        let check3
        let arr=[]
        if(this.saveChangeData===null||this.saveChangeData===undefined||this.saveChangeData===''){
        alert("변경하시고자 하는 값을 선택해 주세요"); 
        return;
        }
        if(!this.changeIncomeNm){
            alert("센서ID를 입력하여 주세요.")
            return false
        }
        if(this.changeIncomeNm.length > 6){
            alert("센서ID는 여섯자리까지 입력 가능합니다.")
            return false
        }
        /*if(this.changeIncomeNm.length === 6){
            this.changeIncomeNm
        }else if(this.changeIncomeNm.length < 6){
            alert("센서ID를 여섯자리까지 입력하여 주세요.")
            this.changeIncomeNm = this.changeIncomeNm2
            return false
        }
        check = this.getCSensorsData.filter(cd=>{
            return String(cd.incomeNm).padStart(6,0) === this.changeIncomeNm
        })
        check2 = this.getCSensorsData.filter(cd=>{
            return cd.incomeNm === null || cd.incomeNm === '' || cd.incomeNm === undefined
        })
        for(let i =0; i<check2.length; i++){
            if(String(check2[i].sensorId).padStart(6,0) === this.changeIncomeNm){
                check3 = 1
                break;
            }else{
                check3 = 0
            }
        }*/
        check = this.getCSensorsData.filter(cd=>{
            return cd.incomeNm === this.changeIncomeNm
        })
        check2 = this.getCSensorsData.filter(cd=>{
            return cd.incomeNm === null || cd.incomeNm === '' || cd.incomeNm === undefined
        })
        console.log(check)
        console.log(check2)
        for(let i =0; i<check2.length; i++){
            if(check2[i].sensorId === this.changeIncomeNm){
                check3 = 1
                break;
            }else{
                check3 = 0
            }
        }
        if(check.length !== 0 || check3 === 1){
            alert("이미 등록된 센서ID 입니다.")
            this.changeIncomeNm = this.changeIncomeNm2
            return false
        }


        this.changeSensorData.incomeNm = this.changeIncomeNm
        console.log(this.changeSensorData)
        let url = this.$store.state.serverApi+`/admin/sensors/${this.changeSensorData.sensorId}`
        await axios.post(url,this.changeSensorData, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
              let resData = res.data.data
              console.log(res)
              if(resData){
                alert("성공적으로 변경되었습니다.")
                this.saveChangeData = ''
                this.radiocheck = ''
                this.getCSensers()
              }
            })
            .catch(error => {
                console.log("fail to load")
              this.errorMessage = error.message;
              console.error("There was an error!", error);
            });
    },
    
    

   },
   
 }
 </script>

<style scoped>
</style>                