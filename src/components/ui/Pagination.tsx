import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {

            pages.push(1);

            if (currentPage <= 3) {
                pages.push(2, 3, 4, "ellipsis-end", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push("ellipsis-start", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push("ellipsis-start", currentPage - 1, currentPage, currentPage + 1, "ellipsis-end", totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 flex-wrap">

            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100"
                aria-label="Primera página"
            >
                <ChevronsLeft className="w-5 h-5" />
            </button>

            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100"
                aria-label="Página anterior"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => {
                    if (typeof page === "string") {

                        return (
                            <span
                                key={`${page}-${index}`}
                                className="px-3 py-2 text-muted-foreground"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all ${currentPage === page
                                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                : "bg-background border hover:bg-muted hover:scale-105"
                                }`}
                            aria-label={`Página ${page}`}
                            aria-current={currentPage === page ? "page" : undefined}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100"
                aria-label="Página siguiente"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100"
                aria-label="Última página"
            >
                <ChevronsRight className="w-5 h-5" />
            </button>
        </div>
    );
}
