import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1738971961576 implements MigrationInterface {
    name = 'Sync1738971961576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "isSuperuser" TO "isSuperUser"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "isSuperUser" TO "isSuperuser"`);
    }

}
