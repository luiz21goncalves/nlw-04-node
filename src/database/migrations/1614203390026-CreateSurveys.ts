import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSurveys1614203390026 implements MigrationInterface {
  private table = new Table({
    name: 'surveys',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true,
      },
      {
        name: 'title',
        type: 'varchar',
      },
      {
        name: 'description',
        type: 'text',
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
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
