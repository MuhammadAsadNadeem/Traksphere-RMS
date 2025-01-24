import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737668753961 implements MigrationInterface {
    name = 'Sync1737668753961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" ADD "driver_id" uuid`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_c1310391be01ff2e8a4ca461325" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_c1310391be01ff2e8a4ca461325"`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "driver_id"`);
    }

}
