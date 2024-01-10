import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { NavLink, Outlet, useParams } from 'react-router-dom';
// import PokemonDetail from './PokemonDetail';
// import CreatePokemonForm from './CreatePokemonForm';
// import Fab from './Fab';
import './WebiumBrowser.css'
// import { getPokemon } from '../store/pokemon';

function WebiumBrowser({ values }) {
//   const { pokemonId } = useParams();
//   const allPokemon = useSelector(state => state.pokemon);
//   const pokemon = allPokemon.list.map(pokemonId => allPokemon[pokemonId]);
//   const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getPokemon());
//   }, [])
    useEffect(() => {
        console.log("TEST!!!");
    })
    
    return (
        <div className="splash">
            <div className="topbar">
                <h1 className="splashtextlogo">Webium</h1>
                <div className="topbarright">
                    <button className="button1">Get Started</button>
                </div>
            </div>
            <div className="line"></div>

            <h1 className="splashtextbig">Stay curious.</h1>
            <h1 className="splashtextmiddle">Discover stories, thinking, and expertise from fake writers on any topic.</h1>
            <div className="line"></div>
        </div>


    );
};

export default WebiumBrowser;
