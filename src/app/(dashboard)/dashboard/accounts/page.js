"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const data = [
  {
    id: "m5gr84i9",
    platform: "facebook",
    username: "john_doe_facebook",
    connectedDate: "2024-01-15",
    status: "connected",
  },
  {
    id: "3u1reuv4",
    platform: "instagram",
    username: "jane_smith_insta",
    connectedDate: "2024-02-20",
    status: "connected",
  },
  {
    id: "derv1ws0",
    platform: "youtube",
    username: "tech_guru_yt",
    connectedDate: "2024-03-10",
    status: "connected",
  },
  {
    id: "5kma53ae",
    platform: "linkedin",
    username: "professional_link",
    connectedDate: "2024-01-25",
    status: "connected",
  },
  {
    id: "bhqecj4p",
    platform: "facebook",
    username: "business_page_fb",
    connectedDate: "2024-04-05",
    status: "connected",
  },
]
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "connectedDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Connected Date
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const platform = row.original.platform;
      const date = row.getValue("connectedDate");
      const platformIcons = {
        facebook: <FaFacebook className="w-4 h-4" />,
        instagram: <FaInstagram className="w-4 h-4" />,
        youtube: <FaYoutube className="w-4 h-4" />,
        linkedin: <FaLinkedin className="w-4 h-4" />,
      };
      
      return (
        <div className="flex items-center gap-2">
          {platformIcons[platform] || null}
          <span>{date}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("username")}</div>,
  },
  {
    accessorKey: "platform",
    header: "Platform",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("platform")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="capitalize">{row.getValue("status")}</span>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const account = row.original;
      const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

      return (
        <>
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Edit account</span>
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Account</DialogTitle>
                <DialogDescription>
                  Make changes to your connected account here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue={account.username}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="platform" className="text-right">
                    Platform
                  </Label>
                  <Input
                    id="platform"
                    defaultValue={account.platform}
                    className="col-span-3"
                    disabled
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
]
export default function Accounts() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  const platforms = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      color: "bg-blue-500",
      description: "Connect your Facebook account to manage pages and posts"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      color: "bg-blue-700",
      description: "Connect your LinkedIn account for professional networking"
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      description: "Connect your Instagram account for visual content"
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      color: "bg-red-600",
      description: "Connect your YouTube account for video content"
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      color: "bg-red-600",
      description: "Connect your YouTube account for video content"
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      color: "bg-red-600",
      description: "Connect your YouTube account for video content"
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

      

      <div className="w-full">
      <div className="flex items-center py-4 gap-2 justify-between">
        <Input
          placeholder="Filter by username..."
          value={table.getColumn("username")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className=""
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter Platform <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuCheckboxItem
              checked={!table.getColumn("platform")?.getFilterValue()}
              onCheckedChange={() => table.getColumn("platform")?.setFilterValue("")}
            >
              All Platforms
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={table.getColumn("platform")?.getFilterValue() === "facebook"}
              onCheckedChange={() => table.getColumn("platform")?.setFilterValue("facebook")}
            >
              Facebook
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={table.getColumn("platform")?.getFilterValue() === "instagram"}
              onCheckedChange={() => table.getColumn("platform")?.setFilterValue("instagram")}
            >
              Instagram
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={table.getColumn("platform")?.getFilterValue() === "youtube"}
              onCheckedChange={() => table.getColumn("platform")?.setFilterValue("youtube")}
            >
              YouTube
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={table.getColumn("platform")?.getFilterValue() === "linkedin"}
              onCheckedChange={() => table.getColumn("platform")?.setFilterValue("linkedin")}
            >
              LinkedIn
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
    </div>



  );
}