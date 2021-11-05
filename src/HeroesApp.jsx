import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './routers/AppRouter'

export const HeroesApp = () => {

  const init = () => {
    //parseamos a Object la salida del localStorage
    return JSON.parse(localStorage.getItem('user')) || {
      //si no hay nada simplemente retornamos logged a false
      logged:false
    }
  }

  const [user, dispatch] = useReducer(authReducer, {}, init);

  //Tarea :implementar un efecto que grabe en el localStorage el user si el usuario cambia

  useEffect(() => {
    localStorage.setItem('user',JSON.stringify(user))
  }, [user])

   return (
     <AuthContext.Provider value={{ user,dispatch }}>
       <AppRouter />
     </AuthContext.Provider>
   )
}
