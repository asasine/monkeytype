import { initContract } from "@ts-rest/core";
import { adminContract } from "./admin";
import { apeKeysContract } from "./ape-keys";
import { configsContract } from "./configs";
import { presetsContract } from "./presets";
import { psaContract } from "./psas";
import { publicContract } from "./public";
import { leaderboardsContract } from "./leaderboards";

const c = initContract();

export const contract = c.router({
  admin: adminContract,
  apeKeys: apeKeysContract,
  configs: configsContract,
  presets: presetsContract,
  psas: psaContract,
  public: publicContract,
  leaderboards: leaderboardsContract,
});
