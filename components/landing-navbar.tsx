"use client";

import Image from "next/image";
import Container from "./container";

const PlanetImages = () => {
    const formatNumber = (num: number) => {
        return num < 10 ? `0${num}` : num.toString();
    };

    const planetImageUrls = Array.from(Array(10).keys()).map(
        (index) => `/planet${formatNumber(index)}.png`
    );

    return planetImageUrls;
};

export const LandingNavbar = () => {
    const planetImageUrls = PlanetImages();
    return (
        <nav className="p-4 flex flex-col items-center justify-between gap-4">
            <div className="flex items-center ">
                {planetImageUrls.map((url, index) => (
                    <div key={index} className="mx-[-30px]">
                        <Image src={url} alt={`Planet ${index}`} height={150} width={150} />
                    </div>
                ))}
            </div>
            {/* <Container /> */}
        </nav>
    )
}

