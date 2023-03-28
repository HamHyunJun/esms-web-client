<template>
  <div class="box_style box_r" style="height: 270px;">
    <div class="result_txt">
      <p style="float: left; width: 17%; fontSize: 18px; height: 10px; margin-bottom: 20px;">전원연결</p>
      <p style="float: left; width: 73%; fontSize: 18px; height: 10px; margin-bottom: 20px;">통신상태</p>
    </div>
    <div>
      <p style="float: left; width: 17%;">게이트웨이</p>
      <p style="float: left; width: 17%;">응급호출기</p>
      <p style="float: left; width: 17%;">화재감지기</p>
      <p style="float: left; width: 17%;">도어센서</p>
      <p style="float: left; width: 16%;">활동감지센서</p>
      <p style="float: left; width: 16%;">생활안심센서</p>
    </div>
    <div style="float: left; width: 14%; ">
      <canvas height="150px" width="200px" ref="doughnutChart1"/>
    </div>
    <div></div>
    <div></div>
    <div style="float: left; width: 14%; margin-left: 2%;">
      <canvas height="150px" width="200px" ref="doughnutChart2"/>
    </div>
    <div style="float: left; width: 14%; margin-left: 2%;">
      <canvas height="150px" width="200px" ref="doughnutChart3"/>
    </div>
    <div style="float: left; width: 14%; margin-left: 3%;">
      <canvas height="150px" width="200px" ref="doughnutChart4"/>
    </div>
    <div style="float: left; width: 14%; margin-left: 3%;">
      <canvas height="150px" width="200px" ref="doughnutChart5"/>
    </div>
    <div style="float: left; width: 14%; margin-left: 3%;">
      <canvas height="150px" width="200px" ref="doughnutChart6"/>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import moment from "moment";
import { eventBus } from "@/main.js";


export default {
  data:() => ({
    PwchartData1: null,
    PwchartData2: null,
    PwchartData3: null,
    PwchartData4: null,
    PwchartData5: null,
    PwchartData6: null,
    PwchartOptions: null,
    PwchartImage1: null,
    PwchartImage2: null,
    PwchartImage3: null,
    PwchartImage4: null,
    PwchartImage5: null,
    PwchartImage6: null,
    PwGwData: [ 19, 5 ],
    PwEmData: [14, 5, 8],
    PwFiData:[14, 5, 8],
    PwDoData: [14, 5, 8],
    PwAcData: [14, 5, 8],
    PwLiData: [14, 5, 8],
    comChartItems:[],
    newPwGwArr:[],
    newPwEmArr:[],
    newPwFiArr:[],
    newPwDoArr:[],
    newPwAcArr:[],
    newPwLiArr:[],
    s_date: null,
  }),
  mounted(){
    this.createPwData();
    this.getDataFromLookUp();
  },
  methods:{
    createPwData(){
      let data1 = {
        type: 'doughnut',
        labels: ['연결', '차단'],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.GwData,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(173, 176, 187, 0.8)"],
        borderColor: 'rgba(255, 255, 255, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      }]
      }
      let data2 = {
        type: 'doughnut',
        labels: ['수신', '미수신', '양호'],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.EmData,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(173, 176, 187, 0.8)", "rgba(255, 60, 166, 0.8)"],
        borderColor: 'rgba(255, 255, 255, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      }]
      }
      let data3 = {
        type: 'doughnut',
        labels: ['수신', '미수신', '양호'],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.FiData,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(173, 176, 187, 0.8)", "rgba(255, 60, 166, 0.8)"],
        borderColor: 'rgba(255, 255, 255, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      }]
      }
      let data4 = {
        type: 'doughnut',
        labels: ['수신', '미수신', '양호'],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.DoData,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(173, 176, 187, 0.8)", "rgba(255, 60, 166, 0.8)"],
        borderColor: 'rgba(255, 255, 255, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      }]
      }
      let data5 = {
        type: 'doughnut',
        labels: ['수신', '미수신', '양호'],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.AcData,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(173, 176, 187, 0.8)", "rgba(255, 60, 166, 0.8)"],
        borderColor: 'rgba(255, 255, 255, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      }]
      }
      let data6 = {
        type: 'doughnut',
        labels: ['수신', '미수신', '양호'],
        labelsColor: 'white',
        datasets: [{
        label: '연결',
        data: this.LiData,
        backgroundColor: [ "rgba(19, 126, 255, 0.8)", "rgba(173, 176, 187, 0.8)", "rgba(255, 60, 166, 0.8)"],
        borderColor: 'rgba(255, 255, 255, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      }]
      }
      let options = {
        responsive: false,
        plugins: { 
        legend: { 
          display: true, 
          position: "bottom", 
          labels: { boxWidth: 10, padding: 6, usePointStyle: true, pointStyle: "circle", font: { size: 14 } }, 
          fullSize: false, 
          align: "center" 
          }, 
          tooltip: { boxWidth: 10, bodyFont: { size: 15 } }
        },
        responsive: true, 
        maintainAspectRatio: true, 
        layout: { 
        padding: { 
          top: 2, 
          bottom: 2 
        } 
        }, 
        elements: { 
        arc: { 
          borderWidth: 2 
        } 
        }, 
        animation: { 
          duration: 5 
        } 
      }
      this.PwchartData1 = data1
      this.PwchartData2 = data2
      this.PwchartData3 = data3
      this.PwchartData4 = data4
      this.PwchartData5 = data5
      this.PwchartData6 = data6
      this.PwchartOptions = options
      this.chartRedraw();
    },
    PwchartRedraw(){
      this.PwchartImage1 = new Chart(this.$refs.doughnutChart1, {
        type:'doughnut',
        data:this.PwchartData1,
        options:this.PwchartOptions
      })
      this.PwchartImage2 = new Chart(this.$refs.doughnutChart2, {
        type:'doughnut',
        data:this.PwchartData2,
        options:this.PwchartOptions
      })
      this.PwchartImage3 = new Chart(this.$refs.doughnutChart3, {
        type:'doughnut',
        data:this.PwchartData3,
        options:this.PwchartOptions
      })
      this.PwchartImage4 = new Chart(this.$refs.doughnutChart4, {
        type:'doughnut',
        data:this.PwchartData4,
        options:this.PwchartOptions
      })
      this.PwchartImage5 = new Chart(this.$refs.doughnutChart5, {
        type:'doughnut',
        data:this.PwchartData5,
        options:this.PwchartOptions
      })
      this.PwchartImage6 = new Chart(this.$refs.doughnutChart6, {
        type:'doughnut',
        data:this.PwchartData6,
        options:this.PwchartOptions
      })
      this.PwchartImage1.update();
      this.PwchartImage2.update();
      this.PwchartImage3.update();
      this.PwchartImage4.update();
      this.PwchartImage5.update();
      this.PwchartImage6.update();
    },
    getDataFromLookUp(){
      eventBus.$on("PwLookUp", (PwChartItems, s_date) => 
      {
          this.s_date = s_date
          if(PwChartItems != ''){
          this.comChartItems = PwChartItems
          
          let tmpArr1 = []
          let tmpArr2 = []
          let tmpArr3 = []
          let tmpArr4 = []
          let tmpArr5 = []
          let tmpArr6 = []
          this.newGwArr = []
          this.newEmArr = []
          this.newFiArr = []
          this.newDoArr = []
          this.newAcArr = []
          this.newLiArr = []

          for(let i=0; i<this.comChartItems.length; i++){
            if(this.comChartItems[i].sensorTypeCd==="TPE000"){
              tmpArr1.push({
                sensorTypeCd: this.comChartItems[i].sensorTypeCd,
                statCnt: this.comChartItems[i].statCnt,
                statName: this.comChartItems[i].statName,
              })
            }
            if(this.comChartItems[i].sensorTypeCd==="TPE001"){
              tmpArr2.push({
                sensorTypeCd: this.comChartItems[i].sensorTypeCd,
                statCnt: this.comChartItems[i].statCnt,
                statName: this.comChartItems[i].statName,
              })
            }
            if(this.comChartItems[i].sensorTypeCd==="TPE002"){
              tmpArr3.push({
                sensorTypeCd: this.comChartItems[i].sensorTypeCd,
                statCnt: this.comChartItems[i].statCnt,
                statName: this.comChartItems[i].statName,
              })
            }
            if(this.comChartItems[i].sensorTypeCd==="TPE003"){
              tmpArr4.push({
                sensorTypeCd: this.comChartItems[i].sensorTypeCd,
                statCnt: this.comChartItems[i].statCnt,
                statName: this.comChartItems[i].statName,
              })
            }
            if(this.comChartItems[i].sensorTypeCd==="TPE004"){
              tmpArr5.push({
                sensorTypeCd: this.comChartItems[i].sensorTypeCd,
                statCnt: this.comChartItems[i].statCnt,
                statName: this.comChartItems[i].statName,
              })
            }
            if(this.comChartItems[i].sensorTypeCd==="TPE005"){
              tmpArr6.push({
                sensorTypeCd: this.comChartItems[i].sensorTypeCd,
                statCnt: this.comChartItems[i].statCnt,
                statName: this.comChartItems[i].statName,
              })
            }
          }

          

          let makeArr1=[]
          let makeArr2=[]
          let makeArr3=[]
          let makeArr4=[]
          let makeArr5=[]
          let makeArr6=[]
          //배열 전체 순환
          
          tmpArr1.forEach(item=>{
            makeArr1.push(item.statCnt)
          })
          tmpArr2.forEach(item=>{
            makeArr2.push(item.statCnt)
          })
          tmpArr3.forEach(item=>{
            makeArr3.push(item.statCnt)
          })
          tmpArr4.forEach(item=>{
            makeArr4.push(item.statCnt)
          })
          tmpArr5.forEach(item=>{
            makeArr5.push(item.statCnt)
          })
          tmpArr6.forEach(item=>{
            makeArr6.push(item.statCnt)
          })
          for(let i=0; i<2; i++){
          this.newGwArr.push({
            sensorTypeCd: "TPE000",
            statName: null,
            statCnt: 0,
          })}
          for(let i=0; i<3; i++){
          this.newEmArr.push({
            sensorTypeCd: "TPE001",
            statName: null,
            statCnt: 0,
          })
          this.newFiArr.push({
            sensorTypeCd: "TPE002",
            statName: null,
            statCnt: 0,
          })
          this.newDoArr.push({
            sensorTypeCd: "TPE003",
            statName: null,
            statCnt: 0,
          })
          this.newAcArr.push({
            sensorTypeCd: "TPE004",
            statName: null,
            statCnt: 0,
          })
          this.newLiArr.push({
            sensorTypeCd: "TPE005",
            statName: null,
            statCnt: 0,
          })}
          this.newEmArr=[],
          this.newFiArr=[],
          this.newDoArr=[],
          this.newAcArr=[],
          this.newLiArr=[],

          this.newGwArr = makeArr1
          this.newEmArr[2] = makeArr2
          this.newFiArr[2] = makeArr3
          this.newDoArr[2] = makeArr4
          this.newAcArr[2] = makeArr5
          this.newLiArr[2] = makeArr6

          

          this.remakeData();
        }
      });
    },
    remakeData(){
      this.PwchartImage1.destroy();
      this.PwchartImage2.destroy();
      this.PwchartImage3.destroy();
      this.PwchartImage4.destroy();
      this.PwchartImage5.destroy();
      this.PwchartImage6.destroy();  
      this.GwData = this.newGwArr
      this.EmData = this.newEmArr
      this.FiData = this.newFiArr
      this.DoData = this.newDoArr
      this.AcData = this.newAcArr
      this.LiData = this.newAcArr
      this.PwchartData1.datasets[0].data = this.GwData
      this.PwchartData2.datasets[0].data = this.EmData
      this.PwchartData3.datasets[0].data = this.FiData
      this.PwchartData4.datasets[0].data = this.DoData
      this.PwchartData5.datasets[0].data = this.AcData
      this.PwchartData6.datasets[0].data = this.LiData
      this.chartRedraw();
    },
  }
}

</script>

<style scoped>

</style>