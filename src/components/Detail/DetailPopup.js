import React, { useState, useEffect } from "react";
import ChartOfData from "../Chart/ChartOfData.js";
import "./DetailPopup.css";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 30vh auto;
`;
const DetailPopup = (props) => {
  const [countryDetail, setCountryDetail] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetch(`https://restcountries.com/v2/alpha/${props.CountryCode}`)
      .then((res) => res.json())
      .then((response) => {
        setCountryDetail(response);
      });
  }, []);
  return (
    <>
  <div>
      <input type="button" value="Detail" onClick={togglePopup} className="detail-btn btn" />
      {isOpen && !countryDetail && 
        <div className="popup-box" style={{zIndex : 5}}>
        <div className="box" style={{height: "70vh"}}>
            <span className="close-icon" onClick={togglePopup}>
              x
            </span>
      <HashLoader css={override} color={'36D7B7'}/>
        </div>
      </div>
      }
    {isOpen && countryDetail && (
      <div className="popup-box" style={{zIndex : 5}}>
        <div className="box">
          <div>
            <span className="close-icon" onClick={togglePopup}>
              x
            </span>
            <p>Country: {countryDetail.name}</p>
            <img src={`${countryDetail.flags.png}`} alt="flags" />
            <p>Population: {countryDetail.population}</p>
            <p>Capital: {countryDetail.capital}</p>
            <p>Region: {countryDetail.region}</p>
            <p>SubRegion: {countryDetail.subregion}</p>
          </div>
          <div>
            <ChartOfData CountrySlug={props.CountrySlug} />
          </div>
        </div>
      </div>
    )}
  </div>
  </>
  );
};

export default DetailPopup;
