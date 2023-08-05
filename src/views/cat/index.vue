<template>
    <div id="app">
        <div style="height: 46px;"></div>
        <van-submit-bar :price="getTotal" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="isSelectAll">全选</van-checkbox>
            <template #tip>
                左滑动商品可删除该商品！
            </template>
        </van-submit-bar>
        <van-swipe-cell v-for="(cart, index) in cartList" :key="cart.carId" class="mb-10">
            <van-card :desc="cart.subtitle" :title="cart.name" class="goods-card">
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
                        {{ cart.price }}.00
                    </font>
                </template>
                <template #thumb>
                    <van-image width="88px" height="88px" fit="cover" :src="$api + cart.image">
                        <van-checkbox :value="cart.checked" @click="changeChe(index)" class="checkbox"></van-checkbox>
                    </van-image>
                </template>
                <template #num>
                    <van-stepper :value="cart.quantity" async-change
                        @change="($event) => { onChange($event, cart.carId, index, cart.quantity) }" />
                </template>
            </van-card>
            <template #right>
                <van-button square text="删除" @click="delCart(cart.carId, index)" type="danger" class="delete-button" />
            </template>

        </van-swipe-cell>
        <van-empty v-if="cartList.length == 0" description="空空如也!" />
        <div style="height: 84px;" v-if="cartList"></div>

    </div>
</template>
<script>
import { list, delCart, updCart } from '../../api/cart'
import { Toast } from 'vant'
export default {
    data() {
        return {
            cartList: [],
            checked: false
        }
    },
    computed: {
        getTotal: function () {
            let newCartList = this.cartList.filter(function (item) {
                return item.checked == true;
            })
            let price = 0;
            newCartList.forEach(item => {
                price += item.quantity * item.price
            })
            return price * 100;
        },
        isSelectAll: {
            get: function () {
                if (this.cartList.length == 0) {
                    return false;
                }
                return this.cartList.every(function (val) {
                    return val.checked === true;
                })
            },
            set: function (newValue) {
                for (var i = 0; i < this.cartList.length; i++) {
                    this.cartList[i].checked = newValue;
                    this.$set(this.cartList, i, this.cartList[i])
                }
            }
        }
    },
    created() {
        this.$emit('activeVlue', 2)
        this.getList();
    },
    methods: {
        changeChe(i) {
            this.cartList[i].checked = this.cartList[i].checked ? false : true;
            this.$set(this.cartList, i, this.cartList[i])

        },
        getList() {
            list().then(res => {
                this.cartList = res.data;
                this.cartList.forEach(item => {
                    item.attr = JSON.parse(item.attr);
                    item.supChoose = JSON.parse(item.supChoose)
                    item.checked = false;
                })
            })
        },
        onSubmit() {
            let id = [];
            this.cartList.forEach(item => {
                if (item.checked) {
                    id.push(item.carId);
                }
            })
            if (id.length == 0) {
                Toast.fail("至少要选择一件商品!");
                return;
            }
            this.$router.push('/play?id=' + id)
        },
        onChange(number, carId, index, quantity) {
            updCart(carId, number).then(res => {
                if (res.success) {
                    this.cartList[index].quantity = number;
                } else {
                    console.log(quantity)
                    this.cartList[index].quantity = quantity;
                }
            })
        },
        delCart(carId, index) {
            delCart(carId).then(res => {
                if (res.success) {
                    Toast.success(res.msg)
                    this.cartList.splice(index, 1)
                }
            })
        }
    }
}
</script>
<style scoped>
#app {

    padding: 10px;

}

.checkbox {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 100;
}

.delete-button {
    height: 100%;
}

.van-card {
    background-color: #fff;
}
</style>
