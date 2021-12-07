import Paper from "../components/Paper/Paper";

function HeroTab({ planId }: { planId: string }) {
  console.log(planId);

  return (
    <Paper padding>
      <h1 style={{ textAlign: "center" }}>前端开发测试</h1>
      <h2>基本要求:</h2>
      <ol>
        <li>需要实现时空裂痕-装备分页，其他一二级tab切换无需展示内容</li>
        <li>装备分页实现“特殊装备”和“常规装备”tab切换。 </li>
        <li>
          常规装备包含一排子装备筛选列表，默认不选中任何装备，单选某一个子装备时，筛选展示由其合成的的常规装备。
        </li>
        <li>特殊装备没有子装备筛选，展示列表即可。 </li>
        <li>不限技术栈，要求模块化和组件化。</li>
      </ol>
      <img
        alt="design-graph"
        src="http://ie-mps-1258344699.cos.ap-nanjing.myqcloud.com/demo/100008925466/input/1638802518/interview-question.png"
      />
    </Paper>
  );
}

export default HeroTab;
