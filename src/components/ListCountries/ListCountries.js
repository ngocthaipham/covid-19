import React, { useState, useEffect } from "react";
import DetailPopup from "../Detail/DetailPopup";

const ListCountries = () => {
  const [list, setList] = useState([]);
  const [sortType, setSortType] = useState(`TotalConfirmed`);

  useEffect(() => {
    fetch(`https://api.covid19api.com/summary`)
      .then((res) => res.json())
      .then(
        (response) => {
          const sorted = response.Countries.sort(
            (a, b) => b[sortType] - a[sortType]
          );
          setList(sorted);
        },
        (error) => {
          alert(error.message);
        }
      );
  }, [sortType]);

  return (
    <>
      <div>
        <h3>
          Countries affected by Covid-19 sort by{" "}
          <select
            onChange={(e) => {
              setSortType(e.target.value);
            }}
          >
            <option>TotalConfirmed</option>
            <option>TotalDeaths</option>
            <option>TotalRecovered</option>
          </select>
        </h3>
        <table border="1px" cellPadding="5px" cellSpacing="2px">
          <thead>
            <tr>
              <th>Country</th>
              <th>New Confirmed Cases</th>
              <th>Total Confirmed Cases</th>
              <th>New Death Cases</th>
              <th>Total Death Cases</th> <th>New Recovered Cases</th>
              <th>Total Recovered Cases</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.ID}>
                <td>{item.Country}</td>
                <td>{item.NewConfirmed}</td>
                <td>{item.TotalConfirmed}</td>
                <td>{item.NewDeaths}</td>
                <td>{item.TotalDeaths}</td>
                <td>{item.NewRecovered}</td>
                <td>{item.TotalRecovered}</td>
                <td>
                  {item.Date.split("T")[0]}
                  <DetailPopup
                    CountryCode={item.CountryCode}
                    CountrySlug={item.Slug}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ListCountries;
