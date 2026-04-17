import { NextResponse } from 'next/server';

const API_KEY = 'AIzaSyCOwQ3p3TqilNzPEDWWcMGaOUuARD_be0k'; 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const folderId = searchParams.get('folderId');

  if (!folderId) return NextResponse.json({ error: 'Folder ID required' }, { status: 400 });

  try {
    // This query strictly looks for images WHERE the folderId is a direct parent
    const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)&key=${API_KEY}`;
    
    const res = await fetch(url);
    const data = await res.json();

    // If no files are found, data.files will be empty
    const images = (data.files || []).map(file => 
      `https://lh3.googleusercontent.com/u/0/d/${file.id}`
    );

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}