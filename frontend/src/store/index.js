import { createStore } from "vuex";
import { auth, db } from "../firebase/firebase";
export default createStore({
  state: {
    SampleBlogCards: [
      { blogTitle: "blog Card 01", blogCoverPhoto: "stock1" },
      { blogTitle: "blog Card 02", blogCoverPhoto: "stock2" },
      { blogTitle: "blog Card 03", blogCoverPhoto: "stock3" },
      { blogTitle: "blog Card 04", blogCoverPhoto: "stock4" },
    ],
    editPost: null,
    user: null,
    profileEmail: null,
    profileName: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    isAuthenticated(state) {
      return state.user;
    },
    currentUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileUsername = doc.data().username;
      console.log(state.profileId);
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await db
        .collection("users")
        .doc(firebare.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
    },
    login({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("setUser", null);
    },
  },
  modules: {},
});
