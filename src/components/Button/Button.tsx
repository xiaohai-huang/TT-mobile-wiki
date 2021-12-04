import classNames from "classnames";

import "./Button.scss";
interface ButtonProps {
  color?: "black" | "white";
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

function Button({
  color = "black",
  onClick = () => {},
  style,
  children,
}: ButtonProps) {
  return (
    <div
      style={style}
      className={classNames("basic-button", {
        black: color === "black",
        white: color === "white",
      })}
      onClick={onClick}
    >
      <p className="children">{children}</p>
    </div>
  );
}

export default Button;
