'use server';

import { prisma } from '@/lib/prisma';
import { EventStatus } from '@/generated/prisma/enums';
import type { EventSearchResult } from '@/interfaces/features/events';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

export async function getPublicCategoriesAction(): Promise<CategoryItem[]> {
  try {
    const categories = await prisma.eventCategory.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return categories;
  } catch {
    return [];
  }
}

export async function searchEventsAction(
  query: string,
  limit: number = 6
): Promise<EventSearchResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  try {
    const events = await prisma.event.findMany({
      where: {
        status: EventStatus.PUBLISHED,
        deletedAt: null,
        title: { contains: q, mode: 'insensitive' },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        banner: true,
        startDate: true,
        eventType: true,
      },
      orderBy: { startDate: 'asc' },
      take: Math.min(limit, 10),
    });

    return events.map((e) => ({
      ...e,
      startDate: e.startDate.toISOString(),
    }));
  } catch {
    return [];
  }
}

export async function getPublicGalleriesAction(page: number = 1, limit: number = 8) {
  try {
    const skip = (page - 1) * limit;
    const galleries = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        event: {
          select: { id: true, title: true },
        },
      },
      skip,
      take: limit,
    });

    return galleries.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      featured: item.featured,
      eventId: item.eventId,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      event: item.event,
    }));
  } catch {
    return [];
  }
}
