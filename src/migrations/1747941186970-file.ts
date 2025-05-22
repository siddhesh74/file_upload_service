import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class File1747941186970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "file_status_enum" AS ENUM ('uploaded', 'processing', 'processed', 'failed')`);
    await queryRunner.createTable(
      new Table({
        name: "file",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "originalName",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "storedName",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "path",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "size",
            type: "int",
            isNullable: false,
          },
          {
            name: "mimeType",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "status",
            type: "file_status_enum",
            default: "'uploaded'",
          },
          {
            name: "uploadedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("file");
    await queryRunner.query(`DROP TYPE "file_status_enum"`);
  }
}
