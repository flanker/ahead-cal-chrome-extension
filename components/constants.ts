interface Holiday {
  name: string
  type: "holiday"
}

interface WorkDay {
  name: string
  type: "workday"
}

export const HOLIDAYS: Record<string, Holiday> = {
  "2025-01-01": { name: "元旦", type: "holiday" },
  "2025-01-28": { name: "春节", type: "holiday" },
  "2025-01-29": { name: "春节", type: "holiday" },
  "2025-01-30": { name: "春节", type: "holiday" },
  "2025-01-31": { name: "春节", type: "holiday" },
  "2025-02-01": { name: "春节", type: "holiday" },
  "2025-02-02": { name: "春节", type: "holiday" },
  "2025-02-03": { name: "春节", type: "holiday" },
  "2025-02-04": { name: "春节", type: "holiday" },
  "2025-04-04": { name: "清明节", type: "holiday" },
  "2025-04-05": { name: "清明节", type: "holiday" },
  "2025-04-06": { name: "清明节", type: "holiday" },
  "2025-05-01": { name: "劳动节", type: "holiday" },
  "2025-05-02": { name: "劳动节", type: "holiday" },
  "2025-05-03": { name: "劳动节", type: "holiday" },
  "2025-05-04": { name: "劳动节", type: "holiday" },
  "2025-05-05": { name: "劳动节", type: "holiday" },
  "2025-05-31": { name: "端午节", type: "holiday" },
  "2025-06-01": { name: "端午节", type: "holiday" },
  "2025-06-02": { name: "端午节", type: "holiday" },
  "2025-10-01": { name: "国庆/中秋节", type: "holiday" },
  "2025-10-02": { name: "国庆/中秋节", type: "holiday" },
  "2025-10-03": { name: "国庆/中秋节", type: "holiday" },
  "2025-10-04": { name: "国庆/中秋节", type: "holiday" },
  "2025-10-05": { name: "国庆/中秋节", type: "holiday" },
  "2025-10-06": { name: "国庆/中秋节", type: "holiday" },
  "2025-10-07": { name: "国庆/中秋节", type: "holiday" },
  "2025-10-08": { name: "国庆/中秋节", type: "holiday" }
}

export const WORKDAYS: Record<string, WorkDay> = {
  "2025-01-26": { name: "调休工作日", type: "workday" },
  "2025-02-08": { name: "调休工作日", type: "workday" },
  "2025-09-28": { name: "调休工作日", type: "workday" },
  "2025-10-11": { name: "调休工作日", type: "workday" }
}
