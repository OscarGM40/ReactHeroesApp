import React from 'react'
import { HeroList } from '../heroes/HeroList'

export const DcScreen = () => {

   return (
      <div className="container-fluid mt-2">
         <h1>DCScreen</h1>
        <HeroList publisher="DC Comics" />
      </div>
   )
}
