<template>
    <div id="app">
        <div style="height: 46px;"></div>
        <van-nav-bar v-if="recordList.length > 0">
            <template #right>
                <font size="3" color="#666" @click="show = !show">{{ show ? '取消' : '管理' }}</font>
            </template>
        </van-nav-bar>
        <van-grid clickable :column-num="2" center>
            <van-grid-item v-for="(item, index) in recordList" :key="item.id">
                <template #icon>
                    <van-checkbox v-if="show" :value="item.checked" @click="changeChe(index)"
                        class="checkbox"></van-checkbox>
                    <van-image :src="$api + item.mainimage" @click="toProduct(item.productId)" />
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
        <van-submit-bar v-if="show" button-text="删除" @submit="onSubmit">

            <van-checkbox v-model="isSelectAll" style="position: absolute;left: 10px;">全选</van-checkbox>
        </van-submit-bar>
        <van-empty v-if="recordList.length <= 0" description="空空如" />
    </div>
</template>
<script>
import { Toast } from 'vant';
import { list, batch } from '../../api/record'
export default {
    created() {
        this.type = this.$route.query.type;
        this.getList();
    },
    computed: {
        isSelectAll: {
            get: function () {
                return this.recordList.every(function (val) {
                    return val.checked;
                })
            },
            set: function (newValue) {
                for (var i = 0; i < this.recordList.length; i++) {
                    this.recordList[i].checked = newValue;
                    this.$set(this.recordList, i, this.recordList[i])
                }
            }
        }
    },
    data() {
        return {
            type: '',
            recordList: [],
            show: false
        }
    },
    methods: {
        getList() {
            list(this.type).then(res => {
                this.recordList = res.data;
            })
        },
        toProduct(proid) {
            this.$router.push('/productDetails?proid=' + proid)
        },
        changeChe(index) {
            this.recordList[index].checked = !this.recordList[index].checked;
            this.$set(this.recordList, index, this.recordList[index])

        },
        onSubmit() {
            let ids = [];
            this.recordList.forEach(item => {
                if (item.checked) {
                    ids.push(item.id);
                }
            })
            ids = ids.join(',');
            batch(ids).then(res => {
                if (res.success) {
                    Toast.success(res.msg)
                    this.show = false;
                }
                this.getList();
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
    z-index: 1000;
}
</style>