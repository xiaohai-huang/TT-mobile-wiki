import { useState } from "react";
import Paper from "./components/Paper/Paper";
import Segment from "./components/Segment/Segment";
import Tabs from "./components/Tabs/Tabs";

const PLAN_TABS = [
  { label: "时空裂缝", value: "0" },
  { label: "英雄之黎明", value: "1" },
];

const CATEGORY_TABS = [
  { label: "英雄", value: "0" },
  { label: "装备", value: "1" },
  { label: "羁绊", value: "2" },
  { label: "小小英雄", value: "3" },
];

const EQUIPMENT_TYPE = [
  { label: "常规装备", value: "0" },
  { label: "特殊装备", value: "1" },
];

function App() {
  const [plan, setPlan] = useState("0");
  const [category, setCategory] = useState("0");
  const [equipmentType, setEquipmentType] = useState("0");
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
          size="medium"
          tabs={CATEGORY_TABS}
          value={category}
          underline={false}
          border
          onChange={(tab) => setCategory(tab)}
        />
      </Paper>
      <Paper padding borderBottom>
        <Segment
          segments={EQUIPMENT_TYPE}
          value={equipmentType}
          onChange={(type) => setEquipmentType(type)}
        />
      </Paper>
    </div>
  );
}

export default App;
