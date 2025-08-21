
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

// GET /api/projects  -> list all projects (newest first)
export async function GET() {
  const rows = await prisma.project.findMany({
    orderBy: { updatedAt: 'desc' },
  });
  return NextResponse.json(rows);
}

// POST /api/projects -> create one
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (!body?.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }
  const created = await prisma.project.create({
    data: {
      title: body.title,
      subtitle: body.subtitle ?? null,
      summary: body.summary ?? null,
      imageUrl: body.imageUrl ?? null,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
