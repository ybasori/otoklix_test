import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBlogStore, resetPostBlogStore } from "../../_redux/blog";
import { Reducers } from "../../_redux/types";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";

const validation = object().shape({
  title: string().required(),
  content: string().required(),
});

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { blog } = useSelector((state: Reducers) => state);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    dispatch(postBlogStore(data));
  };

  useEffect(() => {
    if (isSubmitting && blog.successPostBlogStore) {
      setIsSubmitting(false);
      dispatch(resetPostBlogStore());
      navigate("/");
    }
    if (isSubmitting && blog.errorPostBlogStore) {
      setIsSubmitting(false);
      dispatch(resetPostBlogStore());
      alert("error");
    }
  }, [isSubmitting, blog.successPostBlogStore, blog.errorPostBlogStore]);

  return (
    <div className="row">
      <div className="col-md-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>

            <Controller
              name="title"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <input
                    data-testid="input-title"
                    type="text"
                    className={`form-control ${errors.title && "is-invalid"}`}
                    id="exampleFormControlInput1"
                    placeholder="Title"
                    onChange={onChange}
                    value={value}
                  />
                  {errors.title && (
                    <div
                      id="validationServerTitleFeedback"
                      className="invalid-feedback"
                    >
                      {errors.title?.message}
                    </div>
                  )}
                </>
              )}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Content
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <textarea
                    data-testid="input-content"
                    className={`form-control ${errors.content && "is-invalid"}`}
                    id="exampleFormControlTextarea1"
                    rows={3}
                    onChange={onChange}
                    value={value}
                  ></textarea>
                  {errors.content && (
                    <div
                      id="validationServerTitleFeedback"
                      className="invalid-feedback"
                    >
                      {errors.content?.message}
                    </div>
                  )}
                </>
              )}
            />
          </div>
          {/* <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Publish at
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div> */}
          <button
            data-testid="btn-submit"
            type="submit"
            className="btn btn-primary"
            disabled={blog.isLoadingPostBlogStore}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
