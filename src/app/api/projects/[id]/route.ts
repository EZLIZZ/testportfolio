import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

// GET /api/projects/:id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const row = await prisma.project.findUnique({ where: { id: params.id } });
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(row);
}

// PUT /api/projects/:id  
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => ({}));
  // if title is provided, it must be a non-empty string
  if ('title' in body && (!body.title || typeof body.title !== 'string')) {
    return NextResponse.json({ error: 'title must be a non-empty string' }, { status: 400 });
  }
  const updated = await prisma.project.update({
    where: { id: params.id },
    data: {
      title: body.title ?? undefined,
      subtitle: body.subtitle ?? undefined,
      summary: body.summary ?? undefined,
      imageUrl: body.imageUrl ?? undefined,
    },
  }).catch(() => null);

  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE /api/projects/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.project.delete({ where: { id: params.id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
