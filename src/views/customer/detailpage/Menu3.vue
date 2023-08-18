<template>
    <div>
        <div class="tabcontent">
            <div class="tabcnt01">
                <div class="list_top">
                    <div class="btn_area">
                        <button type="button" class="btn form2" v-if="this.relationPhoneData.length < 8" @click="sendParent">추가</button>
                        <button type="button" class="btn form2" @click="modifyRelationPhoneData">수정</button>
                        <button type="button" class="btn form3" @click="deleteRelationPhoneData">삭제</button> 
                    </div>
                </div>
                <div class="list">
                    <table>
                        <colgroup>
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
                    <div class="tbody htype-02">
                        <table>
                            <colgroup>
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
                                    <td v-if="selectIndex === index">
                                        <div class="input_area">
                                            <input type="text" name="relationNm" :id="`relationNm_${index}`" v-model="relationNm">
                                        </div>
                                    </td>
                                    <td v-else>{{item.relationNm}}</td>
                                    <td v-if="selectIndex === index">
                                        <div>
                                            <select v-model="selectrelation">
                                                <option v-for="(re, index) in relationArr" :value="re.value" v-bind:key="index">{{re.text}}</option>
                                            </select> 
                                        </div>
                                    </td>
                                    <td v-else>{{item.relationCdNm}}</td>
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

export default {
    name: "Menu3",
    //말벗
    props:{
        recipientId: String,
        menu3Refresh: Number
    },
    data () {
        return {
            relationPhoneData: null,
            popCheck: false,
            lending : 0,
            msg : '',
            selectIndex: null,
            selectrelation:null,
            relationArr : [{value:'', text:'선택'},{value:'RL001', text: '남편'},{value:'RL002', text: '와이프'},{value:'RL003', text: '아들'},
            {value:'RL004', text: '딸'},{value:'RL005', text: '사위'},{value:'RL006', text: '며느리'},
            {value:'RL007', text: '손자'},{value:'RL008', text: '손녀'},{value:'RL009' , text:'기타'},],
            changerelation:null, changerelationNm:null, changerelationCd:null,
            relationNm:null, relationPhone:null,
            selectedIndex:0,
            radioCheck:'',
        }
    },
    created(){
        this.getRelationPhoneData();
    },
    methods:{
        //부모 컴포넌트에 데이터 전송
        sendParent(){
            this.popCheck=true
            this.msg = '말벗'
            this.$emit("openPopMsg",this.msg) 
            this.$emit("sendData3",this.relationPhoneData)
            this.$emit("openPop",this.popCheck)
            
        },
        //동작후 갱신 메소드
        sendMenu3Lending(){
            const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE008`
                axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
                .then(res => {
                this.relationPhoneData = res.data.data
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
        //전화번호 양식화
        changeRecipientPhoneno(phone){
            if(phone){
                let changeNumber = phone.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                return changeNumber
            }else{
                return ''
            }

        },
        //초기 호출 메소드
        async getRelationPhoneData(){
        //여기
            if(this.$props.menu3Refresh===1){
                const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers?typeCd=TPE008`
                await axios.get(url, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
                .then(res => {
                this.relationPhoneData = res.data.data
                //   = res.data.data.filter(pd =>{
                //       return pd.typeCd === "TPE008"
                //   })
                //this.sendMenu3Lending()
                }).catch(error => {
                    console.log("fail to load")
                    this.errorMessage = error.message;
                    console.error("There was an error!", error);
                });
            }
        },
        //말벗 삭제
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
                this.sendMenu3Lending()
                this.selectIndex = ''
                this.radioCheck = ''
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
        modifyRelationPhoneData(){
            if(this.selectIndex === null || this.selectIndex === undefined || this.selectIndex === ''){
                alert("수정할 대상자를 선택하여 주세요.")
                return false;
            }
            if(this.selectrelation === null || this.selectrelation === undefined || this.selectrelation === ''){
                alert("대상자의 관계를 선택하여 주세요.")
                return false
            }
            if(this.relationPhone.length >11){
                alert("전화번호는 최대 11자리까지 입력 가능합니다.")
                return false
            }
            this.changerelation = this.relationArr.filter(cd=>{
                return cd.value === this.selectrelation
            })
            this.changerelationNm = this.changerelation[0].text
            this.changerelationCd = this.changerelation[0].value
            let selectData = this.relationPhoneData[this.selectIndex]
            selectData.relationCdNm = this.changerelationNm
            selectData.relationCd = this.changerelationCd
            selectData.relationNm = this.relationNm
            selectData.relationPhone = this.relationPhone
            let selectRegSn = selectData.regSn
            const url  = this.$store.state.serverApi + `/admin/recipients/${this.recipientId}/phoneNumbers/${selectRegSn}/update`
            
            axios.post(url,selectData, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}})
            .then(res => {
            
            alert("성공적으로 수정되었습니다")
            this.sendMenu3Lending()
            this.selectIndex = ''
            this.radioCheck = ''
            }).catch(error => {
                console.log("fail to load")
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });  
        },
    }
}
</script>