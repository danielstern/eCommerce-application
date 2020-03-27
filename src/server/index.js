import './routes';

import { initializeDB  } from './database/utility';
import { DEV_MODE } from './common/config';

if (DEV_MODE) {

    initializeDB();

}
