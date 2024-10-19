import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,  // 用户状态
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;  // 设置用户数据
    },
  },
  actions: {
    setUser({ commit }, userData) {
      commit('setUser', userData);  // 提交用户数据到 mutation
    },
  },
  getters: {
    getUser: (state) => state.user,  // 获取用户数据
  },
});
