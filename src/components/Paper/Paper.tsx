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
    <div className="paper-root">
      <section className={classNames("paper", { padding })}>{children}</section>
      {borderBottom && <div className="paper-border" />}
    </div>
  );
}

export default Paper;
