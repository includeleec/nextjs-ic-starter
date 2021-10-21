import Head from 'next/head'
import 'react'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Store from '@/components/Store/Store'
import Nav from '@/components/Layout/Nav'
import { ONE_HOUR_MS } from '@/lib/constants'
import '@/styles/global.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            cacheTime: ONE_HOUR_MS,
            retry: false
        }
    }
})

export default function App({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Store>
                <Head>
                    <title>Nextjs ic starter</title>
                </Head>
                <div className="flex flex-col items-center bg-gradient-to-b from-yellow-300 to-pink-500">
                    <div className="flex flex-col justify-between w-full min-h-screen px-4 sm:max-w-screen-lg">
                        <main className="flex flex-col justify-start">
                            <Nav />
                            <Component {...pageProps} />
                        </main>
                    </div>
                </div>
            </Store>

            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}
