import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAcademySession } from '@/lib/auth/academy-session';
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
    const session = await getCurrentAcademySession(request);
    if (!session.ok) {
      return NextResponse.json({ error: session.error }, { status: session.status });
    }

    const { formationId } = await params;
    const user = session.user;

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_formationId: {
          userId: user.id,
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

    await syncFormationProgress(user.id, formationId);
    const progress = await getFormationProgress(user.id, formationId);

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

    const pages = pdfDoc.getPages();
    const page = pages[pages.length - 1];
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

    // Place values on the existing template lines without editing the source PDF.
    const nameSize = fullName.length > 32 ? 18 : 22;
    const dateSize = 10;
    const nameWidth = timesRomanBold.widthOfTextAtSize(fullName, nameSize);
    const dateWidth = helvetica.widthOfTextAtSize(dateStr, dateSize);
    page.drawText(fullName, {
      x: (width - nameWidth) / 2,
      y: 288,
      size: nameSize,
      font: timesRomanBold,
      color: rgb(0.18, 0.18, 0.18),
    });

    page.drawText(dateStr, {
      x: 690 - dateWidth / 2,
      y: 92,
      size: dateSize,
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
