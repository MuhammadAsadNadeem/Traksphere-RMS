import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1736784958710 implements MigrationInterface {
    name = 'Sync1736784958710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_47249ee24dfcc5ecd29efba9612" UNIQUE ("registrationNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_47249ee24dfcc5ecd29efba9612"`);
    }

}
