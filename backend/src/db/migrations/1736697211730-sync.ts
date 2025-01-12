import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1736697211730 implements MigrationInterface {
    name = 'Sync1736697211730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "data" TO "profile_image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "profile_image" TO "data"`);
    }

}
