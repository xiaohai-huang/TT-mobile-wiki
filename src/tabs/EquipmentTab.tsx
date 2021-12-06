import { useEffect, useState } from "react";

import EquipmentListVirtualized from "../components/Equipment/EquipmentListVirtualized";
import IconList from "../components/IconList/IconList";
import Paper from "../components/Paper/Paper";
import Segment from "../components/Segment/Segment";

import useEquipments, { Equipment } from "../hooks/useEquipments";
import useSize from "../hooks/useSize";

const EQUIPMENT_TYPE = [
  { label: "常规装备", value: "常规装备" },
  { label: "特殊装备", value: "特殊装备" },
];
type Icon = { key: string; url: string };

interface EquipmentTabProps {
  planId: string;
}

function EquipmentTab({ planId }: EquipmentTabProps) {
  const [equipmentType, setEquipmentType] = useState("常规装备" as any);
  // 当前选中的装备
  const [equipment, setEquipment] = useState<{
    [planId: string]: string;
  }>({});
  const { childEquipments, specialEquipments } = useEquipments(planId);
  const [equipmentListData, setEquipmentListData] = useState<Equipment[]>([]);
  const [icons, setIcons] = useState<Icon[]>([]);
  const topNavSize = useSize(".nav-section");

  // 获取要展示的装备列表
  useEffect(() => {
    let listData: Equipment[] = [];
    // 单选某个时, 筛选展示由其合成的的常规装备
    if (equipmentType === "常规装备") {
      const selectedKey = equipment[planId];
      if (selectedKey) {
        listData = [
          childEquipments[selectedKey],
          ...Object.values(childEquipments[selectedKey].outputs as Equipment[]),
        ];
      } else {
        listData = Object.values(childEquipments);
      }
    }
    // 展示列表
    else if (equipmentType === "特殊装备") {
      listData = Object.values(specialEquipments);
    }
    setEquipmentListData(listData);
  }, [childEquipments, equipment, equipmentType, planId, specialEquipments]);

  // 获取展示的装备图片列表
  useEffect(() => {
    setIcons(
      Object.values(childEquipments).map(({ key, picture }: any) => ({
        key,
        url: picture,
      }))
    );
  }, [childEquipments]);

  return (
    <>
      {/* compute the top based on nav-section's height */}
      <Paper
        className="equipment-select"
        padding
        borderBottom
        style={{ position: "sticky", top: `${topNavSize[1]}px` }}
      >
        <Segment
          segments={EQUIPMENT_TYPE}
          value={equipmentType}
          onChange={(type) => setEquipmentType(type as any)}
        />
        {/* 只有常规装备有子装备筛选 */}
        {equipmentType === "常规装备" && (
          <>
            <IconList
              icons={icons}
              value={`${equipment[planId]}`}
              onChange={(equipId) =>
                setEquipment((prev) => ({ ...prev, [planId]: equipId }))
              }
            />
            <div style={{ marginBottom: "4px" }} />
          </>
        )}
      </Paper>
      <EquipmentListVirtualized equipments={equipmentListData} />
    </>
  );
}

export default EquipmentTab;
