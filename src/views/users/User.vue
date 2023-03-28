<template>
  <div>
    <a> {{this.test}} </a>  
    <a @click="this.clickEvent()">{{this.test}}</a>
  </div>  
</template>

<script>
export default {
  data(){
    return{
      a:'',
      test:'',
    }
  },
  created(){
    test()
  },
  methods:{
    test(){
      for(let i = 0; i< 4; i++){
        this.a = i
      }
      if(a !== ''){
        this.test = this.a
      }
    },
    clickEvent(){
      this.test = 'Click'
    }
  }
}
</script>

<style>

</style>