import { useLocation } from "react-router-dom";
// import { heroes } from "../../data/heroes";
import { HeroCard } from "../heroes/HeroCard";
import useForm from "../hooks/useForm";
import queryString from "query-string";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { useMemo } from "react";

export const SearchScreen = ({ history }) => {
  //Tarea1 Agregar este comnponente a la navbar y que podamos navegar a él

  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const initialHero = {
    searchText: q,
  };
  const [formValues, handleInputChange] = useForm(initialHero);

  const { searchText } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <div className="container-fluid mt-2">
      <h1>SearchScreen</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="searchText"
              autoComplete="off"
              onChange={handleInputChange}
              placeholder="Find yor hero"
              value={searchText}
              className="form-control"
            />
            <button
              type="submit"
              className="btn mt-1 btn-block btn-outline-primary"
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {( q === "" )&& (
            <div className="alert alert-info">Search for a hero</div>
          )}

         {( q !== "" && (heroesFiltered.length === 0)) && (
            <div className="alert alert-danger">No Hero Found for {q}</div>
          )}

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero}></HeroCard>
          ))}
        </div>
      </div>
    </div>
  );
};
