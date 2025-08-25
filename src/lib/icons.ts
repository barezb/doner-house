import {
  GiHamburger,
  GiPizzaSlice,
  GiCoffeeCup,
  GiNoodles,
  GiFrenchFries,
  GiChickenLeg,
  GiSandwich,
  GiCupcake,
  GiSodaCan,
  GiWineGlass,
  GiTacos,
  GiBowlOfRice,
  GiMeat,
  GiBeerBottle,
  GiCakeSlice
} from 'react-icons/gi'
import { IconType } from 'react-icons'

const iconMap: Record<string, IconType> = {
  'doner': GiMeat,
  'kebab': GiMeat,
  'burger': GiHamburger,
  'pizza': GiPizzaSlice,
  'coffee': GiCoffeeCup,
  'pasta': GiNoodles,
  'fries': GiFrenchFries,
  'chicken': GiChickenLeg,
  'sandwich': GiSandwich,
  'dessert': GiCakeSlice,
  'cake': GiCupcake,
  'beverages': GiSodaCan,
  'drinks': GiBeerBottle,
  'wine': GiWineGlass,
  'tacos': GiTacos,
  'rice': GiBowlOfRice,
  'side-dishes': GiFrenchFries
}

export function getCategoryIcon(iconName: string): IconType {
  const icon = iconMap[iconName.toLowerCase().replace(' ', '-')]
  return icon || GiMeat
}

export function getAvailableIcons() {
  return Object.keys(iconMap)
}