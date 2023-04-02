import * as dotenv from 'dotenv';
import { Env, NodeEnv } from './main/types';

export default function getEnv(): Env {
  dotenv.config();

  return {
    nodeEnv: (process.env.NODE_ENV ?? NodeEnv.DEVELOPMENT) as NodeEnv,
    rendererDevUrl: `http://localhost:${parseInt(
      process.env.VITE_PORT ?? '5173'
    )}`,
  };
}
