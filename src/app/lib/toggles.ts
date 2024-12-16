import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function isFeatureEnabled(name: string): Promise<boolean> {
  const feature = await prisma.featureToggle.findUnique({ where: { name } });
  return feature?.isEnabled ?? false;
}
