import React from 'react'
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil, Search } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa"
import { CircleCheckBig } from "lucide-react"
const data = [
  {
    id: "m5gr84i9",
    platform: "facebook",
    username: "john_doe_facebook",
    profilepic: "https://avatar.iran.liara.run/public/10",
    connectedDate: "2024-01-15",
    status: "connected",
  },
  {
    id: "3u1reuv4",
    platform: "instagram",
    username: "jane_smith_insta",
    profilepic: "https://avatar.iran.liara.run/public/11",
    connectedDate: "2024-02-20",
    status: "connected",
  },
  {
    id: "derv1ws0",
    platform: "youtube",
    username: "tech_guru_yt",
    profilepic: "https://avatar.iran.liara.run/public/12",
    connectedDate: "2024-03-10",
    status: "connected",
  },
  {
    id: "5kma53ae",
    platform: "linkedin",
    username: "professional_link",
    profilepic: "https://avatar.iran.liara.run/public/13",
    connectedDate: "2024-01-25",
    status: "connected",
  },
  {
    id: "bhqecj4p",
    platform: "facebook",
    username: "business_page_fb",
    profilepic: "https://avatar.iran.liara.run/public/14",
    connectedDate: "2024-04-05",
    status: "connected",
  },
]
export const columns = [
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
      const date = row.getValue("connectedDate");
      
      
      return (
        <div className="flex items-center gap-2 pl-4">
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
    cell: ({ row }) => (
      <div className="font-medium flex items-center gap-2">
        <img
          src={row.original.profilepic}
          alt={row.getValue("username")}
          className="w-6 h-6 rounded-full"
        />
        <span>{row.getValue("username")}</span>
      </div>
    ),
  },
  {
    accessorKey: "platform",
    header: ({ column }) => {
      
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Platform
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const platform = row.original.platform;
      const platformIcons = {
        facebook: <FaFacebook className="w-6 h-6 text-blue-600" />,
        instagram: <FaInstagram className="w-6 h-6 text-pink-600" />,
        youtube: <FaYoutube className="w-6 h-6 text-red-600" />,
        linkedin: <FaLinkedin className="w-6 h-6 text-blue-600" />,
      };
      
      return (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-medium">{platformIcons[platform] || null}</span>
          <span className="font-medium capitalize">{row.getValue("platform")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="w-fit flex items-center justify-center gap-2 border border-green-500 bg-green-100 text-green-800 py-1 px-3 rounded-full">
        <span className="capitalize text-xs font-medium">{row.getValue("status")}</span><CircleCheckBig className="w-4 h-4" />
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
export function AccountDatatable() {
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
  return (
    <div className="w-full">
      <div className="relative flex items-center py-4 gap-2 justify-between">
        <Input
          placeholder="Filter by username..."
          value={table.getColumn("username")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="relative w-full pl-10"
        />
        <Search className="outline-none absolute top-8.5 left-2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
  )
}
export default AccountDatatable