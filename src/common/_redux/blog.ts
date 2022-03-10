import api from "../_configs/api";
import { Action, Dispatch, BlogState } from "./types";

const GET_BLOG_INDEX_LOADING = "GET_BLOG_INDEX_LOADING";
const GET_BLOG_INDEX_SUCCESS = "GET_BLOG_INDEX_SUCCESS";
const GET_BLOG_INDEX_ERROR = "GET_BLOG_INDEX_ERROR";
const GET_BLOG_INDEX_RESET = "GET_BLOG_INDEX_RESET";

const GET_BLOG_SHOW_LOADING = "GET_BLOG_SHOW_LOADING";
const GET_BLOG_SHOW_SUCCESS = "GET_BLOG_SHOW_SUCCESS";
const GET_BLOG_SHOW_ERROR = "GET_BLOG_SHOW_ERROR";
const GET_BLOG_SHOW_RESET = "GET_BLOG_SHOW_RESET";

const POST_BLOG_STORE_LOADING = "POST_BLOG_STORE_LOADING";
const POST_BLOG_STORE_SUCCESS = "POST_BLOG_STORE_SUCCESS";
const POST_BLOG_STORE_ERROR = "POST_BLOG_STORE_ERROR";
const POST_BLOG_STORE_RESET = "POST_BLOG_STORE_RESET";

const PUT_BLOG_UPDATE_LOADING = "PUT_BLOG_UPDATE_LOADING";
const PUT_BLOG_UPDATE_SUCCESS = "PUT_BLOG_UPDATE_SUCCESS";
const PUT_BLOG_UPDATE_ERROR = "PUT_BLOG_UPDATE_ERROR";
const PUT_BLOG_UPDATE_RESET = "PUT_BLOG_UPDATE_RESET";

const DELETE_BLOG_DELETE_LOADING = "DELETE_BLOG_DELETE_LOADING";
const DELETE_BLOG_DELETE_SUCCESS = "DELETE_BLOG_DELETE_SUCCESS";
const DELETE_BLOG_DELETE_ERROR = "DELETE_BLOG_DELETE_ERROR";
const DELETE_BLOG_DELETE_RESET = "DELETE_BLOG_DELETE_RESET";

const initState: BlogState = {
  isLoadingGetBlogIndex: false,
  successGetBlogIndex: null,
  errorGetBlogIndex: null,
  isLoadingGetBlogShow: false,
  successGetBlogShow: null,
  errorGetBlogShow: null,
  isLoadingPostBlogStore: false,
  successPostBlogStore: null,
  errorPostBlogStore: null,
  isLoadingPutBlogUpdate: false,
  successPutBlogUpdate: null,
  errorPutBlogUpdate: null,
  isLoadingDeleteBlogDelete: false,
  successDeleteBlogDelete: null,
  errorDeleteBlogDelete: null,
};

const blog = (state = initState, action: Action) => {
  switch (action.type) {
    case GET_BLOG_INDEX_LOADING:
      return {
        ...state,
        isLoadingGetBlogIndex: true,
        successGetBlogIndex: null,
        errorGetBlogIndex: null,
      };

    case GET_BLOG_INDEX_SUCCESS:
      return {
        ...state,
        isLoadingGetBlogIndex: false,
        successGetBlogIndex: action.payload.data,
        errorGetBlogIndex: null,
      };

    case GET_BLOG_INDEX_ERROR:
      return {
        ...state,
        isLoadingGetBlogIndex: false,
        successGetBlogIndex: null,
        errorGetBlogIndex: action.payload,
      };

    case GET_BLOG_INDEX_RESET:
      return {
        ...state,
        isLoadingGetBlogIndex: false,
        successGetBlogIndex: null,
        errorGetBlogIndex: null,
      };
    case GET_BLOG_SHOW_LOADING:
      return {
        ...state,
        isLoadingGetBlogShow: true,
        successGetBlogShow: null,
        errorGetBlogShow: null,
      };

    case GET_BLOG_SHOW_SUCCESS:
      return {
        ...state,
        isLoadingGetBlogShow: false,
        successGetBlogShow: action.payload.data,
        errorGetBlogShow: null,
      };

    case GET_BLOG_SHOW_ERROR:
      return {
        ...state,
        isLoadingGetBlogShow: false,
        successGetBlogShow: null,
        errorGetBlogShow: action.payload,
      };

    case GET_BLOG_SHOW_RESET:
      return {
        ...state,
        isLoadingGetBlogShow: false,
        successGetBlogShow: null,
        errorGetBlogShow: null,
      };

    case POST_BLOG_STORE_LOADING:
      return {
        ...state,
        isLoadingPostBlogStore: true,
        successPostBlogStore: null,
        errorPostBlogStore: null,
      };

    case POST_BLOG_STORE_SUCCESS:
      return {
        ...state,
        isLoadingPostBlogStore: false,
        successPostBlogStore: action.payload.data,
        errorPostBlogStore: null,
      };

    case POST_BLOG_STORE_ERROR:
      return {
        ...state,
        isLoadingPostBlogStore: false,
        successPostBlogStore: null,
        errorPostBlogStore: action.payload,
      };

    case POST_BLOG_STORE_RESET:
      return {
        ...state,
        isLoadingPostBlogStore: false,
        successPostBlogStore: null,
        errorPostBlogStore: null,
      };

    case PUT_BLOG_UPDATE_LOADING:
      return {
        ...state,
        isLoadingPutBlogUpdate: true,
        successPutBlogUpdate: null,
        errorPutBlogUpdate: null,
      };

    case PUT_BLOG_UPDATE_SUCCESS:
      return {
        ...state,
        isLoadingPutBlogUpdate: false,
        successPutBlogUpdate: action.payload.data,
        errorPutBlogUpdate: null,
      };

    case PUT_BLOG_UPDATE_ERROR:
      return {
        ...state,
        isLoadingPutBlogUpdate: false,
        successPutBlogUpdate: null,
        errorPutBlogUpdate: action.payload,
      };

    case PUT_BLOG_UPDATE_RESET:
      return {
        ...state,
        isLoadingPutBlogUpdate: false,
        successPutBlogUpdate: null,
        errorPutBlogUpdate: null,
      };

    case DELETE_BLOG_DELETE_LOADING:
      return {
        ...state,
        isLoadingDeleteBlogDelete: true,
        successDeleteBlogDelete: null,
        errorDeleteBlogDelete: null,
      };

    case DELETE_BLOG_DELETE_SUCCESS:
      return {
        ...state,
        isLoadingDeleteBlogDelete: false,
        successDeleteBlogDelete: action.payload.data,
        errorDeleteBlogDelete: null,
      };

    case DELETE_BLOG_DELETE_ERROR:
      return {
        ...state,
        isLoadingDeleteBlogDelete: false,
        successDeleteBlogDelete: null,
        errorDeleteBlogDelete: action.payload,
      };

    case DELETE_BLOG_DELETE_RESET:
      return {
        ...state,
        isLoadingDeleteBlogDelete: false,
        successDeleteBlogDelete: null,
        errorDeleteBlogDelete: null,
      };
    default:
      return { ...state };
  }
};

export default blog;

export const getBlogIndex = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_BLOG_INDEX_LOADING });
    const result = await api.getBlogIndex();
    dispatch({ type: GET_BLOG_INDEX_SUCCESS, payload: result.data });
  } catch (err) {
    dispatch({ type: GET_BLOG_INDEX_ERROR, payload: err });
  }
};

export const getBlogShow = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_BLOG_SHOW_LOADING });
    // document.title = "Loading ...";
    const result = await api.getBlogShow(id);
    dispatch({ type: GET_BLOG_SHOW_SUCCESS, payload: result.data });
    // document.title = result.data.data.title;
  } catch (err) {
    dispatch({ type: GET_BLOG_SHOW_ERROR, payload: err });
  }
};

export const postBlogStore = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: POST_BLOG_STORE_LOADING });

    const result = await api.postBlogStore(data);

    dispatch({ type: POST_BLOG_STORE_SUCCESS, payload: result.data });
  } catch (err) {
    dispatch({ type: POST_BLOG_STORE_ERROR, payload: err });
  }
};

export const putBlogUpdate =
  (data: any, id: number) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PUT_BLOG_UPDATE_LOADING });
      const result = await api.putBlogUpdate(data, id);

      dispatch({ type: PUT_BLOG_UPDATE_SUCCESS, payload: result.data });
    } catch (err) {
      dispatch({ type: PUT_BLOG_UPDATE_ERROR, payload: err });
    }
  };

export const deleteBlogDelete = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: DELETE_BLOG_DELETE_LOADING });
    const result = await api.deleteBlogDelete(id);

    dispatch({ type: DELETE_BLOG_DELETE_SUCCESS, payload: result });
  } catch (err) {
    dispatch({ type: DELETE_BLOG_DELETE_ERROR, payload: err });
  }
};

export const resetPostBlogStore = () => (dispatch: Dispatch) =>
  dispatch({
    type: POST_BLOG_STORE_RESET,
  });

export const resetPutBlogUpdate = () => (dispatch: Dispatch) =>
  dispatch({
    type: PUT_BLOG_UPDATE_RESET,
  });

export const resetDeleteBlogDelete = () => (dispatch: Dispatch) =>
  dispatch({
    type: DELETE_BLOG_DELETE_RESET,
  });
