/**
 * 使用方法
 * var Redis = require('../model/redis');
 * var client = new Redis();
 * (async () => {
 *   let bar = await client.get("foo");
 *   console.log('=== bar ==='+bar);
 * })();
 *
 */
const config = require('../config/index');
const Redis=require('ioredis');

const redis = new Redis({
    sentinels: config.redis.sentinels,
    name: config.redis.name,
    password:config.redis.password,
    prefix : 'koa',//存诸前缀
    ttl : 0,//过期时间
    db: 0
});

class RedisClinet{
    constructor() {
        this.redis = redis
    }

    async get(key) {
        let data = await this.redis.get(key);
        return JSON.parse(data);
    }

    async set(key, value) {
        await this.redis.set(key, JSON.stringify(value));
        return JSON.stringify(value);
    }

    async destroy(key) {
        return await this.redis.del(key);
    }
}

module.exports = RedisClinet;