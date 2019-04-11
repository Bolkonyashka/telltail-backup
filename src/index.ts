import path from 'path';

import express, {NextFunction as Next, Request, Response} from 'express';
import hbs from 'hbs';

import config from 'config';
import fillDataBase from './dbFill';
import initDataBase from './dbInit';
import commonData from './middlewares/common-data';
import routes from './routes';

async function rebuildDataBase() {
    await initDataBase({force: true});
    await fillDataBase();
}

function runApp() {
    initDataBase({force: false}).then(() => {
        const app = express();
        const viewsDir = path.join(__dirname, 'views');
        const partialsDir = path.join(viewsDir, 'partials');
        const publicDir = path.join(__dirname, 'public');

        app.set('view engine', 'hbs');

        app.set('views', viewsDir);

        app.use(express.static(publicDir));

        app.use(commonData);

        routes(app);

        app.use((err: Error, _req: Request, res: Response, _next: Next) => {
            console.error(err.stack);

            res.sendStatus(500);
        });

        hbs.registerPartials(partialsDir, () => {
            const port = config.get('port');

            app.listen(port, () => {
                console.info(`Server started on ${port}`);
                console.info(`Open http://localhost:${port}/`);
            });
        });
    });
}

async function run() {
    //await rebuildDataBase();
    await runApp();
}

run();
