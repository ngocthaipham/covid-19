import React from "react";
import { render, screen, queryByAttribute, waitForElementToBeRemoved } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import GlobalAnalysis from "./GlobalAnalysis.js";

   const fetch =  rest.get("/https://api.covid19api.com/summary", (req, res, ctx) => {
      return res(
        ctx.json({
            Global: {
                "NewConfirmed": 430085,
                "TotalConfirmed": 246778767,
                "NewDeaths": 6216,
                "TotalDeaths": 5002539,
                "NewRecovered": 0,
                "TotalRecovered": 0,
                "Date": "2021-11-03T06:16:47.522Z"
              },
        })
      );
    })
    const server = new setupServer(fetch)
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  const getById = queryByAttribute.bind(null, 'id');
test("Render component GlobalAnalysis", async () => {
    const dom = render(<GlobalAnalysis url="/https://api.covid19api.com/summary" />)
    await waitForElementToBeRemoved(() =>  getById(dom.container, 'loading'))
    expect(screen.getByText(/Confirmed Cases/i)).toBeInTheDocument();
})