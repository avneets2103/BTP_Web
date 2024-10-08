import { GraphSchema } from "@/Interfaces";

export const HealthGraphs: GraphSchema[] = [
  {
    id: "graph-1",
    name: "Blood Pressure",
    data: [
      { date: "2022-01-01", value: 120 },
      { date: "2022-01-02", value: 125 },
      { date: "2022-01-03", value: 118 },
      { date: "2022-01-04", value: 122 },
      { date: "2022-01-05", value: 128 },
      { date: "2022-01-06", value: 126 },
      { date: "2022-01-07", value: 130 },
      { date: "2022-01-08", value: 124 },
      { date: "2022-01-09", value: 121 },
      { date: "2022-01-10", value: 129 },
      { date: "2022-01-11", value: 123 },
      { date: "2022-01-12", value: 127 },
    ],
    description: "Patient's blood pressure readings over the past two weeks",
  },
  {
    id: "graph-2",
    name: "Heart Rate",
    data: [
      { date: "2022-01-01", value: 80 },
      { date: "2022-01-02", value: 85 },
      { date: "2022-01-03", value: 78 },
      { date: "2022-01-04", value: 82 },
      { date: "2022-01-05", value: 88 },
      { date: "2022-01-06", value: 84 },
      { date: "2022-01-07", value: 90 },
      { date: "2022-01-08", value: 87 },
      { date: "2022-01-09", value: 80 },
      { date: "2022-01-10", value: 83 },
      { date: "2022-01-11", value: 85 },
      { date: "2022-01-12", value: 82 },
      { date: "2022-02-05", value: 88 },
      { date: "2022-07-06", value: 84 },
      { date: "2022-09-07", value: 90 },
      { date: "2022-01-08", value: 87 },
      { date: "2022-12-09", value: 80 },
      { date: "2022-05-12", value: 83 },
      { date: "2022-08-11", value: 85 },
      { date: "2022-11-12", value: 82 },
    ],
    description: "Patient's heart rate readings over the past two weeks",
  },
  {
    id: "graph-3",
    name: "Body Temperature",
    data: [
      { date: "2022-01-01", value: 98.6 },
      { date: "2022-01-02", value: 99.2 },
      { date: "2022-01-03", value: 98.2 },
      { date: "2022-01-04", value: 99.5 },
      { date: "2022-01-05", value: 98.8 },
      { date: "2022-01-06", value: 98.9 },
      { date: "2022-01-07", value: 99.1 },
      { date: "2022-01-08", value: 99.3 },
      { date: "2022-01-09", value: 98.4 },
      { date: "2022-01-10", value: 99.0 },
      { date: "2022-01-11", value: 98.7 },
      { date: "2022-01-12", value: 98.5 },
    ],
    description: "Patient's body temperature readings over the past two weeks",
  },
  {
    id: "graph-4",
    name: "Oxygen Saturation",
    data: [
      { date: "2022-01-01", value: 97 },
      { date: "2022-01-02", value: 96 },
      { date: "2022-01-03", value: 98 },
      { date: "2022-01-04", value: 97 },
      { date: "2022-01-05", value: 95 },
      { date: "2022-01-06", value: 96 },
      { date: "2022-01-07", value: 98 },
      { date: "2022-01-08", value: 97 },
      { date: "2022-01-09", value: 99 },
      { date: "2022-01-10", value: 98 },
      { date: "2022-01-11", value: 97 },
      { date: "2022-01-12", value: 96 },
    ],
    description: "Patient's oxygen saturation levels over the past two weeks",
  },
  {
    id: "graph-5",
    name: "Respiratory Rate",
    data: [
      { date: "2022-01-01", value: 16 },
      { date: "2022-01-02", value: 18 },
      { date: "2022-01-03", value: 17 },
      { date: "2022-01-04", value: 19 },
      { date: "2022-01-05", value: 16 },
      { date: "2022-01-06", value: 18 },
      { date: "2022-01-07", value: 17 },
      { date: "2022-01-08", value: 19 },
      { date: "2022-01-09", value: 18 },
      { date: "2022-01-10", value: 17 },
      { date: "2022-01-11", value: 16 },
      { date: "2022-01-12", value: 18 },
    ],
    description: "Patient's respiratory rate readings over the past two weeks",
  },
];
