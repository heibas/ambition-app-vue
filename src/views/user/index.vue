<template>
    <div id="app">
        <div class="top">
            <van-image round width="5rem" height="5rem" :src="$api + user.imageUrl" />
            <font size="4" color="#fff" style="position: absolute;top: 80px;left: 140px;">{{ user.username }}</font>
            <van-row>
                <div class="banner">
                    <van-col :span="6">
                        <div class="number">{{ consumerism.price }}</div>
                        <div class="text">余额</div>
                    </van-col>
                    <van-col :span="6">
                        <div class="number">0</div>
                        <div class="text">优惠价</div>
                    </van-col>
                    <van-col :span="6">
                        <div class="number">{{ consumerism.numPurchases ? consumerism.numPurchases : '0' }}</div>
                        <div class="text">购买数</div>
                    </van-col>
                    <van-col :span="6">
                        <div class="number">0</div>
                        <div class="text">积分</div>
                    </van-col>
                </div>
            </van-row>
        </div>
        <div class="button">
            <van-grid column-num="5" :border="false">
                <van-grid-item :icon="menu.icon" :text="menu.text" :to="menu.to" v-for="menu in menus" />

            </van-grid>
            <div class="info">
                <van-cell icon="location" is-link title="地址管理" @click="$router.push('/address')" />
                <van-cell icon="paid" is-link title="我的钱包" @click="$router.push('/wallet')" />
                <van-cell icon="goods-collect" is-link title="我的收藏" @click="$router.push('/collect?type=collect')" />
                <van-cell icon="underway" is-link title="我的足迹" @click="$router.push('/collects?type=foot')" />
                <van-cell icon="setting" is-link title="修改密码" @click="$router.push('/pass')" />
            </div>
            <van-button type="danger" block @click="exit()">退出登录</van-button>

        </div>
    </div>
</template>
<script>
import jsCookie from 'js-cookie';
import { Toast } from 'vant';
import { getRecharge } from '../../api/recharge'
export default {
    data() {
        return {
            menus: [
                {
                    icon: 'pending-payment',
                    text: '待支付',
                    to: '/order?type=0'
                },
                {
                    icon: 'logistics',
                    text: '待发货',
                    to: '/order?type=1'
                },
                {
                    icon: 'goods-collect-o',
                    text: '待收货',
                    to: '/order?type=2'
                },
                {
                    icon: 'cart-o',
                    text: '待评价',
                    to: '/order?type=3'
                },
                {
                    icon: 'completed',
                    text: '已完成',
                    to: '/order?type=4'
                }
            ],
            user: {},
            consumerism: {}
        }
    },
    created() {
        this.$emit('activeVlue', 3)
        this.getInfo()
        this.getRecha();
    },
    methods: {
        getRecha() {
            getRecharge().then(res => {
                this.consumerism = res.data;
            })
        },
        getInfo() {
            this.user = this.$store.getters.user;
            console.log("===========" + this.user.userid);
        },
        exit() {
            sessionStorage.clear();
            jsCookie.set('TOKEN', "", -1);
            Toast.success("退出成功");
            this.$store.commit('RESET_STATE');
            this.$router.push("/home");
        }
    }
}
</script>
<style scoped>
.top {
    padding: 50px;
    position: relative;
    background-color: #ee3c51;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    margin-bottom: 30px;
}

.button {
    margin: 15px;
}

.banner {
    position: absolute;
    background-color: hsl(28, 90%, 16%);
    width: 90%;
    bottom: -10px;
    left: 0px;
    padding: 10px 0px;
    color: aliceblue;
    z-index: 100;
    border-radius: 5px;
    text-align: center;
    color: #ee3c51;
    margin: 0px 20px;
    font-size: 12px;
}

.number {
    font-size: 16px;
}

.text {
    color: #fff;
}

.info {
    margin: 15px 0px;
}

.info /deep/ .van-icon-location {
    color: rgb(16, 237, 149);
}

.info /deep/ .van-icon-paid {
    color: #f86576c6;
}

.info /deep/ .van-icon-goods-collect {
    color: rgb(8, 145, 236);
}

.info /deep/ .van-icon-underway {
    color: #f86576c6;
}

.info /deep/ .van-icon-setting {
    color: #f86576c6;
}
</style>