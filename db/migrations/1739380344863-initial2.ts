import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial21739380344863 implements MigrationInterface {
    name = 'Initial21739380344863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groceries" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "description" text, "inventory_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addedById" integer, CONSTRAINT "UQ_1f5aeab4b73fecbb7d703234eff" UNIQUE ("name"), CONSTRAINT "PK_b1a5c2972ce5981d9c8ce6ed497" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "groceries" ADD CONSTRAINT "FK_464cf21a4d13f1da87babf202d1" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groceries" DROP CONSTRAINT "FK_464cf21a4d13f1da87babf202d1"`);
        await queryRunner.query(`DROP TABLE "groceries"`);
    }

}
