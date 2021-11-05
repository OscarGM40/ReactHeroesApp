import { mount, shallow } from "enzyme"
import { MemoryRouter, Route } from "react-router-dom"
import { HeroScreen } from "../../../components/heroes/HeroScreen"


describe('Pruebas en HeroScreen', () => {

const historyMock = {
   length: 10,
   goBack: jest.fn(),
   push: jest.fn(),
}


test('Debe de mostrar el componente <Redirect> si no hay argumentos en el URL', () => {
   //no va a existir el heroe asi que redireccionara
   const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
         <HeroScreen />
      </MemoryRouter>
   )
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('Redirect').exists()).toBe(true);
      
   })

   test('Debe de mostrar un hero si el parametro existe y se encuentra', () => {
      //necesitamos usar useParams
      const wrapper = mount(

         <MemoryRouter initialEntries={['/hero/marvel-spider']}>
            <Route path="/hero/:heroeId"  component={ HeroScreen }/>
         </MemoryRouter>
      )
      //con que existiera la clase row ya estriamos viendo el componente HeroCard!
         expect(wrapper.find('.col-4').exists()).toBe(true);

   })

   test('Debe de regresar a la pantalla anterior con PUSH', () => {
      //primero testearemos si el historial es menor a 2
      const historyMock = {
         length: 1,
         goBack: jest.fn(),
         push: jest.fn(),
      }
      //De alguna manera debemos mandarle el Mock
      const wrapper = mount(
         <MemoryRouter initialEntries={['/hero/marvel-spider']}>
            <Route 
            path="/hero/:heroeId"  
            component={ (props) => <HeroScreen history={ historyMock }/> }/>
         </MemoryRouter>
      )
         wrapper.find('button').prop('onClick')();

         expect( historyMock.push ).toHaveBeenCalledWith('/marvel')
         expect( historyMock.goBack ).not.toHaveBeenCalled();
   })

   test('Debe de llamar a history.GOBACK,es decir,regresará a la pantalla anterior', () => {
      
      const wrapper = mount(
         <MemoryRouter initialEntries={['/hero/marvel-spider']}>
            <Route path="/hero/:heroeId"
            component={ (props) => <HeroScreen history={ historyMock }/>} />
         </MemoryRouter>
      )
      wrapper.find('button').prop('onClick')();

      expect( historyMock.push).toHaveBeenCalledTimes(0);
      expect( historyMock.push ).not.toHaveBeenCalled();
      expect( historyMock.goBack).toHaveBeenCalled();
   })

   test('Debe de llamar el Redirect si el Hero no existe', () => {
        
      const wrapper = mount(
         <MemoryRouter initialEntries={['/hero/marvel-spider454354352']}>
            <Route path="/hero/:heroeId"
            component={ (props) => <HeroScreen history={ historyMock }/>} />
         </MemoryRouter>)

         console.log(wrapper.find('Redirect').exists());
         expect(wrapper.find('Redirect').exists()).toBeFalsy();
         expect(wrapper.text()).toBe('');
      
   })
   
})
