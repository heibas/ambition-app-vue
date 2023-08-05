<template>
    <div id="app">
        <van-address-edit style="padding-top: 56px;" :area-list="areaList" show-postal :show-delete="show" show-set-default
            show-search-result save-button-text="提交" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" :address-info="addreinfo">
        </van-address-edit>
    </div>
</template>
<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { addOrUpdate, del } from '../../api/addres'
export default {
    data() {

        return {
            areaList,
            searchResult: [],
            addreinfo: {

            },
            show: false
        };
    },
    created() {
        this.show = this.$route.query.address ? true : false
        this.addreinfo = this.$route.query.address ? JSON.parse(this.$route.query.address) : {};
    },
    methods: {
        onSave(content) {
            console.log(content)
            addOrUpdate(content).then(res => {
                if (res.success) {
                    Toast('操作成功!');
                    this.$router.push('/address')
                }
            })
        },
        onDelete() {
            del(this.addreinfo.id).then(res => {
                if (res.success) {
                    Toast('操作成功！')
                    this.$router.push('/address')
                }
            })
        }
    },
};
</script>
<style scoped>
#app {
    /* padding: 10px; */
}
</style>