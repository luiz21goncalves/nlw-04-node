import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSurveysUsers1614285801985 implements MigrationInterface {
  private table = new Table({
    name: 'surveys_users',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true,
      },
      {
        name: 'user_id',
        type: 'varchar',
      },
      {
        name: 'survey_id',
        type: 'varchar',
      },
      {
        name: 'value',
        type: 'integer',
        isNullable: true,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
    foreignKeys: [
      {
        name: 'FKUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      {
        name: 'FKSurvyes',
        referencedTableName: 'surveys',
        referencedColumnNames: ['id'],
        columnNames: ['survey_id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
