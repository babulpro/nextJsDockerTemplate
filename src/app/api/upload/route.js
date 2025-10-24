import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = path.extname(originalName);
    const filename = `image_${timestamp}${extension}`;

    // Define upload path
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const filepath = path.join(uploadDir, filename);

    // Ensure directory exists (you might want to create it manually first)
    try {
      await writeFile(filepath, buffer);
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Directory doesn't exist - create it
        const fs = require('fs');
        await fs.promises.mkdir(uploadDir, { recursive: true });
        await writeFile(filepath, buffer);
      } else {
        throw err;
      }
    }

    // Return the public URL
    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' }, 
      { status: 500 }
    );
  }
}