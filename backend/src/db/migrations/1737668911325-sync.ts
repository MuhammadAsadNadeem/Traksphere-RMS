import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737668911325 implements MigrationInterface {
    name = 'Sync1737668911325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_c1310391be01ff2e8a4ca461325"`);
        await queryRunner.query(`CREATE TABLE "route_bus_stops_bus_stop" ("routeId" uuid NOT NULL, "busStopId" uuid NOT NULL, CONSTRAINT "PK_4108c4c31b9096f43bb4a1f8107" PRIMARY KEY ("routeId", "busStopId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43b31cb56ee17f2524ebb31179" ON "route_bus_stops_bus_stop" ("routeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3cfc07be3e9621a3152f7f2a65" ON "route_bus_stops_bus_stop" ("busStopId") `);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "driver_id"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "busStopIds" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" ADD "driverId" uuid`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_6d09896c24b59b274026fad9949" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_43b31cb56ee17f2524ebb311797" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655" FOREIGN KEY ("busStopId") REFERENCES "bus_stop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655"`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_43b31cb56ee17f2524ebb311797"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_6d09896c24b59b274026fad9949"`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "driverId"`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "busStopIds"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "driver_id" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cfc07be3e9621a3152f7f2a65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_43b31cb56ee17f2524ebb31179"`);
        await queryRunner.query(`DROP TABLE "route_bus_stops_bus_stop"`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_c1310391be01ff2e8a4ca461325" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
