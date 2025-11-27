import { useState, useMemo, useEffect } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import Pagination from "@/components/ui/Pagination";

interface Product {
    id: string;
    slug: string;
    name: string;
    category: string;
    price: number;
    description: string;
    images: string[];
    stock: number;
    features: string[];
}

interface ProductSearchProps {
    products: Product[];
}

const categories = [
    { id: "all", label: "Todos" },
    { id: "carpas", label: "Carpas" },
    { id: "mesas", label: "Mesas" },
    { id: "sillas", label: "Sillas" },
    { id: "manteles", label: "Manteles" },
    { id: "otros", label: "Otros" },
];

export default function ProductSearch({ products }: ProductSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 8;

    const { minPrice, maxPrice } = useMemo(() => {
        const prices = products.map((p) => p.price);
        return {
            minPrice: Math.floor(Math.min(...prices)),
            maxPrice: Math.ceil(Math.max(...prices)),
        };
    }, [products]);

    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {

            const matchesSearch =
                searchTerm === "" ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.features.some((f) =>
                    f.toLowerCase().includes(searchTerm.toLowerCase())
                );

            const matchesCategory =
                selectedCategory === "all" || product.category === selectedCategory;

            const matchesPrice =
                product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [products, searchTerm, selectedCategory, priceRange]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, priceRange]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const hasActiveFilters =
        searchTerm !== "" ||
        selectedCategory !== "all" ||
        priceRange[0] !== minPrice ||
        priceRange[1] !== maxPrice;

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
        setPriceRange([minPrice, maxPrice]);
    };

    return (
        <div className="space-y-8">

            <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-lg rounded-2xl border p-4 shadow-lg">
                <div className="flex flex-col lg:flex-row gap-4">

                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-10 py-3 rounded-xl border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl border bg-background/50 hover:bg-muted transition-colors"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        <span>Filtros</span>
                        {hasActiveFilters && (
                            <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                Activos
                            </span>
                        )}
                    </button>
                </div>

                <div
                    className={`mt-4 space-y-4 transition-all duration-300 ${showFilters ? "block" : "hidden lg:block"
                        }`}
                >
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Categoría
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.id
                                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                        : "bg-muted hover:bg-muted/80"
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium">Rango de Precio</label>
                            <span className="text-sm text-muted-foreground">
                                Bs. {priceRange[0]} - Bs. {priceRange[1]}
                            </span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceRange[0]}
                                onChange={(e) =>
                                    setPriceRange([
                                        Number(e.target.value),
                                        priceRange[1],
                                    ])
                                }
                                className="flex-1 accent-primary"
                            />
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceRange[1]}
                                onChange={(e) =>
                                    setPriceRange([
                                        priceRange[0],
                                        Number(e.target.value),
                                    ])
                                }
                                className="flex-1 accent-primary"
                            />
                        </div>
                    </div>

                    {/* Active Filters & Clear */}
                    {hasActiveFilters && (
                        <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex flex-wrap gap-2">
                                {searchTerm && (
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1">
                                        Búsqueda: "{searchTerm}"
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="hover:bg-primary/20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {selectedCategory !== "all" && (
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1">
                                        {
                                            categories.find(
                                                (c) => c.id === selectedCategory
                                            )?.label
                                        }
                                        <button
                                            onClick={() => setSelectedCategory("all")}
                                            className="hover:bg-primary/20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Limpiar todo
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                    {filteredProducts.length === 0 ? (
                        <span className="text-destructive font-medium">
                            No se encontraron productos
                        </span>
                    ) : (
                        <>
                            Mostrando{" "}
                            <span className="font-bold text-foreground">
                                {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}
                            </span>{" "}
                            de{" "}
                            <span className="font-bold text-foreground">
                                {filteredProducts.length}
                            </span>{" "}
                            {filteredProducts.length === 1 ? "producto" : "productos"}
                        </>
                    )}
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {paginatedProducts.map((product, index) => (
                    <a
                        key={`${product.id}-${index}`}
                        href={`/productos/${product.slug}`}
                        className="group rounded-2xl overflow-hidden border bg-card hover:shadow-xl transition-all duration-300 animate-fade-in"
                        style={{
                            animationDelay: `${index * 50}ms`,
                        }}
                    >
                        <div className="aspect-video overflow-hidden relative">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {product.stock < 5 ? (
                                <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full font-medium">
                                    Stock bajo
                                </div>
                            ) : (
                                <div className="absolute top-3 right-3 bg-green-500 text-green-foreground text-xs px-3 py-1 rounded-full font-medium">
                                    Stock disponible
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-primary">
                                    Bs. {product.price}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Stock: {product.stock}
                                </span>
                            </div>
                            <ul className="space-y-1">
                                {product.features.slice(0, 3).map((feature, i) => (
                                    <li
                                        key={i}
                                        className="text-sm text-muted-foreground flex items-center gap-2"
                                    >
                                        <svg
                                            className="w-4 h-4 text-primary flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="line-clamp-1">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </a>
                ))}
            </div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
                <div className="mt-12">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                        <Search className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                        No se encontraron productos
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        Intenta ajustar tus filtros o búsqueda
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            )}

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}
