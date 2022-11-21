<template>

  <div class="box_col3 box_style" sytle="margin-left: 20px;">
    <div>
      <colgroup>
        <col style="width:2%;" >
        <col style="width:1.5%;">
        <col style="width:1.5%;">
        <col style="width:1.5%;">
        <col style="width:1%;">
      </colgroup>
      <thead>
      <tr>
        <th>구 분</th>
        <th>A/S 요청</th>
        <th>A/S 접수</th>
        <th>A/S 완료</th>
        <th>취  소</th>
      </tr>
      <br>
      </thead>
      <div class="tbody">
        <colgroup>
         <col style="width:2%;" >
         <col style="width:1.5%;">
         <col style="width:1.4%;">
         <col style="width:1.2%;">
         <col style="width:0.7%;">
        </colgroup>
        <tbody>
          <tr>
            <th scope="col">게이트웨이</th>
            <th scope="col">{{this.gwrqCount}}</th>
            <th scope="col">{{this.gwrcCount}}</th>
            <th scope="col">{{this.gwcpCount}}</th>
            <th scope="col">{{this.gwcaCount}}</th>
          </tr>
          <br>
          <tr>
            <th scope="col">응급호출기</th>
            <th scope="col">{{this.emrqCount}}</th>
            <th scope="col">{{this.emrcCount}}</th>
            <th scope="col">{{this.emcpCount}}</th>
            <th scope="col">{{this.emcaCount}}</th>
          </tr>
          <br>
          <tr>
            <th scope="col">활동감지기</th>
            <th scope="col">{{this.acrqCount}}</th>
            <th scope="col">{{this.acrcCount}}</th>
            <th scope="col">{{this.accpCount}}</th>
            <th scope="col">{{this.accaCount}}</th>
          </tr>
          <br>
          <tr>
            <th scope="col">화재감지기</th>
            <th scope="col">{{this.firqCount}}</th>
            <th scope="col">{{this.fircCount}}</th>
            <th scope="col">{{this.ficpCount}}</th>
            <th scope="col">{{this.ficaCount}}</th>
          </tr>
          <br>
          <tr>
            <th scope="col">출입문감지기</th>
            <th scope="col">{{this.dorqCount}}</th>
            <th scope="col">{{this.dorcCount}}</th>
            <th scope="col">{{this.docpCount}}</th>
            <th scope="col">{{this.docaCount}}</th>
          </tr>
          <br>
          <tr>
            <th scope="col">생활안심센서</th>
            <th scope="col">{{this.lirqCount}}</th>
            <th scope="col">{{this.lircCount}}</th>
            <th scope="col">{{this.licpCount}}</th>
            <th scope="col">{{this.licaCount}}</th>
          </tr>
        </tbody>
        </div>
    </div>
    <div>
      <canvas width="470" height="1">
      </canvas>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return{
      gwrqCount: 0, gwrcCount: 0, gwcpCount: 0, gwcaCount: 0,
      emrqCount: 0, emrcCount: 0, emcpCount: 0, emcaCount: 0,
      acrqCount: 0, acrcCount: 0, accpCount: 0, accaCount: 0,
      firqCount: 0, fircCount: 0, ficpCount: 0, ficaCount: 0,
      dorqCount: 0, dorcCount: 0, docpCount: 0, docaCount: 0,
      lirqCount: 0, lircCount: 0, licpCount: 0, licaCount: 0,
    }
  },
  methods:{
    // 게이트웨이 AS 요청,접수,완료
    getGwCount(){
      let url =this.$store.state.serverApi + "/admin/organizations/stat/as?startDate="+this.s_date+"&endDate="+this.e_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            let gwrqData = response.data.data
            let gwrqCArrToString = ''
            let fgwrqCArrToString = ''

            let gwrcData = response.data.data
            let gwrcCArrToString = ''
            let fgwrcCArrToString = ''

            let gwcpData = response.data.data
            let gwcpCArrToString = ''
            let fgwcpCArrToString = ''

            let gwcaData = response.data.data
            let gwcaCArrToString = ''
            let fgwcaCArrToString = ''

            // 요청
            gwrqCArrToString = gwrqData.filter(cd=>{
            return cd.typeCd ==="TPE000"
            })
            if(gwrqCArrToString.length != ''){
            fgwrqCArrToString = gwrqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(fgwrqCArrToString.length != ''){
            this.gwrqCount = fgwrqCArrToString[0].typeCnt
            }else{
              this.gwrqCount = '0';
            }}else{
              this.gwrqCount = '0';
            }
            // 접수
            gwrcCArrToString = gwrcData.filter(cd=>{
            return cd.typeCd ==="TPE000"
            })
            if(gwrcCArrToString != ''){
            fgwrcCArrToString = gwrcCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(fgwrcCArrToString != ''){
            this.gwrcCount = fgwrcCArrToString[0].typeCnt
            }else{
              this.gwrcCount = '0';
            }}else{
              this.gwrcCount = '0';
            }
            // 완료
            gwcpCArrToString = gwcpData.filter(cd=>{
            return cd.typeCd ==="TPE000"
            })
            if(gwcpCArrToString != ''){
            fgwcpCArrToString = gwcpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(fgwcpCArrToString != ''){
            this.gwcpCount =fgwcpCArrToString[0].typeCnt
            }else{
              this.gwcpCount = '0';
            }}else{
              this.gwcpCount = '0';
            }
            // 취소
            gwcaCArrToString = gwcaData.filter(cd=>{
            return cd.typeCd ==="TPE000"
            })
            if(gwcaCArrToString != ''){
            fgwcaCArrToString = gwcaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(fgwcaCArrToString != ''){
            this.gwcaCount =fgwcaCArrToString[0].typeCnt
            }else{
              this.gwcaCount = '0';
            }}else{
              this.gwcaCount = '0';
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getEmCount(){
      let url =this.$store.state.serverApi + "/admin/organizations/stat/as?startDate="+this.s_date+"&endDate="+this.e_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            let emrqData = response.data.data
            let emrqCArrToString = ''
            let femrqCArrToString = ''

            let emrcData = response.data.data
            let emrcCArrToString = ''
            let femrcCArrToString = ''

            let emcpData = response.data.data
            let emcpCArrToString = ''
            let femcpCArrToString = ''

            let emcaData = response.data.data
            let emcaCArrToString = ''
            let femcaCArrToString = ''

            // 요청
            emrqCArrToString = emrqData.filter(cd=>{
            return cd.typeCd ==="TPE001"
            })
            if(emrqCArrToString.length != ''){
            femrqCArrToString = emrqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(femrqCArrToString.length != ''){
            this.emrqCount = femrqCArrToString[0].typeCnt
            }else{
              this.emrqCount = '0';
            }}else{
              this.emrqCount = '0';
            }
            // 접수
            emrcCArrToString = emrcData.filter(cd=>{
            return cd.typeCd ==="TPE001"
            })
            if(emrcCArrToString != ''){
            femrcCArrToString = emrcCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(femrcCArrToString != ''){
            this.emrcCount = femrcCArrToString[0].typeCnt
            }else{
              this.emrcCount = '0';
            }}else{
              this.emrcCount = '0';
            }
            // 완료
            emcpCArrToString = emcpData.filter(cd=>{
            return cd.typeCd ==="TPE001"
            })
            if(emcpCArrToString != ''){
            femcpCArrToString = emcpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(femcpCArrToString != ''){
            this.emcpCount =femcpCArrToString[0].typeCnt
            }else{
              this.emcpCount = '0';
            }}else{
              this.emcpCount = '0';
            }
            // 취소
            emcaCArrToString = emcaData.filter(cd=>{
            return cd.typeCd ==="TPE000"
            })
            if(emcaCArrToString != ''){
            femcaCArrToString = emcaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(femcaCArrToString != ''){
            this.emcaCount =femcaCArrToString[0].typeCnt
            }else{
              this.emcaCount = '0';
            }}else{
              this.emcaCount = '0';
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getAcCount(){
      let url =this.$store.state.serverApi + "/admin/organizations/stat/as?startDate="+this.s_date+"&endDate="+this.e_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            let acrqData = response.data.data
            let acrqCArrToString = ''
            let facrqCArrToString = ''

            let acrcData = response.data.data
            let acrcCArrToString = ''
            let facrcCArrToString = ''

            let accpData = response.data.data
            let accpCArrToString = ''
            let faccpCArrToString = ''

            let accaData = response.data.data
            let accaCArrToString = ''
            let faccaCArrToString = ''

            // 요청
            acrqCArrToString = acrqData.filter(cd=>{
            return cd.typeCd ==="TPE002"
            })
            if(acrqCArrToString.length != ''){
            facrqCArrToString = acrqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(facrqCArrToString.length != ''){
            this.acrqCount = facrqCArrToString[0].typeCnt
            }else{
              this.acrqCount = '0';
            }}else{
              this.acrqCount = '0';
            }
            // 접수
            acrcCArrToString = acrcData.filter(cd=>{
            return cd.typeCd ==="TPE002"
            })
            if(acrcCArrToString != ''){
            facrcCArrToString = acrcCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(facrcCArrToString != ''){
            this.acrcCount = facrcCArrToString[0].typeCnt
            }else{
              this.acrcCount = '0';
            }}else{
              this.acrcCount = '0';
            }
            // 완료
            accpCArrToString = accpData.filter(cd=>{
            return cd.typeCd ==="TPE002"
            })
            if(accpCArrToString != ''){
            faccpCArrToString = accpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(faccpCArrToString != ''){
            this.accpCount =faccpCArrToString[0].typeCnt
            }else{
              this.accpCount = '0';
            }}else{
              this.accpCount = '0';
            }
            // 취소
            accaCArrToString = accaData.filter(cd=>{
            return cd.typeCd ==="TPE000"
            })
            if(accaCArrToString != ''){
            faccaCArrToString = accaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(faccaCArrToString != ''){
            this.accaCount =faccaCArrToString[0].typeCnt
            }else{
              this.accaCount = '0';
            }}else{
              this.accaCount = '0';
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getFiCount(){
      let url =this.$store.state.serverApi + "/admin/organizations/stat/as?startDate="+this.s_date+"&endDate="+this.e_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            let firqData = response.data.data
            let firqCArrToString = ''
            let ffirqCArrToString = ''

            let fircData = response.data.data
            let fircCArrToString = ''
            let ffircCArrToString = ''

            let ficpData = response.data.data
            let ficpCArrToString = ''
            let fficpCArrToString = ''

            let ficaData = response.data.data
            let ficaCArrToString = ''
            let fficaCArrToString = ''

            // 요청
            firqCArrToString = firqData.filter(cd=>{
            return cd.typeCd ==="TPE003"
            })
            if(firqCArrToString.length != ''){
            ffirqCArrToString = firqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(ffirqCArrToString.length != ''){
            this.firqCount = ffirqCArrToString[0].typeCnt
            }else{
              this.firqCount = '0';
            }}else{
              this.firqCount = '0';
            }
            // 접수
            fircCArrToString = fircData.filter(cd=>{
            return cd.typeCd ==="TPE003"
            })
            if(fircCArrToString != ''){
            ffircCArrToString = fircCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(ffircCArrToString != ''){
            this.fircCount = ffircCArrToString[0].typeCnt
            }else{
              this.fircCount = '0';
            }}else{
              this.fircCount = '0';
            }
            // 완료
            ficpCArrToString = ficpData.filter(cd=>{
            return cd.typeCd ==="TPE003"
            })
            if(ficpCArrToString != ''){
            fficpCArrToString = ficpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(fficpCArrToString != ''){
            this.ficpCount =fficpCArrToString[0].typeCnt
            }else{
              this.ficpCount = '0';
            }}else{
              this.ficpCount = '0';
            }
            // 취소
            ficaCArrToString = ficaData.filter(cd=>{
            return cd.typeCd ==="TPE000"
            })
            if(ficaCArrToString != ''){
            fficaCArrToString = ficaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(fficaCArrToString != ''){
            this.ficaCount =fficaCArrToString[0].typeCnt
            }else{
              this.ficaCount = '0';
            }}else{
              this.ficaCount = '0';
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getDoCount(){
      let url =this.$store.state.serverApi + "/admin/organizations/stat/as?startDate="+this.s_date+"&endDate="+this.e_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            let dorqData = response.data.data
            let dorqCArrToString = ''
            let fdorqCArrToString = ''

            let dorcData = response.data.data
            let dorcCArrToString = ''
            let fdorcCArrToString = ''

            let docpData = response.data.data
            let docpCArrToString = ''
            let fdocpCArrToString = ''

            let docaData = response.data.data
            let docaCArrToString = ''
            let fdocaCArrToString = ''

            // 요청
            dorqCArrToString = dorqData.filter(cd=>{
            return cd.typeCd ==="TPE004"
            })
            if(dorqCArrToString.length != ''){
            fdorqCArrToString = dorqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(fdorqCArrToString.length != ''){
            this.dorqCount = fdorqCArrToString[0].typeCnt
            }else{
              this.dorqCount = '0';
            }}else{
              this.dorqCount = '0';
            }
            // 접수
            dorcCArrToString = dorcData.filter(cd=>{
            return cd.typeCd ==="TPE004"
            })
            if(dorcCArrToString != ''){
            fdorcCArrToString = dorcCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(fdorcCArrToString != ''){
            this.dorcCount = fdorcCArrToString[0].typeCnt
            }else{
              this.dorcCount = '0';
            }}else{
              this.dorcCount = '0';
            }
            // 완료
            docpCArrToString = docpData.filter(cd=>{
            return cd.typeCd ==="TPE004"
            })
            if(docpCArrToString != ''){
            fdocpCArrToString = docpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(fdocpCArrToString != ''){
            this.docpCount =fdocpCArrToString[0].typeCnt
            }else{
              this.docpCount = '0';
            }}else{
              this.docpCount = '0';
            }
            // 취소
            docaCArrToString = docaData.filter(cd=>{
            return cd.typeCd ==="TPE000"
            })
            if(docaCArrToString != ''){
            fdocaCArrToString = docaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(fdocaCArrToString != ''){
            this.docaCount =fdocaCArrToString[0].typeCnt
            }else{
              this.docaCount = '0';
            }}else{
              this.docaCount = '0';
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getLiCount(){
      let url =this.$store.state.serverApi + "/admin/organizations/stat/as?startDate="+this.s_date+"&endDate="+this.e_date;
      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            let lirqData = response.data.data
            let lirqCArrToString = ''
            let flirqCArrToString = ''

            let lircData = response.data.data
            let lircCArrToString = ''
            let flircCArrToString = ''

            let licpData = response.data.data
            let licpCArrToString = ''
            let flicpCArrToString = ''

            let licaData = response.data.data
            let licaCArrToString = ''
            let flicaCArrToString = ''

            // 요청
            lirqCArrToString = lirqData.filter(cd=>{
            return cd.typeCd ==="TPE005"
            })
            if(lirqCArrToString.length != ''){
            flirqCArrToString = lirqCArrToString.filter(cd=>{
              return cd.stateCd === "STE001"
            })
            if(flirqCArrToString.length != ''){
            this.lirqCount = flirqCArrToString[0].typeCnt
            }else{
              this.lirqCount = '0';
            }}else{
              this.lirqCount = '0';
            }
            // 접수
            lircCArrToString = lircData.filter(cd=>{
            return cd.typeCd ==="TPE005"
            })
            if(lircCArrToString != ''){
            flircCArrToString = lircCArrToString.filter(cd=>{
              return cd.stateCd === "STE002"
            })
            if(flircCArrToString != ''){
            this.lircCount = flircCArrToString[0].typeCnt
            }else{
              this.lircCount = '0';
            }}else{
              this.lircCount = '0';
            }
            // 완료
            licpCArrToString = licpData.filter(cd=>{
            return cd.typeCd ==="TPE005"
            })
            if(licpCArrToString != ''){
            flicpCArrToString = licpCArrToString.filter(cd=>{
              return cd.stateCd === "STE003"
            })
            if(flicpCArrToString != ''){
            this.licpCount =flicpCArrToString[0].typeCnt
            }else{
              this.licpCount = '0';
            }}else{
              this.licpCount = '0';
            }
            // 취소
            licaCArrToString = licaData.filter(cd=>{
            return cd.typeCd ==="TPE000"
            })
            if(licaCArrToString != ''){
            flicaCArrToString = licaCArrToString.filter(cd=>{
              return cd.stateCd === "STE004"
            })
            if(flicaCArrToString != ''){
            this.licaCount =flicaCArrToString[0].typeCnt
            }else{
              this.licaCount = '0';
            }}else{
              this.licaCount = '0';
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
  },
  created(){
    this.s_date=moment().subtract(999, 'days').format('YYYY-MM-DD');
    this.e_date=moment().format('YYYY-MM-DD');
    this.getGwCount();
    this.getEmCount();
    this.getAcCount();
    this.getFiCount();
    this.getDoCount();
    this.getLiCount();
  }
}
</script>

<style scoped>

</style>