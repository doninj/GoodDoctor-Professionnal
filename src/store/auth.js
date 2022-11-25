import { defineStore } from 'pinia'
import { supabase } from '~/superbase.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  getters: {
    isLoggedIn(state) {
      return !!state.user
    },
  },
  actions: {
    async login(user) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user?.email,
        password: user?.password,
      })
      if (error)
        throw new Error(error.message)
      user = supabase.from('profiles').select('*').eq('id', data.session.user.id).single()
      localStorage.setItem('user', JSON.stringify(user))
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
        user = supabase.from('profiles').select('*').eq('id', data.session.user.id).single()
      localStorage.setItem('user', JSON.stringify(user))
    },
    async logout() {
      const { error } = await supabase.auth.signOut()
      if (error)
        throw new Error(error.message)
      this.user = null
      localStorage.setItem('user', null)
    },
  },
})
