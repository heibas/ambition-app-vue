<template>
    <div id="app">
        <div style="height: 46px;">
        </div>
        <div style="height: 60px;background-color: #ee3c51;text-align: center;line-height: 60px;">
            <font color="#fff">
                {{ status }}
            </font>
        </div>

        <van-cell size="large">
            <template #title>
                <font size="3">
                    {{ shopping.receivername }}&nbsp; {{ shopping.receiverphone }}
                    <br>
                </font>
                <font size="2" color="#999">
                    {{ shopping.receiverprovince }}&nbsp; {{ shopping.receivercity }}
                    &nbsp; {{ shopping.receiverdistrict }}&nbsp; {{ shopping.receiveraddress }}
                </font>
            </template>
        </van-cell>
        <van-swipe-cell class="mt-10 mb-5">
            <van-cell :title="order.createTime" :value="title" />
            <van-card @click="$router.push('productDetails?proid=' + item.proid)" v-for="item in orders.children"
                :desc="item.subtitle" :title="item.prostatus" class="goods-card" :num="item.quantity"
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
            <van-cell title="快递">
            </van-cell>
            <van-cell title="订单号" :value="order.orderid">
            </van-cell>
            <van-cell title="下单时间" :value="order.createTime">
            </van-cell>
            <van-cell title="运费" value="免运费">
            </van-cell>
            <van-cell title="优惠" value="无优惠">
            </van-cell>
            <van-cell title="总金额" :value="order.payment">
            </van-cell>
            <van-cell title="支付方式" :value="order.paymenttype == 1 ? '余额支付' : '在线支付'">
            </van-cell>
        </van-swipe-cell>
    </div>
</template>
<script>
import { getOrder } from '../../api/orders'
export default {
    created() {
        this.getOrderId();
    },
    data() {
        return {
            orders: {},
            order: {},
            shopping: {},
            status: '',
            type: '',
            title: ''
        }
    },
    watch: {
        type(type) {
            if (type === 0) {
                this.status = '请完成支付'
                this.title = '未付款'
            } else if (type === 1) {
                this.status = '商家未发货，请耐心等待'
                this.title = '未发货'
            } else if (type === 2) {
                this.status = '服务商已发货'
                this.title = '待收货'
            } else if (type === 3) {
                this.status = '已收货，快去评一下吧'
                this.title = '待评价'
            } else {
                this.status = '交易完成，感谢你的支持'
                this.title = '已完成'
            }
        }
    },
    methods: {
        getOrderId() {
            getOrder(this.$route.query.orderId).then(res => {
                if (res.success) {
                    this.orders = res.data;
                    this.order = res.data.orders;
                    this.shopping = res.data.shopping;
                }
                this.type = res.data.orders.status;

            });
        }
    }
}
</script>
<style scoped>
.van-card:not(:first-child) {
    margin: 0px;
    background-color: #fff;
}
</style>