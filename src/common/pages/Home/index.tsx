import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogDelete,
  getBlogIndex,
  resetDeleteBlogDelete,
} from "../../_redux/blog";
import { Reducers } from "../../_redux/types";
import Posts from "./Posts";

const Home = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((state: Reducers) => state);

  const [oneTime, setOneTime] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = (id: number) => {
    const text = "Are you sure?";
    if (confirm(text)) {
      setIsDeleting(true);
      dispatch(deleteBlogDelete(id));
    }
  };

  useEffect(() => {
    if (isDeleting && blog.successDeleteBlogDelete) {
      setIsDeleting(false);
      dispatch(resetDeleteBlogDelete());
      dispatch(getBlogIndex());
    }
    if (isDeleting && blog.errorDeleteBlogDelete) {
      setIsDeleting(false);
      dispatch(resetDeleteBlogDelete());
      alert("error");
    }
  }, [isDeleting, blog.successDeleteBlogDelete, blog.errorDeleteBlogDelete]);

  useEffect(() => {
    if (oneTime) {
      setOneTime(false);
      dispatch(getBlogIndex());
    }
  }, [oneTime]);

  return (
    <div className="row">
      <div className="col-md-12 posts-data">
        <Posts
          data={blog.successGetBlogIndex}
          loading={blog.isLoadingGetBlogIndex}
          deleting={blog.isLoadingDeleteBlogDelete}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default Home;
