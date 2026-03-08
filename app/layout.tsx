"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// 1. Initialize the Apollo Client instance
const client = new ApolloClient({
  // Using HttpLink explicitly solves the "uri does not exist" type error
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_GQL_BASE_URL,
  }),
  cache: new InMemoryCache(),
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%", margin: 0, padding: 0 }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ height: "100%", margin: 0, padding: 0 }}
      >
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
        
      </body>
    </html>
  );
}
