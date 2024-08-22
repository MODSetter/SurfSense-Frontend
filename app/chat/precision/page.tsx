"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { useRouter } from "next/navigation";
import { DataTableDemo } from "./table";

function toIsoString(date: Date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num: number) {
            return (num < 10 ? '0' : '') + num;
        };

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
}


const page = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const [sessionid, setSessionid] = useState("");
    const [webpageurl, setWebpageurl] = useState("");
    const [visitlower, setVisitlower] = useState(0);
    const [visitupper, setVisitupper] = useState(0);
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;

    const [docs, setDocs] = useState([]);

    const router = useRouter();
    const [route, setRoute] = useState(0);


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



    const validateForm = () => {
        if (visitupper < visitlower) {
            setError("Upper Time can't be smaller than Lower Time.");
            return false;
        }

        if (visitupper < 0 || visitlower < 0) {
            setError("Time can't be Negative.");
            return false;
        }
        // if (!sessionid || !webpagetitle) {
        //     setError("Username and password are required");
        //     return false;
        // }
        setError("");
        return true;
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        const requestObject = {
            sessionid: sessionid,
            webpageurl: webpageurl,
            daterange: [toIsoString(new Date(dateRange[0].setUTCHours(0, 0, 0, 0))), toIsoString(new Date(dateRange[1].setUTCHours(23, 59, 59, 999)))],
            timerange: [visitlower, visitupper],
            neourl: localStorage.getItem('neourl'),
            neouser: localStorage.getItem('neouser'),
            neopass: localStorage.getItem('neopass'),
            openaikey: localStorage.getItem('openaikey'),
            apisecretkey: process.env.NEXT_PUBLIC_API_SECRET_KEY
        }

        // console.log(requestObject)

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL!}/precision`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestObject),
                }
            );

            setLoading(false);

            if (response.ok) {
                const resdata = await response.json();
                setDocs(resdata.documents);
                setRoute(1)
                // window.localStorage.setItem("token", data.access_token);
                //   router.push('/chat');
                // navigate('/protected');
            }
        } catch (error) {
            setLoading(false);
            setError("An error occurred. Please try again later.");
        }
    };

    if (route == 0) {
        return (
            <>
                <section>
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Precision Search
                                </h1>

                                <form
                                    className="space-y-4 md:space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Browsing Session ID
                                        </label>
                                        <input
                                            name="email"
                                            id="email"
                                            value={sessionid}
                                            onChange={(e) => setSessionid(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        <p className="text-[0.8rem] text-muted-foreground">* Optional</p>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Web Page URL Contains
                                        </label>
                                        <input
                                            name="email"
                                            id="email"
                                            value={webpageurl}
                                            onChange={(e) => setWebpageurl(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        <p className="text-[0.8rem] text-muted-foreground">* Optional</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex gap-1">
                                            <input
                                                name="timelower"
                                                id="timelower"
                                                type="number"
                                                value={visitlower}
                                                onChange={(e) => setVisitlower(e.target.valueAsNumber)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="milliseconds"
                                            />
                                            <div className="text-sm font-medium text-gray-900 dark:text-white self-center">
                                                {"<"}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white grow">
                                                Visit Duration
                                            </div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white self-center">
                                                {"<"}
                                            </div>
                                            <input
                                                name="timeupper"
                                                id="timeupper"
                                                type="number"
                                                value={visitupper}
                                                onChange={(e) => setVisitupper(e.target.valueAsNumber)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="milliseconds"
                                            />
                                        </div>
                                        <p className="text-[0.8rem] text-muted-foreground">* Optional</p>

                                    </div>



                                    <div className="flex flex-col gap-1">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Date Range
                                        </label>
                                        <DatePicker
                                            showIcon
                                            selectsRange={true}
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={(update) => {
                                                // @ts-ignore
                                                setDateRange(update);
                                            }}
                                            withPortal
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        {loading ? "Searching..." : "Search"}
                                    </button>
                                    {error && <p style={{ color: "red" }}>{error}</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    } else if (route == 1) {
        if (docs.length > 0) {
            return (
                <>
                    <DataTableDemo data={docs} />
                </>
            )

        } else {
            return (
                <div className="mt-52 p-8 flex justify-center">
                    <h1 className="mx-auto text-7xl">No Web History Found</h1>
                </div>
            )
        }
    }
};

export default page;
