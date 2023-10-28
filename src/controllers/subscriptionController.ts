import { Request, Response } from 'express';

import {ws, createWS} from '../websockets/websocket';

const postSub = async (req: Request, res: Response): Promise<void> => {
  try {
    const coin: string = req.body.coin;
    if (typeof coin === 'string' && coin !== null) {
      const subscription = `${coin.toLowerCase()}usdt@trade`;
      if (ws === undefined) {
        await createWS(subscription);
      } else {
        ws.send(JSON.stringify({ method: 'SUBSCRIBE', params: [subscription], id: 1 }));
      }
      res.status(201).json({ message: 'Subscription created successfully' });
    } else {
      res.status(400).json({ error: 'Invalid or missing input data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteSub = async (req: Request, res: Response): Promise<void> => {
  try {
    const coin = String(req.params.name);
    if (typeof coin === 'string' && coin !== null) {
      if(ws === undefined){
        console.error('WebSocket connection is not available.');
        res.status(500).json({ error: 'WebSocket connection is not available' });
        return;
      }
      const subscription = `${coin.toLowerCase()}usdt@trade`;
      ws.send(JSON.stringify({ method: 'UNSUBSCRIBE', params: [subscription], id: 312 }))
      res.status(204).send();
    } else {
      res.status(400).json({ error: 'Invalid or missing input data' });
    }
  } catch(error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {postSub, deleteSub}