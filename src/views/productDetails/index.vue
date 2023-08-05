<template>
    <div id="div">
        <div style="height: 46px;"></div>
        <van-swipe @change="onChange">
            <van-swipe-item v-for="item in product.subimages">
                <van-image width="100%" fit="cover" height="100%" icon="arrowtt" :src="item.url" />
            </van-swipe-item>
            <template #indicator>
                <div class="custom-indicator">{{ current + 1 }}/{{ size }}</div>
            </template>
        </van-swipe>
        <van-row class="mt-10 mb-10 div">
            <van-col :span="16">
                <div>
                    <font size="4" color="#ee883b">￥</font>
                    <font size="6" color="#ee883b">
                        {{ product.price }}
                    </font>
                </div>
                <div class="mt-5 mb-5">
                    <font size="2"> {{ product.subtitle }}
                    </font>
                </div>
            </van-col>
            <van-col :span="8" style="color: #999;text-align: right;">
                <font size="2">浏览：{{ product.pageView }}
                </font>
                <br>
                <font size="2">销量：{{ product.volume }}
                </font>
            </van-col>
        </van-row>
        <van-row class="div" style="font-size: 14px;">
            <div @click="show = true">
                <van-col :span="12" class="pa-10">
                    选择规格:
                </van-col>
                <van-col :span="12" style="color: #999;" class="ta-r pa-10">
                    <span v-for="itme in product.supChoose">
                        {{ initialSku[itme] }}
                    </span>
                    <van-icon name="arrow" />
                </van-col>
            </div>
        </van-row>
        <div class="div mt-10" style="font-size: 14px;padding: 20px;">
            图片详情:
            <van-divider />
            <van-image :src="$api + product.detail"></van-image>
        </div>
        <div style="height: 50px;"></div>
        <van-goods-action>
            <van-goods-action-icon icon="cart-o" @click="$router.push('/cat')" text="购物车" :badge="$store.getters.cartNum" />
            <van-goods-action-icon icon="star" v-if="record" text="已收藏" @click="delRecord" color="#ff5000" />
            <van-goods-action-icon icon="star-o" @click="addRecord('collect')" v-else text="收藏" />
            <van-goods-action-button type="warning" text="加入购物车" @click="show = true" />
            <van-goods-action-button type="danger" text="立即购买" @click="show = true" />
        </van-goods-action>

        <van-sku v-model="show" ref="shop" :initial-sku="initialSku" :sku="sku" :goods="goods" @buy-clicked="onBuyClicked"
            :goods-id="product.proid" @add-cart="onAddCartClicked" @sku-selected="skuSelected">
            <template #sku-header-price="props">
                <div class="van-sku__goods-price">
                    <span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ props.price * 100
                    }}</span>
                </div>
            </template>
        </van-sku>
    </div>
</template>
<script>
import { productDetails, productSku } from '../../api/product';
import { cartNum } from '../../api/cart';
import jsCookie from 'js-cookie';
import { Toast } from 'vant';
import { add } from '../../api/cart'
import { recordGet, del, recordAdd } from '../../api/record'
export default {
    data() {
        return {
            show: false,
            current: 0,
            size: 0,
            product: {},
            record: false,//是否收藏
            sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [

                ],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                list: [

                ],
                none_sku: false, // 是否无规格商品
                hide_stock: false // 是否隐藏剩余库存
            },
            goods: {

            },
            initialSku: {

            },
            cartNum: ''
        };
    },
    created() {
        this.getProductDetails(this.$route.query.proid)
        this.getSku(this.$route.query.proid)
        this.addRecord('foot');
        if (jsCookie.get("TOKEN")) {
            this.getCartNum();
            this.getRecord();
        }
    },
    methods: {
        getRecord() {
            recordGet(this.$route.query.proid).then(res => {
                this.record = res.data;
            })
        },
        addRecord(type) {
            recordAdd(this.$route.query.proid, type).then(res => {
                if (res.success && type == "collect") {
                    Toast.success("收藏成功")
                    this.record = true
                }
            });
        },
        delRecord() {
            del(this.$route.query.proid).then(res => {
                if (res.success) {
                    Toast.success("取消收藏")
                    this.record = false;
                }
            })
        },
        getProductDetails(proid) {
            productDetails(proid).then(res => {
                this.product = res.data;
                this.product.subimages = JSON.parse(this.product.subimages)
                this.size = this.product.subimages.length
                this.goods.picture = this.$api + this.product.mainimage;
                this.product.supChoose = JSON.parse(this.product.supChoose)
                let norms = JSON.parse(this.product.norms)
                norms.forEach(item => {
                    let v = [];
                    item.values.forEach(item => {
                        v.push({
                            id: item,
                            name: item
                        })
                    })
                    this.sku.tree.push({
                        k: item.specName,
                        k_s: item.specName,
                        v: v
                    })
                })
            })
        },
        getSku(proid) {
            productSku(proid).then(res => {
                this.sku.list = res.data
                this.sku.list.forEach((item, index) => {
                    this.sku.list[index] = { id: item.id, ...JSON.parse(item.attr), stock_num: item.num, price: item.price, image: item.image }
                })
                this.sku.price = this.sku.list[0].price
                this.sku.stock_num = this.sku.list[0].stock_num
                this.sku.collection_id = this.sku.list[0].id
                this.initialSku = this.sku.list[0]
            })

        },
        onAddCartClicked(data) {
            if (!jsCookie.get("TOKEN")) {
                Toast.fail("请登录")
                this.$router.push('/login?')
                return;
            }
            let param = {
                userid: this.$store.getters.user.userid,
                proid: data.goodsId,
                productAttrId: data.selectedSkuComb.id,
                quantity: data.selectedNum,
                checked: false
            }
            add(param).then(res => {
                if (res.success) {
                    Toast.success(res.msg)
                    this.getCartNum();

                }
            })
        },
        onBuyClicked(data) {
            if (!jsCookie.get("TOKEN")) {
                Toast.fail("请登录")
                this.$router.push('/login')
            }
            let param = {
                userid: this.$store.getters.user.userid,
                proid: data.goodsId,
                productAttrId: data.selectedSkuComb.id,
                quantity: data.selectedNum,
                checked: true
            }
            add(param).then(res => {
                if (res.success) {
                    this.$router.push('/play?id=' + res.data)
                }
            })
        },
        onChange(index) {
            this.current = index;
        },
        onSelect(option) {
            Toast(option.name);
            this.showShare = false;
        },
        getCartNum() {
            cartNum().then(res => {
                this.$store.dispatch('Cart_NUM', res.data);
            })
        },
        skuSelected(value) {
            this.goods.picture = value.selectedSkuComb ? this.$api + value.selectedSkuComb.image : this.$api + this.product.mainimage;

        }
    }
}
</script>
<style>
#div {
    padding: 10px;
}

.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    color: white;
}

.div {
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
}
</style>