import { annualTargetActualConfig } from '../config/tableConfig';
import { emissionsTrendConfig, kpiTrendConfig } from '../config/emissionsTrendConfig';
import { facilityStatusConfig } from '../config/facilityStatusConfig';

// 表格數據
const annualTargetActualData = [
  { 
    year: 2023, 
    totalTarget: 310.00, totalActual: 309.73,
    toolTarget: 250.00, toolActual: 249.80,
    facTarget: 60.00, facActual: 59.93
  },
]

const emissionsTrendData = [
  { year: 2020, scope1: 200, scope2: 80, target: 285 },
  { year: 2021, scope1: 195, scope2: 80, target: 280 },
  { year: 2022, scope1: 190, scope2: 80, target: 275 },
  { year: 2023, scope1: 185, scope2: 80, target: 270 },
  { year: 2024, scope1: 180, scope2: 80, target: 265 },
  { year: 2025, scope1: 175, scope2: 80, target: 260 },
  { year: 2026, scope1: 170, scope2: 80, target: 255 },
  { year: 2027, scope1: 165, scope2: 80, target: 250 },
  { year: 2028, scope1: 160, scope2: 80, target: 245 },
  { year: 2029, scope1: 155, scope2: 80, target: 240 },
  { year: 2030, scope1: 150, scope2: 80, target: 235 },
];

const kpiData = [
  { month: '202401', scope1: 80, scope2: 20, target: 95 },
  { month: '202402', scope1: 78, scope2: 20, target: 94 },
  { month: '202403', scope1: 77, scope2: 20, target: 93 },
  { month: '202404', scope1: 76, scope2: 20, target: 92 },
  { month: '202405', scope1: 75, scope2: 20, target: 91 },
  { month: '202406', scope1: 74, scope2: 20, target: 90 },
  { month: '202407', scope1: 73, scope2: 20, target: 89 },
  { month: '202408', scope1: 72, scope2: 20, target: 88 },
  { month: '202409', scope1: 71, scope2: 20, target: 87 },
  { month: '202410', scope1: 70, scope2: 20, target: 86 },
  { month: '202411', scope1: 69, scope2: 20, target: 85 },
  { month: '202412', scope1: 67, scope2: 20, target: 84 },
];

const facilityStatusData = [
  { facility: '全公司', status: 'green' , type:'全公司' },
  { facility: 'Tool', status: 'green' , type:'全公司' },
  { facility: 'FAC', status: 'green' , type:'全公司' },
  { facility: 'F12A', status: 'green', type:'竹科' },
  { facility: 'F12B', status: 'red', type:'竹科' },
  { facility: 'F15A', status: 'yellow', type:'中科' },
  { facility: 'F15B', status: 'yellow', type:'中科' },
  { facility: 'F14A', status: 'green', type:'南科' },
  { facility: 'F14B', status: 'red', type:'南科' },  
  { facility: 'RDPC', status: 'green', type:'RDAP' },
  { facility: 'APTS', status: 'red', type:'RDAP' },
  { facility: 'F16', status: 'yellow', type:'海外' },
  { facility: 'F10', status: 'yellow', type:'海外' },
];

export async function fetchAnnualTargetActualData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: annualTargetActualConfig.title,
        headers: annualTargetActualConfig.headers,
        data: annualTargetActualData
      });
    }, 500);
  });
}

export async function fetchEmissionsTrendData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: emissionsTrendConfig.title,
        config: emissionsTrendConfig,
        data: emissionsTrendData
      });
    }, 500);
  });
}

export async function fetchKpiTrendData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: kpiTrendConfig.title,
        config: kpiTrendConfig,
        data: kpiData
      });
    }, 500);
  });
}

export async function fetchFacilityStatusData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: facilityStatusConfig.title,
        config: facilityStatusConfig,
        data: facilityStatusData
      });
    }, 500);
  });
}