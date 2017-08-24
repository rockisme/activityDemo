const Redis = require("ioredis");
const { Store } = require("koa-session2");
const config = require('../config/index');

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis({
            sentinels: config.redis.sentinels,
            name: config.redis.name,
            password:config.redis.password,
            prefix : 'koa',//存诸前缀
            ttl : 0,//过期时间
            db: 0
        });
    }

    async get(sid) {
        let data = await this.redis.get(`SESSION:${sid}`);
        return JSON.parse(data);
    }

    async set(session, { sid =  this.getID(24), maxAge = 1000000 } = {}) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
        } catch (e) {}
        return sid;
    }

    async destroy(sid) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}

module.exports = RedisStore;