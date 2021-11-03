import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const ChartOfData = (props) => {
  const today = new Date();
  let dayBefore = new Date();
  dayBefore.setDate(today.getDate() - 30);
  const [dayFrom, setDayFrom] = useState(
    `${dayBefore.toISOString().split("T")[0]}`
  );
  const [dayTo, setDayTo] = useState(`${today.toISOString().split("T")[0]}`);
  const [countryData, setCountryData] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [errMessage, setErrMessage] = useState();

  useEffect(() => {
    fetch(
      `https://api.covid19api.com/country/${props.CountrySlug}?from=${dayFrom}&to=${dayTo}`
    )
      .then((res) => res.json())
      .then((response) => {
        setCountryData(response);
      });
    }, [isChange]);
    const err = {};

  const validDate = () => {
    if (
      Math.abs(new Date(dayTo) - new Date(dayFrom)) / (1000 * 3600 * 24) >
      30
    ) {
      err.failed = "No more than 30 days";
    }
    if (Object.keys(err).length === 0) {
      setIsChange(!isChange);
    }
    setErrMessage(err);
  };
  return (
    <>
      {countryData.length > 1 && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validDate();
            }}
          >
            <label for="start">Start :</label>

            <input
              type="date"
              id="start"
              name="trip-start"
              value={dayFrom}
              onChange={(e) => {
                setDayFrom(e.target.value);
              }}
            />

            <label for="end">To :</label>

            <input
              type="date"
              id="end"
              name="trip-start"
              value={dayTo}
              onChange={(e) => {
                setDayTo(e.target.value);
              }}
            />
            <br/>
            <button className="submit-btn btn" type="submit">
              OK
            </button>
            <br />
            {errMessage && <p style={{ color: "red" }}>{errMessage.failed}</p>}
          </form>
          <article>
          <Line
            data={{
              labels: countryData.map((data) => data.Date.split("T")[0]),
              datasets: [
                {
                  data: countryData.map((data) => data.Confirmed),
                  label: "Confirmed Cases",
                  borderColor: "#3e95cd",
                  fill: false,
                },
                {
                  data: countryData.map((data) => data.Deaths),
                  label: "Death Cases",
                  borderColor: "#8e5ea2",
                  fill: false,
                },
                {
                  data: countryData.map((data) => data.Recovered),
                  label: "Recovered Cases",
                  borderColor: "#3cba9f",
                  fill: false,
                },
              ],
            }}
            options={{
              // title: {
              //   display: true,
              //   text: "World population per region (in millions)",
              // },
              // legend: {
              //   display: true,
              //   position: "bottom",
              // },
              maintainAspectRatio: false,
            }}
          />
          </article>
        </div>
      )} 
      {countryData.message && ( <h3 style={{marginTop : "2rem", color: "red"}}>For performance reasons, can not get data !</h3>)}
    </>
  );
};
export default ChartOfData;
