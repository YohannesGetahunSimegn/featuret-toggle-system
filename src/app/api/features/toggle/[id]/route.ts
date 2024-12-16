import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Parse the request body to get the updated state
    const { isEnabled } = await request.json();

    // Update the feature toggle in the database
    const updatedToggle = await prisma.featureToggle.update({
      where: { id: parseInt(params.id) },
      data: { isEnabled },
    });

    // Log the action in the AuditLog table
    await prisma.auditLog.create({
      data: {
        featureId: updatedToggle.id,
        action: isEnabled ? "Enabled" : "Disabled",
      },
    });

    // Return the updated toggle as the response
    return NextResponse.json(updatedToggle);
  } catch (error) {
    console.error("Error updating toggle or logging audit:", error);
    return NextResponse.json(
      { error: "Failed to update toggle or log audit" },
      { status: 500 }
    );
  }
}
