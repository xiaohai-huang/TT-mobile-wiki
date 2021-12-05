import Button from "../Button/Button";

interface SegmentProps {
  segments: Array<{
    label: string;
    value: string;
  }>;
  value: string;
  onChange: (value: string) => void;
}

function Segment({
  segments = [],
  value = "",
  onChange = () => {},
}: SegmentProps) {
  return (
    <div className="segment">
      {segments.map((segment) => (
        <Button
          style={{ marginRight: "10px" }}
          key={segment.value}
          color={segment.value === value ? "black" : "white"}
          onClick={() => onChange(segment.value)}
        >
          {segment.label}
        </Button>
      ))}
    </div>
  );
}

export default Segment;
