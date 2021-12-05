import React, { useCallback, useEffect, useRef } from "react";
import { VariableSizeList as List } from "react-window";

import EquipmentCard from "./EquipmentCard";
import useWindowResize from "../../hooks/useWindowResize";
import useSize from "../../hooks/useSize";
import Divider from "../Divider/Divider";

const Row = ({ data, index, setSize, windowWidth }) => {
  const rowRef = useRef();

  React.useEffect(() => {
    setSize(index, rowRef.current.getBoundingClientRect().height);
  }, [setSize, index, windowWidth]);

  return (
    <div ref={rowRef}>
      <EquipmentCard {...data[index]} />
      {index < data.length - 1 ? (
        <Divider height="8px" />
      ) : (
        <Divider height="8px" color={false} />
      )}
    </div>
  );
};

const useNavHeight = (deps) => {
  const [, height1] = useSize(".nav-section", deps);
  const [, height2] = useSize(".equipment-select", deps);
  return height1 + height2;
};

export default function EquipmentListVirtualized({ equipments: data }) {
  const listRef = useRef();

  const sizeMap = useRef({});
  const setSize = useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current.resetAfterIndex(index);
  }, []);
  const getSize = (index) => sizeMap.current[index] || 50;
  const [windowWidth, windowHeight] = useWindowResize();
  const navHeight = useNavHeight(data);

  useEffect(() => {
    listRef.current.scrollToItem(0);
  }, [data]);

  return (
    <List
      ref={listRef}
      height={windowHeight - navHeight}
      width="100%"
      itemCount={data.length}
      itemSize={getSize}
      itemData={data}
      itemKey={(index, data) => data[index].key}
    >
      {({ data, index, style }) => (
        <div style={style}>
          <Row
            data={data}
            index={index}
            setSize={setSize}
            windowWidth={windowWidth}
          />
        </div>
      )}
    </List>
  );
}
