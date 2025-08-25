import MenuDisplay from '@/components/menu/MenuDisplay'
import { prisma } from '@/lib/prisma'

async function getMenuData() {
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
    return categories
  } catch (error) {
    console.error('Error fetching menu data:', error)
    return []
  }
}

export default async function MenuPage() {
  const categories = await getMenuData()

  return (
    <div className="min-h-screen bg-doner-white">
      <div className="bg-gradient-to-br from-doner-red to-doner-vermillion py-16">
        <h1 className="font-bronco text-5xl text-center text-white">OUR MENU</h1>
      </div>
      <MenuDisplay categories={categories} />
    </div>
  )
}