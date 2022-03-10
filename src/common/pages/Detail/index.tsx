import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Post from "./Post";
import {
  deleteBlogDelete,
  getBlogShow,
  resetDeleteBlogDelete,
} from "../../_redux/blog";
import { Reducers } from "../../_redux/types";

const Detail = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { blog } = useSelector((state: Reducers) => state);

  const [oneTime, setOneTime] = useState(true);

  useEffect(() => {
    if (oneTime) {
      setOneTime(false);
      dispatch(getBlogShow(Number(params.id)));
    }
  }, [oneTime]);

  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

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
      navigate("/");
    }
    if (isDeleting && blog.errorDeleteBlogDelete) {
      setIsDeleting(false);
      dispatch(resetDeleteBlogDelete());
      alert("error");
    }
  }, [isDeleting, blog.successDeleteBlogDelete, blog.errorDeleteBlogDelete]);
  return (
    <div className="row">
      <div className="col-md-12 post-data">
        <Post
          data={blog.successGetBlogShow}
          loading={blog.isLoadingGetBlogShow}
          deleting={blog.isLoadingDeleteBlogDelete}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default Detail;
