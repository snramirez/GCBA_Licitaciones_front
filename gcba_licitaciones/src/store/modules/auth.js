import axios from 'axios'
import router from '../../router/index'
axios.defaults.baseURL = 'http://localhost:8082/api'

export default ({
    namespaced: true,
    state:{
        user:null,
    },

    getters: {
        authUser(state){
          return !!state.user
        },
    },

    mutations: {
        setError(state, payload){
          if(payload === null){
            return state.error = {type: null, message: null}
          }
          if(payload === "USER_NOT_FOUND"){
            return state.error = {type: 'user', message: 'Usuario no encontrado'}
          }
          if(payload === "INVALID_PASSWORD"){
            return state.error = {type: 'password', message: 'Contraseña invalida'}
          }
          
          if(payload === "DATABASE_ERROR"){
            return state.error = {type: 'database', message: 'Error de la base de datos'}
          }
    
          if(payload === "USUARIO_CREADO_CORRECTAMENTE"){
            return state.error = {type: 'Login', message: 'Usuario creado correctamente'}
          }
        },
    
        setUser(state, payload){
          state.user = payload
        },
    },

    actions: {
        async logIn({commit}, user){
          try {
            console.log(user);
            const userDB = await axios.post('/auth/login', {
              UserName: user.user,
              Password: user.password
            })
    
            if(userDB.data.error){
              commit('setError', userDB.data.error)
              return
            }
    
            commit('setUser', userDB.data)
            router.push('/')
            sessionStorage.setItem('user', JSON.stringify(userDB.data))
          } 
          catch (error) {
            console.log('error', error)        
          }
        },
    
        logOut({commit}){
          commit('setUser', null)
          router.push('/login')
          sessionStorage.clear()
        },
    
        async register({commit}, usuario){
          try {
            const res = await axios({
              method: 'post',
              url: '/auth/register',
              data: {
                UserName: usuario.user,
                Password: usuario.password,
                Cuit: usuario.cuit,
                FullName: usuario.fullName,
                SecretKey: usuario.secretKey
              }
            })
            router.push('/login')
            commit('setError', "USUARIO_CREADO_CORRECTAMENTE")
          } 
          catch (error) {
            console.log(error)
          }
        },

        cleanError({commit}){
            commit('setError', null)
          },
    },
})