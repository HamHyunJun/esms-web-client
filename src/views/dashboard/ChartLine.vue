<template>
  <div class="box_col3 box_style">
    <p>장비가동률</p>    
   <div>
      <canvas class="statistics-charts-line" ref="lineChart" width="470" height="275"></canvas>
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
    EuData: [ 12, 19, 3, 5, 2, 3, 7 ],
    comChartItems:[],
    newEuArr:[],
    s_date: null,
    newChartLabelArr:[],
    newChartMMLabelArr:[],
    newChartDDLabelArr:[],
  }),
  mounted(){
    this.createData();
    this.getDataFromLookUp();
  },
  methods:{
    chartRedraw(){
      this.chartImage = new Chart(this.$refs.lineChart,{
        type:'line',
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
        type: 'bar',
        data: this.EuData,
        backgroundColor:'rgba(17, 183, 135, 1)',
        maxBarThickness: 30,
        },{
        label: '# of Votes',
        type: 'line',
        data: this.EuData,
        borderColor:'rgba(17, 183, 135, 0.8)',
        borderWidth: 3.5,
        tension: 0.5,
        fill: true,
        backgroundColor: 'rgba(17, 183, 135, 0.2)',
        animation: {        
          easing: 'easeInOutQuart'
        }
        }]
      }
      let options={
      scales: {
        y: {
          beginAtZero: true,
          ticks:{
            min: 0,
            max: 100,
            stepSize: 5
          }
        }
      },
      plugins:{
        legend: {
		      display: false,
		    },
        tooltip: { boxWidth: 10, bodyFont: { size: 15 } }
      }
      }
      this.chartData = data
      this.chartOptions = options
      this.createChartDateTime()
      this.chartRedraw();
    },
    getDataFromLookUp(){
      eventBus.$on("CtLookUp", (CtChartItems, s_date) => 
      {
          this.s_date = s_date
          if(CtChartItems != ''){
          this.comChartItems = CtChartItems
          let tmpArr1 = []
          this.newEuArr=[]
          this.newChartLabelArr=[]
          this.newChartMMLabelArr=[]
          this.newChartDDLabelArr=[]

          for(let i=0; i<7; i++){
            tmpArr1.push({
              statDate: moment(s_date).add(i,'days').format('YYYYMMDD'),
              installCnt:1,
              operCnt: 1,
            })
          }
          for(let i=0; i<this.comChartItems.length; i++){
            if(this.comChartItems[i].installCnt != "0"){
              let tmpidx = tmpArr1.findIndex(idx =>{
                return idx.statDate == this.comChartItems[i].statDate
              })
              tmpArr1[tmpidx].installCnt = this.comChartItems[i].installCnt
              tmpArr1[tmpidx].operCnt = this.comChartItems[i].operCnt
            }else{
              tmpArr1[i].installCnt = "1"
              tmpArr1[i].operCnt = "1"
            }
          }
          for(let i=0; i<7; i++){
            this.newEuArr[i] = (tmpArr1[i].operCnt/tmpArr1[i].installCnt*100)
            if(this.newEuArr[i] == "0"){
              this.newEuArr[i] = 100
            }
            this.newChartMMLabelArr.push(tmpArr1[i].statDate.substring(4, 6))
            this.newChartDDLabelArr.push(tmpArr1[i].statDate.substring(6, 8))
            this.newChartLabelArr.push(this.newChartMMLabelArr[i] +"-"+ this.newChartDDLabelArr[i])
          }
          this.remakeData();
        }
      });
    },
  
    remakeData(){
      this.chartImage.destroy();  
      this.EuData = this.newEuArr
      this.chartData.datasets[0].data = this.EuData
      this.chartData.datasets[1].data = this.EuData
      this.chartData.labels = this.newChartLabelArr
      this.chartRedraw();
    },
  }
}
</script>

<style scoped>

</style>