import createDefaultConfig from './config';
import { ensureAppDB } from './db';
import getEnv from './env';
import Main from './main';
import { registerMainHandlers } from './main/handlers';

const env = getEnv();
const config = createDefaultConfig();
const main = new Main(env, config);

main.init(registerMainHandlers, ensureAppDB);
