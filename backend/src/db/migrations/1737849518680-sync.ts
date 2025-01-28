import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737849518680 implements MigrationInterface {
    name = 'Sync1737849518680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "route_bus_stops_bus_stop" ("routeId" uuid NOT NULL, "busStopId" uuid NOT NULL, CONSTRAINT "PK_4108c4c31b9096f43bb4a1f8107" PRIMARY KEY ("routeId", "busStopId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43b31cb56ee17f2524ebb31179" ON "route_bus_stops_bus_stop" ("routeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3cfc07be3e9621a3152f7f2a65" ON "route_bus_stops_bus_stop" ("busStopId") `);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_43b31cb56ee17f2524ebb311797" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655" FOREIGN KEY ("busStopId") REFERENCES "bus_stop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655"`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_43b31cb56ee17f2524ebb311797"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cfc07be3e9621a3152f7f2a65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_43b31cb56ee17f2524ebb31179"`);
        await queryRunner.query(`DROP TABLE "route_bus_stops_bus_stop"`);
    }

}
