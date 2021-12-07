import { useState } from "react";

import Tabs, { TabPanel } from "./components/Tabs/Tabs";
import EquipmentTab from "./tabs/EquipmentTab";
import HeroTab from "./tabs/HeroTab";
import TinyHeroTab from "./tabs/TinyHeroTab";
import "./App.scss";
import BondTab from "./tabs/BondTab";

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
  const [plan, setPlan] = useState(PLAN_TABS[0].value);
  const [category, setCategory] = useState(CATEGORY_TABS[0].value);

  return (
    <div className="jk-wiki">
      <section className="nav nav-section">
        <Tabs tabs={PLAN_TABS} value={plan} onChange={(tab) => setPlan(tab)} />
        <Tabs
          tabs={CATEGORY_TABS}
          size="medium"
          value={category}
          underline={false}
          onChange={(tab) => setCategory(tab)}
        />
      </section>

      <TabPanel value={category} index="0">
        <HeroTab planId={plan} />
      </TabPanel>
      <TabPanel value={category} index="1">
        <EquipmentTab planId={plan} />
      </TabPanel>
      <TabPanel value={category} index="2">
        <BondTab planId={plan} />
      </TabPanel>
      <TabPanel value={category} index="3">
        <TinyHeroTab planId={plan} />
      </TabPanel>
    </div>
  );
}

export default App;
