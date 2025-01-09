import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1733540951247 implements MigrationInterface {
    name = 'Sync1733540951247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fullname" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "registrationNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "departmentName" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "busNumber" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "stopAddress" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "stopAddress"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "busNumber"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "departmentName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "registrationNumber"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    }

}
