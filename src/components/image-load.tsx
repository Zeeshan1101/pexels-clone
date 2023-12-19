"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ImageLoad({ photo }: { photo: any }) {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const imageRef = useRef<HTMLImageElement | null>(null);

    return (
        <div
            className="break-inside relative mb-5 cursor-pointer transition-all"
            key={photo.id}
            onClick={() => {
                router.push(photo.src.original);
            }}
        >
            {loading ? (
                <div className="h-96 w-full animate-pulse bg-gray-400 text-slate-100"></div>
            ) : (
                <>
                    <div className="relative ">
                        <Image
                            className="images h-full min-h-[8rem] w-full"
                            src={photo.src.original}
                            alt={photo.alt}
                            height={imageRef.current?.naturalHeight}
                            width={imageRef.current?.naturalWidth}
                            priority={true}
                        />
                    </div>
                </>
            )}
            <Image
                className="absolute top-0 -z-10 h-full w-full blur-lg"
                src={photo.src.original}
                alt={photo.alt}
                style={{ opacity: loading ? 0 : 1 }}
                fill
                sizes="100%"
                ref={imageRef}
                priority={false}
                onLoad={(e) => {
                    setLoading(false);
                }}
            />
        </div>
    );
}
