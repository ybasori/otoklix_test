import React from "react";
import Link from "../../components/Link";

interface Props {
  data?: {
    id: number;
    title: string;
    content: string;
    published_at: string;
    created_at: string;
    updated: string;
  };
  loading?: boolean;
  deleting?: boolean;
  onDelete?: (id: number) => void;
}

const Post: React.FC<Props> = ({
  data = null,
  loading = false,
  deleting = false,
  onDelete = () => null,
}) => {
  return (
    <>
      {loading && "Loading ..."}
      {data && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title" data-testid="post-title">
              {data.title}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {data.published_at}
            </h6>
            <div className="row">
              <div
                className="col-md-12"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>
            <div className="row">
              <div className="col-md-12">
                <button
                  onClick={() => onDelete(data.id)}
                  className="btn btn-danger"
                  disabled={deleting}
                >
                  Delete
                </button>
                <Link to={`/${data.id}/edit`} className="btn btn-info">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
