import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Work from '@/model/work';

export async function GET(request: Request) {
  try {
    await connectToDB();
    
    const achievements = await Work.find({
      isApproved: true
    }).sort({ approvedAt: -1 });
    
    return NextResponse.json(achievements);
  } catch (error) {
    console.error('[GET_ACHIEVEMENTS_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    );
  }
}