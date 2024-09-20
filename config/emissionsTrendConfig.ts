export const emissionsTrendConfig = {
  title: "溫室氣體排放趨勢 (2020-2030)",
  xAxisKey: "year",
  lines: [
    { key: "scope1", name: "Scope 1", color: "#8884d8" },
    { key: "scope2", name: "Scope 2", color: "#82ca9d" },
    { key: "total", name: "Total", color: "#ffc658" },
    
  ]
};

export const kpiTrendConfig = {
  title: "溫室氣體絕對減量KPI",
  xAxisKey: "month",
  lines: [
    { key: "scope1", name: "Scope 1", color: "#8884d8" },
    { key: "scope2", name: "Scope 2", color: "#82ca9d" },
    { key: "total", name: "Total", color: "#ffc658" },
    { key: "target", name: "目標值", color: "#FF0000", isDashed: true },
  ]
};