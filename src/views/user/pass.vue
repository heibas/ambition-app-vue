<template>
    <div id="app">
        <div style="height: 46px;"></div>
        <van-form @submit="onSubmit">

            <van-field v-model="password" type="password" name="原始密码" label="原始密码" placeholder="请输入"
                :rules="[{ required: true, message: '请填写原始密码' }]" />
            <van-field v-model="newPassword" type="password" name="新密码" label="新密码" placeholder="请输入"
                :rules="[{ required: true, message: '请填写新密码' }]" />
            <van-field v-model="password1" type="password" name="重复密码" label="重复密码" placeholder="请输入" :rules="[{
                required: true, message: '请填写重复密码'
            }]" />
            <div style="margin-top: 10px;">
                <van-button block type="danger" native-type="submit">确定</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { Toast } from 'vant';
import { userUpdate } from '../../api/login';
import jsCookie from 'js-cookie';
export default {
    data() {
        return {
            newPassword: '',
            password1: '',
            password: '',
        };
    },
    created() {
        this.$emit('activeVlue', '')
    },
    methods: {
        onSubmit() {
            if (this.newPassword != this.password1) {
                Toast.fail("两次密码不一致")
            } else {
                let param = {
                    password: this.password,
                    newPassword: this.newPassword,
                }
                userUpdate(param).then(res => {
                    if (res.success) {
                        Toast.success("修改成功，请重新登录")
                        sessionStorage.clear();
                        jsCookie.set('TOKEN', "", -1);
                        this.$router.push("/home");
                    }
                })
            }
        },
    },
};
</script>
<style scoped>
#app {
    padding: 10px;
}
</style>