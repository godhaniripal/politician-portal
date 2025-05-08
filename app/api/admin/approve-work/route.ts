import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Work from '@/model/work';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();
    const { id, adminUsername } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Work ID is required' },
        { status: 400 }
      );
    }

    const db = await connectToDB();
    const workCollection = db.connection.collection('works');
    const rawWork = await workCollection.findOne({ _id: new (mongoose as any).Types.ObjectId(id) });

    if (!rawWork) {
      return NextResponse.json(
        { error: 'Work not found' },
        { status: 404 }
      );
    }

    const updateData: any = {
      isApproved: true,
      approvedAt: new Date(),
      approvedBy: adminUsername
    };

    if (!rawWork.politicianName) {
      updateData.politicianName = "Unknown Politician";
    }

    if (!rawWork.constituency) {
      updateData.constituency = "Unknown Constituency";
    }

    await workCollection.updateOne(
      { _id: rawWork._id },
      { $set: updateData }
    );

    const updatedWork = await workCollection.findOne({ _id: rawWork._id });

    return NextResponse.json({ success: true, work: updatedWork });
  } catch (error) {
    console.error('[APPROVE_WORK_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to approve work' },
      { status: 500 }
    );
  }
}