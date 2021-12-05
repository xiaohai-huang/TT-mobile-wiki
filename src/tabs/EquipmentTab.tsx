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
  const [equipment, setEquipment] = useState<{
    [planId: string]: string;
  }>({});
  const { equipments: allEquipments, icons } = useEquipments(planId);
  const [sythesisEquipments, setSythesisEquipments] = useState<Equipment[]>([]);

  //  单选某个时, 筛选展示由其合成的的常规装备
  useEffect(() => {
    if (equipment[planId]) {
      const equipments = allEquipments.normal;
      const equip = equipments[equipment[planId]];
      if (!equip) {
        setSythesisEquipments([]);
        return;
      }
      const keys = [equip?.synthesis1, equip?.synthesis2];
      const sythesisEquips: Equipment[] = [];

      keys.forEach((key) => {
        if (key && key !== "0" && !sythesisEquips.includes(equipments[key])) {
          sythesisEquips.push(equipments[key]);
        }
      });
      // The first equip is the selected equip
      setSythesisEquipments([equip, ...sythesisEquips]);
    } else {
      setSythesisEquipments([]);
    }
  }, [equipment, allEquipments, planId]);

  let equipmentListData: Equipment[] = [];
  if (equipmentType === "常规装备") {
    if (equipment[planId]) {
      equipmentListData = sythesisEquipments;
    } else {
      equipmentListData = Object.values(allEquipments.normal);
    }
  } else if (equipmentType === "特殊装备") {
    equipmentListData = Object.values(allEquipments.special);
  }

  return (
    <>
      <Paper padding borderBottom>
        <Segment
          segments={EQUIPMENT_TYPE}
          value={equipmentType}
          onChange={(type) => setEquipmentType(type as any)}
        />
        {/* 只有常规装备有子装备筛选 */}
        {equipmentType === "常规装备" && (
          <>
            <IconList
              icons={icons.slice(10, 18)}
              value={`${equipment[planId]}`}
              onChange={(equipId) =>
                setEquipment((prev) => ({ ...prev, [planId]: equipId }))
              }
            />
            <div style={{ marginBottom: "4px" }} />
          </>
        )}
      </Paper>
      <EquipmentList equipments={equipmentListData} />
    </>
  );
}

export default EquipmentTab;
