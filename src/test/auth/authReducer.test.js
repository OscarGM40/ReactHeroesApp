import {authReducer} from '../../auth/authReducer'
import { types } from '../../types/types';


describe('Pruebas en el componente authReducer', () => {
   
   const defaultState = {
      logged:false
   }
   test('Debe de retronar el estado por defecto', () => {
   const state = authReducer(defaultState,{});
   expect(state).toEqual(defaultState);


   })

   test('Debe de autenticar y colocar el name del usuario', () => {
      const newAction = {
         type: types.login,
         payload: {
            name: 'John'
         }
      }

      const state2 = authReducer(defaultState,newAction);
      expect(state2).toEqual({
         logged: true,
         name:'John'
      })
   })

   test('Debe de borrar el name del usuario y logged en false', () => {
    
      const deleteAction = {
         type: types.logout
      }

      const state3 = authReducer({logged:true,name:'John'},deleteAction)
      expect(state3).toEqual({
         logged:false
      })
      expect(state3.name).toBeFalsy();
   })
   
   
   
})
