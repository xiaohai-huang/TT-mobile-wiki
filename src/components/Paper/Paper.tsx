import React, { CSSProperties } from "react";
import classNames from "classnames";

import "./Paper.scss";
interface PaperProps {
  borderBottom?: boolean;
  padding?: boolean;
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

function Paper({
  borderBottom = false,
  padding = false,
  children,
  className,
  ...rest
}: PaperProps) {
  return (
    <div className={`paper-root ${className}`} {...rest}>
      <section className={classNames("paper", { padding })}>{children}</section>
      {borderBottom && <div className="paper-border" />}
    </div>
  );
}

export default Paper;
