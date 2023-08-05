<template>
    <div id="app">
        <van-address-list style="padding-top: 60px;" :value="chosenAddressId" :list="listAddress" default-tag-text="默认"
            @add="onAdd" @edit="onEdit" />
    </div>
</template>
<script>
import { addredList } from '../../api/addres'

export default {
    data() {
        return {
            chosenAddressId: '',
            listAddress: [

            ]
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            addredList().then(res => {
                this.listAddress = res.data;
                this.listAddress.forEach(item => {
                    if (item.isDefault) {
                        this.chosenAddressId = item.id;
                    }
                    item.address = item.province + item.city + item.county + item.addressDetail;
                })
            })
        },
        onAdd() {
            this.$router.push('/newAddress')
        },
        onEdit(item, index) {
            this.$router.push('/newAddress?address=' + JSON.stringify(item))
        },
    },
};
</script>
<style scoped>
#app {
    height: 100%;
}

.van-address-item:not(:last-child) {
    margin-bottom: 10px;
}
</style>
