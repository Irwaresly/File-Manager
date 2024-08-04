import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();

        // Handle errors
        this.client.on('error', (err) => {
            console.error('Redis client error:', err);
        });

        // Optionally, you can handle the connection open event to set the status
        this.client.on('connect', () => {
            console.log('Connected to Redis');
        });

        this.client.on('end', () => {
            console.log('Disconnected from Redis');
        });
    }

    // Check if the Redis client is alive
    isAlive() {
        return this.client.connected;
    }

    // Get a value from Redis
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    console.error('Error getting value:', err);
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }

    // Set a value in Redis with an expiration time (in seconds)
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', duration, (err) => {
                if (err) {
                    console.error('Error setting value:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Delete a value from Redis
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, response) => {
                if (err) {
                    console.error('Error deleting key:', err);
                    reject(err);
                } else {
                    resolve(response === 1); // Returns 1 if key was removed, 0 otherwise
                }
            });
        });
    }
}

const redisClient = new RedisClient();
export default redisClient;



