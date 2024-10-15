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
import { ArrowUpDown, ChevronDown, User } from "lucide-react"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from "@/public/SurfSense.png";
import MarkDownTest from "@/app/markdown";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import JsonThemeEditor from "@/app/json-editor"


export type Docs = {
  id: string
  created_at: string
  title: string
  file_type: string
  search_space: any
  document_metadata: string
  page_content: string
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
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("id")}</div>
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("created_at")}</div>
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("title")}</div>
    },
  },
  {
    accessorKey: "file_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("file_type")}</div>
    },
  },
  // {
  //   accessorKey: "search_space",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Search Space
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     return <div className="text-center font-medium">{row.getValue("search_space")}</div>
  //   },
  // },
  {
    accessorKey: "document_metadata",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Metadata
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Show MetaData</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="min-w-fit">
            <AlertDialogHeader>
              <AlertDialogTitle>MetaData</AlertDialogTitle>
              <AlertDialogDescription>
                <JsonThemeEditor jsonobject={JSON.parse(row.getValue("document_metadata"))} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>OK</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    },
  },
]

export function DataTable({ data }: { data: Docs[] }) {
  const router = useRouter();
  const { toast } = useToast()
  const [route, setRoute] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [chattitle, setChattitle] = useState<string | null>(null);

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
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  const startChat = () => {
    const docsToChatWith = Object.values(table.getSelectedRowModel().rowsById).map(item => item.original)
    let docsContent: string[] = [];
    docsToChatWith.filter((doc, idx) => {
      docsContent.push("DOCUMENT " + idx + "\n\n" + doc.page_content + "\n\n")
    })

    // console.log(docsContent)
    setCurrentChat([{
      type: "system",
      content: docsContent
    }])
    setRoute(1)
  }


  const deleteSelectedDocuments = async () => {
    const selectedDocuments = Object.values(table.getSelectedRowModel().rowsById).map(item => item.original)
    const ids_to_del = selectedDocuments.map((doc) => {
      return (parseInt(doc.id) - 1).toString()
    })

    // console.log(ids_to_del)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ids_to_delete: ids_to_del,
        openaikey: localStorage.getItem('openaikey'),
        token: localStorage.getItem('token'),
      }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/delete/docs`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Token verification failed");
    } else {
      const res = await response.json();
      toast({
        title: res.message,
      });
      // router.push("/dashboard/playground");
    }
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
        openaikey: localStorage.getItem('openaikey'),
        token: localStorage.getItem('token'),
      }),
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/chat/docs`, requestOptions)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (currentChat.length === 2) {
          setChattitle(query)
        }

        let cur = currentChat;
        cur.push({
          type: "ai",
          content: data.response
        });


        setCurrentChat([...cur]);
        setLoading(false);
      });
  };

  const saveChat = async () => {
    const token = window.localStorage.getItem('token');
    // console.log(token)
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          type: "multidoc",
          title: chattitle,
          chats_list: JSON.stringify(currentChat)
        }),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/chat/save`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error('Token verification failed');
      } else {
        const res = await response.json();
        toast({
          title: res.message,
        })
        router.push('/dashboard/chat/manage');
      }

    } catch (error) {
      window.localStorage.removeItem('token');
      router.push('/login');
    }
  }

  useEffect(() => {
    const verifyToken = async () => {
      const token = window.localStorage.getItem('token');
      // console.log(token)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        } else {
          const OPENAIKEY = localStorage.getItem('openaikey');

          const check = (OPENAIKEY)
          if (!check) {
            router.push('/dashboard/settings');
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
      <div className="w-full p-8">
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Filter Title"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filter File Type"
            value={(table.getColumn("file_type")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("file_type")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {/* <Input
            placeholder="Filter Search Space"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          /> */}
          <div
            onClick={() => startChat()}
            className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Start Chat
          </div>

          <AlertDialog>
            <AlertDialogTrigger><Button variant="destructive">Delete</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteSelectedDocuments()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
        <div className="grow relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden mt-16">
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
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          ease: [0, 0.71, 0.2, 1.01],
                          scale: {
                            type: "spring",
                            damping: 5,
                            stiffness: 100,
                            restDelta: 0.001
                          }
                        }}
                        className="bg-background flex flex-col gap-2 rounded-lg border p-8"
                        key={index}
                      >
                        <Image className="hidden sm:block w-8 h-8 mr-2 rounded-full" src={logo} alt="logo" />
                        <MarkDownTest source={chat.content} />
                      </motion.div>
                    );
                  }

                  if (chat.type === "human") {
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          ease: [0, 0.71, 0.2, 1.01],
                          scale: {
                            type: "spring",
                            damping: 5,
                            stiffness: 100,
                            restDelta: 0.001
                          }
                        }}
                        className="bg-background flex flex-col gap-2 rounded-lg border p-8"
                        key={index}
                      >
                        <User />
                        <p className="text-3xl font-semibold">
                          {chat.content}
                        </p>
                      </motion.div>
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
                  <div className="flex justify-center">
                    {chattitle ? (<button
                      onClick={() => saveChat()}
                      className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                      <span className="absolute inset-0 overflow-hidden rounded-full">
                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </span>
                      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                        <span>
                          Save Chat
                        </span>
                        <svg
                          fill="none"
                          height="16"
                          viewBox="0 0 24 24"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.75 8.75L14.25 12L10.75 15.25"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                    </button>) : (<></>)}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

}
