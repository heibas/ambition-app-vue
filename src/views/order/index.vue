<template>
    <div id="app">
        <div style="height: 46px;"></div>
        <van-tabs v-model="activeName" @change="getTitle">
            <van-tab title="待付款" name="0" class="pa-10"></van-tab>
            <van-tab title="待发货" name="1" class="pa-10"></van-tab>
            <van-tab title="待收货" name="2" class="pa-10"></van-tab>
            <van-tab title="待评价" name="3" class="pa-10"></van-tab>
            <van-tab title="已完成" name="4" class="pa-10"></van-tab>
            <van-swipe-cell v-for="orders in orderList" class="mt-10 mb-5">
                <van-cell :border="false" :title="orders.orders.createTime" :value="title" />
                <van-card @click="$router.push('productDetails?proid=' + item.proid)" v-for="item in orders.children"
                    :desc="item.subtitle" :title="item.proname" class="goods-card" :num="item.quantity"
                    :thumb="$api + item.proimage">
                    <template #tags>
                        <van-tag plain type="danger">
                            <span v-for="(attr, index) in JSON.parse(item.attr)" :key="index">
                                {{ attr }}
                                <span :v-if="item.attr.size != (index + 1)">
                                    &nbsp;
                                </span>
                            </span>
                        </van-tag>
                    </template>
                    <template #price>
                        <font size="4" color="#ed6a0c">
                            ￥{{ item.currentunitprice }}.00
                        </font>
                    </template>
                </van-card>
                <van-cell>
                    <div style="text-align: right;">
                        <van-button size="small" v-if="activeName == 0"
                            @click="zhiPlay(orders.orders.orderid)">立即付款</van-button>
                        <van-button size="small" @click="playStare(orders.orders.orderid)">{{ name }}</van-button>
                        <van-button size="small" @click="lookOrder(orders.orders.orderid)">立即查看</van-button>
                    </div>
                </van-cell>
            </van-swipe-cell>
        </van-tabs>
        <van-empty v-if="orderList.length == 0" description="空空如也！" />
        <div style="height: 55px;"></div>
    </div>
</template>
<script>
import { Toast } from 'vant'
import { getorderList, playZhi, playExit, orderStare } from '../../api/orders'
export default {
    created() {
        this.$emit('activeVlue', '')
        this.activeName = this.$route.query.type
        this.list();
        if (this.activeName == 1) {
            this.title = '待发货'
        }
    },
    data() {
        return {
            activeName: '0',
            orderList: [],
            title: '待付款',
            name: '取消订单'
        }
    },
    watch: {
        activeName(oldvalue) {
            if (oldvalue == 0) {
                this.name = '取消订单'
            } else if (oldvalue == 1) {
                this.name = '提醒发货'
            } else if (oldvalue == 2) {
                this.name = '确认收货'
            } else if (oldvalue == 3) {
                this.name = '立即评价'
            } else {
                this.name = '删除订单'
            }

        },

    }
    ,
    methods: {
        list() {
            getorderList(this.activeName).then(res => {
                this.orderList = res.data;
                console.log(this.orderList)
            })
        },
        getTitle(name, title) {
            this.$router.push({
                query: {}
            })
            this.$router.replace({
                query: { type: name }
            })
            console.log(title)
            this.title = title
            this.list();
        },
        zhiPlay(orderid) {
            playZhi(orderid).then(res => {
                if (res.success) {
                    Toast.success("支付成功");
                    this.list();
                }
            })
        },
        playStare(orderid) {
            if (this.activeName == 0) {
                playExit(orderid).then(res => {
                    if (res.success) {
                        Toast.success("取消订单");
                        this.list();
                    }
                })
            } else if (this.activeName == 1) {
                Toast.success("已提醒卖家发货!")
            } else {
                orderStare(orderid).then(res => {
                    if (res.success) {
                        Toast.success("操作成功!")
                        this.list();
                    }
                })
            }

        },
        lookOrder(orderid) {
            this.$router.push('/lookOrder?orderId=' + orderid)
        }
    }
}
</script>
<style scoped>
.van-card {
    background-color: #fff;
}

.van-card:not(:first-child) {
    margin: 0px;
}
</style>
