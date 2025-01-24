import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737503114438 implements MigrationInterface {
    name = 'Sync1737503114438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "route_stops_bus_stop" ("routeId" uuid NOT NULL, "busStopId" uuid NOT NULL, CONSTRAINT "PK_c9487ca7a97c83e98daea7aab93" PRIMARY KEY ("routeId", "busStopId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a0563c25321b4908c96ca90c60" ON "route_stops_bus_stop" ("routeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_17c90e3dabd191c4a2cf3d9f1d" ON "route_stops_bus_stop" ("busStopId") `);
        await queryRunner.query(`ALTER TABLE "route_stops_bus_stop" ADD CONSTRAINT "FK_a0563c25321b4908c96ca90c60f" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "route_stops_bus_stop" ADD CONSTRAINT "FK_17c90e3dabd191c4a2cf3d9f1db" FOREIGN KEY ("busStopId") REFERENCES "bus_stop"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_stops_bus_stop" DROP CONSTRAINT "FK_17c90e3dabd191c4a2cf3d9f1db"`);
        await queryRunner.query(`ALTER TABLE "route_stops_bus_stop" DROP CONSTRAINT "FK_a0563c25321b4908c96ca90c60f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17c90e3dabd191c4a2cf3d9f1d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0563c25321b4908c96ca90c60"`);
        await queryRunner.query(`DROP TABLE "route_stops_bus_stop"`);
    }

}
