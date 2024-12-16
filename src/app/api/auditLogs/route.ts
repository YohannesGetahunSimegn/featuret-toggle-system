import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all audit logs
    const auditLogs = await prisma.auditLog.findMany({
      orderBy: {
        timestamp: "desc", // Sort logs by timestamp (most recent first)
      },
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch audit logs: ${error}` },
      { status: 500 }
    );
  }
}
