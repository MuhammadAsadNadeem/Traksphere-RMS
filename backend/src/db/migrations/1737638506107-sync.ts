import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737638506107 implements MigrationInterface {
    name = 'Sync1737638506107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bus_stop" ADD "routesId" uuid`);
        await queryRunner.query(`ALTER TABLE "bus_stop" ADD CONSTRAINT "FK_4e92b1a4bf6732bc580d4d85f84" FOREIGN KEY ("routesId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bus_stop" DROP CONSTRAINT "FK_4e92b1a4bf6732bc580d4d85f84"`);
        await queryRunner.query(`ALTER TABLE "bus_stop" DROP COLUMN "routesId"`);
    }

}
