import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import Paper from "../Paper/Paper";

import "./Tabs.scss";

interface TabsProps {
  tabs: Array<{ label: string; value: string }>;
  value: string;
  onChange?: (value: string) => void;
  size?: "medium" | "large";
  underline?: boolean;
}

function Tabs({
  tabs = [],
  value = "",
  onChange = () => {},
  size = "large",
  underline = true,
}: TabsProps) {
  return (
    <Paper className="category-tabs" borderBottom>
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
    </Paper>
  );
}

interface TabPanelProps {
  value?: string;
  index?: string;
  animation?: boolean;
  children: React.ReactNode;
}

export function TabPanel({
  value = "",
  index = "",
  animation = true,
  children,
}: TabPanelProps) {
  // ease animation when value is changed
  const transition = useTransition(
    value,
    animation
      ? {
          from: { opacity: 0 },
          enter: { opacity: 1 },
          config: { duration: 500 },
        }
      : {}
  );
  return value === index ? (
    <>
      {transition((style) => (
        <animated.div style={style}>{children}</animated.div>
      ))}
    </>
  ) : (
    <></>
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
