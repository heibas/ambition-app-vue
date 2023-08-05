<template>
    <div id="app">
        <div class="mb-10">
            <font size="5">注册</font>
        </div>
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="phone" type="phone" name="手机号" label="手机号" placeholder="手机号"
                :rules="[{ required: true, message: '请填写手机号' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field v-model="newpassword" type="password" name="密码" label="重复密码" placeholder="重复密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field v-model="code" center clearable label="验证码">
                <template #button>
                    <van-button size="small" type="info" native-type="button" @click="getCode()">{{ identifying ?
                        identifying : '发送验证码'
                    }}</van-button>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="danger" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <div class="button">
            <font size="2" color="#999" @click="$router.push('/login')">还没有账号？马上注册</font>
        </div>
    </div>
</template>
<script>
import { code, enroll } from '../../api/login';
import { Toast } from 'vant';
export default {
    data() {
        return {
            username: '',
            password: '',
            newpassword: '',
            phone: '',
            code: '',
            identifying: ''
        };
    },
    methods: {
        onSubmit() {
            if (this.newpassword != this.password) {
                Toast.fail("两次密码不一致")
                return;
            }
            let param = {
                username: this.username,
                password: this.password,
                phone: this.phone,
                code: this.code
            }
            enroll(param).then(res => {
                if (res.success) {
                    Toast.success(res.msg)
                    this.$router.push('/login')
                }
            })
        },
        getCode() {
            code(this.phone).then(res => {
                console.log(res)
                if (res.success) {
                    this.identifying = res.data;
                    Toast.success(res.msg)
                }
            })
        }
    },
};
</script>
<style scoped>
#app {
    padding: 0px 20px;
    text-align: center;
    padding-top: 25%;
    background-color: #fff;

}

.button {
    position: fixed;
    bottom: 5%;
    left: 50%;
    margin-left: -65px;

}
</style>