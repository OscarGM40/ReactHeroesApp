import React from 'react'
import { HeroList } from '../heroes/HeroList'

export const MarvelScreen = () => {
   return (
      <div className="container-fluid mt-2">
         <h1>MarvelScreen</h1>
         <HeroList publisher="Marvel Comics" />
      </div>
   )
}
