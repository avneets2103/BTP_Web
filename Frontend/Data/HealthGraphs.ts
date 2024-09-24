import { GraphSchema } from "@/Interfaces";

export const HealthGraphs: GraphSchema[] = [
    {
        id: "graph-1",
        name: "Patient's Blood Pressure",
        data: [
          { date: "2022-01-01", value: 120 },
          { date: "2022-01-02", value: 125 },
          { date: "2022-01-03", value: 118 },
          { date: "2022-01-04", value: 122 },
          { date: "2022-01-05", value: 128 },
        ],
        description: "Patient's blood pressure readings over the past week",
      },
      {
        id: "graph-2",
        name: "Patient's Heart Rate",
        data: [
          { date: "2022-01-01", value: 80 },
          { date: "2022-01-02", value: 85 },
          { date: "2022-01-03", value: 78 },
          { date: "2022-01-04", value: 82 },
          { date: "2022-01-05", value: 88 },
        ],
        description: "Patient's heart rate readings over the past week",
      },
      {
        id: "graph-3",
        name: "Patient's Body Temperature",
        data: [
          { date: "2022-01-01", value: 98.6 },
          { date: "2022-01-02", value: 99.2 },
          { date: "2022-01-03", value: 98.2 },
          { date: "2022-01-04", value: 99.5 },
          { date: "2022-01-05", value: 98.8 },
        ],
        description: "Patient's body temperature readings over the past week",
      },
];