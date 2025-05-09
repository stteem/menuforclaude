import Image from "next/image";
import LoginButton from "./login-button";
import GoogleLoginButton from "./google-login-button";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="mx-5 border border-stone-200 py-10 px-5 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md dark:border-zinc-700 bg-white dark:bg-zinc-800">
      <Image
        alt="Platforms Starter Kit"
        width={100}
        height={100}
        className="relative mx-auto h-12 w-auto dark:scale-110 dark:rounded-full dark:border dark:border-zinc-400"
        src="/logo.png"
      />
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
        Kpaly
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-zinc-400">
        Create and own a site for your business. <br/> E.g. <em>yourbusiness.kpaly.com</em> <br/> Optionally add your custom domain name to brand your business. <br /> E.g. <em>yourbusiness.com</em> <br />
        {/* <a
          className="font-medium text-black hover:text-stone-800 dark:text-stone-300 dark:hover:text-stone-100"
          href="https://vercel.com/blog/platforms-starter-kit"
          rel="noreferrer"
          target="_blank"
        >
          Read the announcement.
        </a> */}
      </p>

      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-zinc-700 dark:bg-zinc-800" />
          }
        >
          <GoogleLoginButton />
          <LoginButton />
        </Suspense>
      </div>
    </div>
  );
}
