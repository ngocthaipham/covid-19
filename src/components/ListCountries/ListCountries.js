import React, { useState, useEffect } from "react";
import DetailPopup from "../Detail/DetailPopup";
import outlineStar from "../../asserts/outlinestar.png";
import fillStar from "../../asserts/fillstar.png";
import "./ListCountries.css";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 30vh auto;
`;

const ListCountries = () => {
  const [list, setList] = useState([]);
  const [sortType, setSortType] = useState(`TotalConfirmed`);
  const [isChange, setIsChange] = useState(false);

  const values = [];
  const keys = Object.keys(localStorage);
  for (let i = 0; i < keys.length; i++) {
    values.push(localStorage.getItem(keys[i]));
  }
  const filter = (arr) => {
    arr.sort((a, b) => b[sortType] - a[sortType]);
    return arr;
  };
  useEffect(() => {
    fetch(`https://api.covid19api.com/summary`)
      .then((res) => res.json())
      .then(
        (response) => {
          const bookmarkCountries = [];
          let nonBookmarkCountries = [];
          response.Countries.forEach((country) => {
            if (values.length === 0) {
              return nonBookmarkCountries.push(country);
            }
            for (let i = 0; i < values.length; i++) {
              if (country.Country === values[i]) {
                bookmarkCountries.push(country);
              }
              nonBookmarkCountries = response.Countries.filter(
                (item) => !values.includes(item.Country)
              );
            }
          });
          const sorted = [
            ...filter(bookmarkCountries),
            ...filter(nonBookmarkCountries),
          ];
          setList(sorted);
        },
        (error) => {
          alert(error.message);
        }
      );
  }, [sortType, isChange]);

  const bookmark = (country) => {
    localStorage.setItem(`${country}`, [country]);
    setIsChange(!isChange);
  };
  const removeBookmark = (country) => {
    localStorage.removeItem(`${country}`);
    setIsChange(!isChange);
  };

  return (
    <>
      {list && (
        <div>
          <h1>
            Countries affected by Covid-19 sort by{" "}
            <select
            className="filter"
              onChange={(e) => {
                setSortType(e.target.value);
              }}
            >
              <option className="op-1" >TotalConfirmed</option>
              <option className="op-2">TotalDeaths</option>
              <option className="op-3">TotalRecovered</option>
            </select>
          </h1>
          <table border="1rem" cellPadding="5rem" cellSpacing="0rem">
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
                  <td>
                    {localStorage.getItem(`${item.Country}`) !==
                    item.Country ? (
                      <img
                        onClick={() => {
                          bookmark(item.Country);
                        }}
                        src={outlineStar}
                        alt="star"
                        className="star"
                      />
                    ) : (
                      <img
                        onClick={() => {
                          removeBookmark(item.Country);
                        }}
                        src={fillStar}
                        alt="star"
                        className="star"
                      />
                    )}
                    <div style={{ width: "25rem" }}>{item.Country}</div>
                  </td>
                  <td className="data">{item.NewConfirmed.toLocaleString()}</td>
                  <td className="data">{item.TotalConfirmed.toLocaleString()}</td>
                  <td className="data">{item.NewDeaths.toLocaleString()}</td>
                  <td className="data">{item.TotalDeaths.toLocaleString()}</td>
                  <td className="data-green">{item.NewRecovered.toLocaleString()}</td>
                  <td className="data-green">{item.TotalRecovered.toLocaleString()}</td>
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
      )}
      {!list && (
        <div id="main">
          <HashLoader css={override} color={"36D7B7"} />
        </div>
      )}
    </>
  );
};
export default ListCountries;
