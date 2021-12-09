import Button from "../components/Button/Button";
import Paper from "../components/Paper/Paper";

function HeroTab({ planId }: { planId: string }) {
  console.log(planId);

  return (
    <Paper padding>
      <h1 style={{ textAlign: "center" }}>前端开发测试</h1>
      <h2>基本要求:</h2>
      <article style={{ marginLeft: "1ch", marginTop: "5px" }}>
        {[
          "需要实现时空裂痕-装备分页，其他一二级tab切换无需展示内容",
          "装备分页实现“特殊装备”和“常规装备”tab切换。",
          "常规装备包含一排子装备筛选列表，默认不选中任何装备，单选某一个子装备时，筛选展示由其合成的的常规装备。",
          "特殊装备没有子装备筛选，展示列表即可。 ",
          "不限技术栈，要求模块化和组件化。",
        ].map((item, i) => (
          <div key={i} style={{ display: "flex" }}>
            <p>{i + 1}. </p>
            <div style={{ marginRight: "3px" }} />
            <p key={i} style={{ marginBottom: "3px" }}>
              {item}
            </p>
          </div>
        ))}
      </article>
      <div style={{ marginBottom: "10px" }} />
      <img
        alt="design-graph"
        src="http://ie-mps-1258344699.cos.ap-nanjing.myqcloud.com/demo/100008925466/input/1638802518/interview-question.png"
      />
      <Button
        color="black"
        fullSize
        style={{ height: "48px", marginTop: "15px" }}
        textStyle={{ fontSize: "17px" }}
        onClick={() =>
          window.open("https://github.com/xiaohai-huang/TT-mobile-wiki")
        }
      >
        GitHub仓库
      </Button>
    </Paper>
  );
}

export default HeroTab;
