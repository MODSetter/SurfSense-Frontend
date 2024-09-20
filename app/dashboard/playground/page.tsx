"use client"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { DataTable } from './table';

const page = () => {
    const router = useRouter();
    const [docs,setDocs] = useState()

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

          const req = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/${token}`, {
            method: "GET"
          })

          const res = await req.json()

          setDocs(res.documents)
        };
    
        verifyToken();
      }, [router]);

    if(docs){
        return (
            <DataTable data={docs} />
        )
    }
  
}

export default page