import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import { PublicRoute } from "../../routers/PublicRoute"


describe('Pruebas en < PublicRoute />', () => {
   
   const props = {
      any:'',
      foo:'foo'
   }
   
      test('Debe de retornar el componente si no esta autenticado', () => {
         const wrapper = mount(
            <MemoryRouter>
               <PublicRoute
               isAuthenticated= {false }
               component ={() => <span>SPAN</span>}
               {...props}
               />
            </MemoryRouter>
         )
   
         expect(wrapper.find('span').exists()).toBe(true)
         
      });
      
      test('No debe retornar el componente si esta autenticado', () => {
         
         const wrapper = mount(
            <MemoryRouter>
               <PublicRoute
               isAuthenticated= { true }
               component ={() => <span>SPAN</span>}
               {...props}
               />
            </MemoryRouter>
         )
         expect(wrapper.find('span').exists()).toBe(false)
      });

})
