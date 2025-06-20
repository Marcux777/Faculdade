/*
  Warnings:

  - Changed the type of `tipo` on the `Sala` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoSala" AS ENUM ('2D', '3D', 'IMAX');

-- AlterTable
ALTER TABLE "Sala" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoSala" NOT NULL;
