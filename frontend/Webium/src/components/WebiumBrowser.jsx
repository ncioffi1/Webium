// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { NavLink, Outlet, useParams } from 'react-router-dom';
// import PokemonDetail from './PokemonDetail';
// import CreatePokemonForm from './CreatePokemonForm';
// import Fab from './Fab';

// import { getPokemon } from '../store/pokemon';

function WebiumBrowser({ values }) {
//   const { pokemonId } = useParams();
//   const allPokemon = useSelector(state => state.pokemon);
//   const pokemon = allPokemon.list.map(pokemonId => allPokemon[pokemonId]);
//   const [showForm, setShowForm] = useState(false);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getPokemon());
//   }, [])
    useEffect(() => {
        console.log("TEST!!!");
    })
    
    return (
        <h1>Hello World!</h1>
    );
};

export default WebiumBrowser;
