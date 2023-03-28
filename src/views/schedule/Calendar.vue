<template>
    <div class="wrap">
      <div id="" class="popupLayer" v-if="DetailPopup === true">
          <div class="popup_wrap" style="height:650px; width:700px">
            <div class="title_wrap">
              <div class="title">예약내용</div>
              <button type="button" class="btn_close" @click="DetailPopup = false">닫기</button>
            </div>
            <div class="popup_cnt">
              <div class="input_wrap">
                <div class="input_area">
                <p class="input_tit"> 대상자명 </p>
                  <select v-model="detailName">
                      <option v-for="(recipient, index) in recipientItems" :value="recipient.value" v-bind:key="index">{{recipient.label}}</option>
                  </select>
              </div>
              <div class="input_area">
                <p class="input_tit"> 방문구분 </p>
                  <select v-model="detailType">
                      <option v-for="(type, index) in visitTypeItems" :value="type.value" v-bind:key="index">{{type.label}}</option>
                  </select>
              </div>
              </div>
              <div class="input_wrap">
                <div class="input_area">
                  <p class="input_tit">시작일</p>
                  <div class="date_warp">
                    <div class="customerBts" >
                      <input type="date" v-model="detailStart"/>
                    </div>
                  </div>
                </div>
                <div class="input_area">
                  <p class="input_tit">시작시간</p>
                  <div class="date_warp">
                    <div class="customerBts" style="justify-content: flex-start;">
                     <vue-timepicker class="input_tit"
                      :minute-interval="10"
                      close-on-complete
                      input-width="206px"
                      v-model="detailStartTime"
                      >
                      </vue-timepicker>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input_wrap">
                <div class="input_area" style="width:95%">
                  <p class="input_tit">세부내용</p>
                  <textarea name="" id="" v-model="detailDetail">입력</textarea>
                </div>
              </div>
              <!-- <div class="input_wrap">
                <div class="input_area">
                  <p class="input_tit">종료일</p>
                  <div class="date_warp">
                    <div class="customerBts" style="justify-content: flex-start;">
                      <input type="date" v-model="detailEnd"/>
                    </div>
                  </div>
                </div>
                <div class="input_area">
                  <p class="input_tit">종료시간</p>
                  <div class="date_warp">
                    <div class="customerBts" style="justify-content: flex-start;">
                     <vue-timepicker class="input_tit"
                      :minute-interval="5"
                      close-on-complete
                      input-width="189px"
                      v-model="detailEndTime"
                      >
                      </vue-timepicker>
                    </div>
                  </div>
                </div>
              </div>  -->
              <div class="popbtn_area"  >
                <button type="button" class="btn form2" @click="updateReport()">수정</button>
                <button type="button" class="btn form3" @click="deleteEvent()">삭제</button>
              </div>
            </div>
          </div>
        </div>
      <div id="" class="popupLayer" v-if="addPopup === true">
        <div class="popup_wrap" style="height:650px; width:700px">
          <div class="title_wrap">
            <div class="title">일정 등록</div>
            <button type="button" class="btn_close" @click="addPopup = false">닫기</button>
          </div>
          <div class="popup_cnt">
            <div class="input_wrap">
              <div class="input_area">
                <p class="input_tit"> 대상자명 </p>
                  <select v-model="addTitle">
                      <option v-for="(recipient, index) in recipientItems" :value="recipient.value" v-bind:key="index">{{recipient.label}}</option>
                  </select>
              </div>
              <div class="input_area">
                <p class="input_tit"> 방문구분 </p>
                  <select v-model="addType">
                      <option v-for="(type, index) in visitTypeItems" :value="type.value" v-bind:key="index">{{type.label}}</option>
                  </select>
              </div>
            </div>
            <div class="input_wrap">
              <div class="input_area">
                  <p class="input_tit">시작시간</p>
                  <div class="date_warp">
                    <div class="customerBts" style="justify-content: flex-start;">
                     <vue-timepicker class="input_tit"
                      :minute-interval="10"
                      close-on-complete
                      input-width="206px"
                      v-model="addStart"
                      >
                      </vue-timepicker>
                    </div>
                  </div>
                </div>
            </div>
            <div class="input_wrap">
              <div class="input_area" style="width:95%; margin-top:20px">
                <p class="input_tit">내용</p>
                <textarea name="" id="" v-model="calendarDetail">입력</textarea>
              </div>
            </div>
              </div>
              <div class="popbtn_area">
                <button type="button" class="btn form2" @click="addEvent()">등록</button>
                <button type="button" class="btn" @click="addPopup = false">취소</button>
              </div>
            </div>
          </div>
        <div class="container type-02">
            <div class="list_title_wrap">
                <span>일정 관리</span>
                <i class="ico_nav"></i>
                <span class="on">달력</span>
            </div>
            <div class="box_wrap">
              <div class="box_l chart box_style" style="height:840px">
                <h1>All Events ({{ currentEvents.length }})</h1>
                <ul>
                  <li v-for='(event, index) in currentEvents' :key='index' style="height:40px; size:30px">
                    <b>• {{ changeStartTime(event.visitSchdStartDtime) }}</b>
                    <i>&nbsp;&nbsp;&nbsp;&nbsp;{{ event.recipientNm }}</i>
                  </li>
                </ul>
              </div>
                <div class="box_style box_r">
                  <Fullcalendar 
                  id='calendar'
                  :options="calendarPlugins"
                  ref="calendar"
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
import axios from "axios";
import moment from "moment";
import HeaderComp from "../pages/HeaderComp.vue";

import Fullcalendar, { startOfDay } from '@fullcalendar/vue'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
// import GoogleCalendar from '@fullcalendar/google-calendar'


import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
    name: 'ActivityDetection',
    components :{
      HeaderComp,
      Fullcalendar,
      VueTimepicker,
    },
    data() {
      return {
        sidecalendar:{
          plugins:[
          ListPlugin
          ],
          headerToolbar:{
            left:'title',
            center:'',
            right:'',
          },
          initialView: 'list',
          locale:'ko',
          allDaySlot:false,
          height:800,
          // contentHeight:'auto',
          handleWindowResize:true,
          events:this.currentEvents,
        },
        calendarPlugins: {
          plugins:[
          DayGridPlugin,
          TimeGridPlugin,
          InteractionPlugin,
          // ListPlugin,
          ],
          // headerToolbar:{
          //   left:'prevYear prev today next nextYear',
          //   center:'title',
          //   right:'dayGridMonth,dayGridWeek,timeGridDay,listMonth'
          // },
          headerToolbar:{
            left:'customprevYear customprev today customnext customnextYear',
            center:'title',
            right:'dayGridMonth,dayGridWeek,timeGridDay'
          },
          customButtons:{
            customprevYear:{
              text: '<<',
              click:()=>{
                let calendarApi = this.$refs.calendar.getApi();
                calendarApi.prevYear();
                this.date = moment(calendarApi.getDate()).format('YYYY-MM')
                this.getCalendar()
              }
            },
            customprev:{
              text: '<',
              click:()=>{
                let calendarApi = this.$refs.calendar.getApi();
                calendarApi.prev();
                this.date = moment(calendarApi.getDate()).format('YYYY-MM')
                this.getCalendar()
              }
            },
            customnext:{
              text: '>',
              click:()=>{
                let calendarApi = this.$refs.calendar.getApi();
                calendarApi.next();
                this.date = moment(calendarApi.getDate()).format('YYYY-MM')
                this.getCalendar()
              }
            },
            customnextYear:{
              text: '>>',
              click:()=>{
                let calendarApi = this.$refs.calendar.getApi();
                calendarApi.nextYear();
                this.date = moment(calendarApi.getDate()).format('YYYY-MM')
                this.getCalendar()
              }
            }
          },
          height:800,
          locale:'ko',
          selectable: true,
          select: this.handleDateSelect,
          eventClick: this.handleEventClick,
          eventsSet: this.handleEvents,
          dayMaxEvents: true,
          
          //googleCalendarApiKey:'AIzaSyCTasvmfd09G3oX9IuahIkP5IdLl8LSlTE',
                  // GoogleCalendar
                  // eventSources : [
          //   {
          //     googleCalendarId : "ko.south_korea#holiday@group.v.calendar.google.com", 
          //     className : "koHolidays", 
          //     color : "#FF0000", 
          //     textColor : "#FFFFFF"
          //   }
          // ],
          events: [
            
          ] ,
          
          // customButtons: {
          //   addEventButton: {
          //     text:'일정 추가',
          //     click:function(){
          //       var dateStr = prompt("YYYY-MM-DD 형식으로 입력하세요")
          //       var date = new Date(dateStr + 'T00:00:00')
          //       if(!isNaN(date.valueOf())){
          //         calendarPlugins.addEvent({
          //           title:'test',
          //           start: date,
          //           allDay:true,
          //         })
          //       }
          //     }
          //   }
          // }
      },
      currentEvents: [],
      eventInfo:'',addPopup:false,addrecipient:'', addTitle:'', addType:'', addStart:'', addEnd:'', allselect:false,
      recipientItems:[{label:'선택', value:''}],
      visitTypeItems:[{label:'전체', value:''},{label:'응급방문', value:'TPE001'},{label:'정기방문', value:'TPE002'},
      {label:'예약방문', value:'TPE003'},{label:'장비점검', value:'TPE004'},{label:'기타', value:'TPE005'}],
      userId : this.$store.state.userId, 
      date : moment().format('YYYY-MM'),
      calendarApi:'', calendarSet:'', calendarDetail:'', calendarMonthData:[], popupData:[], DetailPopup:false,
      detailName:'', detailType:'', detailStart:'', detailStartTime:'', detailEnd:'', detailEndTime:'', detailDetail:'',
      myTime:'', clickTitle:'', clickDate:'',
      
    }
  },
    created() {
      this.getRecipientData()
      this.getCalendar()
    },
    methods: {
      handleDateSelect(selectInfo){
        this.eventInfo = selectInfo
        this.addrecipient = ''
        this.addTitle = ''
        this.addStart = ''
        this.addEnd = ''
        this.addType = ''
        this.calendarDetail = ''
        this.allselect = false
        this.addPopup = true
        // console.log(selectInfo)
        // console.log(this.eventInfo)
        // let title = prompt("일정 제목을 입력하여 주세요")
        // let calendarApi = selectInfo.view.calendar
        
        // calendarApi.unselect()

        // if(title){
        //   calendarApi.addEvent({
        //   title,
        //   start: selectInfo.startStr,
        //   end: selectInfo.endStr,
        //   allDay: selectInfo.allDay
        // })
        // }
        // console.log(calendarApi)
      },
      async getRecipientData() {
        let uri = '';
        uri = this.$store.state.serverApi + "/admin/recipients?recordCountPerPage=1000";
        await axios.get(uri, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(response => {
              let Data = response.data.data
              for(let i=0; i<Data.length; i++){
                this.recipientItems.push({
                  label : Data[i].recipientNm,
                  value : Data[i].recipientId
                })
              }
            })
            .catch(error => {
              this.errorMessage = error.message;
              console.error("There was an error!", error);
            });
        },
        async getCalendar(){
          let url =this.$store.state.serverApi + "/admin/visit/schedule/month?userId="+this.$store.state.userId+"&date="+this.date;
          let tmpArr = []
          let apiData = []
          this.calendarMonthData = []
          await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(response => {
            this.calendarApi = this.$refs.calendar.getApi()
            tmpArr = response.data.items
            for(let i=0; i<tmpArr.length; i++){
              this.calendarMonthData.push(tmpArr[i])
            }
            for(let i=0; i<tmpArr.length; i++){
              //tmpArr[i].visitSchdStartDtime = tmpArr[i].visitSchdStartDtime.substr(0,10)
              apiData.push({
                start:tmpArr[i].visitSchdStartDtime,
                title:tmpArr[i].recipientNm
              })
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
            this.calendarApi.removeAllEvents()
          for(let i=0; i<apiData.length; i++){
            this.calendarApi.addEvent({
              title:apiData[i].title,
              start:apiData[i].start
            })
          }
        },
        async addEvent(){
        if(!this.addTitle){
          alert("대상자명을 선택하여 주세요")
          return false
        }else if(!this.addType){
          alert("방문구분을 선택하여 주세요")
          return false
        }else if(!this.addStart && !this.allselect){
          alert("일정 시작시간을 입력하여 주세요")
          return false
        }
        let calendarApi = this.eventInfo.view.calendar
        this.addrecipient = this.recipientItems.filter(cd=>{
          return cd.value === this.addTitle
        })
        if(this.addTitle && !this.allselect){
          calendarApi.addEvent({
            title:this.addrecipient[0].label,
            start: this.eventInfo.startStr + ' ' + this.addStart,
            allDay:false
        })
        }
        // else if(this.addTitle && this.allselect){
        //   calendarApi.addEvent({
        //     title:this.addrecipient[0].label,
        //     start: this.eventInfo.start,
        //     allDay: true
        //   })
        // }
        let updateData = {
          userId : this.$store.state.userId,
          recipientId : this.addTitle,
          visitDetails : this.calendarDetail,
          visitSchdStartDtime : this.eventInfo.startStr + ' ' + this.addStart,
          visitTypeCd : this.addType
        }
        console.log(updateData)
        let url =this.$store.state.serverApi + "/admin/visit/schedule";
        await axios.post(url, updateData ,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(res => {
            let resData = res.data.message
            if(resData === 'OK'){
                alert("저장이 완료되었습니다.")
                this.getCalendar()
                this.addPopup = false
            }
          })
          .catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      },
      handleEventClick(clickInfo) {
        this.calendarDetail = ''
        let dayDate = moment(clickInfo.event.start).format('YYYY-MM-DD HH:mm:ss')
        let clickData = this.calendarMonthData.filter(cd=>{
          return cd.recipientNm === clickInfo.event.title && cd.visitSchdStartDtime === dayDate
        })
        let url =this.$store.state.serverApi + `/admin/visit/info/${clickData[0].scheduleId}?userId=${this.$store.state.userId}`
        axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(response => {
            this.popupData = response.data
            this.detailName = this.popupData.recipientId
            this.detailType = this.popupData.visitTypeCd
            this.detailStart = this.popupData.visitSchdStartDtime.substr(0,10)
            this.detailStartTime = this.popupData.visitSchdStartDtime.substr(11,5)
            if(!this.popupData.visitEndDtime){
              this.detailEnd = ''
              this.detailEndTime = ''
            }else{
              this.detailEnd = this.popupData.visitEndDtime.substr(0,10)
              this.detailEndTime = this.popupData.visitEndDtime.substr(11,5)
            }
            this.detailDetail = this.popupData.visitDetails
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
          this.clickTitle = clickInfo.event.title
          this.clickDate = clickInfo.event.start
          this.DetailPopup = true
          //this.DetailPopup = true
      // if (confirm(`일정을 삭제하시겠습니까? '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
    },
    updateReport(){    
      let tmpArr=[]
      let dayDate = moment(this.clickDate).format('YYYY-MM-DD HH:mm:ss')
      let clickData = this.calendarMonthData.filter(cd=>{
          return cd.recipientNm === this.clickTitle && cd.visitSchdStartDtime === dayDate
          })
      let data = {
          userId : this.$store.state.userId,
          recipientId : this.detailName,
          visitDetails : this.detailDetail,
          visitSchdStartDtime : this.detailStart + ' ' + this.detailStartTime,
          visitTypeCd : this.detailType
        }
            
      let url =this.$store.state.serverApi + `/admin/visit/schedule/${clickData[0].scheduleId}`
        axios.patch(url, data ,{headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
          .then(response => {
            tmpArr = response.data.message
            if(tmpArr === 'OK'){
              alert("수정이 완료되었습니다.")
              this.DetailPopup = false
              this.getCalendar()
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    deleteEvent(){
      let tmpArr = []
      let dayDate = moment(this.clickDate).format('YYYY-MM-DD')
      let clickData = this.calendarMonthData.filter(cd=>{
          return cd.recipientNm === this.clickTitle && cd.visitSchdStartDtime.substr(0,10) === dayDate
          })
      let url =this.$store.state.serverApi + `/admin/visit/schedule/${clickData[0].scheduleId}?userId=${this.$store.state.userId}`
      axios.delete(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(response => {
          tmpArr = response.data.message
          if(tmpArr === 'OK'){
            alert("삭제가 완료되었습니다.")
            this.DetailPopup = false
            this.getCalendar()
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async handleEvents(events) {
      let tmpArr = []
      let dataArr = []
      let toDayMM = moment().format('YYYY-MM')
      let toDay = moment().format('YYYY-MM-DD')
      let url =this.$store.state.serverApi + "/admin/visit/schedule/month?userId="+this.$store.state.userId+"&date="+toDayMM;
      await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
      .then(response => {
        dataArr = response.data.items
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
      for(let i=0; i<dataArr.length; i++){       
        if(new Date(toDay) <= new Date(dataArr[i].visitSchdStartDtime)){
          tmpArr.push(dataArr[i])
        }
      }
      this.currentEvents = tmpArr.sort(function(a,b){
        return new Date(a.visitSchdStartDtime) - new Date(b.visitSchdStartDtime)
      })
    },
    changeStartTime(input){
      let result = 0
      result = input.substr(0,16)
      return result;
    },
    changeType(input){
      let result = ''
      switch(input){
        case 'TPE001' : result='응급방문'; break;
        case 'TPE002' : result='정기방문'; break;
        case 'TPE003' : result='예약방문'; break;
        case 'TPE004' : result='장비점검'; break;
        case 'TPE005' : result='기타'; break;
      }
      return result
    },
  }
}
</script>
<style>
.fc-day-sun a {
  color: #FF5555;
  text-decoration: none;
}
.fc-day-sat a {
  color: #5555FF;
  text-decoration:none;
}
.fc-day-mon a {
  color: white;
  text-decoration: none;
}
.fc-day-tue a {
  color: white;
  text-decoration: none;
}
.fc-day-wed a {
  color: white;
  text-decoration: none;
}
.fc-day-thu a {
  color: white;
  text-decoration: none;
}
.fc-day-fri a {
  color: white;
  text-decoration: none;
}
.fc-popover-header{
  color: #4B556A;
}
.fc-popover-body{
  background-color: #4B556A;
}
.fc-event-time{
  color: white
}
.fc-event-title{
  color: white
}
</style>