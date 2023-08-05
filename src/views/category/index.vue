<template>
    <div id="app">
        <div style="height: 46px;"></div>
        <van-tree-select style="height: 100%;margin-left: 10px;" :main-active-index="active" @click-nav="selNav"
            :items="items">
            <template #nav-text>
                {{ item.text }}
            </template>
            <template #content>
                <van-grid :column-num="3" :border="false">
                    <van-grid-item v-for="item in children" @click="addItem(item)">
                        <van-image :src="$api + item.image" width="50px" height="50px" />
                        <font size="3">{{ item.text }}</font>
                    </van-grid-item>
                </van-grid>
            </template>
        </van-tree-select>

    </div>
</template>
<script>
import { selCategory } from '../../api/category';
export default {
    data() {
        return {
            active: 0,
            items: [],
            children: []
        };
    },
    mounted() {
        this.$emit('activeVlue', 1)
        this.sel();
    },
    methods: {
        addItem(itme) {
            let cateid = [this.items[this.active].text, itme.text];
            // 
            this.$router.push('/productList?cateID=' + cateid)
        },
        sel() {
            selCategory(0).then(res => {
                this.items = res.data;
                this.selNav(0);
            })
        },
        selNav(index) {
            this.children = [];
            this.active = index;
            selCategory(this.items[index].cateid).then(res => {
                this.children = res.data;
            })
        }
    }
}
</script>
<style scoped>
#app {
    height: 100%;
    background-color: #fff;
}

.van-tree-select>>> {
    height: 100% !important;
}

.van-tree-select__nav,
.van-sidebar-item {
    background-color: #fff;

}

.productClassify>>> {
    background-color: #fff;
}
</style>