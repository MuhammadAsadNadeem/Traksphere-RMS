import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737639557254 implements MigrationInterface {
    name = 'Sync1737639557254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bus_stop" DROP CONSTRAINT "FK_4e92b1a4bf6732bc580d4d85f84"`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_43b31cb56ee17f2524ebb311797"`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655"`);
        await queryRunner.query(`ALTER TABLE "bus_stop" DROP COLUMN "routesId"`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_43b31cb56ee17f2524ebb311797" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655" FOREIGN KEY ("busStopId") REFERENCES "bus_stop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655"`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_43b31cb56ee17f2524ebb311797"`);
        await queryRunner.query(`ALTER TABLE "bus_stop" ADD "routesId" uuid`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655" FOREIGN KEY ("busStopId") REFERENCES "bus_stop"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_43b31cb56ee17f2524ebb311797" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bus_stop" ADD CONSTRAINT "FK_4e92b1a4bf6732bc580d4d85f84" FOREIGN KEY ("routesId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
