import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import Adventure from './adventure';
import Tag from './tag';

@Table({
    tableName: 'tag_adventure'
})
class TagAdventure extends Model<TagAdventure> {
    @ForeignKey(() => Tag)
    @Column(DataType.INTEGER)
    tagId: number;

    @ForeignKey(() => Adventure)
    @Column(DataType.INTEGER)
    adventureId: number;
}

export default TagAdventure;
