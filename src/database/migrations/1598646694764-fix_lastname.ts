import {MigrationInterface, QueryRunner} from "typeorm";

export class fixLastname1598646694764 implements MigrationInterface {
    name = 'fixLastname1598646694764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" SET NOT NULL`);
    }

}
