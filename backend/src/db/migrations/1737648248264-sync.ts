import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737648248264 implements MigrationInterface {
    name = 'Sync1737648248264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_c1310391be01ff2e8a4ca461325"`);
        await queryRunner.query(`ALTER TABLE "route" RENAME COLUMN "driver_id" TO "bus_stop_id"`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_d9c96a6569539f9f0859836121c" FOREIGN KEY ("bus_stop_id") REFERENCES "bus_stop"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_d9c96a6569539f9f0859836121c"`);
        await queryRunner.query(`ALTER TABLE "route" RENAME COLUMN "bus_stop_id" TO "driver_id"`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_c1310391be01ff2e8a4ca461325" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
