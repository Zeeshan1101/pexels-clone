"use client";

import Image from "next/image";
import {useRef, useState} from "react";

export default function ImageLoad({photo}: { photo: any }) {
    const [loading, setLoading] = useState(true)


    const imageRef = useRef<HTMLImageElement | null>(null)

    return <div
        className='relative break-inside mb-5 transition-all'
        key={photo.id}
    >
        {loading ? <div className="grid place-items-center w-full h-96 bg-gray-500 text-slate-100 shadow-xl"
        >Loading...</div> : (<>
            <div className="relative ">
                <Image className='w-full h-full images min-h-[8rem]' src={photo.src.original} alt={photo.alt}
                       height={imageRef.current?.naturalHeight} width={imageRef.current?.naturalWidth}
                       priority={true}
                />
            </div>
        </>)}
        <Image
            className='w-full h-full blur-lg absolute top-0 -z-10'
            src={photo.src.original}
            alt={photo.alt}
            style={{opacity: loading ? 0 : 1}}
            fill
            sizes="100%"
            ref={imageRef}
            priority={false}
            onLoad={(e) => {
                setLoading(false)
            }}
        />
    </div>
}