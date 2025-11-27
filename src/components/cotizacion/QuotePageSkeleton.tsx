import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuotePageSkeleton() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Skeleton */}
            <section className="relative py-12 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <Skeleton className="h-9 w-80 mb-2" />
                    <Skeleton className="h-5 w-96" />
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-4 py-6 md:py-8">
                <div className="grid lg:grid-cols-12 gap-6 md:gap-8">

                    {/* Left Column Skeleton */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Product Selection Card Skeleton */}
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-5 h-5 rounded" />
                                    <Skeleton className="h-6 w-48" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-11 w-full" />
                                </div>

                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-11 w-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-11 w-full" />
                                    </div>
                                </div>

                                <Skeleton className="h-16 w-full rounded-lg" />
                            </CardContent>
                        </Card>

                        {/* Client Data Card Skeleton */}
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-5 h-5 rounded" />
                                    <Skeleton className="h-6 w-40" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-11 w-full" />
                                </div>

                                {/* Phone Field */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-11 w-full" />
                                </div>

                                {/* CI Field */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-11 w-full" />
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-36" />
                                    <Skeleton className="h-11 w-full" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column Skeleton */}
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-8">
                            <Card className="shadow-lg border-primary/20 overflow-hidden">
                                {/* Header */}
                                <div className="bg-primary/5 p-4 md:p-6 border-b border-primary/10">
                                    <Skeleton className="h-7 w-56 mb-2" />
                                    <Skeleton className="h-4 w-64" />
                                </div>

                                {/* Empty Cart State */}
                                <CardContent className="p-0">
                                    <div className="p-6 md:p-8 text-center border-dashed border-2 m-3 md:m-4 rounded-lg bg-muted/30">
                                        <Skeleton className="w-8 h-8 mx-auto mb-2 rounded" />
                                        <Skeleton className="h-5 w-40 mx-auto" />
                                    </div>
                                </CardContent>

                                {/* Footer */}
                                <CardFooter className="flex flex-col gap-3 md:gap-4 bg-muted/30 p-4 md:p-6 border-t">
                                    <div className="flex justify-between w-full">
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-6 w-24" />
                                    </div>

                                    {/* WhatsApp Button */}
                                    <Skeleton className="h-12 w-full rounded-md" />

                                    {/* Checkbox */}
                                    <div className="flex items-start space-x-2 py-2">
                                        <Skeleton className="h-4 w-4 rounded" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>

                                    {/* Download Button */}
                                    <Skeleton className="h-12 w-full rounded-md" />
                                </CardFooter>
                            </Card>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
