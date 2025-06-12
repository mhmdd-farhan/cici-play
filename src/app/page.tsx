"use client";

import Image from "next/image";
import { BiSearchAlt } from "react-icons/bi";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";
import { useEffect, useState } from "react";

const images = [
  {
    src: "https://ucarecdn.com/424398cc-bc26-4b27-a62d-a9db4b44c043/gameimage1.jpg",
    alt: "Image 1",
    width: 600,
    height: 100,
  },
  {
    src: "https://ucarecdn.com/424398cc-bc26-4b27-a62d-a9db4b44c043/gameimage1.jpg",
    alt: "Image 2",
    width: 600,
    height: 100,
  },
  {
    src: "https://ucarecdn.com/424398cc-bc26-4b27-a62d-a9db4b44c043/gameimage1.jpg",
    alt: "Image 3",
    width: 600,
    height: 100,
  },
];

const menu = [
  {
    name: "Home",
    href: "/",
    logo: (
      <Image
        src="https://ucarecdn.com/497ca109-65db-41b3-afc8-6ba554f9dda6/54ba50fd0f326269f28c29bdfbfa07e59f23a450.png"
        width={30}
        height={30}
        alt="Home Logo"
        className="text-2xl"
      />
    ),
  },
  {
    name: "Gold",
    href: "/gold",
    logo: (
      <Image
        src="https://ucarecdn.com/e1451b66-486f-4879-bcde-ef117b2e3d7e/08095415e3fbc23a2a8002f9d4f3bca722091c8b.png"
        width={30}
        height={30}
        alt="Gold Logo"
        className="text-2xl"
      />
    ),
  },
  {
    name: "Item",
    href: "/item",
    logo: (
      <Image
        src="https://ucarecdn.com/0bf86b59-dcc3-4d0a-b177-74b52fbeabe2/f4f806685210b1f422179d6e3c97d416b752cf1f.png"
        width={30}
        height={30}
        alt="Item Logo"
        className="text-2xl"
      />
    ),
  },
  {
    name: "Boot",
    href: "/boot",
    logo: (
      <Image
        src="https://ucarecdn.com/13f7d1b1-2909-4b2b-8e5b-97119ff7cba3/099772f6f6e932fc8074935ef6b33900ef115af4.png"
        width={30}
        height={30}
        alt="Boot Logo"
        className="text-2xl"
      />
    ),
  },
  {
    name: "News",
    href: "/news",
    logo: (
      <Image
        src="https://ucarecdn.com/ee7bf6c8-e227-4f45-b665-a425d049bb0d/5e214cbe60dd6173509dd58b21f605045463fa4e.png"
        width={30}
        height={30}
        alt="News Logo"
        className="text-2xl"
      />
    ),
  },
  {
    name: "",
    href: "search",
    logo: <BiSearchAlt className="text-2xl" />,
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrent((prev) => (prev + 1) % images.length);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [length, isDragging]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(false);
    const endX = e.changedTouches[0].clientX;
    if (startX === null) return;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setCurrent((prev) => (prev - 1 + length) % length);
      } else {
        setCurrent((prev) => (prev + 1) % length);
      }
    }
    setStartX(null);
    setDragOffset(0);
  };

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <section className="min-h-screen flex flex-col bg-gray-800">
      <header>
        <nav className="flex items-center justify-between p-4 px-6 text-white font-sans">
          <Image
            src="https://ucarecdn.com/aa55542a-26df-4daf-a173-0442e5fb6a5c/aecea1323e6a4a0fe0e466eb12a4035f498c7d15.png"
            width={170}
            height={80}
            alt="logo"
          />
          <div className="flex items-center justify-between space-x-7">
            {menu.map((item) => (
              <Link
                key={item.name + item.href}
                href={item.href}
                className="flex items-center space-x-1 hover:text-purple-500"
              >
                {item.logo}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="py-2 px-3 bg-gray-700 rounded-lg"
            >
              <BsCart3 size={21} />
            </Link>
            <select
              className="bg-gray-700 rounded-lg p-1.5 text-lg"
              name="language"
              id="language-select"
            >
              <option value="en">
                🇺🇸 EN
              </option>
              <option value="id">
                🇨🇳 CH
              </option>
            </select>
            <Link
              href="/sign-up"
              className="px-3.5 py-1.5 bg-gray-900 border border-gray-600 rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <div className="relative w-full h-[300px] overflow-hidden rounded-md">
          {/* Overlay kiri */}
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-gray-800 to-transparent z-10" />
          {/* Overlay kanan */}
          <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-gray-800 to-transparent z-10" />
          {/* Overlay atas */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-gray-800 to-transparent z-10" />
          {/* Overlay bawah */}
          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-gray-800 to-transparent z-10" />

          {/* Updated Slides */}
          <div
            className="flex h-full"
            style={{
              transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`,
              transition: isDragging
                ? "none"
                : "transform 700ms ease-in-out",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((image, index) => (
              <div key={index} className="min-w-full h-full relative">
                <Image
                  draggable={false}
                  src={image.src}
                  alt={`slide-${index}`}
                  width={image.width}
                  height={image.height}
                  className="w-full h-full object-top object-cover"
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-6 h-1.5 transition-all duration-700 cursor-pointer ${current === index
                  ? "bg-purple-600"
                  : "bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}
