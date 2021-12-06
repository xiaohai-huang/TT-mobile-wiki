import classNames from "classnames";
import { useEffect, useState } from "react";

import "./Tabs.scss";

interface TabsProps {
  tabs: Array<{ label: string; value: string }>;
  value: string;
  onChange?: (value: string) => void;
  size?: "medium" | "large";
  underline?: boolean;
  border?: boolean;
}

function Tabs({
  tabs = [],
  value = "",
  onChange = () => {},
  size = "large",
  underline = true,
}: TabsProps) {
  return (
    <nav className={`tabs ${size}`}>
      <div className="tabs__inner">
        {tabs.map((tab) => {
          return (
            <TabButton
              key={tab.value}
              active={value === tab.value}
              underline={underline}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
            </TabButton>
          );
        })}
      </div>
    </nav>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  underline?: boolean;
}
function TabButton({
  active = false,
  onClick = () => {},
  underline = false,
  children,
}: TabButtonProps) {
  // Disable 'remove animation' if the button has never not actived
  const [disableRemove, setDisableRemove] = useState(true);
  useEffect(() => {
    if (active) setDisableRemove(false);
  }, [active]);
  return (
    <div
      className={classNames("tabs-button", {
        active,
      })}
      onClick={onClick}
    >
      <p className="label-text">
        {children}
        {underline && (
          <span
            className={classNames({
              underline: active,
              "remove-underline": !active && !disableRemove,
            })}
          />
        )}
      </p>
    </div>
  );
}

export default Tabs;
