import createDefaultConfig from './config';
import getEnv from './env';
import Main from './main';

const env = getEnv();
const config = createDefaultConfig();
const main = new Main(env, config);

main.init();
