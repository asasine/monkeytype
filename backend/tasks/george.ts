import { Queue, QueueScheduler } from "bullmq";
import type IORedis from "ioredis";

const QUEUE_NAME = "george-tasks";

interface GeorgeTask {
  command: string;
  arguments: any[];
}

function buildGeorgeTask(command: string, taskArguments: any[]): GeorgeTask {
  return {
    command,
    arguments: taskArguments,
  };
}

class George {
  jobQueue: Queue;
  jobQueueScheduler: QueueScheduler;

  initJobQueue(redisConnection: IORedis.Redis): void {
    this.jobQueue = new Queue(QUEUE_NAME, {
      connection: redisConnection,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      },
    });

    this.jobQueueScheduler = new QueueScheduler(QUEUE_NAME, {
      connection: redisConnection,
    });
  }

  async updateDiscordRole(discordId: string, wpm: number): Promise<void> {
    const command = "updateRole";
    const updateDiscordRoleTask = buildGeorgeTask(command, [discordId, wpm]);
    await this.jobQueue.add(command, updateDiscordRoleTask);
  }

  async linkDiscord(discordId: string, uid: string): Promise<void> {
    const command = "linkDiscord";
    const linkDiscordTask = buildGeorgeTask(command, [discordId, uid]);
    await this.jobQueue.add(command, linkDiscordTask);
  }

  async unlinkDiscord(discordId: string, uid: string): Promise<void> {
    const command = "unlinkDiscord";
    const unlinkDiscordTask = buildGeorgeTask(command, [discordId, uid]);
    await this.jobQueue.add(command, unlinkDiscordTask);
  }

  async awardChallenge(
    discordId: string,
    challengeName: string
  ): Promise<void> {
    const command = "awardChallenge";
    const awardChallengeTask = buildGeorgeTask(command, [
      discordId,
      challengeName,
    ]);
    await this.jobQueue.add(command, awardChallengeTask);
  }

  async announceLbUpdate(
    newRecords: any[],
    leaderboardId: string
  ): Promise<void> {
    const command = "announceLbUpdate";

    const leaderboardUpdateTasks = newRecords.map((record) => {
      const taskData = buildGeorgeTask(command, [
        record.discordId ?? record.name,
        record.rank,
        leaderboardId,
        record.wpm,
        record.raw,
        record.acc,
        record.consistency,
      ]);

      return {
        name: command,
        data: taskData,
      };
    });

    await this.jobQueue.addBulk(leaderboardUpdateTasks);
  }
}

export default new George();
