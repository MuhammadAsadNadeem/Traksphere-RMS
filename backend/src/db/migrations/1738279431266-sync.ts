import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1738279431266 implements MigrationInterface {
    name = 'Sync1738279431266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655"`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655" FOREIGN KEY ("busStopId") REFERENCES "bus_stop"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655"`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655" FOREIGN KEY ("busStopId") REFERENCES "bus_stop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
