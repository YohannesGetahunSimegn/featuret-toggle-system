import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log("Seeding feature toggles...");
    await prisma.featureToggle.createMany({
      data: [
        {
          name: "casual_page_test",
          description: "Shows landing page only (test landing page)",
          isEnabled: false,
        },
        {
          name: "chrismass_animation_test",
          description: "Enable Chrismass  (test chrismass animation)",
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
