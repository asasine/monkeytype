import endpoints from "./endpoints";
import { buildHttpClient } from "./adapters/axios-adapter";
import { envConfig } from "../constants/env-config";
import { buildClient } from "./adapters/ts-rest-adapter";
import { configsContract } from "@monkeytype/contracts/configs";
import { presetsContract } from "@monkeytype/contracts/presets";
import { apeKeysContract } from "@monkeytype/contracts/ape-keys";

const API_PATH = "";
const BASE_URL = envConfig.backendUrl;
const API_URL = `${BASE_URL}${API_PATH}`;

const httpClient = buildHttpClient(API_URL, 10_000);

// API Endpoints
const Ape = {
  users: new endpoints.Users(httpClient),
  configs: buildClient(configsContract, BASE_URL, 10_000),
  results: new endpoints.Results(httpClient),
  psas: new endpoints.Psas(httpClient),
  quotes: new endpoints.Quotes(httpClient),
  leaderboards: new endpoints.Leaderboards(httpClient),
  presets: buildClient(presetsContract, BASE_URL, 10_000),
  publicStats: new endpoints.Public(httpClient),
  apeKeys: buildClient(apeKeysContract, BASE_URL, 10_000),
  configuration: new endpoints.Configuration(httpClient),
  dev: new endpoints.Dev(buildHttpClient(API_URL, 240_000)),
};

export default Ape;
