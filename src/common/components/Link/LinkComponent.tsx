import React from "react";
import { Link, LinkProps } from "react-router-dom";

const LinkComponent: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <>
      {typeof window !== "undefined" ? (
        <Link {...props}>{children}</Link>
      ) : (
        <a href={props.to.toString()} {...props}>
          {children}
        </a>
      )}
    </>
  );
};

export default LinkComponent;
