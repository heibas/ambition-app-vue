<template>
    <div id="app">
        <div style="height: 46px;"></div>
        <div class="banner">
            <van-row>
                <van-col :span="8">
                    <div class="text">总资产(元)</div>
                    <div class="number">{{ recharge.price }}</div>
                </van-col>
                <van-col :span="8">
                    <div class="text">累计充值(元)</div>
                    <div class="number">{{ recharge.upPrice }}</div>
                </van-col>
                <van-col :span="8">
                    <div class="text">累计消费(元)</div>
                    <div class="number">{{ recharge.conPrice }}</div>
                </van-col>

            </van-row>
        </div>
        <div class="mt-10">
            <van-cell title="充值100" icon="shop-o">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-button round type="danger" size="mini" class="pa-10" @click="addWallet(100)">充值</van-button>
                </template>
            </van-cell>
            <van-cell title="充值1000" icon="shop-o">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-button round type="danger" size="mini" class="pa-10" @click="addWallet(1000)">充值</van-button>
                </template>
            </van-cell>
        </div>
    </div>
</template>
<script>
import { getRecharge, addRecharge } from '../../api/recharge';
export default {
    created() {
        this.$emit('activeVlue', '')
        this.getWallet();
    },
    data() {
        return {
            recharge: {}
        }
    },
    methods: {
        addWallet(price) {
            addRecharge(price).then(res => {
                this.getWallet();
            });
        },
        getWallet() {
            getRecharge().then(res => {
                this.recharge = res.data;
            })
        }
    }
}
</script>
<style scoped>
#app {
    padding: 10px;
}

.banner {
    background-color: hsl(28, 90%, 16%);
    left: 0px;
    padding: 15px 0px;
    z-index: 100;
    border-radius: 5px;
    text-align: center;
    color: #ee3c51;
    font-size: 12px;
}

.number {
    font-size: 16px;
    margin-top: 5px;
}
</style>