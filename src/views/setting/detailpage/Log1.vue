<template>
    <div class="wrap">

                <div class="result_txt">
                    <p>조회결과 : <strong class="num">{{!this.NCount? 0 : this.NCount}}</strong>건</p>
                </div>
                <div class="list result"><!-- 로그 선택시 -->
                    <table>
                        <colgroup>
                            <col style="width:6%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:12%;">
                            <col style="width:12%;">
                            <col style="width:auto;">
                            <col style="width:20%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">순번</th>
                                <th scope="col">아이디</th>
                                <th scope="col">Application</th>
                                <th scope="col">구분</th>
                                <th scope="col">IP</th>
                                <th scope="col">내용</th>
                                <th scope="col">로그일시</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="tbody">
                        <table>
                            <colgroup>
                                <col style="width:6%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:12%;">
                                <col style="width:12%;">
                                <col style="width:auto;">
                                <col style="width:20%;">
                            </colgroup>
                            <tbody >
                                <tr v-for="(item,index) in logItems" v-bind:key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{item.userId}}</td>
                                    <td>{{item.applicationNm}}</td>
                                    <td>{{item.actionDetails}}</td>
                                    <td>{{item.accessIp}}</td>
                                    <td>{{item.logDetails}}</td>
                                    <td>{{item.logDtime}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="pagination mt0">
					<a href="#" class="front">첫 페이지</a>
					<a href="#" class="prev">이전 페이지</a>
					<a href="#" class="on">1</a>
					<a href="#">2</a>
					<a href="#">3</a>
					<a href="#">4</a>
					<a href="#">5</a>
					<a href="#">6</a>
					<a href="#">7</a>
					<a href="#">8</a>
					<a href="#">9</a>
					<a href="#">10</a>
					<a href="#" class="next">다음 페이지</a>
					<a href="#" class="back">마지막 페이지</a>
				</div>
        </div>
</template>
<style lang="scss">
@import '../../../assets/scss/common.css';
@import '../../../assets/scss/sub.css';
</style>

<script>

export default {
    name: 'Log1',

    props:{
        logItems: Array,
        s_date: String,
        e_date: String,
        NCount: Number,
    },
    data(){
      return{
        tabletId: '',
        isTablet: false, isCustomer: false,
        isLog: true,
      }
    },
}
</script>
<style>
</style>