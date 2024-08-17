"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from "@/public/SurfSense.png";
import MarkDownTest from "../markdown";
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"


export type Docs = {
  BrowsingSessionId: string
  VisitedWebPageURL: string
  VisitedWebPageTitle: string
  VisitedWebPageReffererURL: string
  VisitedWebPageVisitDurationInMilliseconds: number
  VisitedWebPageContent: string
  VisitedWebPageDateWithTimeInISOString: string
}

export const columns: ColumnDef<Docs>[] = [
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
    accessorKey: "BrowsingSessionId",
    header: "Session Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("BrowsingSessionId")}</div>
    ),
  },
  {
    accessorKey: "VisitedWebPageURL",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          URL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("VisitedWebPageURL")}</div>,
  },
  {
    accessorKey: "VisitedWebPageTitle",
    header: () => <div className="text-right">Title</div>,
    cell: ({ row }) => {
      //   const amount = parseFloat(row.getValue("amount"))
      return <div className="text-right font-medium">{row.getValue("VisitedWebPageTitle")}</div>
    },
  },
  {
    accessorKey: "VisitedWebPageDateWithTimeInISOString",
    header: () => <div className="text-right">Date Time</div>,
    cell: ({ row }) => {
      //   const amount = parseFloat(row.getValue("amount"))
      return <div className="text-right font-medium">{row.getValue("VisitedWebPageDateWithTimeInISOString")}</div>
    },
  },
  {
    accessorKey: "VisitedWebPageVisitDurationInMilliseconds",
    header: () => <div className="text-right">Visit Duration (seconds)</div>,
    cell: ({ row }) => {
      //   const amount = parseFloat(row.getValue("amount"))
      return <div className="text-right font-medium">{parseInt(row.getValue("VisitedWebPageVisitDurationInMilliseconds"))/1000}</div>
    },
  },
]

export function DataTableDemo({ data }: { data: Docs[] }) {
  const router = useRouter();
  const [route, setRoute] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentChat, setCurrentChat] = useState<any[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
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


  const startChat = () => {
    const docsToChatWith = Object.values(table.getSelectedRowModel().rowsById).map(item => item.original)
    setCurrentChat([{
      type: "system",
      content: docsToChatWith
    }])
    setRoute(1)
  }


  const handleSubmit = async (formData: any) => {
    setLoading(true);
    const query = formData.get("query");

    if (!query) {
      console.log("Query cant be empty!!");
      return;
    }

    let cur = currentChat;
    cur.push({
      type: "human",
      content: query
    });

    setCurrentChat([...cur]);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        chat: currentChat,
        neourl: localStorage.getItem('neourl'),
        neouser: localStorage.getItem('neouser'),
        neopass: localStorage.getItem('neopass'),
        openaikey: localStorage.getItem('openaikey'),
        apisecretkey: process.env.NEXT_PUBLIC_API_SECRET_KEY
      }),
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/chat/docs`, requestOptions)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        let cur = currentChat;
        cur.push({
          type: "ai",
          content: data.response
        });


        setCurrentChat([...cur]);
        setLoading(false);
      });
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = window.localStorage.getItem('token');
      // console.log(token)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        } else {
          const NEO4JURL = localStorage.getItem('neourl');
          const NEO4JUSERNAME = localStorage.getItem('neouser');
          const NEO4JPASSWORD = localStorage.getItem('neopass');
          const OPENAIKEY = localStorage.getItem('openaikey');

          const check = (NEO4JURL && NEO4JUSERNAME && NEO4JPASSWORD && OPENAIKEY)
          if (!check) {
            router.push('/settings');
          }
        }
      } catch (error) {
        window.localStorage.removeItem('token');
        router.push('/login');
      }
    };

    verifyToken();
  }, [router]);

  if (route === 0) {
    return (
      <div className="w-full mt-20 p-8">
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Filter Session"
            value={(table.getColumn("BrowsingSessionId")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("BrowsingSessionId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filter URL..."
            value={(table.getColumn("VisitedWebPageURL")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("VisitedWebPageURL")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div
            onClick={() => startChat()}
            className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Start Chat
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
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
          <div className="flex-1 text-sm text-muted-foreground">
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

  } else if (route === 1) {
    return (
      <>
        <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden mt-16">
          <div className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
            <div className="pb-[200px] pt-4 md:pt-10">
              <div className="mx-auto max-w-4xl px-4 flex flex-col gap-3">
                <div className="bg-background flex flex-col gap-2 rounded-lg border p-8">
                  <h1 className="text-sm font-semibold">
                    SurfSense Multi Webpage Chat
                  </h1>
                  <p className="text-muted-foreground leading-normal">
                    🧠 WebPages Loaded: {currentChat[0].content.length}  🧠
                  </p>
                </div>
                {currentChat.map((chat, index) => {
                  // console.log("chat", chat);
                  if (chat.type === "ai") {
                    return (
                      <div
                        className="bg-background flex flex-col gap-2 rounded-lg border p-8"
                        key={index}
                      >
                        <p className="font-sm font-semibold">
                          SurfSense Response:
                        </p>
                        <MarkDownTest source={chat.content} />
                      </div>
                    );
                  }

                  if (chat.type === "human") {
                    return (
                      <div
                        className="bg-background flex flex-col gap-2 rounded-lg border p-8"
                        key={index}
                      >
                        <p className="text-3xl font-semibold">
                          {chat.content}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="h-px w-full"></div>
            </div>
            <div className="from-muted/30 to-muted/30 animate-in dark:from-background/10 dark:to-background/80 inset-x-0 bottom-0 w-full duration-300 ease-in-out peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] dark:from-10%">
              <div className="mx-auto sm:max-w-4xl sm:px-4">

                <div className={loading ? "rounded-md p-4 w-full my-4" : "hidden"}>
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10">
                    </div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-background space-y-4 border-t px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
                  <form action={handleSubmit}>
                    <div className="bg-background relative flex max-h-60 w-full grow flex-col overflow-hidden px-8 sm:rounded-md sm:border sm:px-12">
                      <Image
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 bg-background absolute left-0 top-[13px] size-8 rounded-full p-0 sm:left-4"
                        src={logo}
                        alt="aiicon"
                      />
                      <span className="sr-only">New Chat</span>
                      <textarea
                        placeholder="Send a message."
                        className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                        name="query"
                      ></textarea>
                      <div className="absolute right-0 top-[13px] sm:right-4">
                        <button
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
                          type="submit"
                          data-state="closed"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z"></path>
                          </svg>
                          <span className="sr-only">Send message</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

}