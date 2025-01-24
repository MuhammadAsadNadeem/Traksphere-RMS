import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737668664905 implements MigrationInterface {
    name = 'Sync1737668664905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_d9c96a6569539f9f0859836121c"`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "bus_stop_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" ADD "bus_stop_id" uuid`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_d9c96a6569539f9f0859836121c" FOREIGN KEY ("bus_stop_id") REFERENCES "bus_stop"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
