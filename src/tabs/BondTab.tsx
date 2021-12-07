import Paper from "../components/Paper/Paper";

function BondTab({ planId }: { planId: string }) {
  console.log(planId);

  return (
    <Paper padding>
      <h1 style={{ textAlign: "center" }}>羁绊页面</h1>
    </Paper>
  );
}

export default BondTab;
