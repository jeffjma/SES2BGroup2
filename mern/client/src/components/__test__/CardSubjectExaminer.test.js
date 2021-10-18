import React from 'react';
import ReactDOM from 'react-dom';
import CardSubjectExaminer from './../CardSubjectExaminer'

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CardSubjectExaminer></CardSubjectExaminer>, div)
})

it("renders component correctly", () => {
    const {getByTestId} = render(<CardSubjectExaminer studentCount="10"></CardSubjectExaminer>)
    expect(getByTestId('examinercard')).toHaveTextContent("10")
})