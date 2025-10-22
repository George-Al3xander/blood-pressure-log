import { PageProps } from "@/app/model";
import { HomePage } from "@/pages/home";

export default async function Home({ searchParams }: PageProps) {
    const { page } = await searchParams;

    return <HomePage page={page ?? []} />;
}
