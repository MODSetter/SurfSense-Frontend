// "use client"
// import { cn } from "@/lib/utils";
// import React, { useEffect, useState } from "react";
// import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
// import { CircleAlert } from "lucide-react";
// import MarkDownTest from "../chat/markdown";
// import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"


// export default function BentoGridDemo() {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const verifyToken = async () => {
//       const token = window.localStorage.getItem("token");
//       // console.log(token)
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/${token}`
//         );

//         if (!response.ok) {
//           throw new Error("Token verification failed");
//         } else {
//           const res = await response.json();

//           setNotifications(res.notifications);
//         }
//       } catch (error) {
//         window.localStorage.removeItem("token");
//         router.push("/login");
//       }
//     };

//     verifyToken();
//   }, [router]);

//   const deleteNotification = async (notificationid: number) => {
//     const token = window.localStorage.getItem('token');
//     // console.log(token)/user/chat/delete/{token}/{chatid}
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/notification/delete/${token}/${notificationid}`);

//       if (!response.ok) {
//         throw new Error('Token verification failed');
//       } else {
//         const res = await response.json();
//         toast({
//           title: res.message,
//         })
//         window.location.href = '/notifications'
//         // router.push('/chat/manage')
//       }
//     } catch (error) {
//       window.localStorage.removeItem('token');
//       router.push('/login');
//     }
//   }


//   return (
//     <>
//       <div className="flex flex-col gap-8 mt-24">
//         <p className="text-3xl text-center">Notifications :</p>
//         <BentoGrid className="max-w-7xl mx-auto mt-24">
//           {notifications.map((notification: any, i) => (
//             <BentoGridItem
//               key={i}
//               title={<MarkDownTest source={notification.text} />}
//                 description={
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <Button variant="outline" className="bg-red-500/10">Delete</Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This action cannot be undone. This will permanently delete your
//                         notification and remove your data from our servers.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction onClick={() => deleteNotification(notification.id)}>Delete</AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//                 }
//               // header={<MarkDownTest source={item.text} />}
//               icon={<CircleAlert className="h-4 w-4 text-neutral-500" />}
//               className={notification.text.length > 300 ? "md:col-span-2" : ""}
//             />
//           ))}
//         </BentoGrid>
//       </div>
//     </>
//   );
// }
