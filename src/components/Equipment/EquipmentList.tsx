import { Equipment } from "../../hooks/useEquipments";
import Divider from "../Divider/Divider";
import EquipmentCard from "./EquipmentCard";

function EquipmentList({ equipments }: { equipments: Equipment[] }) {
  const equipmentList = Object.values(equipments);
  return (
    <>
      {equipmentList.map((equip, i) => (
        <div key={equip.key}>
          <EquipmentCard {...equip} />
          {i < equipmentList.length - 1 && <Divider height="8px" />}
        </div>
      ))}
    </>
  );
}

export default EquipmentList;
