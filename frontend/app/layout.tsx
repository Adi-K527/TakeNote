"use client"

import './globals.css'
import { Providers } from '../components/Providers';
import { SessionProvider, useSession } from 'next-auth/react';
import Header from '../components/Header';


export default function RootLayout({children}: { children: React.ReactNode}) {

  

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      
      <body>
        <SessionProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
