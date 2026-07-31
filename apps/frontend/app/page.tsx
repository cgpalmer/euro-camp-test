import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome Interviewer!
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a holiday on company time? 👀
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Say no more, I have you covered!
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href='/parks' className="rounded-lg border border-zinc-200 p-4 shadow-sm dark:border-zinc-700">
            <strong className="block text-lg text-zinc-900 dark:text-zinc-50">See all of our parks!</strong>
          </Link>
          <Link href='/holidays' className="rounded-lg border border-zinc-200 p-4 shadow-sm dark:border-zinc-700">
            <strong className="block text-lg text-zinc-900 dark:text-zinc-50">See all of your holidays!</strong>
          </Link>
        </div>
      </main>
    </div>
  );
}
