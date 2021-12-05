import { useState } from "react";

import Paper from "./components/Paper/Paper";
import Tabs from "./components/Tabs/Tabs";
import EquipmentTab from "./tabs/EquipmentTab";

const PLAN_TABS = [
  { label: "时空裂缝", value: "1" },
  { label: "英雄之黎明", value: "2" }, // ?? 这个的 赛季的id是多少？
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

  let content = <></>;
  switch (category) {
    case "1":
      content = <EquipmentTab planId={plan} />;
      break;
  }

  return (
    <div className="jk-wiki">
      <Paper borderBottom>
        <Tabs
          tabs={PLAN_TABS}
          value={plan}
          border
          onChange={(tab) => setPlan(tab)}
        />
      </Paper>
      <Paper borderBottom>
        <Tabs
          tabs={CATEGORY_TABS}
          size="medium"
          value={category}
          underline={false}
          border
          onChange={(tab) => setCategory(tab)}
        />
      </Paper>
      {content}
    </div>
  );
}

export default App;
