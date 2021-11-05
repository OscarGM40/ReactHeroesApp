import { mount, shallow } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe("Pruebas en <PrivateRoute>", () => {
  
   const props = {
    location: {
      pathname: "/marvel",
    },
  };
  //Fijate como se simula la llamada al localStorage.setItem 
   Storage.prototype.setItem = jest.fn();
   Storage.prototype.getItem = jest.fn();

  test("Debe de mostrar el componente si está autenticado y guardarlo en el localStorage", () => {
    
   const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={ true }
          component={() => <span>Listo</span>}
          {...props}
        />
      </MemoryRouter>
    );
    console.log("===="+wrapper.html()+"====");
    expect (wrapper.find('span').exists()).toBe(true);
    expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath','/marvel')

  });

  test('Debe de bloquear el componente si no esta autenticado', () => {
     const wrapper = mount(
        <MemoryRouter>
           <PrivateRoute 
           isAuthenticated={ false }
           component={() => <span>Listo</span> }
           {...props}
           />
        </MemoryRouter>
     );

     expect( wrapper.find('span').exists() ).toBeFalsy();

  })
  


});
