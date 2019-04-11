import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import Scene from './scene';
import Tag from './tag';
import TagAdventure from './tagAdventure';

@Table({
    tableName: 'adventures'
})
class Adventure extends Model<Adventure> {
    static async findAllAdventures() {
        const adventures = await Adventure.findAll({include: [{all: true}]});

        return adventures.filter(adv => adv.firstSceneId);
    }

    static async findAdventuresByTag(tagName: string) {
        const adventures = await Adventure.findAllAdventures();

        return adventures.filter(adv => {
            return adv.tags.some((tag => tag.nameEn === tagName));
        });
    }

    defaultImage: string = 'https://img.fireden.net/v/image/1459/66/1459665945586.jpg';

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    description: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    image: string;

    @ForeignKey(() => Scene)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    firstSceneId: number;

    @HasMany(() => Scene)
    scenes: Scene[];

    @BelongsTo(() => Scene, {foreignKey: 'firstSceneId', constraints: false})
    firstScene: Scene;

    @BelongsToMany(() => Tag, () => TagAdventure)
    tags: Tag[];

    async addTags(tags: Tag[]) {
        for (const tag of tags) {
            TagAdventure.findOrCreate({ // Await
                where: {
                    adventureId: this.id,
                    tagId: tag.id
                },
                defaults: {
                    adventureId: this.id,
                    tagId: tag.id
                }
            });
        }
    }

    async addScene({description, image, position}: { description?: string, image?: string, position?: string}) {
        const scene = await Scene.create({
            description,
            image,
            position,
            adventureId: this.id
        });

        if (!this.firstSceneId) {
            this.setFirstScene(scene);
        }

        return scene;
    }

    async setFirstScene(scene: Scene) {
        this.firstSceneId = scene.id;
        await this.save();
    }
}

export default Adventure;
