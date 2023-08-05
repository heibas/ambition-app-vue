<template>
    <div id="app">
        <van-search v-model="value" @blur="seache()" shape="round" background="red" placeholder="请输入搜索关键词" />
        <van-empty image="search" v-if="recordList.length < 1" description="没有搜索到该商品，换个关键字吧   " />
        <van-grid clickable :column-num="2" :gutter="10" class="mt-10" center>
            <van-grid-item v-for="item in recordList" :key="item.id">
                <template #icon>
                    <van-image :src="$api + item.mainimage" @click="toProduct(item.proid)" />
                </template>
                <template #text>
                    <font size="2" color="#551A8B">
                        {{ item.name }}
                    </font>
                    <font color="#ee883b" size="4">
                        ￥{{ item.price }}
                    </font>
                </template>
            </van-grid-item>
        </van-grid>
    </div>
</template>
<script>
import { listSeacher } from '../../api/product';
export default {
    created() {
        this.$emit('activeVlue', '')
    },
    data() {
        return {
            value: '',
            recordList: []
        }
    },
    methods: {
        seache() {
            listSeacher(this.value).then(res => {
                this.recordList = res.data;
            })
        },
        toProduct(proid) {
            this.$router.push('/productDetails?proid=' + proid)
        }
    }
}
</script>