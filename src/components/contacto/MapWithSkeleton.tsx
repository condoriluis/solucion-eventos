import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface MapWithSkeletonProps {
    mapUrl: string;
}

export default function MapWithSkeleton({ mapUrl }: MapWithSkeletonProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="rounded-2xl overflow-hidden border h-[600px] relative">
            {!isLoaded && (
                <div className="absolute inset-0 bg-muted/30 flex flex-col gap-4 p-6">
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>

                    <div className="flex-1 relative">

                        <div className="absolute top-1/4 left-1/3">
                            <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                        <div className="absolute top-1/2 left-1/2">
                            <Skeleton className="h-16 w-16 rounded-full bg-primary/20" />
                        </div>
                        <div className="absolute top-2/3 right-1/3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>

                        <div className="absolute inset-0 opacity-20">
                            <div className="grid grid-cols-6 grid-rows-6 h-full w-full gap-4 p-4">
                                {Array.from({ length: 36 }).map((_, i) => (
                                    <Skeleton key={i} className="h-full w-full" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-10 rounded" />
                            <Skeleton className="h-10 w-10 rounded" />
                        </div>
                        <Skeleton className="h-10 w-32 rounded" />
                    </div>
                </div>
            )}

            <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsLoaded(true)}
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
}
