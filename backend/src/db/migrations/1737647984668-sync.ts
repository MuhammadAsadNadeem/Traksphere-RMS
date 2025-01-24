import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737647984668 implements MigrationInterface {
    name = 'Sync1737647984668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "route" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "routeName" character varying NOT NULL, "routeNumber" character varying NOT NULL, "vehicleNumber" character varying NOT NULL, "driver_id" uuid, CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_c1310391be01ff2e8a4ca461325" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_c1310391be01ff2e8a4ca461325"`);
        await queryRunner.query(`DROP TABLE "route"`);
    }

}
