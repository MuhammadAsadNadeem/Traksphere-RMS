import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1734225759870 implements MigrationInterface {
    name = 'Sync1734225759870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "busNumber"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "busNumber" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "busNumber"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "busNumber" integer`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" integer`);
    }

}
