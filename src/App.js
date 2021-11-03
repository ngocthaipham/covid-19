import React from "react";
import Banner from './components/Banner/Banner.js'
import ListCountries from './components/ListCountries/ListCountries';
import GlobalAnalysis from './components/GlobalAnalysis/GlobalAnalysis.js'
import "./App.css";
import "./Responsive.css";

function App() {
  return (
    <>
    <div id="main">
      {/* <div className="header-mb"> */}
        <Banner />
        <GlobalAnalysis />
      {/* </div> */}
        <ListCountries />
    </div>
    </>
  );
}

export default App;
