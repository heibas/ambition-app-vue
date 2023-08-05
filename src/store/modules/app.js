
const state = {
    user: '',
    cartNum: ''
}


const getDefaultState = () => {
    return {
        user: '',
        cartNum: ''
    }
}
const mutations = {
    SAVE_User(state, user) {
        state.user = user
    },
    Cart_NUM(state, cartNum) {
        state.cartNum = cartNum
    },
    RESET_STATE(state) {
        Object.assign(state, getDefaultState())
    },
}
const actions = {
    SaveUser({
        commit
    }, user) {
        commit('SAVE_User', user);
    },
    Cart_NUM({
        commit
    }, cartNum) {
        commit('Cart_NUM', cartNum);
    }
}
export default {
    state,
    mutations,
    actions
}
