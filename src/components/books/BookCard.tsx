import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Layers } from 'lucide-react';
import Image from 'next/image';
import { IBook } from '@/types/book.types';


export function BookCard({ book }: { book: IBook }) {
    const isAvailable = book.availableCopies > 0;

    return (
            <Card className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/90">
                <div>
                    {/* Book Cover Image */}
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100 sm:h-60 dark:bg-slate-800">
                        <Image
                            width={4000}
                            height={40}
                            src={book.image}
                            alt={book.title}
                            unoptimized
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 max-w-[45%]">
                            <Badge variant="secondary" className="max-w-full truncate bg-white/80 text-[10px] leading-4 shadow-sm backdrop-blur-md sm:text-xs dark:bg-slate-900/80">
                                {book.category}
                            </Badge>
                        </div>
                        <div className="absolute top-3 right-3 max-w-[55%]">
                            <Badge variant={isAvailable ? 'default' : 'destructive'} className="max-w-full truncate text-[10px] leading-4 shadow-sm sm:text-xs">
                                {isAvailable ? `${book.availableCopies} Copies Available` : 'Out of Stock'}
                            </Badge>
                        </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-5 space-y-2.5">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors">
                            {book.title}
                        </h3>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-1.5">
                            <User className="h-4 w-4 shrink-0 text-slate-400" />
                            <span className="truncate">{book.author}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {book.description || 'No description available for this book.'}
                        </p>
                    </CardContent>
                </div>

                <CardFooter className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between">
                    <div className="flex items-center text-xs text-slate-500 space-x-1">
                        <Layers className="h-3.5 w-3.5 text-green-700" />
                        <span>Total: {book.totalCopies}</span>
                    </div>
                    <Link href={`/books/${book._id}`} className="rounded-lg bg-green-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-900">
                        View Details
                    </Link>
                </CardFooter>
            </Card>
    );
}
