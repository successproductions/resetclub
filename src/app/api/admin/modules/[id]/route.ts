import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/modules/[id] - Get module details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const moduleData = await prisma.module.findUnique({
      where: { id },
      include: {
        _count: {
          select: { lessons: true }
        }
      }
    });

    if (!moduleData) {
      return NextResponse.json(
        { error: 'Module non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ module: moduleData });
  } catch (error) {
    console.error('Error fetching module:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du module' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/modules/[id] - Update module
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, durationMinutes } = body;

    const moduleData = await prisma.module.update({
      where: { id },
      data: {
        title,
        description: description || null,
        durationMinutes: durationMinutes || null
      },
      include: {
        _count: {
          select: { lessons: true }
        }
      }
    });

    return NextResponse.json({ module: moduleData });
  } catch (error) {
    console.error('Error updating module:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du module' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/modules/[id] - Delete module
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.module.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting module:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du module' },
      { status: 500 }
    );
  }
}
