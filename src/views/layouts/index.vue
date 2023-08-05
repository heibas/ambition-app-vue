<template>
    <div id="app">
        <van-nav-bar v-if="$route.meta.navBar" style="position:fixed;left: 0;top: 0;z-index: 10;width: 100%;"
            @click-left="go" @click-right="$router.push('/seacher')" :title="$route.meta.title" left-arrow>
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <keep-alive v-if="$route.meta.keepAlive">
            <router-view @activeVlue="activeVlue" :class="{ tabBar: $route.meta.tabBar }"></router-view>
        </keep-alive>
        <router-view v-else @activeVlue="activeVlue" :class="{ tabBar: $route.meta.tabBar }"></router-view>
        <van-tabbar v-model="active" v-if="$route.meta.tabBar">
            <van-tabbar-item v-for="(item, index) in tabbbar" :key="index" :icon="item.icon" :to="item.to">
                {{ item.title }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0,
            tabbbar: [
                {
                    icon: 'home-o',
                    title: '首页',
                    to: {
                        path: '/home'
                    }
                },
                {
                    icon: 'apps-o',
                    title: '分类',
                    to: {
                        path: '/category'
                    }
                },
                {
                    icon: 'shopping-cart-o',
                    title: '购物车',
                    to: {
                        path: '/cat'
                    }
                },
                {
                    icon: 'contact',
                    title: '个人中心',
                    to: {
                        path: '/user'
                    }
                }
            ]
        }
    },
    methods: {
        activeVlue: function (value) {
            this.active = value;
        },
        go() {
            if (this.$route.name == 'order') {
                this.$router.push('/user')
            } else {
                this.$router.go(-1);
            }
        }
    }
}
</script>
<style scoped>
.tabBar {
    padding-bottom: 50px;
}
</style>