import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { authenticateAdmin } from '@/lib/auth';

// Mark as dynamic to prevent build-time execution
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Check authentication
  if (!authenticateAdmin(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const service = searchParams.get('service');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'newest';

    const client = await clientPromise;
    const db = client.db('pc-creations');

    let query: any = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (service && service !== 'all') {
      query.service = service;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    let sort: any = {};
    if (sortBy === 'newest') {
      sort.createdAt = -1;
    } else if (sortBy === 'oldest') {
      sort.createdAt = 1;
    }

    const submissions = await db
      .collection('contact_submissions')
      .find(query)
      .sort(sort)
      .toArray();

    // Get status counts
    const counts = await db
      .collection('contact_submissions')
      .aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const statusCounts: Record<string, number> = {
      new: 0,
      contacted: 0,
      in_progress: 0,
      converted: 0,
      closed: 0,
    };

    counts.forEach((count: any) => {
      statusCounts[count._id] = count.count;
    });

    const total = await db.collection('contact_submissions').countDocuments();

    return NextResponse.json(
      {
        success: true,
        submissions,
        counts: statusCounts,
        total,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get enquiries error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
