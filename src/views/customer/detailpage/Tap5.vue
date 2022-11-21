<template>
    <div style="margin-top : -20px">
        <div class="tabcontent">
            <div class="tablist_wrap">
                <div class="tablist">
                    <div class="list_top">
                        <div class="title_area">
                            <p class="tit">활동 미감지</p>
                        </div>
                        
                    </div>
                    <div class="list">
                        <div class="tbody">
                            <table>
                                <colgroup>
                                    <col style="width:25%;">
                                    <col style="width:25%;">
                                    <col style="width:35%;">
                                </colgroup>
                                <tbody>
                                    <tr class="m_input">
                                        <td >설정 값(분)</td>
                                        <td>
                                            <div class="input_area">
                                                <input type="text" name="activeUnsensingCycle" id="activeUnsensingCycle" v-model="setactiveUnsensingCycle">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="list_top">
                                                <div v-if="this.getCSensorsData.length === 0"></div>
                                                <div v-else class="btn_area" >
                                                    <button type="button" class="btn form2" @click="sendActiveUnsensingCycle">저장</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tablist">
                    <div class="list_top">
                        <div class="title_area">
                            <p class="tit">게이트웨이 상태 전송</p>
                        </div>
                        
                    </div>
                    <div class="list">
                        <div class="tbody">
                            <table>
                                <colgroup>
                                    <col style="width:25%;">
                                    <col style="width:25%;">
                                    <col style="width:35%;">
                                </colgroup>
                                <tbody>
                                    <tr class="m_input">
                                        <td >설정 값(분)</td>
                                        <td>
                                            <div class="input_area">
                                                <input type="text" name="gatewaySendTime" id="gatewaySendTime" v-model="setGatewayStateSendCycle">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="list_top">
                                                <div v-if="this.getCSensorsData.length === 0"></div>
                                                <div v-else class="btn_area">
                                                    <button type="button" class="btn form2" @click="sendCGateway">저장</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tablist" style="margin-top : 10px">
                <div class="list_top">
                    <div class="title_area">
                        <p class="tit">센서 감지 주기 및 전송 주기</p>
                    </div>
                    <div v-if="this.getCSensorsData.length === 0"></div>
                    <div v-else class="btn_area">
                        <button type="button" class="btn form2" @click="saveSensorsDetectData">저장</button>
                    </div>
                </div>
                <div class="list bd_btm">
                    <table>
                        <colgroup>
                            <col style="width:5%;">
                            <col style="width:11%;">
                            <col style="width:11%;">
                            <col style="width:13%;">
                            <col style="width:15%;">
                            <col style="width:15%;">
                            <col style="width:15%;">
                            <col style="width:15%;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <th scope="col">선택</th>
                                <th scope="col">센서종류</th>
                                <th scope="col">설치장소</th>
                                <th scope="col">MAC Addr</th>
                                <th scope="col">감지 주기(초)</th>
                                <th scope="col">G/W 전송주기(초)</th>
                                <th scope="col">APP 전송주기(초)</th>
                                <th scope="col">서버 전송주기(분)</th>               
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody htype-03">
                        <table>
                            <colgroup>
                                <col style="width:5%;">
                                <col style="width:11%;">
                                <col style="width:11%;">
                                <col style="width:13%;">
                                <col style="width:15%;">
                                <col style="width:15%;">
                                <col style="width:15%;">
                                <col style="width:15%;">
                            </colgroup>
                            <tbody v-if="!getCSensorsData">
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
                                <tr v-for="(item,index) in getCSensorsData" v-bind:key="index">
                                    <td v-if="item.sensorTypeCd !=='TPE001' && item.sensorTypeCd !=='TPE003'&& item.sensorTypeCd !=='TPE004'&& item.sensorTypeCd !=='TPE009'&& item.sensorTypeCd !=='TPE010' ">
                                        <div class="chk_area radio">
                                            <input type="radio" name="sensorsDetect" :id="`radio1_${index}`" v-model="sensorsDetect" :value="index" @click="check(index)">
                                            <label :for="`radio1_${index}`" class="chk"><i class="ico_chk"></i></label>
                                        </div>
                                    </td>
                                    <td v-else></td>
                                    <td>{{sensorNmChange(item.sensorTypeNm)}}</td>
                                    <!-- {{getCSensorsData[sensorsDetect]}} 이렇게 뽑아서 쓰면 된단말 -->
                                    <td> {{locationCode(item.sensorLocCd)}}</td>
                                    <td>{{item.macAddr}}</td>
                                    <td v-if="item.sensorTypeCd !=='TPE001' && item.sensorTypeCd !=='TPE003'&& item.sensorTypeCd !=='TPE004'&& item.sensorTypeCd !=='TPE009'&& item.sensorTypeCd !=='TPE010' ">
                                        <!-- <div class="input_area" v-if="sensorsDetect===index">
                                            <input type="text" name="" v-model="sensorDetectCycle" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">초
                                        </div> -->
                                        <div>{{item.sensorDetectCycle}}</div>
                                    </td>
                                    <td v-else>실시간</td>
                                    <td v-if="item.sensorTypeCd !=='TPE001' && item.sensorTypeCd !=='TPE003'&& item.sensorTypeCd !=='TPE004'&& item.sensorTypeCd !=='TPE009'&& item.sensorTypeCd !=='TPE010' ">
                                        <div class="input_area" v-if="sensorsDetect===index">
                                            <input type="text" name="" v-model="gwSendCycle" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">초
                                        </div>
                                        <div v-else>{{item.gwSendCycle}}</div>
                                    </td>
                                    <td v-else>실시간</td>
                                    <td v-if="item.sensorTypeCd !=='TPE001' && item.sensorTypeCd !=='TPE003'&& item.sensorTypeCd !=='TPE004'&& item.sensorTypeCd !=='TPE009'&& item.sensorTypeCd !=='TPE010' ">
                                        <div class="input_area" v-if="sensorsDetect===index">
                                            <input type="text" name=""  v-model="gwAppSendCycle" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">초
                                        </div>
                                        <div v-else>{{item.gwAppSendCycle}}</div>
                                    </td>
                                    <td v-else>실시간</td>
                                    <td v-if="item.sensorTypeCd !=='TPE001' && item.sensorTypeCd !=='TPE003'&& item.sensorTypeCd !=='TPE004'&& item.sensorTypeCd !=='TPE009'&& item.sensorTypeCd !=='TPE010' ">
                                        <div class="input_area" v-if="sensorsDetect===index">
                                            <input type="text" name=""  v-model="svrSendCycle" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">분
                                        </div>
                                        <div v-else>{{item.svrSendCycle === 0? 60 : item.svrSendCycle}}</div>
                                    </td>
                                    <td v-else>실시간</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tablist type-02">
                <div class="list_top">
                    <div class="title_area">
                        <p class="tit">센서 상태값 전송 주기</p>
                    </div>
                    <div v-if="this.getCSensorsData.length === 0"></div>
                    <div v-else class="btn_area" >
                        <button type="button" class="btn form2" @click="saveSensorsStateData">저장</button>
                    </div>
                </div>
                <div class="list bd_btm">
                    <table>
                        <colgroup>
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:15%;">
                            <col style="width:15%;">
                            <col style="width:26%;">
                            <col style="width:26%;">
                        </colgroup>
                        <thead class="thead htype-01">
                            <tr>
                                <th scope="col">선택</th>
                                <th scope="col">센서종류</th>
                                <th scope="col">설치장소</th>
                                <th scope="col">MAC Addr</th>
                                <th scope="col">G/W 전송주기(분)</th>
                                <th scope="col">서버 전송주기(분)</th>                                                
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody htype-03">
                        <table>
                            <colgroup>
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:15%;">
                                <col style="width:15%;">
                                <col style="width:26%;">
                                <col style="width:26%;">
                            </colgroup>
                            <tbody v-if="!getCSensorsData">
                                <tr>
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
                                <tr v-for="(item,index) in sensorData" v-bind:key="index">
                                    <td>
                                        <div class="chk_area radio">
                                            <input type="radio" name="sensorsState" :id="`radio2_${index}`" v-model="sensorsState" :value="index" @click="check(index)">
                                            <label :for="`radio2_${index}`" class="chk"><i class="ico_chk"></i></label>
                                        </div>
                                    </td>
                                    <td>{{sensorNmChange(item.sensorTypeNm)}}</td>
                                    <td>{{locationCode(item.sensorLocCd)}}</td>
                                    <td>{{item.macAddr}}</td>
                                    <td >
                                        <div class="input_area" v-if="sensorsState === index">
                                            <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" :name="`stateGwSendCycle_${index}`" :id="`stateGwSendCycle_${index}`" v-model="stateGwSendCycle"
                                            >분
                                            <!-- oninput="this.value = this.value.replace(/[^1-4.]/g, '').replace(/(\..*)\./g, '$1');" -->
                                        </div>
                                        <div v-else>{{item.stateGwSendCycle}}</div>
                                    </td>
                                    <td >
                                        <div class="input_area" v-if="sensorsState === index">
                                            <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" :name="`stateSvrSendCycle_${index}`" :id="`stateSvrSendCycle_${index}`" v-model="stateSvrSendCycle"
                                             >분
                                        </div>
                                        <div v-else>{{item.stateSvrSendCycle}}</div>
                                    </td>
                                    
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
//import moment from "moment";

 export default {
   name: "Tap5",
   props:{
     recipientId: String
   },
   data () {
     return {
      getCSensorsData: null,
      sensorsDetect:null,
      newGwSendCycle: null,
      getCGatewayData: null,
      setGatewayStateSendCycle: '',
      sensorsState: null,
      resBodyData: null,
      setactiveUnsensingCycle:'',
      svrsendCheck : '', statesvrsendCheck:'',
      gwsendCheck : '', stategwsendCheck:'', 
      detsendCheck : '', statedetsendCheck:'',
      appsendCheck : '', stateappsendCheck:'', 
      resCheck1:'', stateresCheck1:'',
      resCheck2:'', stateresCheck2:'',
      resCheck3:'', stateresCheck3:'',
      resCheck4:'', stateresCheck4:'',
      radioCheck:'',
      formatG : '', formatS : '',
      gwSendCycle: '', svrSendCycle:'',
      stateGwSendCycle:'', stateSvrSendCycle:'', 
      sensorData:[],
     }
   },
   created() {
    this.getCSensers();
    this.getCGateway();
    this.getRecipientInfo();
  },
  methods: {
    limNum: function(event) {
        this.$emit('input', event.target.value);
        
        
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
    msChange(code,input){
        let result = 0
        switch (code){
          case 1 : result=Math.ceil(input/60); break;
          case 2 : result=Math.ceil(input/3600) ;break;
        }
        return result
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
          case "LOC008" : result="현관2" ;break;
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
    //getRecipient value
    getRecipientInfo() {
        //let uri = this.$store.state.serverApi + "/recipients/" + sessionStorage.getItem("recipid");
        let uri = this.$store.state.serverApi + "/admin/recipients/" + this.recipientId
        console.log(uri)
        axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
                this.resBodyData = res.data.data
                console.log("resbodyData is ");
                console.log(this.resBodyData)
                if(this.resBodyData.activeUnsensingCycle){
                    this.setactiveUnsensingCycle = this.resBodyData.activeUnsensingCycle
                }else{
                    this.setactiveUnsensingCycle = 0
                }
            })
            .catch(error => {
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
        },
    //getsenser value
    async getCSensers(){
        console.log(this.getCSensorsData)
    const url  = this.$store.state.serverApi + `/admin/sensors?recipientId=${this.recipientId}&recordCountPerPage=30`
    await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
        let tmpData = res.data.data
        console.log(tmpData)
        // tmpData.forEach(element =>{
        //     element.stateGwSendCycle = Math.ceil(element.stateGwSendCycle/3600)
        //     element.stateSvrSendCycle = Math.ceil(element.stateSvrSendCycle/3600)
        // })
        this.getCSensorsData = tmpData
        console.log(this.getCSensorsData)
        this.sensorData = tmpData.filter(cd=>{
            return cd.sensorTypeCd === 'TPE001' || cd.sensorTypeCd === 'TPE002' || cd.sensorTypeCd === 'TPE003' || cd.sensorTypeCd === 'TPE004' 
        })
        console.log(this.sensorData)
        this.gwSendCycle = this.getCSensorsData.gwSendCycle
        console.log("sensors ")
        console.log(this.getCSensorsData)

        })
        .catch(error => {
            console.log("fail to load")
        this.errorMessage = error.message;
        console.error("There was an error!", error);
        });
          

    },
    //getGateWay value
    getCGateway(){
        const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/gateways`
        axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let tmpData= res.data.data
            this.getCGatewayData = tmpData
            if(this.getCGatewayData.stateSendCycle){
                this.setGatewayStateSendCycle = this.getCGatewayData.stateSendCycle
            }else{
                this.setGatewayStateSendCycle = 0
            }
            
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    //활동 미감지
    sendActiveUnsensingCycle(){
        console.log(this.recipientId)
        console.log(this.newActiveUnsensingCycle)
        let newActiveUnsensingCycle = this.resBodyData
        newActiveUnsensingCycle.activeUnsensingCycle = this.setactiveUnsensingCycle//*60
        const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/active-unsensing-cycle`
        // /sensors/{sensorId}/gw-send-cycle
        axios.patch(url,newActiveUnsensingCycle,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let resData = res.data.data
            console.log(resData)
            // this.getCSensorsData = res.data.data
            // console.log("sensors ")
            // console.log(this.getCSensorsData)
            if(resData){
                alert("성공적으로 저장되었습니다.")
            }
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    //게이트웨이 상태전송
    sendCGateway(){
        console.log(this.getCGatewayData)
        let sensorsId = this.getCGatewayData.gwId
        let newGatewayData = this.getCGatewayData
        newGatewayData.stateSendCycle = this.setGatewayStateSendCycle
        const url  = this.$store.state.serverApi + `/admin/gateways/${sensorsId}/state-send-cycle`
        // /sensors/{sensorId}/gw-send-cycle
        axios.patch(url,newGatewayData,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let resData = res.data.data
            console.log(resData)
            if(resData){
                alert("성공적으로 저장되었습니다.")
            }
            
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });


   },
   check(index){
    // this.sensorsDetect = this.getCSensorsData[index].
    console.log(this.getCSensorsData[index])
    //센서 감지 주기 model 값
    this.sensorDetectCycle = this.getCSensorsData[index].sensorDetectCycle
    this.gwSendCycle = this.getCSensorsData[index].gwSendCycle
    this.gwAppSendCycle = this.getCSensorsData[index].gwAppSendCycle
    this.svrSendCycle = this.getCSensorsData[index].svrSendCycle === 0 ? 60 : this.getCSensorsData[index].svrSendCycle
    //센서 상태값 전송 주기 model 값
    this.stateGwSendCycle = this.getCSensorsData[index].stateGwSendCycle
    this.stateSvrSendCycle = this.getCSensorsData[index].stateSvrSendCycle

    this.svrsendCheck = this.getCSensorsData[index].svrSendCycle
    this.gwsendCheck = this.getCSensorsData[index].gwSendCycle
    //this.detsendCheck = this.getCSensorsData[index].sensorDetectCycle
    this.appsendCheck = this.getCSensorsData[index].gwAppSendCycle
    this.statesvrsendCheck = this.getCSensorsData[index].stateSvrSendCycle
    this.stategwsendCheck = this.getCSensorsData[index].stateGwSendCycle
    //this.statedetsendCheck = this.getCSensorsData[index].sensorDetectCycle
    this.stateappsendCheck = this.getCSensorsData[index].gwAppSendCycle


    this.radioCheck = this.getCSensorsData[index].macAddr
    if(this.radioCheck === this.getCSensorsData[index].macAddr){
        this.sensorsDetect = ''
        this.sensorsState = ''
        this.radioCheck = ''
    }
   },
   //센서 감지 전송주기
    async saveSensorsDetectData(){
        if(this.sensorsDetect===null || this.sensorsDetect===undefined || this.sensorsDetect === ''){
            alert('변경하시고자 하는 센서 종류를 선택해주세요')
            return false;
        }
        //svrSendCycle, gwSendCycle
        console.log(this.getCSensorsData[this.sensorsDetect])
        let sensorsDetectData = this.getCSensorsData[this.sensorsDetect]
        let sensorsId= this.getCSensorsData[this.sensorsDetect].sensorId
        //sensorsDetectData.svrSendCycle = 
        //console.log(this.sensorDetectCycle)
        console.log(this.gwSendCycle)
        console.log(this.gwAppSendCycle)
        console.log(this.svrSendCycle)

        
        
        
        if(this.gwSendCycle !=60 && this.gwSendCycle !=120 && this.gwSendCycle !=180 && this.gwSendCycle !=240 &&
        this.gwSendCycle !=300 && this.gwSendCycle !=360 && this.gwSendCycle !=420 && this.gwSendCycle !=480 && 
        this.gwSendCycle !=540 && this.gwSendCycle !=600 && this.gwSendCycle !=660 && this.gwSendCycle !=720 &&
        this.gwSendCycle !=780 && this.gwSendCycle !=840 && this.gwSendCycle !=900 && this.gwSendCycle !=960 &&
        this.gwSendCycle !=1020 && this.gwSendCycle !=1080 && this.gwSendCycle !=1140 && this.gwSendCycle !=1200 &&
        this.gwSendCycle !=1260 && this.gwSendCycle !=1320 && this.gwSendCycle !=1380 && this.gwSendCycle !=1440 &&
        this.gwSendCycle !=1500 && this.gwSendCycle !=1560 && this.gwSendCycle !=1620 && this.gwSendCycle !=1680 &&
        this.gwSendCycle !=1740 && this.gwSendCycle !=1800 && this.gwSendCycle !=1860 && this.gwSendCycle !=1920 &&
        this.gwSendCycle !=1980 && this.gwSendCycle !=2040 && this.gwSendCycle !=2100 && this.gwSendCycle !=2160 &&
        this.gwSendCycle !=2220 && this.gwSendCycle !=2280 && this.gwSendCycle !=2340 && this.gwSendCycle !=2400 &&
        this.gwSendCycle !=2460 && this.gwSendCycle !=2520 && this.gwSendCycle !=2580 && this.gwSendCycle !=2640 &&
        this.gwSendCycle !=2700 && this.gwSendCycle !=2760 && this.gwSendCycle !=2820 && this.gwSendCycle !=2880 &&
        this.gwSendCycle !=2940 && this.gwSendCycle !=3000 && this.gwSendCycle !=3060 && this.gwSendCycle !=3120 &&
        this.gwSendCycle !=3180 && this.gwSendCycle !=3240 && this.gwSendCycle !=3300 && this.gwSendCycle !=3360 &&
        this.gwSendCycle !=3420 && this.gwSendCycle !=3480 && this.gwSendCycle !=3540 && this.gwSendCycle !=3600 ){
            alert('G/W 전송주기는 3600까지 60의 배수 중 선택 값을 입력해 주세요')
            console.log("sensorsStateData.stateGwSendCycle")
            console.log(sensorsDetectData.gwSendCycle)
            this.gwSendCycle = this.gwsendCheck
            return false;
        }

        if(this.svrSendCycle !=60 && this.svrSendCycle !=120 && this.svrSendCycle !=180 && this.svrSendCycle !=240){
            alert('서버 전송주기는 60,120,180,240 중 값을 입력해 주세요')
            this.svrSendCycle = this.svrsendCheck
            return false;
        }
        console.log(this.gwSendCycle)
        console.log(this.sensorDetectCycle)
        if(this.gwSendCycle%this.sensorDetectCycle != 0){
            alert('G/W 전송주기는 감지주기의 배수여야 합니다.')
            return false
        }else if(this.gwAppSendCycle%this.gwSendCycle != 0){
            alert('APP 전송주기는 G/W 전송주기의 배수여야 합니다.')
            return false
        }else if((this.svrSendCycle*60)%this.gwAppSendCycle != 0){
            alert('서버 전송주기는 APP 전송주기의 배수여야 합니다.')
            return false
        }
        //const urlD = this.$store.state.serverApi + `/admin/sensors/${sensorsId}/sensor-detect-cycle` 
        const urlS  = this.$store.state.serverApi + `/admin/sensors/${sensorsId}/svr-send-cycle`
        const urlA = this.$store.state.serverApi + `/admin/sensors/${sensorsId}/app-send-cycle`
        const urlG  = this.$store.state.serverApi + `/admin/sensors/${sensorsId}/gw-send-cycle`
        sensorsDetectData.gwSendCycle = this.gwSendCycle
        sensorsDetectData.svrSendCycle = this.svrSendCycle
        //sensorsDetectData.sensorDetectCycle = this.sensorDetectCycle
        sensorsDetectData.gwAppSendCycle = this.gwAppSendCycle
        
        // if(this.detsendCheck != sensorsDetectData.sensorDetectCycle){
        //     console.log("this 111 ok")
        // await axios.patch(urlD,sensorsDetectData,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        //   .then(res => {
        //     let resData = res.data.data
        //     this.resCheck1 = resData
        //     // this.getCSensorsData = res.data.data
        //     // console.log("sensors ")
        //     // console.log(this.getCSensorsData)
        //     // if(resData){
        //     //     alert("저장이 완료되었습니다.")
        //     // }

        //   })
        //   .catch(error => {
        //       console.log("fail to load")
        //     this.errorMessage = error.message;
        //     console.error("There was an error!", error);
        //   });
        //  }
         if(this.appsendCheck != sensorsDetectData.gwAppSendCycle){
            console.log("this 222 ok")
        await axios.patch(urlA,sensorsDetectData,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let resData = res.data.data
            this.resCheck2 = resData
            // this.getCSensorsData = res.data.data
            // console.log("sensors ")
            // console.log(this.getCSensorsData)
            // if(resData){
            //     alert("저장이 완료되었습니다.")
            // }

          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
         }
        if(this.svrsendCheck != sensorsDetectData.svrSendCycle){
            console.log("this 333 ok")
        await axios.patch(urlS,sensorsDetectData,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let resData = res.data.data
            this.resCheck3 = resData
            // this.getCSensorsData = res.data.data
            // console.log("sensors ")
            // console.log(this.getCSensorsData)
            // if(resData){
            //     alert("저장이 완료되었습니다.")
            // }

          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
         }
        if(this.gwsendCheck != sensorsDetectData.gwSendCycle){
            console.log("this 444 ok")
        await axios.patch(urlG,sensorsDetectData,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let resData = res.data.data
            this.resCheck4 = resData
            // this.getCSensorsData = res.data.data
            // console.log("sensors ")
            // console.log(this.getCSensorsData)
            // if(resData){
            //     alert("저장이 완료되었습니다.")
            // }

          })
          .catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
        }
        // if(this.resCheck1 === true && !this.resCheck2 && !this.resCheck3 && !this.resCheck4){
        //     alert("저장이 완료되었습니다.")
        //     this.sensorsDetect = ''
        //     this.resCheck1 = ''
        //     this.getCSensers()
        // }if(this.resCheck1 === true && this.resCheck2 === true && !this.resCheck3 && !this.resCheck4){
        //     alert("저장이 완료되었습니다.")
        //     this.sensorsDetect = ''
        //     this.resCheck1 = ''
        //     this.getCSensers()
        // }if(this.resCheck1 === true && !this.resCheck2 && this.resCheck3 === true && !this.resCheck4){
        //     alert("저장이 완료되었습니다.")
        //     this.sensorsDetect = ''
        //     this.resCheck1 = ''
        //     this.getCSensers()
        // }if(this.resCheck1 === true && !this.resCheck2 && !this.resCheck3 && this.resCheck4 === true){
        //     alert("저장이 완료되었습니다.")
        //     this.sensorsDetect = ''
        //     this.resCheck1 = ''
        //     this.getCSensers()
        // }


        // if(this.resCheck2 === true && !this.resCheck1 && !this.resCheck3 && !this.resCheck4){
        //     alert("저장이 완료되었습니다.")
        //     this.sensorsDetect = ''
        //     this.resCheck2 = ''
        //     this.getCSensers()
        // }
        // if(this.resCheck3 === true && !this.resCheck1 && !this.resCheck2 && !this.resCheck4){
        //     alert("저장이 완료되었습니다.")
        //     this.sensorsDetect = ''
        //     this.resCheck3 = ''
        //     this.getCSensers()
        
        // }if(this.resCheck4 === true && !this.resCheck1 && !this.resCheck2 && !this.resCheck3){
        //     alert("저장이 완료되었습니다.")
        //     this.sensorsDetect = ''
        //     this.resCheck4 = ''
        //     this.getCSensers()
        // }
        if(this.resCheck2 || this.resCheck3 || this.resCheck4){
            alert("성공적으로 저장되었습니다.")
            this.sensorsDetect = ''
            //this.resCheck1 = ''
            this.resCheck2 = ''
            this.resCheck3 = ''
            this.resCheck4 = ''
            this.getCSensers()
        }

    },
    //센서 상태값 전송주기
    async saveSensorsStateData(){
        //stateGwSendCycle, stateSvrSendCycle
        console.log(this.sensorsState)

        if(this.sensorsState===null || this.sensorsState===undefined){
            alert('변경하시고자 하는 센서 종류를 선택해주세요')
            return false;
        }
        console.log(this.getCSensorsData[this.sensorsState])
        let sensorsStateData = this.getCSensorsData[this.sensorsState]
        sensorsStateData.stateGwSendCycle = this.stateGwSendCycle
        sensorsStateData.stateSvrSendCycle = this.stateSvrSendCycle
        console.log(sensorsStateData)
        console.log(this.stategwsendCheck)

        if(this.stateGwSendCycle !=60 && this.stateGwSendCycle !=120 && this.stateGwSendCycle !=180 && this.stateGwSendCycle !=240){
            alert('60,120,180,240 중 값을 입력해 주세요')
            console.log("sensorsStateData.stateGwSendCycle")
            console.log(sensorsStateData.stateGwSendCycle)
            this.stateGwSendCycle = this.stategwsendCheck
            return false;
        }

        if(this.stateSvrSendCycle !=60 && this.stateSvrSendCycle !=120 && this.stateSvrSendCycle !=180 && this.stateSvrSendCycle !=240){
            alert('60,120,180,240 중 값을 입력해 주세요')
            this.stateSvrSendCycle = this.statesvrsendCheck
            return false;
        }


        let sensorsData = sensorsStateData
        let sensorsId= this.getCSensorsData[this.sensorsState].sensorId
        const urlS  = this.$store.state.serverApi + `/admin/sensors/${sensorsId}/state-svr-send-cycle`
        const urlG  = this.$store.state.serverApi + `/admin/sensors/${sensorsId}/state-gw-send-cycle`
        //this.getCSensorsData

        if(this.statesvrsendCheck != sensorsStateData.stateSvrSendCycle){
            console.log("서버 전송주기 확인")
        await axios.patch(urlS,sensorsData,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let resData = res.data.data
            console.log(resData)
            this.statesvrsendCheck = resData
            // this.getCSensorsData = res.data.data
            // console.log("sensors ")
            // console.log(this.getCSensorsData)
            
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
        }
        
        if(this.stategwsendCheck != sensorsStateData.stateGwSendCycle){
            console.log("게이트웨이 전송주기 확인")
        await axios.patch(urlG,sensorsData,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let resData = res.data.data
            console.log(resData)
            this.stateresCheck2 = resData
            // this.getCSensorsData = res.data.data
            // console.log("sensors ")
            // console.log(this.getCSensorsData)
            
          })
          .catch(error => {
              console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
        }
        console.log(this.stateresCheck1)
        console.log(this.stateresCheck2)
        if(this.statesvrsendCheck === true && !this.stateresCheck2){
            alert("성공적으로 저장되었습니다.")
            this.sensorsState = ''
            this.statesvrsendCheck = ''
            this.getCSensers()
        }
        if(!this.statesvrsendCheck && this.stateresCheck2 === true){
            alert("성공적으로 저장되었습니다.")
            this.sensorsState = ''
            this.stateresCheck2 = ''
            this.getCSensers()
        }
        if(this.statesvrsendCheck && this.stateresCheck2){
            alert("성공적으로 저장되었습니다.")
            this.sensorsState = ''
            this.statesvrsendCheck = ''
            this.stateresCheck2 = ''
            this.getCSensers()
        }
    },

   },

}
 </script>

<style scoped>
</style> 