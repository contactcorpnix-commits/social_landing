'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Button } from "@/components/ui/button"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 border-b-1 border-slate-200 ">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">SOCIALS</span>
            <div className='flex gap-2'>
            
            <img
              alt=""
              src="/logo.svg"
              className="h-8 w-auto"
            />
            <h1 className="text-2xl font-semibold">SOCIALS</h1>
            </div>
            
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">

          <a href="#" className="text-sm/6 hover:text-customgreen">
            Home
          </a>
          <a href="#" className="text-sm/6 hover:text-customgreen">
            About
          </a>
          <a href="#" className="text-sm/6 hover:text-customgreen">
            Pricing
          </a>
          <a href="#" className="text-sm/6 hover:text-customgreen">
            FAQ's
          </a>
          <a href="#" className="text-sm/6 hover:text-customgreen">
            Contact
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
          <a href="/login" className="text-sm/6 font-semibold px-6 py-2 rounded-full bg-white text-customgreen shadow-md border border-customgreen">
            Log in 
          </a>
          <a href="/signup" className="text-sm/6 font-semibold px-6 py-2 rounded-full bg-customgreen text-white shadow-md border border-slate-300">
            Sign up
          </a>
          
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-customgreen p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <div className='flex gap-2'>
                <img
                  alt=""
                  src="/logo_white.svg"
                  className="h-8 w-auto text-white"
                />
                <h1 className="text-2xl font-semibold text-white">Socials</h1>
              </div>
              
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-white/5 text-white"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-white/5  text-white"
                >
                  About
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-white/5  text-white"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-white/5  text-white"
                >
                  FAQ's
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-white/5  text-white"
                >
                  Contact
                </a>
              </div>
              <div className="py-6 flex gap-6 items-center justify-center">
                <a
                  href="#"
                  className="rounded-full px-6 py-2.5 text-base/7 font-semibold hover:bg-gray-100  text-customgreen bg-white shadow-md"
                >
                  Log in
                </a>
                <a
                  href="#"
                  className="rounded-full px-6 py-2.5 text-base/7 font-semibold hover:bg-white/5  text-white bg-cutomgreen shadow-md"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
