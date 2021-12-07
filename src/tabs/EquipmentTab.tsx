import { useEffect, useState } from "react";
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";

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
  // animation when switching equip type
  const transition = useTransition(equipmentType, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 500 },
  });

  // 单选某个时, 筛选展示由其合成的的常规装备
  useEffect(() => {
    let listData: Equipment[] = [];
    if (equipmentType === "常规装备") {
      const selectedKey = equipment[planId];
      if (selectedKey) {
        const selectedEquip = childEquipments[selectedKey];
        if (selectedEquip)
          listData = [
            selectedEquip,
            ...Object.values(selectedEquip.outputs as Equipment[]),
          ];
        else listData = [];
      } else {
        // No equip is selected
        listData = Object.values(childEquipments);
      }
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
        className="nav equipment-select"
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
      {transition((style: any) => (
        <animated.div style={style}>
          <EquipmentListVirtualized
            equipments={
              equipmentType === "常规装备"
                ? equipmentListData
                : Object.values(specialEquipments)
            }
          />
        </animated.div>
      ))}
    </>
  );
}

export default EquipmentTab;
