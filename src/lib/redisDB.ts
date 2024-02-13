import { Redis } from "@upstash/redis";

if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN)
    throw new Error("Connection to REDIS Database failed", { cause: "Missing REDIS_URL or REDIS_TOKEN"  });

const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN
});

export default redis;