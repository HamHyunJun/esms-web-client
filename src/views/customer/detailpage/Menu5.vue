<template>
    <div>
        <div class="tabcontent">
            <div class="tabcnt01">
                <div class="list_top">
                    <div class="btn_area">
                        <button v-if="this.relationPhoneData.length<6" type="button" class="btn form2" @click="sendParent">추가</button>
                        <button type="button" class="btn form2" @click="modifyRelationPhoneData">수정</button>
                        <!-- <button type="button" class="btn form3" @click="deleteRelationPhoneData">삭제</button>  -->
                    </div>
                </div>
                <div class="list">
                    <table>
                        <colgroup>
                            <col style="width:auto;">
                            <col style="width:10%;">
                            <col style="width:40%;">
                            <col style="width:40%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">순번</th>
                                <th scope="col">구분</th>
                                <th scope="col">전화번호</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody">
                        <table>
                            <colgroup>
                                <col style="width:auto;">
                                <col style="width:10%;">
                                <col style="width:40%;">
                                <col style="width:40%;">
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
                                    <td >{{emerCodeLabel(item.typeCd)}}</td>
                                    <td v-if="selectIndex === index">
                                        <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  name="relationPhone" :id="`relationPhone_${index}`" v-model="relationPhone" maxlength="11">
                                    </td>
                                    <td v-else>{{changeRecipientPhoneno(item.relationPhone)}}</td>
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
    name: "Menu5",
    //생활관리사
    props:{
        recipientId: String
    },
    data () {
        return {
            relationPhoneData: null,
            popCheck: false,
            lending : 0,
            msg : '',
            selectIndex: null,
            relationPhone:null,
            radioCheck:'',
        }
    },
    created(){
        this.getRelationPhoneData();
    },
    methods:{
      async getRelationPhoneData(){
      //여기
      const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE001`
      const url2  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE002`
      const url3  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE003`
      const url4  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE004`
      const url5  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE005`
      let arr1,arr2,arr3,arr4,arr5
      await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          arr1 = res.data.data
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        await axios.get(url2, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          arr2 = res.data.data  
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        await axios.get(url3, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          arr3 = res.data.data  
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        await axios.get(url4, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          arr4 = res.data.data  
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        await axios.get(url5, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          arr5 = res.data.data  
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

        //this.relationPhoneData = [...arr1,...arr2,...arr3,...arr4,...arr5]
        this.relationPhoneData = [...arr1,...arr2,...arr4,...arr5]
        
    },
    //동작후 갱신 메소드
    async sendMenu5Lending(){
        this.selectIndex = ''
        this.radioCheck = ''
        const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE001`
        const url2  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE002`
        const url3  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE003`
        const url4  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE004`
        const url5  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE005`
        let arr1,arr2,arr3,arr4,arr5
        await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
        arr1 = res.data.data
        }).catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
        });
        await axios.get(url2, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          arr2 = res.data.data
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        await axios.get(url3, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          arr3 = res.data.data  
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        await axios.get(url4, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          arr4 = res.data.data  
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        await axios.get(url5, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          arr5 = res.data.data  
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

        //this.relationPhoneData = [...arr1,...arr2,...arr3,...arr4,...arr5]
        this.relationPhoneData = [...arr1,...arr2,...arr4,...arr5]
        this.$emit("lending5",this.lending)
    },
    sendParent(){
        this.popCheck=true
        this.msg = '응급번호'
        this.$emit("openPopMsg",this.msg) 
        this.$emit("sendData5",this.relationPhoneData)
        this.$emit("openPop",this.popCheck)
        
    },
    reset(index){
        this.radioCheck = this.relationPhoneData[index].regSn
        this.relationPhone = this.relationPhoneData[index].relationPhone
        if(this.radioCheck === this.relationPhoneData[index].regSn){
            this.selectIndex = ''
            this.radioCheck = ''
        }
    },
    modifyRelationPhoneData(){
        if(this.selectIndex === null || this.selectIndex === undefined || this.selectIndex === ''){
            alert("수정할 대상자를 선택하여 주세요.")
            return false;
        }
        let selectData = this.relationPhoneData[this.selectIndex]
        selectData.relationPhone = this.relationPhone
        let selectRegSn = selectData.regSn
        const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/${selectRegSn}/update`
        axios.post(url,selectData, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
        console.log(res.data.data)
        alert("성공적으로 수정되었습니다")
        this.selectIndex = ''
        this.radioCheck = ''
        this.sendMenu4Lending()
        }).catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
        });
    },
    deleteRelationPhoneData(){
        if(this.selectIndex === null || this.selectIndex ===undefined || this.selectIndex === ''){
            alert("삭제할 대상자를 선택하여 주세요.")
            return false;
        }
        if(confirm("정말로 삭제하시겠습니까? ")===true){
            let selectData = this.relationPhoneData[this.selectIndex]
            let selectRegSn = selectData.regSn
            const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/${selectRegSn}/delete`
            axios.delete(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
            console.log(res.data.data)
            this.selectIndex = ''
            this.radioCheck = ''
            this.sendMenu4Lending()
            
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
    emerCodeLabel(value){
    let result
      switch (value){
          case "TPE001" : result="119번호" ;break;
          case "TPE002" : result="센터번호" ;break;
          case "TPE003" : result="중앙모니터링센터" ;break;
          case "TPE004" : result="IP-PBX화재" ;break;
          case "TPE005" : result="IP-PBX응급" ;break;
      }
      return result
    },

  }
}
</script>