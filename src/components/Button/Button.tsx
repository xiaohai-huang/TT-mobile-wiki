import classNames from "classnames";

import "./Button.scss";
interface ButtonProps {
  color?: "black" | "white";
  onClick?: () => void;
  children?: React.ReactNode;
  fullSize?: boolean;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

function Button({
  color = "black",
  onClick = () => {},
  fullSize = false,
  style,
  textStyle,
  children,
}: ButtonProps) {
  return (
    <div
      style={style}
      className={classNames("basic-button", {
        black: color === "black",
        white: color === "white",
        "basic-button__full-size": fullSize,
      })}
      onClick={onClick}
    >
      <p className="children" style={textStyle}>
        {children}
      </p>
    </div>
  );
}

export default Button;
