"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
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
import { Button } from "@/components/ui/button"

const page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [userchats, setUserChats] = useState([]);

  useEffect(() => {
    const verifyToken = async () => {
      const token = window.localStorage.getItem("token");
      // console.log(token)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/${token}`
        );

        if (!response.ok) {
          throw new Error("Token verification failed");
        } else {
          const res = await response.json();

          setUserChats(res.chats);
        }
      } catch (error) {
        window.localStorage.removeItem("token");
        router.push("/login");
      }
    };

    verifyToken();
  }, [router]);

  const deleteChat = async (chatid: number) => {
    const token = window.localStorage.getItem('token');
    // console.log(token)/user/chat/delete/{token}/{chatid}
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/chat/delete/${token}/${chatid}`);

      if (!response.ok) {
        throw new Error('Token verification failed');
      } else {
        const res = await response.json();
        toast({
          title: res.message,
        })
        window.location.href = '/dashboard/chat/manage'
        // router.push('/chat/manage')
      }
    } catch (error) {
      window.localStorage.removeItem('token');
      router.push('/login');
    }
  }

  return (
    <div className="w-full mt-20 p-8">
      <Table>
        <TableCaption>A list of your recent chats.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userchats.map((chat: any) => (
            <TableRow key={chat.id}>
              <TableCell className="font-medium">{chat.type}</TableCell>
              <TableCell>{chat.title}</TableCell>
              <TableCell>
                {chat.type === "general" ? (
                  <Link href={`/dashboard/chat/manage/general/${chat.id}`}>
                    <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                      Continue
                    </button>
                  </Link>
                ) : (
                  <Link href={`/dashboard/chat/manage/multidoc/${chat.id}`}>
                    <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                      Continue
                    </button>
                  </Link>
                )}
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="bg-red-500/10">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        chat and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteChat(chat.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
