import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "../../_redux";

import App from "../../App";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios", () => ({
  create: jest.fn().mockReturnValue({
    post: jest.fn().mockReturnValue({
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
    renderComponent(<App />, { router: "/create" });
    const inputTitle = screen.getByTestId("input-title");
    const inputContent = screen.getByTestId("input-content");
    fireEvent.change(inputTitle, { target: { value: "Test title" } });
    fireEvent.change(inputContent, { target: { value: "Test content" } });

    expect((inputTitle as HTMLInputElement).value).toBe("Test title");
    expect((inputContent as HTMLTextAreaElement).value).toBe("Test content");
  });
});
