import WebSocket from 'ws';

import TradeEvent from '../types/TradeEvent';
import { addCoin } from '../services/coinService';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws/';
let ws: WebSocket;

const handleMessage = async (data: WebSocket.Data): Promise<void> => {
  try {
    const stockData: TradeEvent = JSON.parse(data.toString());
      if(stockData.p !== undefined && stockData.s !== undefined) {
        const flag = await addCoin(stockData.s, Number(stockData.p));
      if (!flag) {
        console.log("addCoin returned false for", stockData.s);
      }
    }
  } catch (error) {
    throw error;
  }
};

const createWS = async (subscription: string): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    try {
      ws = new WebSocket(`${BINANCE_WS_URL}${subscription}`);

      ws.on('open', () => {
        resolve(ws);
      });

      ws.on('message', async (data) => {
        await handleMessage(data);
      });

      ws.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export {ws, createWS}