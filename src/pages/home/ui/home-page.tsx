export const HomePage = () => (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
            <h2 className="text-center">
                <span className="block text-center text-2xl font-bold sm:text-4xl">
                    Next.js Template
                </span>
                <span className="font-semibold italic opacity-80 sm:text-lg">
                    (Feature-Sliced Design)
                </span>
            </h2>
            <a
                className="mx-auto flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm text-background transition-colors hover:bg-[#383838] sm:h-12 sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
                href="https://github.com/George-Al3xander/next-template/tree/feature-sliced-design"
                target="_blank"
                rel="noopener noreferrer"
            >
                Repository link
            </a>
        </main>
    </div>
);
