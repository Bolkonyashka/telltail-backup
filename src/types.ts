import Adventure from './models/adventure';
import Scene from './models/scene';

export interface IPageMeta {
    charset: string;
    description: string;
}

export interface IMainPageData {
    meta: IPageMeta;
    tagName?: string;
    adventures: Adventure[];
    title: string;
    staticBasePath: string;
}

export interface IScenePageData {
    meta: IPageMeta;
    scene: Scene;
    adventureFirstSceneID: number;
    textPosition: string;
    title: string;
    staticBasePath: string;
}
