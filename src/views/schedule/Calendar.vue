<template>
    <div class="wrap">
      <div class="container type-02">
      <div id="" class="popupLayer" v-if="addPopup === true">
        <div class="popup_wrap">
          <div class="title_wrap">
            <div class="title">일정 등록</div>
            <button type="button" class="btn_close" @click="addPopup = false">닫기</button>
          </div>
          <div class="popup_cnt">
            <div class="input_wrap">
              <div class="input_area">
                <p class="input_tit"> 일정이름 </p>
                <div class="add_btn_input">
                  <input type="text"  v-model="addTitle"/>
                </div>
              </div>
              <div class="input_area">
                <p class="input_tit"> 하루종일 </p>
                <div class="chk_area">
                  <input type="checkbox" id="allCheck" v-model="allselect">
                  <label for="allCheck" class="chk"><i class="ico_chk"></i></label>
                </div>
              </div>
            </div>
            <div class="input_wrap">
              <div v-if="allselect" class="input_area">
                <p class="input_tit">시작시간</p>
                <input type="time" value=""  disabled>
              </div>
              <div v-else class="input_area">
                <p class="input_tit">시작시간</p>
                <input type="time" value="" v-model="addStart">
              </div>
              <div v-if="allselect" class="input_area">
                <p class="input_tit">종료시간</p>
                <input type="time" value="" disabled>
              </div>
              <div v-else class="input_area">
                <p class="input_tit">종료시간</p>
                <input type="time" value="" v-model="addEnd">
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
                    <b>• {{ changeStartTime(event.startStr) }}</b>
                    <i>&nbsp;&nbsp;&nbsp;&nbsp;{{ event.title }}</i>
                  </li>
                </ul>
              </div>
              
                <div class="box_style box_r">
                  <Fullcalendar 
                  id='mainCalendar'
                  :options="calendarPlugins"
                    />
                </div>
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


export default {
    name: 'ActivityDetection',
    components :{
      HeaderComp,
      Fullcalendar
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
        ListPlugin
        ],
        headerToolbar:{
          left:'prevYear prev today next nextYear',
          center:'title',
          right:'dayGridMonth,dayGridWeek,timeGridDay,listMonth'
        },
        height:800,
        locale:'ko',
        selectable: true,
        //selectMirror: true,   마우스로 일정 옮길때 화면 강조
        //editable: true,     마우스로 일정 옮김 가능
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        dayMaxEvents: true,
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
      eventInfo:'',addPopup:false, addTitle:'', addStart:'', addEnd:'', allselect:false,
    }
  },
    created() {

    },
    
    methods: {
      handleDateSelect(selectInfo){
        this.eventInfo = selectInfo
        this.addTitle = ''
        this.addStart = ''
        this.addEnd = ''
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
      addEvent(){
        if(!this.addTitle){
          alert("일정이름을 입력하여 주세요")
          return false
        }else if(!this.addStart && !this.allselect){
          alert("일정 시작시간을 입력하여 주세요")
          return false
        }else if(!this.addEnd && !this.allselect){
          alert("일정 종료시간을 입력하여 주세요")
          return false
        }else if(this.addEnd < this.addStart){
          alert("일정 종료시간이 시작시간보다 빠릅니다. 시간을 다시 선택하여 주세요")
          return false
        }
        let calendarApi = this.eventInfo.view.calendar
        console.log(this.eventInfo)
        console.log(this.eventInfo.startStr + ' ' + this.addStart)
        console.log(calendarApi)
        if(this.addTitle && !this.allselect){
          calendarApi.addEvent({
            title:this.addTitle,
            start: this.eventInfo.startStr + ' ' + this.addStart,
            end: this.eventInfo.endStr + this.addEnd,
            allDay:false
        })
        }else if(this.addTitle && this.allselect){
          calendarApi.addEvent({
            title:this.addTitle,
            start: this.eventInfo.start,
            end: this.eventInfo.end,
            allDay: true
          })
        }
        this.addPopup = false
      },
      handleEventClick(clickInfo) {
      if (confirm(`일정을 삭제하시겠습니까? '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events) {
      let toDay = moment().format('YYYY-MM-DD')
      console.log(events)
      let tmpArr=[]
      for(let i=0; i<events.length; i++){       
        if(new Date(toDay) <= new Date(events[i].startStr)){
          tmpArr.push(events[i])
        }
      }
      console.log(tmpArr)
      this.currentEvents = tmpArr.sort(function(a,b){
        return new Date(a.start) - new Date(b.start)
      })
    },
    changeStartTime(input){
      let count = input.indexOf('T')
      let day = input.substring(0, count)
      let time = input.substring(count+1, 16)
      return day + " " + time
    },
    changeStartDay(input){
      console.log(input)
      let count = input.indexOf('T')
      let day = input.substring(0,count)
      return day
    }
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
  text-decoration: none;
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
</style>