"use client"
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

function ProtectedPage() {
//   const navigate = useNavigate();
const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = window.localStorage.getItem('token');
        console.log(token)
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        window.localStorage.removeItem('token');
        router.push('/');
      }
    };

    verifyToken();
  }, [router]);

  return <div>This is a protected page. Only visible to authenticated users.</div>;
}

export default ProtectedPage;