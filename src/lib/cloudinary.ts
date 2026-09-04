import crypto from 'crypto';

/**
 * Signed Cloudinary uploads over the REST API.
 *
 * Deliberately dependency-free: the official SDK would work too, but keeping
 * this as a plain fetch means nothing extra has to be installed on the server
 * at deploy time.
 */

export interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
  bytes: number;
}

/** Cloudinary signs the alphabetically sorted params, then appends the API secret. */
function signParams(params: Record<string, string>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return crypto.createHash('sha1').update(toSign + apiSecret).digest('hex');
}

/**
 * Credentials come either from the single CLOUDINARY_URL that the Cloudinary
 * dashboard hands you (cloudinary://<api_key>:<api_secret>@<cloud_name>) or
 * from the three variables spelled out separately.
 */
function getCredentials(): { cloudName: string; apiKey: string; apiSecret: string } {
  const url = process.env.CLOUDINARY_URL;

  if (url) {
    const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
    if (!match) {
      throw new Error('CLOUDINARY_URL is malformed: expected cloudinary://<api_key>:<api_secret>@<cloud_name>');
    }
    return { apiKey: match[1], apiSecret: match[2], cloudName: match[3] };
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Cloudinary is not configured: set CLOUDINARY_URL, or CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET'
    );
  }

  return { cloudName, apiKey, apiSecret };
}

/**
 * Uploads a file buffer to Cloudinary.
 *
 * `resourceType` is 'raw' for documents (PDF, DOC, DOCX) — that keeps the
 * original file intact and side-steps the account setting that blocks PDF
 * delivery through the image pipeline. For raw uploads `publicId` must carry
 * the file extension, otherwise the delivered URL has none.
 */
export async function uploadToCloudinary({
  buffer,
  publicId,
  folder,
  resourceType = 'raw',
}: {
  buffer: Buffer;
  publicId: string;
  folder: string;
  resourceType?: 'raw' | 'image' | 'video' | 'auto';
}): Promise<CloudinaryUploadResult> {
  const { cloudName, apiKey, apiSecret } = getCredentials();

  const timestamp = Math.round(Date.now() / 1000).toString();
  const signedParams = { folder, public_id: publicId, timestamp };
  const signature = signParams(signedParams, apiSecret);

  const form = new FormData();
  form.append('file', new Blob([new Uint8Array(buffer)]), publicId);
  form.append('api_key', apiKey);
  form.append('timestamp', timestamp);
  form.append('folder', folder);
  form.append('public_id', publicId);
  form.append('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    { method: 'POST', body: form }
  );

  const result = await response.json();

  if (!response.ok || !result.secure_url) {
    throw new Error(
      `Cloudinary upload failed (${response.status}): ${result?.error?.message ?? 'unknown error'}`
    );
  }

  return {
    secureUrl: result.secure_url as string,
    publicId: result.public_id as string,
    bytes: result.bytes as number,
  };
}
