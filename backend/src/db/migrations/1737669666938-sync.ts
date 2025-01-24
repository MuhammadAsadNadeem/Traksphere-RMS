import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737669666938 implements MigrationInterface {
    name = 'Sync1737669666938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "busStopIds"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" ADD "busStopIds" text array NOT NULL`);
    }

}
