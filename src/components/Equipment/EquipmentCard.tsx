import { Equipment } from "../../hooks/useEquipments";
import "./EquipmentCard.scss";
function EquipmentCard(props: Equipment) {
  return (
    <article className="equipment-card">
      <div className="equipment-card__first-row">
        <img alt="equipment" src={props.picture} />
        <p className="equipment-card__name">{props.name}</p>
      </div>
      <div className="equipment-card__second-row">
        <div className="placeholder" />
        <div>
          <p className="equipment-card__effect">{props.basicDesc}</p>
          <p className="equipment-card__basic-desc">{props.desc}</p>
        </div>
      </div>
    </article>
  );
}

export default EquipmentCard;
