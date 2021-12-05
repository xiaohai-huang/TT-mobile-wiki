import classNames from "classnames";
import "./IconList.scss";
interface IconListProps {
  icons?: Array<{ url: string; key: string }>;
  value: string;
  onChange: (value: string) => void;
}
function IconList({
  icons = [],
  value = "",
  onChange = () => {},
}: IconListProps) {
  return (
    <div className="icon-list">
      {icons.map((icon) => (
        <div
          className={classNames("icon-list-item__wrapper", {
            active: icon.key === value,
          })}
          key={icon.key}
          onClick={() => onChange(icon.key)}
        >
          <img alt="icon" src={icon.url} />
        </div>
      ))}
    </div>
  );
}

export default IconList;
