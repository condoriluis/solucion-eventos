"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

interface ProductGalleryProps {
    images: string[]
    productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const imageRef = useRef<HTMLImageElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return
        const { left, top, width, height } = imageRef.current.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100
        setMousePos({ x, y })
    }

    const nextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isLightboxOpen) return
            if (e.key === "ArrowRight") nextImage()
            if (e.key === "ArrowLeft") prevImage()
            if (e.key === "Escape") setIsLightboxOpen(false)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isLightboxOpen])

    return (
        <div className="space-y-4">
            {/* Main Image Area */}
            <div
                className="relative aspect-square overflow-hidden rounded-2xl border bg-muted group cursor-zoom-in"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setIsLightboxOpen(true)}
            >
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                        <ZoomIn className="w-3 h-3" /> Click para ampliar
                    </div>
                </div>

                <motion.img
                    ref={imageRef}
                    key={selectedIndex}
                    src={images[selectedIndex]}
                    alt={`${productName} - Vista ${selectedIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                        transform: isHovering ? "scale(2)" : "scale(1)",
                        transition: "transform 0.1s ease-out"
                    }}
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={cn(
                                "relative aspect-square overflow-hidden rounded-lg border bg-muted transition-all",
                                selectedIndex === idx
                                    ? "ring-2 ring-primary ring-offset-2"
                                    : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-1 opacity-70 hover:opacity-100"
                            )}
                        >
                            <img
                                src={img}
                                alt={`${productName} thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
                <DialogContent className="max-w-[95vw] h-[90vh] p-0 border-none bg-black/95 text-white">
                    <DialogTitle className="sr-only">{productName}</DialogTitle>
                    <div className="relative w-full h-full flex items-center justify-center">


                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </Button>

                        <div className="relative w-full h-full p-4 md:p-10 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedIndex}
                                    src={images[selectedIndex]}
                                    alt={productName}
                                    className="max-w-full max-h-full object-contain"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </AnimatePresence>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        >
                            <ChevronRight className="w-8 h-8" />
                        </Button>

                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 p-4">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedIndex(idx)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all",
                                        selectedIndex === idx ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
