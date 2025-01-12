import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1736697121555 implements MigrationInterface {
    name = 'Sync1736697121555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "data" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "data"`);
    }

}
