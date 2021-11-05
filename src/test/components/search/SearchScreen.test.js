import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe('Pruebas en el componente <SearchScreen />', () => {

   const historyMock = {
      push:jest.fn(),
  };

  afterEach(() => {
     jest.clearAllMocks();
  })

  test('Debe de mostrarse correctamente con valores por defecto', () => {
     
   const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
         <Route path="/search"
         component={SearchScreen} />
      </MemoryRouter>
   );
   expect( wrapper ).toMatchSnapshot();
   //Si estamos con los valores por defecto deberia existir la parte de search a hero
   expect( wrapper.find('.row .col-5 > h4').text().trim() ).toBe("Search Form");
   expect(wrapper.find('input').exists()).toBeTruthy();
   expect( wrapper.find('.row .col-7 > h4').text().trim() ).toBe('Results');
   // expect( wrapper.find('.alert.alert-info').text().trim() ).toBe('Search for a hero'); 

  });

  test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
     
   const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
         <Route path="/search"
         component={SearchScreen} />
      </MemoryRouter>
   );
   expect( wrapper.find('input').prop('value') ).toBe('batman');
   expect( wrapper ).toMatchSnapshot();
   expect( wrapper.find('h5.card-title').text() ).toBe('Batman')

  })

  test('Debe de mostrar un error si no se muestra el heroe', () => {
     
     const hero= "batman123";

     const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
         <Route path="/search"
         component={(props) => <SearchScreen history={ historyMock }/>} />
      </MemoryRouter>)

      wrapper.find('form').prop('onSubmit')({ preventDefault(){} });

      expect( wrapper.find('.alert.alert-danger').text() ).toBe(`No Hero Found for ${hero}`);
      expect( wrapper.find('h5.card-title').exists() ).toBeFalsy();
      expect( historyMock.push ).toHaveBeenCalled();
      expect( historyMock.push ).toHaveBeenCalledTimes(1);
      expect( historyMock.push ).toHaveBeenCalledWith(`?q=${hero}`);
     
   });//fin test

   test('Should call history.push', () => {
      const hero="batman";
      const wrapper =mount(<MemoryRouter initialEntries={[`/search?q=${hero}`]}>
      <Route path="/search"
      component={ (props) => <SearchScreen history={ historyMock }/> } />
      </MemoryRouter>)

      wrapper.find('input').simulate('change', {
         target: {
         name: 'searchText',
         value: 'batman'   
         }
      }); 
      wrapper.find('form').prop('onSubmit')( {preventDefault(){} });
      expect( historyMock.push ).toHaveBeenCalledWith(`?q=${hero}`);    
   })

   
   



  });//fin describe
  
