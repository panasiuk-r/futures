import Coin from '../models/Coin';
import { redis } from '../database/connection';
import redlock from '../database/redlock';

const addCoin = async (name: string, price: number): Promise<boolean> => {
  try {
    const coin = await Coin.create({name, price});
    const lock = await redlock.acquire(["coin"], 5000);
    try {
      await redis.hset(coin.id.toString(), {name, price});
      return true;
    } catch (error){
      throw error;
    } finally {
      lock.release();
    }
  } catch (error){
    throw error
  }
}

export {addCoin}