import {Request, Response} from 'express';

import Adventure from '../models/adventure';
import Tag from '../models/tag';
import {IMainPageData} from '../types';

export async function adventuresList(_req: Request, res: Response) {
    const adventures = await Adventure.findAllAdventures();
    const {meta, staticBasePath, title} = res.locals;

    const data: IMainPageData = {
        adventures,
        meta,
        staticBasePath,
        title
    };

    res.render('index', data);
}

export async function listByTag(_req: Request, res: Response) {
    const tagNameEn = _req.params.tagname;
    const tagNameRu = await Tag.getRuTagName(tagNameEn);
    if (tagNameRu) {
        const adventures = await Adventure.findAdventuresByTag(tagNameEn);
        const {meta, staticBasePath, title} = res.locals;

        const data: IMainPageData = {
            adventures,
            meta,
            staticBasePath,
            tagName: tagNameRu,
            title
        };

        res.render('index', data);
    } else {
        res.sendStatus(404);
    }
}
