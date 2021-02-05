import { types } from "../types/types";

//un reducer no es más que una funcion pura
//crearemos un estado similar a esto
/* const state = {
   name: "Elba",
   logged: true
} */

export const authReducer = (state = {}, action) => {

   switch (action?.type) {
    case types.login:
      return {
         ...action.payload,
         logged : true
      };
      case types.logout:
         //si es logout no nos interesa para nada el payload
         return {
            logged :false
         }
    default:
      return state;
  }
};
