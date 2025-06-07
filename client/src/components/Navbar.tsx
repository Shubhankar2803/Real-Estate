"use client"
import { NAVBAR_HEIGHT } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'aws-amplify/auth'
import { useGetAuthUserQuery } from '@/state/api'
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };
  return (
    <div className="fixed top-0 left-0 w-full z-50" style={{height:`${NAVBAR_HEIGHT}px`}}>
      <div className="flex justify-between items-center w-full py-4 px-8 bg-transparent">
        <div className="flex items-center gap-6">
          {isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger className="text-white hover:text-white/80" />
            </div>
          )}

          <Link
            href="/"
            className="cursor-pointer group"
            scroll={false}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="ESTATE EDGE Logo"
                width={28}
                height={28}
                className="w-7 h-7 filter brightness-0 invert"
              /> 
              <div className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                ESTATE
                <span className="font-light">EDGE</span>
              </div>
            </div>
          </Link>

          {isDashboardPage && authUser && (
            <Button
              variant="ghost"
              className="bg-white text-gray-900 hover:bg-white/90 hover:text-gray-900 font-medium px-4 py-2 rounded-lg transition-all duration-200"
              onClick={() =>
                router.push(
                  authUser.userRole?.toLowerCase() === "manager"
                    ? "/managers/newproperty"
                    : "/search"
                )
              }
            >
              {authUser.userRole?.toLowerCase() === "manager" ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Add Property</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Search</span>
                </>
              )}
            </Button>
          )}
        </div>          

        {!isDashboardPage && (
          <p className="text-white/80 hidden lg:block font-light tracking-wide">
            Find your perfect rental home
          </p>
        )}       

        <div className='flex items-center gap-4'>
          {authUser ? (
            <>
              <div className="relative hidden md:block">
                <MessageCircle className="w-5 h-5 cursor-pointer text-white hover:text-white/80 transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-transparent"></span>
              </div>
              
              <div className="relative hidden md:block">
                <Bell className="w-5 h-5 cursor-pointer text-white hover:text-white/80 transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-transparent"></span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none group">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={authUser.userInfo?.image} />
                    <AvatarFallback className="bg-white text-gray-900 text-sm font-medium">
                      {authUser.userRole?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-white group-hover:text-white/80 hidden md:block font-medium text-sm transition-colors">
                    {authUser.userInfo?.name}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-gray-900 border border-gray-200 shadow-xl rounded-lg">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100 font-medium px-4 py-2"
                    onClick={() =>
                      router.push(
                        authUser.userRole?.toLowerCase() === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites",
                        { scroll: false }
                      )
                    }
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                    onClick={() =>
                      router.push(
                        `/${authUser.userRole?.toLowerCase()}s/settings`,
                        { scroll: false }
                      )
                    }
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-red-50 text-red-600 px-4 py-2"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="text-white border border-white/40 hover:bg-white hover:text-gray-900 font-medium px-6 py-2 rounded-lg transition-all duration-200"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className="bg-white text-gray-900 hover:bg-white/90 hover:text-gray-900 font-medium px-6 py-2 rounded-lg transition-all duration-200 shadow-lg"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar