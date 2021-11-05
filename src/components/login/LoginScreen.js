import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const LoginScreen = ({ history }) => {
  
  //1-Obtener la referencia al contexto mediante el hook useContext(HOC)
  const context = useContext(AuthContext);
  //2-Extraemos lo que necesitemos
  const { dispatch } = context;

   const handleLogin = () => {

    const lastPath = localStorage.getItem('lastPath') || '/';
      // history.push("/")
      //TAREA: Debemos extraer del context la funcion dispatch y mandar un
      // objeto muy sencillo { name:'Fernando' }
      dispatch({
        type:types.login,
        payload:{name:'Oscar'}
      })
      history.replace( lastPath )
      
   }
   
  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button 
      className="btn btn-primary"
      onClick={ handleLogin }
      >
            Login
      </button>
    </div>
  );
};
