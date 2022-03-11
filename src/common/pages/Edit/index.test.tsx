import React from "react";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "../../_redux";

import App from "../../App";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios", () => ({
  create: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({
      data: {
        msg: "Data found",
        data: {
          id: 925,
          title: "Test title",
          content: "Test content",
          published_at: "2022-03-10T06:33:51.074Z",
          created_at: "2022-03-10T06:33:51.082Z",
          updated_at: "2022-03-10T06:33:51.082Z",
        },
      },
    }),
  }),
}));

const renderComponent = (
  component: React.ReactChild,
  { router = "/" } = {}
) => {
  window.history.pushState({}, "Test page", router);
  return render(<Provider store={store}>{component}</Provider>, {
    wrapper: BrowserRouter,
  });
};

describe("test create page", () => {
  test("render type form", async () => {
    renderComponent(<App />, { router: "/925/edit" });
    const inputTitle = await screen.findByDisplayValue("Test title");
    const inputContent = await screen.findByDisplayValue("Test content");

    expect(inputTitle).toBeDefined();
    expect(inputContent).toBeDefined();
  });
});
