import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import prisma from '@/lib/prisma';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { getFormationProgress, syncFormationProgress } from '@/lib/academy/progress';

// GET /api/certificate/[formationId] — Generate personalized certificate PDF
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ formationId: string }> }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    const { formationId } = await params;

    // Get user info
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { firstName: true, lastName: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_formationId: {
          userId: payload.userId,
          formationId,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Vous n\'êtes pas inscrit à cette formation' },
        { status: 403 }
      );
    }

    await syncFormationProgress(payload.userId, formationId);
    const progress = await getFormationProgress(payload.userId, formationId);

    if (!progress) {
      return NextResponse.json({ error: 'Formation non trouvée' }, { status: 404 });
    }

    if (!progress.isComplete) {
      return NextResponse.json(
        { error: 'Vous devez compléter toutes les leçons et tous les quiz pour obtenir le certificat' },
        { status: 403 }
      );
    }

    // Load the PDF template
    const pdfPath = path.join(process.cwd(), 'public', 'pdf', 'CERTIFICAT-E-LEARNING.pdf');
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the first page
    const pages = pdfDoc.getPages();
    const page = pages[0];
    const { width } = page.getSize();
    // width ≈ 841.89, height ≈ 595.276 (A4 landscape)

    // Embed fonts
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Build user full name
    const fullName =
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`.toUpperCase()
        : user.email.toUpperCase();

    // Completion date
    const completionDate = enrollment.completionDate || new Date();
    const dateStr = completionDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // ── Name — centered on the signature line ──
    // The line is approximately at y=320 from bottom (PDF coords are bottom-left origin)
    const nameWidth = timesRomanBold.widthOfTextAtSize(fullName, 22);
    page.drawText(fullName, {
      x: (width - nameWidth) / 2,
      y: 295,
      size: 22,
      font: timesRomanBold,
      color: rgb(0.18, 0.18, 0.18),
    });

    // ── Date — right side, next to "Date :" ──
    // "Date :" text is at approximately x=630, y=120 from bottom
    page.drawText(dateStr, {
      x: 658,
      y: 118,
      size: 10,
      font: helvetica,
      color: rgb(0.18, 0.18, 0.18),
    });

    // Serialize the modified PDF
    const pdfBytes = await pdfDoc.save();

    // Return as downloadable PDF
    const safeName = fullName.replace(/[^a-zA-Z0-9]/g, '_');
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificat_ResetClub_${safeName}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json({ error: 'Erreur lors de la génération du certificat' }, { status: 500 });
  }
}
