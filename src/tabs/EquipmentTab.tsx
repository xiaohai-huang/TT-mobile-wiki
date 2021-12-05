import { useEffect, useState } from "react";

import EquipmentList from "../components/Equipment/EquipmentList";
import IconList from "../components/IconList/IconList";
import Paper from "../components/Paper/Paper";
import Segment from "../components/Segment/Segment";

import useEquipments, { Equipment } from "../hooks/useEquipments";

const EQUIPMENT_TYPE = [
  { label: "常规装备", value: "常规装备" },
  { label: "特殊装备", value: "特殊装备" },
];

interface EquipmentTabProps {
  planId: string;
}

function EquipmentTab({ planId }: EquipmentTabProps) {
  const [equipmentType, setEquipmentType] = useState("常规装备" as any);
  const [equipment, setEquipment] = useState<string>("");
  const { equipments: allEquipments, icons } = useEquipments(planId);
  //  单选某个时, 筛选展示由其合成的的常规装备
  const [sythesisEquipments, setSythesisEquipments] = useState<Equipment[]>([]);
  useEffect(() => {
    if (equipment) {
      const equipments = allEquipments.normal;
      const equip = equipments[equipment];
      const keys = [equip.synthesis1, equip.synthesis2];
      const sythesisEquips: Equipment[] = [];
      keys.forEach((key) => {
        if (key !== "0" && !sythesisEquips.includes(equipments[key])) {
          sythesisEquips.push(equipments[key]);
        }
      });

      setSythesisEquipments([equip, ...sythesisEquips]);
    } else {
      setSythesisEquipments([]);
    }
  }, [equipment, allEquipments]);

  // Reset Equipment selection after changing tabs
  useEffect(() => {
    setEquipment("");
  }, [equipmentType]);

  return (
    <>
      <Paper padding borderBottom>
        <Segment
          segments={EQUIPMENT_TYPE}
          value={equipmentType}
          onChange={(type) => setEquipmentType(type as any)}
        />
        {equipmentType === "常规装备" && (
          <>
            <IconList
              icons={icons.slice(10, 18)}
              value={`${equipment}`}
              onChange={(value) => setEquipment(value)}
            />
            <div style={{ marginBottom: "4px" }} />
          </>
        )}
      </Paper>
      <EquipmentList
        equipments={
          equipmentType === "常规装备"
            ? sythesisEquipments
            : Object.values(allEquipments.special)
        }
      />
    </>
  );
}

export default EquipmentTab;
