import axios from "axios";
import { IBarChartData, IDoughnutChartData } from "./interfaces";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getStatePaths = async () =>
  await API.get<string[]>("/links?type=state").then((res) => res.data);

export const getAreaPaths = async () =>
  await API.get<string[]>("/links?type=area").then((res) => res.data);

export const getGeojson = async (area: string) =>
  await API.get<any>(`/geo?area=${area}`).then((res) => res.data);

type GetSnapshotReq = {
  state: string;
  district?: string;
  parliamen?: string;
  dun?: string;
};

export const getSnapshot = async ({
  state,
  district,
  parliamen,
  dun,
}: GetSnapshotReq) =>
  await API.get<{
    doughnut_charts: { [key: string]: IDoughnutChartData[] }[];
    pyramid_charts: IBarChartData[];
  }>("/snapshot", {
    params: {
      state,
      ...(district && { district }),
      ...(parliamen && { parliamen }),
      ...(dun && { dun }),
    },
  }).then((res) => {
    const new_doughnut_charts: { [key: string]: IDoughnutChartData[] } = {};
    res.data.doughnut_charts.forEach((chart) => {
      Object.entries(chart).forEach(([key, value]) => {
        new_doughnut_charts[key] = value;
      });
    });

    return { ...res.data, doughnut_charts: new_doughnut_charts };
  });
