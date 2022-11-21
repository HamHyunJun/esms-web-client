<template>
  <div>
    <div class="menuTitle">
      <slot name="header">
        <strong style="font-size: large;">응급이벤트</strong>
      </slot>
    </div>
    <CCard>
      <CCardHeader>
        <div style="height: 30px;">응급 이벤트 모니터링</div>
        <div class="customerBts" style="justify-content: flex-start;">
          <CInput type="date" v-model="s_date" />
          <CInput type="date" v-model="e_date" class="middleBtn" style="margin-left:10px;margin-right: 20px;" />
          <CButton block color="primary" class="inquery" style="width: 90px;margin-top: -20px;"  v-on:click="manageInquiry">조회</CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <CDataTable
            class="mb-0 table-clear thBorder tdBorder thText"
            hover
            :items="emergencyItems"
            :fields="emergencyFields"
            head-color="light"
            sorting
        />
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>
        외출이벤트
      </CCardHeader>
      <CCardBody>
        <CDataTable
            class="mb-0 table-clear thBorder tdBorder thText"
            hover
            :items="outEventsItems"
            :fields="outEventsFields"
            head-color="light"
            sorting
        />
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>
        활동 미감지
      </CCardHeader>
      <CCardBody>
        <CDataTable
            class="mb-0 table-clear thBorder tdBorder thText"
            hover
            :items="unsensingItems"
            :fields="unsensingFields"
            head-color="light"
            sorting
        />
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>
        장비 장애
      </CCardHeader>
      <CCardBody>
        <CDataTable
            class="mb-0 table-clear thBorder tdBorder thText"
            hover
            :items="equipmentItems"
            :fields="equipmentFields"
            head-color="light"
            sorting
        />
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "AllView",
  data () {
    return {
      s_date: '', e_date: '',
      emergencyItems: [], outEventsItems: [], unsensingItems: [], equipmentItems: [],
      emergencyFields: [
        {key: 'recipientNm', label: '대상자', _classes: 'text-center'},
        {key: 'addr', label: '주소', _classes: 'text-center'},
        {key: 'managerNm', label: '사회복지사', _classes: 'text-center'},
        {key: 'managerMobileNumber', label: '전화번호', _classes: 'text-center'},
        {key: 'typeCd', label: '종류', _classes: 'text-center'},
        {key: 'occurDtime', label: '발생일시', _classes: 'text-center'},
        {key: 'testYn', label: '테스트모드', _classes: 'text-center'},
        {key: 'actionTypeNm', label: '조치유형', _classes: 'text-center'},
        {key: 'actionDtime', label: '조치일시', _classes: 'text-center'},
        {key: 'actionDetails', label: '조치내역', _classes: 'text-center'},
      ],
      outEventsFields: [
        {key: 'recipientNm', label: '대상자', _classes: 'text-center'},
        {key: 'addr', label: '주소', _classes: 'text-center'},
        {key: 'occurDtime', label: '외출발생시간', _classes: 'text-center'},
        {key: 'eventCd', label: '외출귀가시간', _classes: 'text-center'},
        {key: 'testYn', label: '외출지속시간', _classes: 'text-center'},
      ],
      unsensingFields: [
        {key: 'recipientNm', label: '대상자', _classes: 'text-center'},
        {key: 'addr', label: '주소', _classes: 'text-center'},
        {key: 'occurDtime', label: '발생시간', _classes: 'text-center'},
        {key: 'testYn', label: '미감지지속시간', _classes: 'text-center'},
      ],
      equipmentFields: [
        {key: 'recipientNm', label: '대상자', _classes: 'text-center'},
        {key: 'equipTypeNm', label: '장비구분', _classes: 'text-center'},
        {key: 'recipientId', label: '장애구분', _classes: 'text-center'},
      ],
    }
  },
  methods: {
    getEmergencyData() {
      let url = "/admin/emergencys?";
      url += "occurStartDate=" + this.s_date;
      url += "&occurEndDate=" + this.e_date;

      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            this.emergencyItems = [];
            for(let i=0; i<response.data.data.length; i++) {
              this.emergencyItems.push({
                recipientNm:response.data.data[i].recipientNm,
                addr:response.data.data[i].addr,
                managerNm:response.data.data[i].managerNm,
                managerMobileNumber:response.data.data[i].managerMobileNumber,
                typeCd:response.data.data[i].typeCd,
                occurDtime:response.data.data[i].occurDtime,
                testYn:response.data.data[i].testYn,
                actionTypeNm:response.data.data[i].actionTypeNm,
                actionDtime:response.data.data[i].actionDtime,
                actionDetails:response.data.data[i].actionDetails,
              })
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getEmergencyOutEventData() {
      let url = "/admin/emergencys/out-events?";
      url += "occurStartDate=" + this.s_date;
      url += "&occurEndDate=" + this.e_date;

      axios.get(url, {
        headers: { "Authorization": sessionStorage.getItem("token") }})
          .then(response => {
            this.outEventsItems = [];
            for(let i=0; i<response.data.data.length; i++) {
              this.outEventsItems.push({
                recipientNm:response.data.data[i].recipientNm,
                addr:response.data.data[i].addr,
                occurDtime:response.data.data[i].occurDtime,
                eventCd:response.data.data[i].eventCd,
                testYn:response.data.data[i].testYn,
              })
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getEmergencyUnsensingData() {
      let url = "/admin/emergencys/active-unsensing-events?";
      url += "occurStartDate=" + this.s_date;
      url += "&occurEndDate=" + this.e_date;

      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            this.unsensingItems = [];
            for(let i=0; i<response.data.data.length; i++) {
              this.unsensingItems.push({
                recipientNm:response.data.data[i].recipientNm,
                addr:response.data.data[i].addr,
                occurDtime:response.data.data[i].occurDtime,
                testYn:response.data.data[i].testYn,
              })
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    getEmergencyEquipmentData() {
      let url = "/admin/emergencys/equipment-faults?";
      url += "occurStartDate=" + this.s_date;
      url += "&occurEndDate=" + this.e_date;

      axios.get(url, {headers: {"Authorization": sessionStorage.getItem("token")}})
          .then(response => {
            this.equipmentItems = [];
            for(let i=0; i<response.data.data.length; i++) {
              this.equipmentItems.push({
                recipientNm:response.data.data[i].recipientNm,
                equipTypeNm:response.data.data[i].equipTypeNm,
                recipientId:response.data.data[i].recipientId,
              })
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    manageInquiry() {
      this.getEmergencyData();
      this.getEmergencyOutEventData();
      this.getEmergencyUnsensingData();
      this.getEmergencyEquipmentData();
    }
  },
  created() {
    this.s_date=moment().format('YYYY-MM-DD');
    this.e_date=moment().format('YYYY-MM-DD');
    this.getEmergencyData();
    this.getEmergencyOutEventData();
    this.getEmergencyUnsensingData();
    this.getEmergencyEquipmentData();
  }
}
</script>

<style scoped>

</style>