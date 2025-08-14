import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', paranoid: true })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column
  login: string;

  @Column
  password: string;

  @Column({ allowNull: true })
  refreshHash: string;

  @Column
  displayName: string;
}
