import React from "react";
import "./App.css";
import Banner from './components/Banner/Banner.js'
import ListCountries from './components/ListCountries/ListCountries';
import GlobalAnalysis from './components/GlobalAnalysis/GlobalAnalysis.js'

function App() {
  return (
    <>
    <div id="main">
        <Banner />
        <GlobalAnalysis />
        <ListCountries />
    </div>
    </>
  );
}

export default App;
