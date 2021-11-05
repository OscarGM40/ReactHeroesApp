import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

describe("Pruebas en <Navbar />", () => {
  
const historyMock = {
  push:jest.fn(),
  replace:jest.fn(),
  location:{},
  listen: jest.fn(),
  createHref: jest.fn(),

}

   const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Fernando",
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  })

  test("Debe de mostrarse correctamente y mostrar el nombre", () => {
    
    expect(wrapper).toMatchSnapshot();
    //Podemos esperar recibir el nombre en el span con esa clase
    expect(wrapper.find('.text-info').text().trim()).toBe('Fernando')
     
  });

  test('Debe de llamar al logout y usar history', () => {
    //primero que nada disparamos el click en el button
    wrapper.find('button').prop('onClick')();
    //podemos esperar que la funcion fuera llamada con el action.type
    //correspondiente y sin payload
    expect( contextValue.dispatch ).toHaveBeenCalledWith({
      type: types.logout
    });

    //obviamente esperamos que el replace sea a /login
    expect(historyMock.replace ).toHaveBeenCalledWith("/login")

    
  })
  


});
