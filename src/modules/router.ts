import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    const auth = useAuthStore()
    router.beforeEach((to, from, next) => {
      if (to.meta.needAuth === true && !auth.isLoggedIn)
        next('/login')
      else if (to.meta.needAuth === false && auth.isLoggedIn)
        next('/')
      else
        next()
    })
  }
}
