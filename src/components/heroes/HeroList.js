import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

//publisher va a ser la editorial sol hay dos marvel y DC
export const HeroList = ({publisher}) => {
//vamos a usar useMemo para mayor eficiencia,pues si el publisher no cambia esta funcion no deberia ejecutarse y lo hará si cambian las props,el state,etc...
  const heroesMemorized = useMemo(() => 
  getHeroesByPublisher(publisher),[publisher]);
  
  
  //const heroes = getHeroesByPublisher(publisher);

  return (
    <div className="card-columns animate__animated animate__fadeInDown ">
      {
        heroesMemorized.map( hero => (
          <HeroCard key={ hero.id } {...hero}> 
        </HeroCard>
        ))
      }
    </div>
  )
}
