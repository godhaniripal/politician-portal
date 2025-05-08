import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Work from '@/model/work';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, 
      description, 
      location, 
      completionDate, 
      inaugurationDate, 
      category,
      politicianName,
      constituency,
      photoUrl  
    } = body;

    await connectToDB();

    const newWork = new Work({
      title,
      description,
      location,
      completionDate: new Date(completionDate),
      inaugurationDate: inaugurationDate ? new Date(inaugurationDate) : undefined,
      category,
      photoUrl,
      politicianName,
      constituency,
      isApproved: false, 
      createdAt: new Date(),
    });

    await newWork.save();

    return NextResponse.json({ success: true, work: newWork });
  } catch (error) {
    console.error('[SAVE_WORK_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Failed to save work' }, { status: 500 });
  }
}
