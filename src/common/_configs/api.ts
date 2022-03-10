import Axios from "axios";
let baseURL = "";

if (typeof window !== "undefined") {
  const getUrl = window.location;
  baseURL = getUrl.protocol + "//" + getUrl.host;
}

const instance = Axios.create({
  baseURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

const api = {
  getBlogIndex: () => instance.get(`/`),
  getBlogShow: (id: number) => instance.get(`/${id}`),
  postBlogStore: (data: any) => instance.post(`/create`, data),
  putBlogUpdate: (data: any, id: number) => instance.put(`/${id}/edit`, data),
  deleteBlogDelete: (id: number) => instance.delete(`/${id}`),
};

export default api;
