import React from "react";
import classNames from "classnames";

import "./Paper.scss";
interface PaperProps {
  borderBottom?: boolean;
  padding?: boolean;
  children?: React.ReactNode;
}

function Paper({
  borderBottom = false,
  padding = false,
  children,
}: PaperProps) {
  return (
    <section className={classNames("paper", { padding })}>
      {children}
      {borderBottom && <div className="border" />}
    </section>
  );
}

export default Paper;
