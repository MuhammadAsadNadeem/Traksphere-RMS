import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1737764592763 implements MigrationInterface {
    name = 'Sync1737764592763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "UQ_f1ecfaee7fb49933cfb8157a063"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "UQ_f1ecfaee7fb49933cfb8157a063" UNIQUE ("routeNumber")`);
    }

}
