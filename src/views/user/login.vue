<template>
    <div id="app">
        <div class="mb-10">
            <font size="5">登录</font>
        </div>
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="danger" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <div class="button">
            <font size="2" color="#999" @click="$router.push('/enroll')">还没有账号？马上注册</font>
        </div>
    </div>
</template>
<script>
import { login, info } from '../../api/login';
import jsCookie from 'js-cookie';
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        onSubmit() {
            let param = {
                username: this.username,
                password: this.password
            }
            login(param).then(res => {
                if (res.success) {
                    let { data } = res;
                    //存储token，设置失效时间
                    jsCookie.set("TOKEN", data.token, { expires: new Date(data.datetime) })
                    info().then(res => {
                        console.log(res.data)
                        this.$store.dispatch("SaveUser", res.data)
                    })
                    this.$router.push('/home')
                }
            })
        },
    },
};
</script>
<style scoped>
#app {
    padding: 0px 20px;
    text-align: center;
    padding-top: 35%;
    background-color: #fff;

}

.button {
    position: fixed;
    bottom: 5%;
    left: 50%;
    margin-left: -65px;

}
</style>