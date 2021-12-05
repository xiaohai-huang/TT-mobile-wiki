import { useEffect, useState } from "react";
import { DescribeJKConfig } from "../api/api";
import makePictureUrl from "../utils/makePictureUrl";

export interface Equipment {
  key?: string;
  basicDesc: string;
  desc: string;
  fetterID: string;
  icon: string;
  name: string;
  picture: string;
  planID: string;
  synthesis1: string;
  synthesis2: string;
  tftEquipId: string;
  type: "基础装备" | "成型装备" | "特殊装备";
}

export type Equipments = { [id: string]: Equipment };
type Icon = { key: string; url: string };

export default function useEquipments(planId: string) {
  const [equipments, setEquipments] = useState<{
    normal: Equipments;
    special: Equipments;
  }>({ normal: {}, special: {} });
  const [icons, setIcons] = useState<Icon[]>([]);
  // Fetch all data
  useEffect(() => {
    (async () => {
      const { EquipConfig } = await DescribeJKConfig();
      const { iconData, normalEquipData, specialEquipData } = filterData(
        EquipConfig,
        planId
      );
      setEquipments({ normal: normalEquipData, special: specialEquipData });
      setIcons(iconData);
    })();
  }, [planId]);

  return { equipments, icons };
}

function filterData(equipments: Equipments, planId: string) {
  const keys = Object.keys(equipments);
  const normalEquipData: Equipments = {};
  const specialEquipData: Equipments = {};
  const iconData: Icon[] = [];
  keys.forEach((key) => {
    const equip = equipments[key];
    if (equip.planID === planId) {
      if (equip.type === "特殊装备") {
        specialEquipData[key] = {
          ...equip,
          key,
          picture: makePictureUrl(equip.picture),
        };
      } else {
        iconData.push({ key, url: makePictureUrl(equip.picture) });
        normalEquipData[key] = {
          ...equip,
          key,
          picture: makePictureUrl(equip.picture),
        };
      }
    }
  });

  return { specialEquipData, normalEquipData, iconData };
}
