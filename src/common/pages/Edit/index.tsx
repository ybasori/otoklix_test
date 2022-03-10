import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogShow,
  putBlogUpdate,
  resetPutBlogUpdate,
} from "../../_redux/blog";
import { Reducers } from "../../_redux/types";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useNavigate, useParams } from "react-router-dom";

const validation = object().shape({
  title: string().required(),
  content: string().required(),
});

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { blog } = useSelector((state: Reducers) => state);

  const params = useParams<{ id: string }>();

  const [oneTime, setOneTime] = useState(true);

  const {
    setValue,
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
    dispatch(putBlogUpdate(data, blog.successGetBlogShow.id));
  };

  useEffect(() => {
    if (isSubmitting && blog.successPutBlogUpdate) {
      setIsSubmitting(false);
      dispatch(resetPutBlogUpdate());
      navigate("/");
    }
    if (isSubmitting && blog.errorPutBlogUpdate) {
      setIsSubmitting(false);
      dispatch(resetPutBlogUpdate());
      alert("error");
    }
  }, [isSubmitting, blog.successPutBlogUpdate, blog.errorPutBlogUpdate]);

  useEffect(() => {
    if (oneTime && !blog.isLoadingGetBlogShow) {
      setOneTime(false);
      dispatch(getBlogShow(Number(params.id)));
    }
    if (!oneTime && !blog.isLoadingGetBlogShow && blog.successGetBlogShow) {
      setValue("title", blog.successGetBlogShow.title);
      setValue("content", blog.successGetBlogShow.content);
    }
  }, [oneTime, blog.isLoadingGetBlogShow, blog.successGetBlogShow]);

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
            type="submit"
            className="btn btn-primary"
            disabled={blog.isLoadingPutBlogUpdate}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
