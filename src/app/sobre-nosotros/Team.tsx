"use client";

import { motion } from "framer-motion";

interface Member {
  n: string;
  r: string;
  img?: string;
}

export default function Team({ members }: { members: Member[] }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
      {members.map((p) => (
        <motion.div
          key={p.n}
          whileHover={{ y: -5, scale: 1.03 }}
          className="rounded-2xl border overflow-hidden shadow-lg transition-transform duration-300"
        >
          {/* Avatar */}
          {p.img ? (
            <img
              src={p.img}
              alt={p.n}
              className="mx-auto rounded-full w-22 h-22 object-cover border shadow-sm mt-6"
            />
          ) : (
            <div className="mx-auto rounded-full bg-muted w-32 h-32 mt-6" aria-label={p.n} />
          )}

          {/* Nombre y Rol */}
          <div className="text-center p-4">
            <p className="font-semibold text-lg">{p.n}</p>
            <p className="text-sm text-muted-foreground">{p.r}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
