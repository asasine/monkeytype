import {
  GetSpeedHistogramQuery,
  GetSpeedHistogramResponse,
  GetTypingStatsResponse,
} from "@monkeytype/contracts/public";
import * as PublicDAL from "../../dal/public";
import { MonkeyResponse, MonkeyResponse2 } from "../../utils/monkey-response";

export async function getSpeedHistogram(
  req: MonkeyTypes.Request2<GetSpeedHistogramQuery>
): Promise<GetSpeedHistogramResponse> {
  console.log("get speed", { q: req.query });
  const { language, mode, mode2 } = req.query;
  const data = await PublicDAL.getSpeedHistogram(language, mode, mode2);
  return new MonkeyResponse2("Public speed histogram retrieved", data);
}

export async function getTypingStats(
  _req: MonkeyTypes.Request2
): Promise<GetTypingStatsResponse> {
  const data = await PublicDAL.getTypingStats();
  return new MonkeyResponse("Public typing stats retrieved", data);
}
