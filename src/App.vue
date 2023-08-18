<template>
  <div>
    <div v-if="loginCheck != 'null'">
      <HeaderComp ></HeaderComp>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComp from "./views/pages/HeaderComp.vue";
export default {
  name: 'App',
  components:{
    HeaderComp
  },
  data: () => ({
    userId: null,
    userNm: null,
  }),
  computed: {
    loginCheck(){
      //let loginVal = sessionStorage.getItem("userId")
      console.log("mainState is ")
      console.log(this.$store.state.userId)
      console.log(this.$store.state.userNm)
      this.$store.state.userId = sessionStorage.getItem("userId")
      //this.$store.state.userNm = sessionStorage.getItem("userNm")
       if( this.$store.state.userId == null || this.$store.state.userId == undefined || this.$store.state.userId == ''){
         this.$router.push({ name: 'Home' });
       }
       //if( this.$store.state.userNm == null || this.$store.state.userNm == undefined || this.$store.state.userNm == ''){
       //  this.$router.push({ name: 'Home' });
       //}
        return this.$store.state.userId
        //console.log(this.$store.state.userNm)
        //return this.$store.state.userNm
    }
  },
  
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';

  
</style>
