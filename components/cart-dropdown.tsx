"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart } from "lucide-react"

export function CartDropdown() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Premium Flavor Pods", price: 49.99, quantity: 2 },
    { id: 2, name: "Electronic Hookah Device", price: 199.99, quantity: 1 },
  ])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Your Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cartItems.map((item) => (
          <DropdownMenuItem key={item.id} className="flex justify-between">
            <span>
              {item.name} x{item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between font-bold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/cart" className="w-full">
            <Button variant="default" size="sm" className="w-full">
              View Cart
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

