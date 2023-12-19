import { notFound } from "next/navigation";
import SearchBar from "@/components/search-bar";
import ImageLoad from "@/components/image-load";

async function fetchImage(cat: string, page: string = "0") {
    const headers = new Headers();
    headers.append("Authorization", process.env.PEXELS_API_KEY as string);

    const req = new Request(
        `https://api.pexels.com/v1/search?query=${cat}&page=${page}`,
        {
            method: "GET",
            headers,
        },
    );

    const images = await fetch(req, {
        next: { tags: [`${cat + page}`], revalidate: 10 },
    });

    if (!images.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    const json = await images.json();
    return json.photos;
}

export default async function Page({
    params,
    searchParams,
}: {
    params: { cat: string };
    searchParams: { page: string };
}) {
    if (!params.cat) notFound();

    const images = await fetchImage(
        params.cat,
        searchParams.page ? searchParams.page : "0",
    );

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-5 md:p-10 lg:p-24 ">
            <SearchBar defaultValue={params.cat.replaceAll("%20", " ")} />
            <div className={"w-full"}>
                <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg mx-14 mb-10 mt-20">
                    {images?.map((ph: any, i: number) => {
                        return (
                            <div key={i}>
                                <ImageLoad photo={ph} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
