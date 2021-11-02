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
        <div id="main">
          <h1>
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
                    {item.Country}
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
                  </td>
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