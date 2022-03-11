import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "../../_redux";

import App from "../../App";
import { BrowserRouter } from "react-router-dom";

const renderComponent = (
  component: React.ReactChild,
  { router = "/" } = {}
) => {
  window.history.pushState({}, "Test page", router);
  return render(<Provider store={store}>{component}</Provider>, {
    wrapper: BrowserRouter,
  });
};

jest.mock("axios", () => ({
  create: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({
      data: {
        msg: "Data found",
        data: [
          {
            id: 925,
            title: "HALO",
            content: "HALO",
            published_at: "2022-03-10T06:33:51.074Z",
            created_at: "2022-03-10T06:33:51.082Z",
            updated_at: "2022-03-10T06:33:51.082Z",
          },
          {
            id: 928,
            title: "Tes 1",
            content: "Tes content 1 edit",
            published_at: "2022-03-10T17:15:48.094Z",
            created_at: "2022-03-10T17:15:48.096Z",
            updated_at: "2022-03-11T04:18:45.573Z",
          },
          {
            id: 929,
            title: "Tes 2 edit",
            content: "Tes 2 content edit edit",
            published_at: "2022-03-10T17:16:01.124Z",
            created_at: "2022-03-10T17:16:01.126Z",
            updated_at: "2022-03-11T08:51:08.236Z",
          },
        ],
      },
    }),
  }),
}));

describe("test home page", () => {
  beforeEach(() => {
    window.confirm = jest.fn(() => true);
    window.alert = jest.fn();
  });
  test("render get all post", async () => {
    renderComponent(<App />, { router: "/" });

    const postData = await screen.findAllByTestId("post-data");
    const { blog } = store.getState();

    expect(postData.length).toBe(blog.successGetBlogIndex.length);
  });
  test("render delete post", async () => {
    renderComponent(<App />, { router: "/" });

    const deleteBtn = await screen.findByTestId("delete-1");

    fireEvent.click(deleteBtn);

    expect(window.confirm).toBeCalled();
  });
});
