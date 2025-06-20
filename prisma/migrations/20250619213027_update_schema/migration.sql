/*
  Warnings:

  - You are about to drop the column `assento` on the `Ingresso` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Sala` table. All the data in the column will be lost.
  - You are about to drop the column `dataHora` on the `Sessao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filmeId,salaId,data,horario]` on the table `Sessao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `valorTotal` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Sala` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Sessao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `Sessao` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ingresso_sessaoId_assento_key";

-- DropIndex
DROP INDEX "Sessao_filmeId_salaId_dataHora_key";

-- AlterTable
ALTER TABLE "Ingresso" DROP COLUMN "assento",
ADD COLUMN     "quantidade" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "tipoIngresso" "TipoIngresso" NOT NULL DEFAULT 'INTEIRA',
ADD COLUMN     "valorTotal" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "Sala" DROP COLUMN "descricao",
ADD COLUMN     "tipo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sessao" DROP COLUMN "dataHora",
ADD COLUMN     "data" DATE NOT NULL,
ADD COLUMN     "horario" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sessao_filmeId_salaId_data_horario_key" ON "Sessao"("filmeId", "salaId", "data", "horario");
