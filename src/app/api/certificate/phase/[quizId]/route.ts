import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { getCurrentAcademySession } from '@/lib/auth/academy-session';
import prisma from '@/lib/prisma';

function getCertificateUrl(description: string | null) {
  const match = description?.match(/(?:^|\n)Certificat:\s*([^\n]+)/);
  return match?.[1]?.trim() || null;
}

function getTemplatePath(certificateUrl: string) {
  const pathname = new URL(certificateUrl, 'https://resetclub.ma').pathname;

  if (!pathname.startsWith('/pdf/')) {
    throw new Error('Invalid certificate template path');
  }

  const publicDir = path.join(process.cwd(), 'public');
  const filePath = path.normalize(path.join(publicDir, decodeURIComponent(pathname)));

  if (!filePath.startsWith(path.join(publicDir, 'pdf'))) {
    throw new Error('Invalid certificate template path');
  }

  return filePath;
}

function formatFrenchDate(date: Date) {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getSafeFilename(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, '_');
}

// GET /api/certificate/phase/[quizId] - Generate a personalized phase certificate PDF
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const session = await getCurrentAcademySession(request);
    if (!session.ok) {
      return NextResponse.json({ error: session.error }, { status: session.status });
    }

    const { quizId } = await params;
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        module: {
          select: {
            title: true,
            formationId: true,
          },
        },
      },
    });

    if (!quiz?.module) {
      return NextResponse.json({ error: 'Quiz non trouvé' }, { status: 404 });
    }

    const certificateUrl = getCertificateUrl(quiz.description);
    if (!certificateUrl) {
      return NextResponse.json({ error: 'Certificat non disponible pour ce module' }, { status: 404 });
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_formationId: {
          userId: session.user.id,
          formationId: quiz.module.formationId,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Vous n\'êtes pas inscrit à cette formation' },
        { status: 403 }
      );
    }

    const passedAttempt = await prisma.quizAttempt.findFirst({
      where: {
        userId: session.user.id,
        quizId,
        enrollmentId: enrollment.id,
        passed: true,
        completedAt: { not: null },
      },
      orderBy: { completedAt: 'desc' },
    });

    if (!passedAttempt?.completedAt) {
      return NextResponse.json(
        { error: 'Vous devez réussir le quiz pour obtenir ce certificat' },
        { status: 403 }
      );
    }

    const templatePath = getTemplatePath(certificateUrl);
    const existingPdfBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const page = pages[pages.length - 1];
    const { width } = page.getSize();
    const nameFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const dateFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const fullName =
      session.user.firstName && session.user.lastName
        ? `${session.user.firstName} ${session.user.lastName}`.toUpperCase()
        : session.user.email.toUpperCase();
    const dateStr = formatFrenchDate(passedAttempt.completedAt);
    const nameSize = fullName.length > 32 ? 18 : 22;
    const nameWidth = nameFont.widthOfTextAtSize(fullName, nameSize);

    page.drawText(fullName, {
      x: (width - nameWidth) / 2,
      y: 338,
      size: nameSize,
      font: nameFont,
      color: rgb(0.18, 0.18, 0.18),
    });

    page.drawText(dateStr, {
      x: 658,
      y: 58,
      size: 10,
      font: dateFont,
      color: rgb(0.18, 0.18, 0.18),
    });

    const pdfBytes = await pdfDoc.save();
    const safeName = getSafeFilename(fullName);

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificat_Phase_ResetClub_${safeName}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error generating phase certificate:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du certificat' },
      { status: 500 }
    );
  }
}
