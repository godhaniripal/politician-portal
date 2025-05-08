import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Work from '@/model/work';

export async function GET(request: Request) {
  try {
    await connectToDB();
    
    const works = await Work.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(works);
  } catch (error) {
    console.error('[ADMIN_GET_WORKS_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch works' },
      { status: 500 }
    );
  }
}