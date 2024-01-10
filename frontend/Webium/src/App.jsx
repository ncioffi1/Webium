import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WebiumBrowser from './components/WebiumBrowser';
// import WebiumBrowser from './components/PokemonBrowser';
// import { getPokemon } from './store/pokemon';
// import {useState, useEffect} from 'react';

// const router = createBrowserRouter(
//   ["/", "/api", "/api/users", "/api/users/:id", "/api/articles", "/api/articles/:id"].map((path) => {
//     return {
//       path,
//       element:  <WebiumBrowser />
//     };
//   })
// );

function App() {
  // return <h1>HOWDY</h1>
  console.log("test");
  <div className="App">
      <WebiumBrowser values="test" />
  </div>
}

export default App;
