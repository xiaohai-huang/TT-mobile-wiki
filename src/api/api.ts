const BASE_URL = "https://cdn.jkmobile.qq.com/";

export default function api(path: string) {
  return fetch(`${BASE_URL}${path}`).then((res) => res.json());
}

export function DescribeJKConfig() {
  // 注意：可以使用代理，将URL改为 包含 ?jkts=2729761的
  // return api("jkConfig/config.json");
  return api("jkConfig/config.json?jkts=2729761");
}
