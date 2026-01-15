import React from 'react'
import Tittle from './Tittle';

const TopBrands = () => {

    const brands = [
        "src/brands/adiddas.png",
        "src/brands/calvin.png",
        "src/brands/gucci.png",
        "src/brands/nike.png",
        "src/brands/h&m.png",
        "src/brands/lacoste.png",
    ];

    return (
        <div className="w-full overflow-hidden py-10 bg-white">
            <div className="text-center max-w-3xl mx-auto mb-14 px-4">
                <Tittle text1={"TOP"} text2={"BRANDS"} />
                
            </div>


            <div className="relative w-full overflow-hidden">
                {/* Marquee Track */}
                <div className="flex w-max animate-marquee gap-12">
                    {/* First set */}
                    {brands.map((logo, index) => (
                        <div
                            key={`brand-1-${index}`}
                            className="flex items-center justify-center min-w-[140px] opacity-80"
                        >
                            <img
                                src={logo}
                                alt="brand logo"
                                className="h-14 sm:h-14 object-contain"
                                draggable={false}
                            />
                        </div>
                    ))}


                    {/* Duplicate set for seamless loop */}
                    {brands.map((logo, index) => (
                        <div
                            key={`brand-2-${index}`}
                            className="flex items-center justify-center min-w-[140px] opacity-80"
                        >
                            <img
                                src={logo}
                                alt="brand logo"
                                className="h-12 sm:h-14 object-contain"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>


            {/* Animation Styles */}
            <style>{`
                    @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                    animation: marquee 25s linear infinite;
                    }
                    `}
            </style>
        </div>
    );
}

export default TopBrands