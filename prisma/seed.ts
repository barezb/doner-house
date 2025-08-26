import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@donerhouse.com' },
    update: {},
    create: {
      email: 'admin@donerhouse.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })
  console.log('Created admin user:', admin.email)

  // Create categories
  const categories = [
    { name: 'Doner', icon: 'doner', order: 1 },
    { name: 'Burger', icon: 'burger', order: 2 },
    { name: 'Pizza', icon: 'pizza', order: 3 },
    { name: 'Beverages', icon: 'beverages', order: 4 },
    { name: 'Pasta', icon: 'pasta', order: 5 },
    { name: 'Side Dishes', icon: 'side-dishes', order: 6 },
  ]

  for (const cat of categories) {
    let category = await prisma.category.findFirst({
      where: { name: cat.name }
    })
    
    if (!category) {
      category = await prisma.category.create({
        data: cat,
      })
      console.log('Created category:', category.name)
    } else {
      console.log('Category already exists:', category.name)
    }

    // Add sample menu items for each category
    const menuItems = getMenuItemsForCategory(cat.name)
    for (const item of menuItems) {
      await prisma.menuItem.create({
        data: {
          ...item,
          categoryId: category.id,
        },
      })
    }
    console.log(`Added ${menuItems.length} items to ${category.name}`)
  }

  console.log('Seed completed!')
}

function getMenuItemsForCategory(categoryName: string) {
  const menuItems: any = {
    'Doner': [
      {
        name: 'Classic Doner Kebab',
        description: 'Traditional doner meat with fresh vegetables and special sauce',
        price: 8.99,
        order: 1,
      },
      {
        name: 'Chicken Doner',
        description: 'Marinated chicken doner with garlic sauce',
        price: 7.99,
        order: 2,
      },
      {
        name: 'Mixed Doner Plate',
        description: 'Combination of beef and chicken doner served with rice',
        price: 12.99,
        order: 3,
      },
    ],
    'Burger': [
      {
        name: 'Classic Beef Burger',
        description: 'Juicy beef patty with lettuce, tomato, and special sauce',
        price: 9.99,
        order: 1,
      },
      {
        name: 'Cheese Burger',
        description: 'Double cheese with beef patty and pickles',
        price: 10.99,
        order: 2,
      },
      {
        name: 'Chicken Burger',
        description: 'Crispy chicken breast with coleslaw',
        price: 8.99,
        order: 3,
      },
    ],
    'Pizza': [
      {
        name: 'Margherita',
        description: 'Classic tomato sauce, mozzarella, and fresh basil',
        price: 11.99,
        order: 1,
      },
      {
        name: 'Pepperoni',
        description: 'Tomato sauce, mozzarella, and pepperoni',
        price: 13.99,
        order: 2,
      },
      {
        name: 'Mediterranean',
        description: 'Olives, feta cheese, tomatoes, and oregano',
        price: 14.99,
        order: 3,
      },
    ],
    'Beverages': [
      {
        name: 'Coca Cola',
        description: 'Classic refreshing soda',
        price: 2.99,
        order: 1,
      },
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 4.99,
        order: 2,
      },
      {
        name: 'Turkish Tea',
        description: 'Traditional hot tea',
        price: 1.99,
        order: 3,
      },
    ],
    'Pasta': [
      {
        name: 'Spaghetti Bolognese',
        description: 'Classic Italian meat sauce with parmesan',
        price: 10.99,
        order: 1,
      },
      {
        name: 'Penne Arrabiata',
        description: 'Spicy tomato sauce with garlic and herbs',
        price: 9.99,
        order: 2,
      },
      {
        name: 'Fettuccine Alfredo',
        description: 'Creamy white sauce with parmesan',
        price: 11.99,
        order: 3,
      },
    ],
    'Side Dishes': [
      {
        name: 'French Fries',
        description: 'Crispy golden fries with salt',
        price: 3.99,
        order: 1,
      },
      {
        name: 'Onion Rings',
        description: 'Crispy battered onion rings',
        price: 4.99,
        order: 2,
      },
      {
        name: 'Garden Salad',
        description: 'Fresh mixed vegetables with dressing',
        price: 5.99,
        order: 3,
      },
    ],
  }

  return menuItems[categoryName] || []
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })