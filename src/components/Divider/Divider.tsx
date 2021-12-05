function Divider({
  height = "1px",
  color = true,
}: {
  height?: string;
  color?: boolean;
}) {
  return <div style={{ height, background: color ? "#f0f3f7" : "" }} />;
}

export default Divider;
