"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Member {
    n: string;
    r: string;
    img?: string;
}

export default function Team({ members }: { members: Member[] }) {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {members.map((p, i) => (
                <motion.div
                    key={p.n}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                >
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                                    <AvatarImage src={p.img} alt={p.n} className="object-cover" />
                                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                                        {p.n.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <h3 className="font-bold text-xl mb-1">{p.n}</h3>
                            <p className="text-sm font-medium text-primary/80 uppercase tracking-wider">{p.r}</p>

                            <div className="w-12 h-1 bg-primary/20 rounded-full mt-4" />
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
