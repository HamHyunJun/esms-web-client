<template>
    <div>
        <div class="tabcontent now">
            <div class="tabcnt01">
                <ul>
                    <li>
                        <i class="ico01"></i>
                        <div class="txt" style="text-align:center">
                            <strong>{{this.reportMeasureData.TPE005}}</strong>
                            <p>심장박동</p>
                        </div>
                    </li>
                    <li>
                        <i class="ico02"></i>
                        <div class="txt" style="text-align:center">
                            <strong >{{this.reportMeasureData.TPE011}}</strong>
                            <p >호흡</p>
                        </div>
                    </li>
                    <li>
                        <i class="ico03"></i>
                        <div class="txt" style="text-align:center">
                            <strong>{{this.reportMeasureData.TPE012}}</strong>
                            <p>활동량</p>
                        </div>
                    </li>
                </ul>
            </div>    
        </div>
        <div class="box_style2 box_col">
            <ul class="info_list">
                <li>
                    <i class="ico01"></i>
                    <div class="txt" style="text-align:center">
                        <strong>{{this.reportMeasureData.TPE007}}</strong>
                        <p>습도</p>
                    </div>
                </li> 
                <li>
                    <i class="ico02"></i>
                    <div class="txt" style="text-align:center">
                        <strong>{{this.reportMeasureData.TPE006}}</strong>
                        <p>온도</p>
                    </div>
                </li> 
                <li>
                    <i class="ico03"></i>
                    <div class="txt" style="text-align:center">
                        <strong>{{this.reportMeasureData.TPE008}}</strong>
                        <p>조도</p>
                    </div>
                </li> 
                <li>
                    <i class="ico04"></i>
                    <div class="txt" v-if="gwPowerChange(this.gwPower.powerLinkYn)==='연결'" style="text-align:center">
                        <strong>{{gwPowerChange(this.gwPower.powerLinkYn)}}</strong>
                        <p>전원연결</p>
                    </div>
                    <div class="txt" v-else style="text-align:center">
                        <strong style="color:red;" class="blinking">{{gwPowerChange(this.gwPower.powerLinkYn)}}</strong>
                        <p>전원연결</p>
                    </div>
                </li> 
                <li>
                    <i class="ico05"></i>
                    <div class="txt" v-if="this.reportMeasureData.TPE012" style="text-align:center">
                        <strong>감지</strong>
                        <p>활동감지</p>
                    </div>
                    <div class="txt" v-else style="text-align:center">
                        <strong style="color:red" class="blinking">미감지</strong>
                        <p>활동감지</p>
                    </div>
                </li> 
            </ul>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "Menu1",
    props:{
        recipientId: String
    },
    data () {
        return {
            reportMeasureData:{
                TPE005:0,
                TPE011:0,
                TPE006:0,
                TPE008:0,
                TPE007:0,
                TPE012:0,
            },
            gwPower:'',
        }
    },
    created(){
        this.getMeasuresData();
        this.getGatewayPowerLink();
        
    },
    methods:{
        async getGatewayPowerLink(){
            const uri = this.$store.state.serverApi + `/admin/gateways/recipient/${this.recipientId}`
            await axios.get(uri, {headers: {"Authorization": sessionStorage.getItem("token")}})
                .then(response => {
                  this.gwPower = response.data.data
                })
                .catch(error => {
                  this.errorMessage = error.message;
                  console.error("There was an error!", error);
                });
            },
        gwPowerChange(input){
            if(input === 1){
                return '연결'
            }else{
                return '차단'
            }
        },
      async getMeasuresData(){
        
      //여기
        const url  =  this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/sensors/lastmeasures`
        let lastMeasures
        let measureValuetmp1=[]
        let measureValuetmp2=[]
        let measureValuetmp3=[]
        let measureValuetmp4=[]
        let measureValuetmp5=[]
        let measureValuetmp6=[]
        this.reportMeasureData = { TPE005: 0,TPE011: 0,TPE006: 0,TPE008: 0,TPE007: 0,TPE012: 0 } 
        await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
            lastMeasures = res.data.data
            //this.reportMeasureData => 선언 처리 수정
            if(!lastMeasures){
              this.reportMeasureData = { TPE005: 0,TPE011: 0,TPE006: 0,TPE008: 0,TPE007: 0,TPE012: 0 } 
            }else{
                for(let i = 0 ; i<6 ; i++){
                    if(!lastMeasures[i]){
                        continue;
                    }else if(lastMeasures[i].sensorTypeCd ==="TPE006"){
                        measureValuetmp1 = lastMeasures[i].measureValue.split(',')
                        //this.reportMeasureData.TPE006 = measureValuetmp1[0]
                        this.reportMeasureData.TPE006 = measureValuetmp1[measureValuetmp1.length -1]
                        // if(this.reportMeasureData.TPE006 === '0'){
                        // for(let i=measureValuetmp1.length-1; i>=0; i--){
                        //     if(this.reportMeasureData.TPE006 === '0'){
                        //         this.reportMeasureData.TPE006 = measureValuetmp1[i]
                        //     }else{
                        //         break;
                        //     }
                        // }
                        // }
                    }else if(lastMeasures[i].sensorTypeCd ==="TPE007"){
                        measureValuetmp2 = lastMeasures[i].measureValue.split(',')
                        //this.reportMeasureData.TPE007 = measureValuetmp2[0]
                        this.reportMeasureData.TPE007 = measureValuetmp2[measureValuetmp2.length -1]
                        // if(this.reportMeasureData.TPE007 === '0'){
                        // for(let i=measureValuetmp2.length-1; i>=0; i--){
                        //     if(this.reportMeasureData.TPE007 === '0'){
                        //     this.reportMeasureData.TPE007 = measureValuetmp2[i]
                        //     }else{
                        //         break;
                        //     }
                        // }
                        // }
                    }else if(lastMeasures[i].sensorTypeCd ==="TPE008"){
                        measureValuetmp3 = lastMeasures[i].measureValue.split(',')
                        //this.reportMeasureData.TPE008 = measureValuetmp3[0]
                        this.reportMeasureData.TPE008 = measureValuetmp3[measureValuetmp3.length -1]
                        // if(this.reportMeasureData.TPE008 === '0'){
                        // for(let i=measureValuetmp3.length-1; i>=0; i--){
                        //     if(this.reportMeasureData.TPE008 === '0'){
                        //     this.reportMeasureData.TPE008 = measureValuetmp3[i]
                        //     }else{
                        //         break;
                        //     }
                        // }
                        // }
                    }else if(lastMeasures[i].sensorTypeCd ==="TPE005"){
                        measureValuetmp4 = lastMeasures[i].measureValue.split(',')
                        //this.reportMeasureData.TPE005 = measureValuetmp4[0]
                        this.reportMeasureData.TPE005 = measureValuetmp4[measureValuetmp4.length -1]
                        // if(this.reportMeasureData.TPE005 === '0'){
                        // for(let i=measureValuetmp4.length-1; i>=0; i--){
                        //     if(this.reportMeasureData.TPE005 === '0'){
                        //     this.reportMeasureData.TPE005 = measureValuetmp4[i]
                        //     }else{
                        //         break;
                        //     }
                        // }
                        // }
                    }else if(lastMeasures[i].sensorTypeCd ==="TPE011"){
                        measureValuetmp5 = lastMeasures[i].measureValue.split(',')
                        //this.reportMeasureData.TPE011 = measureValuetmp5[0]
                        this.reportMeasureData.TPE011 = measureValuetmp5[measureValuetmp5.length -1]
                        // if(this.reportMeasureData.TPE011 === '0'){
                        // for(let i=measureValuetmp5.length-1; i>=0; i--){
                        //     if(this.reportMeasureData.TPE011 === '0'){
                        //     this.reportMeasureData.TPE011 = measureValuetmp5[i]
                        //     }else{
                        //         break;
                        //     }
                        // }
                        // }
                    }else if(lastMeasures[i].sensorTypeCd ==="TPE012"){
                        measureValuetmp6 = lastMeasures[i].measureValue.split(',')
                        //this.reportMeasureData.TPE012 = measureValuetmp6[0]
                        this.reportMeasureData.TPE012 = measureValuetmp6[measureValuetmp6.length -1]
                        // if(this.reportMeasureData.TPE012 === '0'){
                        // for(let i=measureValuetmp6.length-1; i>=0; i--){
                        //     if(this.reportMeasureData.TPE012 === '0'){
                        //     this.reportMeasureData.TPE012 = measureValuetmp6[i]
                        //     }else{
                        //         break;
                        //     }
                        // }
                        // }
                    }
                }
                /*this.reportMeasureData = {
                    TPE005: !lastMeasures ? 0: lastMeasures.find(lm=>{return lm? lm.sensorTypeCd === "TPE005" : 0}).measureValue,//.split(',').slice(-1)[0],//심박
                    TPE011: !lastMeasures ? 0: lastMeasures.find(lm=>{return lm? lm.sensorTypeCd === "TPE011" : 0}).measureValue,//.split(',').slice(-1)[0],//호흡
                    TPE006: !lastMeasures ? 0: lastMeasures.find(lm=>{return lm? lm.sensorTypeCd === "TPE006" : 0}).measureValue,//.split(',').slice(-1)[0],//온도
                    TPE008: !lastMeasures ? 0: lastMeasures.find(lm=>{return lm? lm.sensorTypeCd === "TPE008" : 0}).measureValue,//.split(',').slice(-1)[0],//조도
                    TPE007: !lastMeasures ? 0: lastMeasures.find(lm=>{return lm? lm.sensorTypeCd === "TPE007" : 0}).measureValue,//.split(',').slice(-1)[0],//습도
                    TPE012: !lastMeasures ? 0: lastMeasures.find(lm=>{return lm? lm.sensorTypeCd === "TPE012" : 0}).measureValue,//.split(',').slice(-1)[0],//활동량
                }*/
            }
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        
        //setInterval(this.getMeasuresData, 300000)
    },
  }
}


</script>
<style>
.blinking{
  -webkit-animation: blink 0.5s ease-in-out infinite alternate;
  -moz-animation: blink 0.5s ease-in-out infinite alternate;
  animation: blink 0.5s ease-in-out infinite alternate;
}

@-webkit-keyframes blink{
  0% {opacity: 0;}
  100% {opacity: 1;}
}

@-moz-keyframes blink{
  0% {opacity: 0;}
  100% {opacity: 1;}
}

@keyframes blink{
  0% {opacity: 0;}
  100% {opacity: 1;}
}
</style>
