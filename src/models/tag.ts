import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import Adventure from './adventure';
import TagAdventure from './tagAdventure';

@Table({
    tableName: 'tags'
})
class Tag extends Model<Tag> {
    static async getRuTagName(tagNameEn: string) {
        const tag = await Tag.findOne({where: {nameEn: tagNameEn}});
        return tag ? tag.nameRu : null;
    }

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    nameRu: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    nameEn: string;

    @BelongsToMany(() => Adventure, () => TagAdventure)
    adventures: Adventure[];
}

export default Tag;
