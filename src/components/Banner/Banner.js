import React from "react";
import logoCovid from "../../asserts/logocovid.png";
import phone from "../../asserts/phone.svg";
import phoneWhite from "../../asserts/phone-white.svg";
import alert from "../../asserts/alert.svg";
import peopleBg from "../../asserts/people-bg.png";
import people from "../../asserts/people.png";
import virus from "../../asserts/virus.png";
import virusWhite from "../../asserts/virus-white.png";

import "./Banner.css";

const Banner = () => {
  return (
    <>
      <div className="container">
        <div className="header">
          <div>
            <img src={logoCovid} alt="logo" />
          </div>
          <div>
            <a href="https://ngocthaipham.github.io/covid-19/" className="emergency-btn">
              <img className="phone" src={phone} alt="contact" />
              <img className="phone-white" src={phoneWhite} alt="contact" />
              Emergency Contact
            </a>
          </div>
        </div>
        <div className="banner">
            <div className="flex-left flex-item">
                <div className="white-virus">
                <img src={virusWhite} alt="Virus" />
                </div>
                <p className="alert">
                    <img src={alert} alt="alert" style={{marginRight: "0.5rem"}} />
                    Covid-19 Alert
                </p>
                <h1>Save yourself Save the world.</h1>
                <h4>Coronavirus disease (COVID-19) is an infectious
                    <br/>
                    disease caused by a new virus.
                </h4>
            </div>
            <div className="flex-right flex-item">
                <img src={peopleBg} className="background" alt="bg" />
                <img src={people} className="people" alt="person" />
                <img src={virus} className="virus v1" alt="Virus" />
                <img src={virus} className="virus v2" alt="Virus" />
                <img src={virus} className="virus v3" alt="Virus" />

            </div>
        </div>
      </div>
    </>
  );
};
export default Banner;
