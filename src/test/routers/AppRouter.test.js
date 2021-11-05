import { mount, shallow } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe("Pruebas en AppRouter", () => {

const contextValue = {
   dispatch: jest.fn(),
   user: {
      logged: false
   }
}

const contextValue2 = {
   dispatch: jest.fn(),
   user: {
      logged: true,
      name:'Fernando'
   }
}

  test("Debe de mostar el login si no está autenticado", () => {
    
   const wrapper = mount(
    <AuthContext.Provider value={ contextValue }>
       <AppRouter />);
    </AuthContext.Provider>
   );

   expect( wrapper ).toMatchSnapshot();

    });

    test('Debe de mostrar el componente marvel si esta autenticado', () => {

      const wrapper = mount(
         <AuthContext.Provider value={ contextValue2 }>
            <AppRouter />
         </AuthContext.Provider>
      )
      expect( wrapper.find('.navbar').exists() ).toBe(true);
    })
    
});
