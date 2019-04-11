import {Application} from 'express';

import {adventuresList, listByTag} from './controllers/adventures';
import {error404} from './controllers/errors';
import {sceneById} from './controllers/scenes';

export = (app: Application) => {
    app.get('/', adventuresList);

    app.get('/tag/:tagname', listByTag);

    app.get('/scene/:sceneid', sceneById);

    app.all('*', error404);
};
