import React, { useMemo } from "react";
import { Redirect, useParams } from "react-router-dom";
import { heroImages } from "../../helpers/heroImages";
import { getHeroById } from "../../selectors/getHeroById";

// import foto from '../../resources/dc-arrow.jpg' forma para un recurso fijo o estático

// const heroImages = require.context('../../resources',true) //me puedo traer todo un directorio con webpack
// console.log(heroImages,'img') 

export const HeroScreen = ({ history }) => {
  
  const { heroeId } = useParams();
  
  const heroMemorized = useMemo(() => getHeroById(heroeId), [heroeId]);
  //const hero = getHeroById(heroeId);
  

  if (!heroMemorized) {
    return <Redirect to="/" />;
  }

  const handleReturn = () => {
    if (history.length <= 2) (heroeId.includes('marvel')) ? history.push("/marvel") : history.push("/dc")
    else  history.goBack();
  };

  // console.log(heroMemorized)
  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
  } = heroMemorized;

  return (
    <div className="row mt-5 ">
      <div className="col-4">
        <img
          // src={`/assets/heroes/heroes/${heroeId}.jpg`}
          // src={`/images/${heroeId}.jpg`}
          // src={foto} import estático
          // src={ heroImages(`./dc-superman.jpg`).default}
          src={heroImages(`./${heroeId}.jpg`).default}
          alt={superhero}
          className="img-thumbnail animate__animated animate__bounceInRight"
        />
      </div>
      <div className="col-8">
        <h3> {superhero} </h3>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b>
            {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {publisher}
          </li>
          <li className="list-group-item">
            <b>First Appearance: </b> {first_appearance}
          </li>
        </ul>
        <h5>Characters </h5>
        <p>{characters}</p>

        <button className="btn btn-outline-info" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
};
