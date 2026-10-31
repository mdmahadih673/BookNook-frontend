
export function LoadingSpinner({ text = 'Loading BookNook...' }: { text?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 space-y-4">
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-950"></div>
                <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">{text}</p>
        </div>
    );
}
