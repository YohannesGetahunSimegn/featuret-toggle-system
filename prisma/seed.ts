import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log("Seeding feature toggles...");
    await prisma.featureToggle.createMany({
      data: [
        {
          name: "new-landing-page",
          description: "Enable the new landing page design",
          isEnabled: false,
        },
        {
          name: "dark-mode",
          description: "Enable dark mode support",
          isEnabled: true,
        },
      ],
    });
    console.log("Feature toggles seeded.");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
