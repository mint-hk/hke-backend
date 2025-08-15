import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, allowNull: false })
  declare login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column(DataType.STRING)
  declare refreshHash: string | null;

  @Column({ type: DataType.STRING, allowNull: false })
  declare displayName: string;
}
