import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserAtt1680902907467 implements MigrationInterface {
    name = 'ChangeUserAtt1680902907467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(25) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
    }

}
