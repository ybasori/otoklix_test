import React, { FC } from "react";
import Link from "../../components/Link";

interface Props {
  data?: {
    id: number;
    title: string;
    content: string;
    published_at: string;
    created_at: string;
    updated: string;
  }[];
  loading?: boolean;
  deleting?: boolean;
  onDelete?: (id: number) => void;
}

const Home: FC<Props> = ({
  data = [],
  loading = false,
  deleting = false,
  onDelete = () => null,
}) => {
  return (
    <>
      {loading && "Loading ..."}
      {data &&
        data.map((item, index) => (
          <div
            className="card"
            key={`post-${index + 1}`}
            data-testid={`post-data`}
          >
            <div className="card-body">
              <h5 className="card-title">
                <Link to={`/${item.id}`}>{item.title}</Link>
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {item.published_at}
              </h6>
              <div className="row">
                <div
                  className="col-md-12"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="btn btn-danger"
                    disabled={deleting}
                    data-testid={`delete-${index + 1}`}
                  >
                    Delete
                  </button>
                  <Link to={`/${item.id}/edit`} className="btn btn-info">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Home;
