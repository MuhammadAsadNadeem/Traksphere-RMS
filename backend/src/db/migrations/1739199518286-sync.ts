import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1739199518286 implements MigrationInterface {
    name = 'Sync1739199518286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driver" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "phoneNumber" character varying, "cnicNumber" character varying NOT NULL, CONSTRAINT "UQ_077d41cbc293c3efe9dbe480648" UNIQUE ("cnicNumber"), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bus_stop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stopName" character varying(255) NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, CONSTRAINT "PK_52b2402e9c73fbc734fa960935a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "route" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "routeName" character varying NOT NULL, "routeNumber" character varying NOT NULL, "vehicleNumber" character varying NOT NULL, "driverId" uuid, CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying, "registrationNumber" character varying, "departmentName" character varying, "gender" character varying, "phoneNumber" character varying, "routeNumber" character varying, "stopArea" character varying, "isSuperUser" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "route_bus_stops_bus_stop" ("routeId" uuid NOT NULL, "busStopId" uuid NOT NULL, CONSTRAINT "PK_4108c4c31b9096f43bb4a1f8107" PRIMARY KEY ("routeId", "busStopId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43b31cb56ee17f2524ebb31179" ON "route_bus_stops_bus_stop" ("routeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3cfc07be3e9621a3152f7f2a65" ON "route_bus_stops_bus_stop" ("busStopId") `);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_6d09896c24b59b274026fad9949" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_43b31cb56ee17f2524ebb311797" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655" FOREIGN KEY ("busStopId") REFERENCES "bus_stop"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655"`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_43b31cb56ee17f2524ebb311797"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_6d09896c24b59b274026fad9949"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cfc07be3e9621a3152f7f2a65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_43b31cb56ee17f2524ebb31179"`);
        await queryRunner.query(`DROP TABLE "route_bus_stops_bus_stop"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "route"`);
        await queryRunner.query(`DROP TABLE "bus_stop"`);
        await queryRunner.query(`DROP TABLE "driver"`);
    }

}
