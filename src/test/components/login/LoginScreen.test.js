import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe("Pruebas en <LoginScreen />", () => {
 
   const historyMock = {
      push:jest.fn(),
      replace:jest.fn(),
      location:{},
      listen: jest.fn(),
      createHref: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    payload: {
      name: "Fernando",
    },
  };

  afterEach(() => {
   jest.clearAllMocks();
 })

 const wrapper = mount(
   <AuthContext.Provider value={contextValue}>
     <MemoryRouter initialEntries={["/login"]}>
        <Route path="/login"
            component={ (props) => <LoginScreen history={ historyMock }/>} />
     </MemoryRouter>
   </AuthContext.Provider>
 );

  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de realizar el dispatch y la navegacion con replace", () => {

   const HandleClick = wrapper.find('button').prop('onClick');

   HandleClick();
   expect(historyMock.replace).toHaveBeenCalledTimes(1);
   expect(historyMock.replace).toHaveBeenCalledWith('/')
   expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload:{name:'Oscar'}
   });
   
   localStorage.setItem('lastPath',"/dc");
   HandleClick();
   expect(historyMock.replace).toHaveBeenCalledWith('/dc')



  });

});
