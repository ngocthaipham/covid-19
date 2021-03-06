import React, { useState, useEffect } from "react";
import "./GlobalAnalysis.css";
import virusWhite from "../../asserts/virus-white.png";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: auto;
`;

const GlobalAnalysis = (props) => {
  const { url } = props ;
  const [globalData, setGlobalData] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setGlobalData(response.Global);
        setCountry(response.Countries);
      });
  }, []);
  return (
    <>
      {!globalData && !country && (
            <div id="loading">
        <div className="global-data-container">
          <div className="global-data-wrap">
            <HashLoader css={override} color={"36D7B7"} />
            </div>
          </div>
        </div>
      )}
      <div className="global-data-container">
        {globalData && country && (
          <div className="global-data-wrap">
            <div className="global-data-flex-item">
              <h2 className="counter">{country.length.toLocaleString()}</h2>
              <p>Affected country</p>
            </div>
            <div className="global-data-flex-item">
              <h2 className="counter">{globalData.TotalConfirmed.toLocaleString()}</h2>
              <p>Confirmed Cases</p>
            </div>
            <div className="global-data-flex-item">
              <h2 className="counter green-counter">
                {globalData.TotalRecovered.toLocaleString()}
              </h2>
              <p>Recovered Cases</p>
            </div>
            <div className="global-data-flex-item">
              <h2 className="counter">{globalData.TotalDeaths.toLocaleString()}</h2>
              <p>Worldwide Deaths</p>
            </div>
            <img src={virusWhite} className="vw1" alt="Virus" />
            <img src={virusWhite} className="vw2" alt="Virus" />
          </div>
        )}
      </div>
    </>
  );
};

export default GlobalAnalysis;
