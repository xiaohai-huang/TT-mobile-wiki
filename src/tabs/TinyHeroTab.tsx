import Button from "../components/Button/Button";
import Paper from "../components/Paper/Paper";

function TinyHeroTab({ planId }: { planId: string }) {
  console.log(planId);

  return (
    <Paper padding>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          alignContent: "center",
        }}
      >
        <h1>设计稿</h1>

        <Button
          style={{ marginLeft: "10px", marginTop: "2px" }}
          color="white"
          onClick={() =>
            window.open(
              "https://www.figma.com/file/XQDZbIYei80u8YuEFk11z2/%E6%8E%8C%E7%9B%9FJK%E4%B8%93%E5%8C%BA-(Copy)?node-id=226%3A2441"
            )
          }
        >
          点此查看
        </Button>

        <h1>数据来源</h1>

        <Button
          style={{ marginLeft: "10px", marginTop: "2px" }}
          color="white"
          onClick={() =>
            window.open("https://cdn.jkmobile.qq.com/jkConfig/config.json")
          }
        >
          点此查看
        </Button>

        <h1>GitHub仓库</h1>

        <Button
          style={{ marginLeft: "10px", marginTop: "2px" }}
          color="white"
          onClick={() =>
            window.open("https://github.com/xiaohai-huang/TT-mobile-wiki")
          }
        >
          点此查看
        </Button>
      </div>

      <div style={{ marginTop: "20px" }} />
      <h1>字段解释</h1>
      <p>
        数据来源中的 <code>EquipConfig</code> 字段为装备列表
      </p>
      <pre style={{ overflowX: "scroll" }}>
        <code>{`"EquipConfig": 
{
  "1001": //装备id, 作为key获取装备对应配置 
      { 
      "basicDesc": "+15攻击力", //装备基本属性的描述
      "desc": "+15攻击力", //装备描述
      "name": "暴风大剑", //装备名称
      "picture": "equip/1001.png" //装备图片的相对路径, 示例https://cdn.jkmobile.qq.com/jkConfig/equip/2052.png
      "setid": "2", //装备所属赛季id, 时空裂痕为1
      "synthesis1": "0", //子装备1id
      "synthesis2": "0", //子装备1id
      "type": "基础道具" //装备类型: 常规装备, 基础装备, 特殊装备
      },
  ...
}
`}</code>
      </pre>
    </Paper>
  );
}

export default TinyHeroTab;
