import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../auth/AuthContext"
import { DashboardRoutes } from "../../routers/DashboardRoutes"


describe('Pruebas en el componente <Dashboard Routes />', () => {
   
   const contextValue2 = {
      dispatch: jest.fn(),
      user: {
         logged: true,
         name:'Fernando'
      }
   }
   
   test('debe mostrarse correctamente', () => {
      
      const wrapper =  mount(
         <AuthContext.Provider value={contextValue2}>
         <MemoryRouter>
            <DashboardRoutes />
         </MemoryRouter>
         </AuthContext.Provider>
      )
      expect( wrapper ).toMatchSnapshot();
      expect( wrapper.find('.text-info').text().trim() ).toBe('Fernando'); 
   })

})
