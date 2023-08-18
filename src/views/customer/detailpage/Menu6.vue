<template>
    <div>
        <div class="tabcontent">
            <div class="tabcnt01">
                <div class="list_top">
                    <div class="btn_area">
                        <button type="button" class="btn form2" @click="sendParent">추가</button>
                        <button type="button" class="btn form2" @click="changeRelationPhoneData">수정</button>
                        <button type="button" class="btn form3" @click="deleteRelationPhoneData">삭제</button> 
                    </div>
                </div>
                <div class="list">
                    <table>
                        <colgroup>
                            <col style="width:auto;">
                            <col style="width:10%;">
                            <col style="width:25%;">
                            <col style="width:33%;">
                            <col style="width:25%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">순번</th>
                                <th scope="col">이름</th>
                                <th scope="col">핸드폰번호</th>
                                <th scope="col">관계</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody">
                        <table>
                            <colgroup>
                                <col style="width:auto;">
                                <col style="width:10%;">
                                <col style="width:25%;">
                                <col style="width:33%;">
                                <col style="width:25%;">
                            </colgroup>
                            <tbody>
                                <tr v-for="(item,index) in relationPhoneData" v-bind:key="index">
                                    <td>
                                        <div class="chk_area">
                                            <input type="radio" name="chk" :id="`chk1_${index}`" v-model="selectIndex" :value="index" @click="reset(index)">
                                            <label :for="`chk1_${index}`" class="chk"><i class="ico_chk"></i></label>
                                        </div>
                                    </td>
                                    <td>{{index+1}}</td>
                                    <td v-if="selectIndex === index">
                                        <div class="input_area">
                                            <input type="text" name="relationNm" :id="`relationNm_${index}`" v-model="relationNm">
                                        </div>
                                    </td>
                                    <td v-else>{{item.relationNm}}</td>
                                    <td v-if="selectIndex === index">
                                        <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  name="relationPhone" :id="`relationPhone_${index}`" v-model="relationPhone" maxlength="11">
                                    </td>
                                    <td v-else>{{changeRecipientPhoneno(item.relationPhone)}}</td>
                                    <td>보호자</td>
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
import { cilAlignCenter } from '@coreui/icons';

export default {
    name: "Menu4",
    //생활관리사
    props:{
        recipientId: String
    },
    data () {
        return {
            relationPhoneData: null,relationNm:null, relationPhone:null,
            popCheck: false,
            lending : 0,
            msg : '',
            checkPopup:'',
            checkPop:'',
            selectIndex: null,
            radioCheck:'',
            
        }
    },
    created(){
        this.getRelationPhoneData();
    },
    methods:{
      async getRelationPhoneData(){
      //여기
      const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE009`
      await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          this.relationPhoneData  = res.data.data
          console.log(this.relationPhoneData)
        //   .filter(pd =>{
        //       return pd.typeCd === "TPE006"
        //   })
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

    },
    //동작후 갱신 메소드
    sendMenu6Lending(){
        const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE009`
        axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
        this.relationPhoneData = res.data.data
        console.log(this.relationPhoneData)
        //   = res.data.data.filter(pd =>{
        //       return pd.typeCd === "TPE008"
        //   })
        this.selectIndex = ''
        this.radioCheck = ''
        this.$emit("lending4",this.lending)
        }).catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
        });
    },
    reset(index){
        this.selectrelation = this.relationPhoneData[index].relationCd
        this.radioCheck = this.relationPhoneData[index].regSn
        this.relationNm = this.relationPhoneData[index].relationNm
        this.relationPhone = this.relationPhoneData[index].relationPhone
        if(this.radioCheck === this.relationPhoneData[index].regSn){
            this.selectIndex = ''
            this.radioCheck = ''
        }
    },
    check(value){
        switch(value){
          case 1 : this.checkPopup=0; this.sendParent(); break;
          case 2 : this.checkPopup=1; if(this.selectIndex === null || this.selectIndex === undefined || this.selectIndex === ''){
            alert("수정할 대상자를 선택하여 주세요.")
            return false;
        }; this.sendParent(); break;
        }
    },
    sendParent(){
        this.popCheck=true
        this.msg = '보호자'
        console.log(this.msg)
        console.log(this.relationPhoneData)
        console.log(this.popCheck)
        this.$emit("openPopMsg",this.msg) 
        this.$emit("sendData6",this.relationPhoneData)
        this.$emit("openPop",this.popCheck)
    },
    changeRelationPhoneData(){
        if(this.selectIndex === null || this.selectIndex === undefined || this.selectIndex === ''){
            alert("수정할 대상자를 선택하여 주세요.")
            return false;
        }
        console.log(this.relationPhoneData[this.selectIndex])
        let selectData = this.relationPhoneData[this.selectIndex]
        selectData.relationNm = this.relationNm
        selectData.relationPhone = this.relationPhone
        let selectRegSn = selectData.regSn
        const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/${selectRegSn}/update`
        console.log(url)
        axios.post(url,selectData, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
           .then(res => {
           
           alert("성공적으로 수정되었습니다")
           this.sendMenu6Lending()
           this.selectIndex = ''
           this.radioCheck = ''
           console.log(this.selectIndex)
           }).catch(error => {
               console.log("fail to load")
               this.errorMessage = error.message;
               console.error("There was an error!", error);
           });
    },
    modifyRelationPhoneData(){
        if(this.selectIndex === null || this.selectIndex === undefined || this.selectIndex === ''){
            alert("수정할 대상자를 선택하여 주세요.")
            return false;
        }
        if(this.relationPhoneData[this.selectIndex].relationPhone.length >11){
                alert("전화번호는 최대 11자리까지 입력 가능합니다.")
                return false
            }
        let selectData = this.relationPhoneData[this.selectIndex]
        let selectRegSn = selectData.regSn
        const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/${selectRegSn}/update`
        axios.post(url,selectData, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
        alert("성공적으로 수정되었습니다")
        this.sendMenu6Lending()
        }).catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
        });
        
    },
    deleteRelationPhoneData(){
        if(this.selectIndex === null || this.selectIndex ===undefined || this.selectIndex === ''){
            alert("삭제할 대상자를 선택하여 주세요.")
            return false
        }
        if(confirm("정말로 삭제하시겠습니까? ")===true){
            let selectData = this.relationPhoneData[this.selectIndex]
            let selectRegSn = selectData.regSn
            const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/${selectRegSn}/delete`
            axios.delete(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
            this.selectIndex = ''
            this.radioCheck = ''
            this.sendMenu6Lending()
            
            }).catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
            alert("성공적으로 삭제되었습니다")
        }else{
            alert("취소되었습니다")
        }
    },
    changeRecipientPhoneno(phone){
            if(phone){
                let changeNumber = phone.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                return changeNumber
            }else{
                return ''
            }

    },
  }
}
</script>