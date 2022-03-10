export interface Action {
  payload?: any;
  type: string;
}

export type Dispatch = (data: Action) => null;

export interface BlogState {
  isLoadingGetBlogIndex: boolean;
  successGetBlogIndex: any;
  errorGetBlogIndex: any;
  isLoadingGetBlogShow: boolean;
  successGetBlogShow: any;
  errorGetBlogShow: any;
  isLoadingPostBlogStore: boolean;
  successPostBlogStore: any;
  errorPostBlogStore: any;
  isLoadingPutBlogUpdate: boolean;
  successPutBlogUpdate: any;
  errorPutBlogUpdate: any;
  isLoadingDeleteBlogDelete: boolean;
  successDeleteBlogDelete: any;
  errorDeleteBlogDelete: any;
}

export interface Reducers {
  blog: BlogState;
}
