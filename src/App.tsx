import { useState } from "react";
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";

import Paper from "./components/Paper/Paper";
import Tabs from "./components/Tabs/Tabs";
import EquipmentTab from "./tabs/EquipmentTab";
import "./App.scss";
import HeroTab from "./tabs/HeroTab";
import TinyHeroTab from "./tabs/TinyHeroTab";

const PLAN_TABS = [
  { label: "时空裂缝", value: "1" },
  { label: "英雄之黎明", value: "6" }, // ?? 这个的 赛季的id是多少？
];

const CATEGORY_TABS = [
  { label: "英雄", value: "0" },
  { label: "装备", value: "1" },
  { label: "羁绊", value: "2" },
  { label: "小小英雄", value: "3" },
];

function App() {
  const [plan, setPlan] = useState("1");
  const [category, setCategory] = useState("0");
  const transition = useTransition(category, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
  });
  let content = <></>;
  switch (category) {
    case "0":
      content = <HeroTab planId={plan} />;
      break;
    case "1":
      content = <EquipmentTab planId={plan} />;
      break;
    case "3":
      content = <TinyHeroTab planId={plan} />;
      break;
  }

  return (
    <div className="jk-wiki">
      <section className="nav-section">
        <Paper className="plan-tabs" borderBottom>
          <Tabs
            tabs={PLAN_TABS}
            value={plan}
            border
            onChange={(tab) => setPlan(tab)}
          />
        </Paper>
        <Paper className="category-tabs" borderBottom>
          <Tabs
            tabs={CATEGORY_TABS}
            size="medium"
            value={category}
            underline={false}
            border
            onChange={(tab) => setCategory(tab)}
          />
        </Paper>
      </section>
      {transition((style, item) => {
        return <animated.div style={style}>{content}</animated.div>;
      })}
    </div>
  );
}

export default App;
