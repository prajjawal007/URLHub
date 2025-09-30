import URLHub from "../models/url.model";
import { IURL } from "../models/url.model";
import Core from "../common/index";
const { ApiError, Logger } = Core;
import { connectRedis } from "../config/redis-config";

class CRUDRepository {
  async find(data: any): Promise<IURL | null> {
    try {
      return await URLHub.findOne(data);
    } catch (error) {
      const appError = new ApiError("Error finding URL", 500, [error]);
      Logger.error(appError.message, { error });
      throw appError;
    }
  }

  async create(newURLData: IURL): Promise<IURL> {
    try {
      return await URLHub.create(newURLData);
    } catch (error) {
      const appError = new ApiError("Error creating URL", 500, [error]);
      Logger.error(appError.message, { error });
      throw appError;
    }
  }

  async delete(data: any): Promise<IURL | null> {
    try {
      return await URLHub.findOneAndDelete(data);
    } catch (error) {
      const appError = new ApiError("Error deleting URL", 500, [error]);
      Logger.error(appError.message, { error });
      throw appError;
    }
  }

  async search(regex: any) {
    try {
      return await URLHub.find({
        OriginalUrl: regex,
        ExpiresAt: { $gt: new Date() },
      });
    } catch (error) {
      const appError = new ApiError("Error searching URL", 500, [error]);
      Logger.error(appError.message, { error });
      throw appError;
    }
  }

  async deleteFromRedis(cacheKey: any, Hash: any): Promise<any> {
    try {
      const redisClient = await connectRedis();
      return (await redisClient.del(Hash)) && (await redisClient.del(cacheKey));
    } catch (error) {
      const appError = new ApiError("Failed to delete Redis cache", 500, [
        error,
      ]);
      Logger.error(appError.message, { error });
      throw appError;
    }
  }
}

export default new CRUDRepository();
