import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { active: true },
      include: {
        menuItems: {
          where: { active: true },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching menu data:', error)
    return NextResponse.json({ error: 'Failed to fetch menu data' }, { status: 500 })
  }
}