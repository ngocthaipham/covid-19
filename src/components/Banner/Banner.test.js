import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Banner from "./Banner.js";

test("Render component banner" , () => {
    render(<Banner />)
    const slogan = screen.getByText(/Save yourself Save the world./i)
    expect(slogan).toBeInTheDocument();
})