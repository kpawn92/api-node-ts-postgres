import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserLengthPassword1680901944885 implements MigrationInterface {
    name = 'ChangeUserLengthPassword1680901944885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(30) NOT NULL`);
    }

}
