<template>
    <div id="app">
        <div style="height: 46px;"></div>
        <van-row style="text-align: center;background-color: #fff;padding: 10px 0px;margin:10px;font-size: 14px;">
            <van-col :span="8" :class="{ 'active': item.active == active }" v-for="item in muens"
                @click="getProductList(item.active)">{{ item.text }}<van-icon :name="item.icon" /></van-col>
        </van-row>
        <van-grid :border="false" :column-num="2" :gutter="10">
            <van-grid-item v-for="item in productList" @click="toProduct(item.proid)">
                <template #icon>
                    <van-image :src="$api + item.mainimage" />
                </template>
                <template #text>
                    <font>
                        {{ item.name }}
                    </font>
                    <font color="#ee883b" size="4">
                        {{ $route.meta.title === '商品列表' ? '￥' : '积分' }}{{ item.price }}
                    </font>
                </template>
            </van-grid-item>
        </van-grid>
        <van-divider @click="loadMore()">点击加载更多</van-divider>
    </div>
</template>
<script>
import { selProduct } from '../../api/product';
export default {
    data() {
        return {
            active: 1,
            cateId: '',
            muens: [
                {
                    active: 1,
                    text: '综合',
                    icon: ''
                },
                {
                    active: 2,
                    text: '价格',
                    icon: 'sort'
                },
                {
                    active: 3,
                    text: '新品',
                    icon: ''
                }
            ],
            productList: [],
            pageSize: 10,
            sort: 'des',
            news: 1,
        }
    },
    created() {
        this.$emit('activeVlue', '')
        this.cateId = this.$route.query.cateID;
        this.getProductList(1);
    },
    methods: {
        getProductList(active) {
            this.active = active;
            let pageSize = this.pageSize;
            if (active === 2) {
                this.sort = this.sort === 'des' ? 'asc' : 'des';
            }
            let params = {
                pageSize,
                sort: active === 2 ? this.sort : '',
                news: active === 3 ? this.news : null,
                cateId: this.cateId
            }
            selProduct(params).then(res => {
                this.productList = res.data.records;
            })
        },
        loadMore() {
            this.pageSize += 10;
            this.getProductList(this.active)
        },
        toProduct(proid) {
            this.$router.push('/productDetails?proid=' + proid)
        }
    }
}
</script>
<style scoped>
#app {
    /* padding: 5px 0px; */
    height: 100%;
}

.active {
    color: #ff0000;
}
</style>