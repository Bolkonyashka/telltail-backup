import {Request, Response} from 'express';

import Scene from '../models/scene';
import {IScenePageData} from '../types';

export async function sceneById(_req: Request, res: Response) {
    const sceneId = _req.params.sceneid;
    const scene = await Scene.findById(Number(sceneId));

    const {meta, staticBasePath, title} = res.locals;

    if (scene) {
        const adventureFirstSceneID = scene.adventure.firstSceneId;
        const textPosition = scene.position || 'left-up';
        const data: IScenePageData = {
            adventureFirstSceneID,
            meta,
            scene,
            staticBasePath,
            textPosition,
            title
        };

        res.render('scene', data);
    } else {
        res.sendStatus(404);
    }
}
