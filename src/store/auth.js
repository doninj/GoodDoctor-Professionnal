import { defineStore } from 'pinia'
import { supabase } from '~/superbase.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    getUsers(state) {
      return state.user
    },
    isLoggedIn(state) {
      return !!state.user
    },
  },
  actions: {
    async fetchUser() {
      const { data } = await supabase.auth.getSession()
      if (data)
        this.user = (await supabase.from('profiles').select('*').eq('id', data.session.user.id).single()).data
    },
    async login(user) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user?.email,
        password: user?.password,
      })
      if (error) {
        navigator.vibrate(100)
        throw new Error(error.message)
      }

      this.user = (await supabase.from('profiles').select('*').eq('id', data.session.user.id).single()).data
      return data
    },
    async register(user) {
      const { error } = await supabase.auth.signUp({
        email: user?.email,
        password: user?.password,
      })
      if (error)
        throw new Error(error.message)
      const { data } = await supabase.auth.getSession()
      if (data)
        this.user = (await supabase.from('profiles').select('*').eq('id', data.session.user.id).single()).data
    },
    async logout() {
      const { error } = await supabase.auth.signOut()
      if (error)
        throw new Error(error.message)
      this.user = null
    },
  },
})
