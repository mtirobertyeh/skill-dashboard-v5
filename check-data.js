const fs = require("fs");
const vm = require("vm");

const code = fs.readFileSync("./data.js", "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);

try {
  vm.runInNewContext(code, sandbox);
} catch (err) {
  console.error("❌ 執行 data.js 失敗：", err.message);
  process.exit(1);
}

const data = sandbox.window.DASHBOARD_DATA;

if (!data) {
  console.error("❌ 找不到 window.DASHBOARD_DATA");
  process.exit(1);
}

if (!Array.isArray(data.sections)) {
  console.error("❌ DASHBOARD_DATA.sections 必須是陣列");
  process.exit(1);
}

console.log("✅ data.js 結構檢查完全正常！");
