import path from 'path';

import {Sequelize} from 'sequelize-typescript';

async function initDataBase({force = false}: { force: boolean }) {
    const sequelize = new Sequelize(
        'postgres://duwoycyz:B85ZuT3YLF05DP3il2wV8YxpEA3wfYTv@balarama.db.elephantsql.com:5432/duwoycyz',
        {
        // ModelPaths: [__dirname + '/models']
            modelPaths: [path.join(__dirname, 'models')]
        }
    );
    await sequelize.sync({force});
}

export default initDataBase;
