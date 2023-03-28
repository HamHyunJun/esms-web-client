<template>
  <div class="box_col3 box_style" style="margin-left:20px">
    <p>응급 이벤트 현황</p>    
  <div>
    <canvas class="statistics-charts-line" ref="BarChart" width="470" height="275" ></canvas>
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
    chartData: null,
    chartOptions: null,
    chartImage: null,
    FireData: [ 12, 19, 7, 5, 8, 13, 7 ],
    EmData: [10, 12, 11, 10, 10, 15, 9],
    SafeData:[5, 12, 10, 7, 7, 8, 17],
    comChartItems:[],
    newChartArr:[],
    newFireArr:[],
    newEmArr:[],
    newSafeArr:[],
    s_date: null,
    newChartLabelArr:[],
    newChartMMLabelArr:[],
    newChartDDLabelArr:[],
  }),
//  [{eventcd: '',occureDate:'yy-mm-dd'},{},{}]
  mounted(){
    this.createData();
    this.getDataFromLookUp();
  },
  methods:{
    getDataFromLookUp(){
      eventBus.$on("EvLookUp", (EvChartItems, s_date) => 
      {
          this.s_date = s_date
          if(EvChartItems != ''){
          this.comChartItems = EvChartItems
          let tmpArr1 = []
          let tmpArr2 = []
          let tmpArr3 = []
          this.newChartArr=[]
          this.newFireArr = []
          this.newEmArr = []
          this.newSafeArr = []
          this.newChartLabelArr=[]
          this.newChartMMLabelArr=[]
          this.newChartDDLabelArr=[]

          for(let i=0; i<7; i++){
            tmpArr1.push({
              alarmCnt:0,
              eventCd: null,
              occurDate: moment(s_date).add(i,'days').format('YYYYMMDD'),
            })
            tmpArr2.push({
              alarmCnt:0,
              eventCd: null,
              occurDate: moment(s_date).add(i,'days').format('YYYYMMDD'),
            })
            tmpArr3.push({
              alarmCnt:0,
              eventCd: null,
              occurDate: moment(s_date).add(i,'days').format('YYYYMMDD'),
            })
          }
          
          //"E1013"
          for(let i=0; i<this.comChartItems.length; i++){
            if(this.comChartItems[i].eventCd==="E1013"){
              let tmpidx = tmpArr1.findIndex(idx =>{
                return idx.occurDate == this.comChartItems[i].occurDate
              })
              tmpArr1[tmpidx].alarmCnt = this.comChartItems[i].alarmCnt
              tmpArr1[tmpidx].eventCd = this.comChartItems[i].eventCd
            }
            if(this.comChartItems[i].eventCd==="E1014"){
              let tmpidx = tmpArr2.findIndex(idx =>{
                return idx.occurDate == this.comChartItems[i].occurDate
              })
              tmpArr2[tmpidx].alarmCnt = this.comChartItems[i].alarmCnt
              tmpArr2[tmpidx].eventCd = this.comChartItems[i].eventCd
            }
            if(this.comChartItems[i].eventCd==="E1016"){
              let tmpidx = tmpArr3.findIndex(idx =>{
                return idx.occurDate == this.comChartItems[i].occurDate
              })
              tmpArr3[tmpidx].alarmCnt = this.comChartItems[i].alarmCnt
              tmpArr3[tmpidx].eventCd = this.comChartItems[i].eventCd
            }
          }
          for(let i=0; i<7; i++){
            this.newFireArr.push(tmpArr1[i].alarmCnt)
            this.newEmArr.push(tmpArr2[i].alarmCnt)
            this.newSafeArr.push(tmpArr3[i].alarmCnt)
            this.newChartMMLabelArr.push(tmpArr1[i].occurDate.substring(4, 6))
            this.newChartDDLabelArr.push(tmpArr1[i].occurDate.substring(6, 8))
            this.newChartLabelArr.push(this.newChartMMLabelArr[i] +"-"+ this.newChartDDLabelArr[i])
          }
          this.remakeData();
        }
      });
    },
  
    remakeData(){
      this.chartImage.destroy();  
      this.FireData = this.newFireArr
      this.EmData = this.newEmArr
      this.SafeData = this.newSafeArr
      this.chartData.datasets[0].data = this.FireData
      this.chartData.datasets[1].data = this.EmData
      this.chartData.datasets[2].data = this.SafeData
      this.chartData.labels = this.newChartLabelArr
      this.chartRedraw();
    },

    chartRedraw(){  
      this.chartImage = new Chart(this.$refs.BarChart, {
        type:'bar',
        data:this.chartData,
        options:this.chartOptions
      })
      this.chartImage.update();
    },
    
    createChartDateTime(){
      if(this.chartData){
        let tmp = this.chartData.datasets[0].data.length
        let nowDate = moment().add(1,'days').format('MM-DD');
        let tmpArr = []
        for(let i=tmp ; i>0; i--){
          tmpArr.push(moment(nowDate).subtract(1*i, 'days').format('MM-DD'))
        }
        this.chartData.labels = tmpArr
      }
    },
    createData(){
      let data =  {
      labels: [],
      labelsColor: 'rgba(17, 183, 1, 1)',
      datasets: [
        {
        label: '화재',
        data: this.FireData,
        maxBarThickness: 10,    
        backgroundColor: ["rgba(19, 126, 255, 0.8)",]
        },
        {
        label: '응급',
        data: this.EmData,
        maxBarThickness: 10,  
        backgroundColor: ['rgba(17, 183, 135, 1)',],
      },
      {
        label:'119',
        data: this.SafeData,
        maxBarThickness: 10,  
        backgroundColor: ["rgba(255, 60, 166, 0.8)",],
      }]
      }
      let options={
      scales: {
        y: {
          beginAtZero: true,
          ticks:{
            stepSize: 1
          }
        }
      },
      plugins:{
        legend: {
		      display: true,
          position: 'top',
          align: 'end',
          labels: {
            fontColor: 'rgba(255, 255, 255, 1)',
            boxWidth: 8,
            usePointStyle: true
          },
		    },
        tooltip: { boxWidth: 10, bodyFont: { size: 15 } }
      }
    }
    this.chartData = data
    this.chartOptions = options
    this.createChartDateTime()
    this.chartRedraw();
    }

  }
}
</script>

<style scoped>

</style>