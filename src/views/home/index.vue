<template>
    <div id="app">
        <van-search shape="round" placeholder="请输入搜索关键词" style="position:fixed;left: 0;top: 0;z-index: 10;width: 100%;"
            @click="$router.push('/seacher')" />
        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" class="image" height="180px" width="100%" />
            </van-swipe-item>
        </van-swipe>
        <van-grid :column-num="2">
            <van-grid-item v-for="(item, index) in menubar" :key="index" :icon="item.icon" size="30px"
                @click="$router.push(item.to)" :text="item.text" />
        </van-grid>
        <div style="background-color: #fff;margin: 10px 0px;">
            <div class="pa-5">精品推荐：</div>
            <van-grid :border="false" :column-num="2">

                <van-grid-item v-for="item in productList" :key="item.proid" @click="toProduct(item.proid)">
                    <template #icon>
                        <van-image :src="$api + item.mainimage" />
                    </template>
                    <template #text>
                        <font>
                            {{ item.name }}
                        </font>
                        <font color="#ee883b" size="4">
                            ￥{{ item.price }}
                        </font>
                    </template>
                </van-grid-item>
            </van-grid>
        </div>
        <div style="background-color: #fff;">
            <div class="pa-5">猜你喜欢：</div>
            <van-card v-for="item in  likeList" @click="toProduct(item.proid)" :key="item.proid" tag="Like"
                :desc="item.subtitle" :title="item.name" :thumb="$api + item.mainimage"
                style="background-color: #fff;margin: 0px;">
                <template #price>
                    <font color="#ee883b" size="4">
                        ￥{{ item.price }}
                    </font>
                </template>
            </van-card>
        </div>
        <div style="height: 55px;"></div>

    </div>
</template>
<script>
import { recommendation, getLike } from '../../api/product';
export default {
    data() {
        return {
            images: [
                'https://img01.yzcdn.cn/vant/apple-1.jpg',
                'https://img01.yzcdn.cn/vant/apple-2.jpg',
            ],
            menubar: [],
            productList: [],
            likeList: []
        }
    },
    created() {
        console.log("首页创建");
        this.$emit('activeVlue', 0)
        this.getMenuBer();
        this.getRecommendation();
        this.List();
    },
    methods: {
        List() {
            getLike().then(res => {
                this.likeList = res.data;
            })
        },
        getMenuBer() {
            this.menubar = [
                {
                    icon: 'goods-collect-o',
                    text: '全部商品',
                    to: '/productList'
                },
                {
                    icon: 'points',
                    text: '积分商品',
                    to: '/pointsList'
                }
            ]
        },
        getRecommendation() {
            recommendation().then(res => {
                this.productList = res.data
            })
        },
        toProduct(proid) {
            this.$router.push('/productDetails?proid=' + proid)
        }
    },
    beforeDestroy() {
        console.log("首页即将销毁");
    }
}
</script>
<style scoped>
#app {
    background-color: #f8f8f8;
    padding: 10px;
}

.my-swipe .van-swipe-item {
    font-size: 20px;
    text-align: center;
}

.image {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}


.my-swipe {
    margin-top: 55px;
}
</style>
<style>
html,
body>>> {
    background-color: #f8f8f8 !important;
}
</style>