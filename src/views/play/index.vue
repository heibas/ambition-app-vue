<template>
    <div id="app">
        <div style="height: 46px;"></div>
        <van-cell is-link @click="show = true">
            <template #title>
                <span v-if="address == ''">请选择地址</span>
                <van-row v-else>
                    <van-col :span="24">
                        {{ address.name }}&nbsp;{{ address.tel }}
                    </van-col>
                    <van-col :span="24">
                        <font size="2" color="#999">
                            {{ address.province }}&nbsp;{{ address.city }}&nbsp;{{ address.county }}
                        </font>

                    </van-col>
                </van-row>
            </template>
        </van-cell>
        <van-swipe-cell v-for="(cart, index) in cartList" :key="cart.carId" class="mt-5 mb-5">
            <van-card :desc="cart.subtitle" :title="cart.name" class="goods-card" :num="cart.quantity"
                :thumb="$api + cart.image">
                <template #tags>
                    <van-tag plain type="danger">
                        <span v-for="(attr, index) in cart.attr" :key="index">
                            {{ attr }}
                            <span :v-if="cart.attr.size != (index + 1)">
                                &nbsp;
                            </span>
                        </span>
                    </van-tag>
                </template>
                <template #price>
                    <font size="4" color="red">
                        ￥{{ cart.price }}.00
                    </font>
                </template>
            </van-card>
        </van-swipe-cell>

        <van-action-sheet v-model="show" @select="onSelect" style="padding-bottom: 60px;">
            <div class="content">
                <van-contact-card type="add" @click="onAdd" />
                <van-contact-card type="edit" v-for="address in listAddress" :name="address.name" :tel="address.tel"
                    @click="onEdit(address)" />
            </div>
        </van-action-sheet>
        <van-field label="商品价格">
            <template #input>
                <font class="ta-r w-100" color="#999">￥{{ price / 100.00 }}.00</font>
            </template>
        </van-field>
        <van-field label="优惠">
            <template #input>
                <font class="ta-r w-100" color="#999">￥0.00</font>
            </template>
        </van-field>
        <van-field label="运费">
            <template #input>
                <font class="ta-r w-100" color="#999">免费邮</font>
            </template>
        </van-field>
        <van-field label="备注" v-model="remarks" placeholder="请输入备注">
        </van-field>
        <van-radio-group v-model="radio" direction="horizontal">
            <van-cell center icon="shop-o" class="mt-5">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-radio name="1"></van-radio>
                </template>
                <template #title>
                    <font size="2">余额</font><br>
                    <font size="1" color="#999">￥{{ recharge }}.00</font>
                </template>
            </van-cell>
            <van-cell center icon="shop-o">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-radio name="2" disabled></van-radio>
                </template>
                <template #title>
                    <font size="2">微信</font><br>
                    <font size="1" color="#999">暂未开通</font>
                </template>
            </van-cell>
        </van-radio-group>
        <van-submit-bar button-text="提交订单" @submit="onSubmit" :price="price">
        </van-submit-bar>
        <div style="height: 60px;"></div>
    </div>
</template>
<script>
import { Toast } from 'vant';
import { addredList } from '../../api/addres'
import { playlist } from '../../api/cart'
import { play } from '../../api/orders'
export default {
    data() {
        return {
            show: false,
            radio: '1',
            listAddress: [

            ],
            cartList: [],
            address: '',
            remarks: '',
            price: 0,
            recharge: ''
        }
    },
    created() {
        this.$emit('activeVlue', '')
        this.getList();
        this.getCart();

    },
    methods: {
        getCart() {
            let id = this.$route.query.id;
            playlist(id).then(res => {
                this.cartList = res.data.cartList;
                this.price = res.data.price * 100;
                this.recharge = res.data.recharge;
                this.cartList.forEach(item => {
                    item.attr = JSON.parse(item.attr);
                    item.supChoose = JSON.parse(item.supChoose)
                })
            })
        },
        getList() {
            addredList().then(res => {
                this.listAddress = res.data;
                this.listAddress.forEach(item => {
                    if (item.isDefault) {
                        this.address = item;
                    }
                    item.address = item.province + item.city + item.county + item.addressDetail;
                })
            })
        },
        onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
            Toast(item.name);
        },
        onAdd() {
            this.$router.push('/address')
        },
        onEdit(address) {
            this.show = false;
            this.address = address;
        },
        onSubmit() {
            if (!this.$route.query.id) {
                return;
            }
            let param = {
                addressId: this.address.id,
                remark: this.remarks,
                paymenttype: this.radio
            }

            play(this.$route.query.id, param).then(res => {
                if (res.success) {
                    if (res.data == 0) {
                        Toast.fail("余额不足!")
                    } else {
                        this.$router.push('/paySuccess')
                    }
                }
            })
            this.$router.push({
                query: {}
            })
        }
    }
}
</script>
<style scoped>
#app {
    padding: 10px;
}

.van-card {
    background-color: #fff;
}
</style>