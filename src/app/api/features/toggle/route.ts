import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const toggles = await prisma.featureToggle.findMany();

  return NextResponse.json(toggles);
}
