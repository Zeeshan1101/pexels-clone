"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

const SearchBar = ({defaultValue}: { defaultValue?: string }) => {
    const router = useRouter();
    const [search, setSearch] = useState<string>(defaultValue ? defaultValue : "")
    return (
        <form

            onSubmit={(e) => {
                e.preventDefault();
                if (!search) return;
                router.push(`/${search}`)
            }}
            className="bg-white lg:w-1/2 md:w-2/3 w-3/4 h-14 rounded-full flex px-4 items-center justify-center text-gray-500 focus-within:border-gray-500 focus-within:border-2 transition-all duration-100">
            <input
                type="text"
                name="search"
                id="search"
                className="flex-1 rounded-full outline-none px-4 text-black"
                placeholder="Search...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="material-symbols-outlined active:text-black">search
            </button>
        </form>
    );
};

export default SearchBar;
