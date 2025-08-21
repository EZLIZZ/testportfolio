// src/app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs'

type RouteCtx = { params: Promise<{ id: string }> }

type ProjectUpdate = {
  title?: string
  subtitle?: string | null
  summary?: string | null
  imageUrl?: string | null
}

// GET /api/projects/:id
export async function GET(_: Request, ctx: RouteCtx) {
  const { id } = await ctx.params
  const row = await prisma.project.findUnique({ where: { id } })
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

// PUT /api/projects/:id
export async function PUT(req: Request, ctx: RouteCtx) {
  const { id } = await ctx.params

  // Parse JSON safely without using `any`
  let parsed: unknown
  try {
    parsed = await req.json()
  } catch {
    parsed = {}
  }

  if (parsed === null || typeof parsed !== 'object') {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const body = parsed as Record<string, unknown>

  // Validate each field and build a typed update object
  const data: ProjectUpdate = {}

  if ('title' in body) {
    if (typeof body.title !== 'string' || body.title.trim() === '') {
      return NextResponse.json(
        { error: 'title must be a non-empty string' },
        { status: 400 }
      )
    }
    data.title = body.title
  }

  if ('subtitle' in body) {
    if (typeof body.subtitle === 'string' || body.subtitle === null) {
      data.subtitle = body.subtitle as string | null
    }
  }

  if ('summary' in body) {
    if (typeof body.summary === 'string' || body.summary === null) {
      data.summary = body.summary as string | null
    }
  }

  if ('imageUrl' in body) {
    if (typeof body.imageUrl === 'string' || body.imageUrl === null) {
      data.imageUrl = body.imageUrl as string | null
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const updated = await prisma.project
    .update({ where: { id }, data })
    .catch(() => null)

  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

// DELETE /api/projects/:id
export async function DELETE(_: Request, ctx: RouteCtx) {
  const { id } = await ctx.params
  await prisma.project.delete({ where: { id } }).catch(() => null)
  return NextResponse.json({ ok: true })
}
