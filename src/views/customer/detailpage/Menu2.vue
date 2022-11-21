<template>
    <div>
        <div class="tabcontent">
            <div class="tabcnt01">
                <div class="list_top">
                    <div class="btn_area">
                        <button v-if="this.relationPhoneData.length<1" type="button" class="btn form2" @click="check(1)">추가</button>
                        <!-- <button type="button" class="btn form2" @click="modifyRelationPhoneData">수정</button> -->
                        <button type="button" class="btn form2" @click="check(2)">수정</button>
                        <button type="button" class="btn form3" @click="deleteRelationPhoneData">삭제</button> 
                    </div>
                </div>
                <div class="list">
                    <table>
                        <colgroup>
                            <!-- <col style="width:auto;"> -->
                            <!-- <col style="width:31.5%;">
                            <col style="width:31.5%;">
                            <col style="width:31.5%;"> -->
                            <col style="width:auto;">
                            <col style="width:10%;">
                            <col style="width:25%;">
                            <col style="width:25%;">
                            <col style="width:33%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">순번</th>
                                <th scope="col">이름</th>
                                <th scope="col">관계</th>
                                <th scope="col">핸드폰번호</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody htype-02 ">
                        <table>
                            <colgroup>
                                <!-- <col style="width:auto;">
                                <col style="width:31.5%;">
                                <col style="width:31.5%;">
                                <col style="width:31.5%;"> -->
                                <col style="width:auto;">
                                <col style="width:10%;">
                                <col style="width:25%;">
                                <col style="width:25%;">
                                <col style="width:33%;">
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
                                    <!-- <td v-if="selectIndex === index">
                                        <div class="input_area">
                                            <input type="text" name="relationNm" :id="`relationNm_${index}`" v-model="item.relationNm" >
                                        </div>
                                    </td> -->
                                    <td>{{item.relationNm}}</td>
                                    <td>
                                        <!-- <input type="text" name="" id="" :value="item.relationCdNm"> -->
                                        응급관리요원
                                    </td>
                                    <!-- <td v-if="selectIndex === index">
                                        <input type="text" name="relationPhone" :id="`relationPhone_${index}`" v-model="item.relationPhone" >
                                    </td> -->
                                    <td >{{changeRecipientPhoneno(item.relationPhone)}}</td>
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

export default {
    name: "Menu2",
    //응급요원
    props:{
        recipientId: String
    },
    data () {
        return {
            relationPhoneData: null,
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
      const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE007`
      await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
        .then(res => {
          this.relationPhoneData  = res.data.data
        //   .filter(pd =>{
        //       return pd.typeCd === "TPE007"
        //   })
        }).catch(error => {
            console.log("fail to load")
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

    },
    reset(index){        
        this.radioCheck = this.relationPhoneData[index].regSn
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
    //부모 컴포넌트에 데이터 전송
    sendParent(){
        this.popCheck=true
        this.msg = '응급관리요원'
        this.$emit("openPopMsg",this.msg) 
        this.$emit("sendData2",this.relationPhoneData)
        this.$emit("openPop",this.popCheck)
    },
    //동작후 갱신 메소드
    sendMenu2Lending(){
        const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE007`
            axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
            this.relationPhoneData = res.data.data
            this.selectIndex = ''
            //   = res.data.data.filter(pd =>{
            //       return pd.typeCd === "TPE008"
            //   })
            
            this.$emit("lending3",this.lending)
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
        this.radioCheck = ''
        this.selectIndex = ''
        this.sendMenu2Lending()
        }).catch(error => {
            console.log("fail to load")
            this.errorMessage = error.message;
            console.error("There was an error!", error);
        });
        
    },
    deleteRelationPhoneData(){
        if(this.selectIndex === null || this.selectIndex === undefined || this.selectIndex === ''){
            alert("삭제할 대상자를 선택하여 주세요.")
            return false
        }
        if(confirm("정말로 삭제하시겠습니까? ")===true){ 
            let selectData = this.relationPhoneData[this.selectIndex]
            let selectRegSn = selectData.regSn
            
            const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/${selectRegSn}/delete`
            axios.delete(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
            this.radioCheck = ''
            this.selectIndex = ''
            this.sendMenu2Lending()
            
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
