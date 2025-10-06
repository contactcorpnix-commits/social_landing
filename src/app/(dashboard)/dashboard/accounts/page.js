"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { Plus } from 'lucide-react';
import * as React from "react"
import AccountDatatable from "@/components/accounts/account-datatable"
import ConnectionStats from "@/components/accounts/connection-stats"
export default function Accounts() {
  const platforms = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      textBg: "bg-blue-600",
      color: "bg-blue-50 border-blue-200",
      description: "Connect your Facebook account to manage pages and posts",
      count:"112"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      textBg: "bg-blue-700",
      color: "bg-blue-50 border-blue-200",
      description: "Connect your LinkedIn account for professional networking",
      count: "33"
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      textBg: "bg-gradient-to-r from-purple-600 to-pink-600",
      color: "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200",
      description: "Connect your Instagram account for visual content",
      count:"223"
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      textBg: "bg-red-600",
      color: "bg-red-50 border-red-200",
      description: "Connect your YouTube account for video content",
      count:"23"
    },
  ]


  return (
    <div className="space-y-6 px-4">
      {/* Header Section */}
      <div className="flex justify-between items-center px-4">
        <div>
            <h1 className="text-2xl font-bold">Accounts</h1>
        <p className="text-sm text-gray-500 py-2">Manage your connected accounts</p>
        </div>
        
        <Dialog className="w-[600px] ">
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2 rounded-full">
              <Plus className="w-4 h-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] overflow-scroll h-[80vh] overflow-x-hidden">
            <DialogHeader>
              <DialogTitle>Connect your Account</DialogTitle>
              <DialogDescription>
                Connect your account to your social media profiles.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 grid grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <div key={platform.name} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="">
                    <div className="flex items-center gap-2 rounded-lg text-white text-lg"><span className={`p-2 rounded-full ${platform.color}`}>
  {platform.icon}
</span> <span className="text-black text-sm font-medium">{platform.name}</span></div>
                    <div className="py-2">
                      <p className="text-sm text-gray-500">Connect your {platform.name} account</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2 bg-black text-white py-5 rounded-[12px]">
                    <Plus className="w-4 h-4" /> Connect {platform.name}
                  </Button>
                </div>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ConnectionStats platforms={platforms} />
      <AccountDatatable />
    </div>



  );
}