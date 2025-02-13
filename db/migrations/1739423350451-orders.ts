import { MigrationInterface, QueryRunner } from "typeorm";

export class Orders1739423350451 implements MigrationInterface {
    name = 'Orders1739423350451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "orderId" integer, "groceryId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_4bd8ee793841d16f471b3dfb3a8" FOREIGN KEY ("groceryId") REFERENCES "groceries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_4bd8ee793841d16f471b3dfb3a8"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
    }

}
