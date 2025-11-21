"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(images[0]);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - rect.left) / rect.width) * 100;
    const y = ((e.pageY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      
      {/* ------- Imagen principal con Zoom ------- */}
      <div
        className="relative grow h-72 md:h-96 rounded-xl overflow-hidden bg-muted transition-all"
        onMouseMove={handleMove}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        style={{
          cursor: zoom ? "zoom-out" : "zoom-in",
        }}
      >
        <Image
          src={current}
          alt="Imagen del producto"
          fill
          className={cn(
            "object-cover transition-transform duration-300 ease-out",
            zoom ? "scale-150" : "scale-100"
          )}
          style={{ transformOrigin: `${position.x}% ${position.y}%` }}
        />
      </div>
    </div>
  );
}
