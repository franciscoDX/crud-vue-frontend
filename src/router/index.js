import {createRouter, createWebHistory} from 'vue-router'

import routes from './routes'
import store  from '@/store'

const router = createRouter ({
    history:createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isLogged = store.state["auth"].isLogged;
    if ( ! requiresAuth && isLogged ){
      next('/admin/')
    } 
    if ( requiresAuth && ! isLogged){
      next('/')
    } else{
      next()
    }
}) 

export default router