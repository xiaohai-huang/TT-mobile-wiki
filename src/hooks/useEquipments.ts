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
  outputs?: Equipment[] | [];
}

export type Equipments = { [id: string]: Equipment };

/**
 * 获取 子装备 & 特殊装备
 * @param planId 赛季id
 * @returns 子装备，特殊装备
 */
export default function useEquipments(planId: string) {
  const [specialEquipments, setSpecialEquipments] = useState<Equipments>({});
  const [childEquipments, setChildEquipments] = useState<Equipments>({});
  const [equipConfig, setEquipConfig] = useState<Equipments>({});

  // Fetch all data
  useEffect(() => {
    (async () => {
      const { EquipConfig } = await DescribeJKConfig();
      setEquipConfig(EquipConfig);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { childEquipData, specialEquipData } = filterData(
        equipConfig,
        planId
      );
      setChildEquipments(childEquipData);
      setSpecialEquipments(specialEquipData);
    })();
  }, [planId, equipConfig]);

  return { childEquipments, specialEquipments };
}

function filterData(equipments: Equipments, planId: string) {
  const keys = Object.keys(equipments);
  const childEquipData: any = {};
  const specialEquipData: Equipments = {};
  keys.forEach((key) => {
    const equip = equipments[key];
    if (equip.planID === planId) {
      if (equip.type === "特殊装备") {
        specialEquipData[key] = {
          ...equip,
          key,
          picture: makePictureUrl(equip.picture),
        };
      } else if (equip.type === "基础装备" || equip.type === "成型装备") {
        // 获取 子装备[]
        const { synthesis1, synthesis2 } = equip;
        const children = [synthesis1, synthesis2];
        children.forEach((childKey) => {
          if (childKey && childKey !== "0") {
            if (!childEquipData[childKey]) {
              childEquipData[childKey] = {
                ...equipments[childKey],
                key: childKey,
                picture: makePictureUrl(equipments[childKey].picture),
                outputs: {},
              };
            } else {
              childEquipData[childKey].outputs[key] = {
                ...equip,
                key,
                picture: makePictureUrl(equip.picture),
              };
            }
          }
        });
      }
    }
  });

  const childKeys = Object.keys(childEquipData);
  childKeys.forEach((key) => {
    const outputs = childEquipData[key].outputs;
    if (outputs) childEquipData[key].outputs = Object.values(outputs);
  });

  return { specialEquipData, childEquipData };
}
