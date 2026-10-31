"use client";

import { useState} from "react";
import { BookOpen, Check, Leaf} from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { imageFileToDataUrl } from "@/lib/image-file";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const inputClass =
    "mt-2 h-11 rounded-xl border-slate-200 bg-white px-3.5 text-sm shadow-sm placeholder:text-slate-400 focus-visible:border-green-700 focus-visible:ring-green-700/20";


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const RegisterPage = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            Array.from(formData.entries(), ([key, value]) => [key, value.toString().trim()])
        )

        setError(null)

        if (!EMAIL_RE.test(data.email)) {
            setError("Please enter a valid email address, e.g. name@example.com.")
            return
        }
        if (data.password.length < 8) {
            setError("Password must be at least 8 characters.")
            return
        }
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setPending(true)
        try {
            const imageFile = formData.get("imageFile")
            const image = imageFile instanceof File && imageFile.size > 0
                ? await imageFileToDataUrl(imageFile)
                : data.imageUrl || undefined

            const { data: resData, error } = await signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                image,
            })

            if (error) {
                setError(error.message || "Could not create the account.")
                return
            }

            console.log(resData)
            router.push("/")
            router.refresh()
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong. Please try again.")
        } finally {
            setPending(false)
        }
    }
    return (
        <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#f4f7f2] px-4 py-10 sm:px-6">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-green-950/10 bg-white shadow-xl shadow-green-950/10 lg:grid-cols-[0.9fr_1.1fr]">
                <aside className="relative hidden overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-emerald-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full border border-lime-100/10 bg-lime-100/5" />
                    <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border border-lime-100/10 bg-lime-100/5" />
                    <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100/15 text-lime-100">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-lime-200">Your next chapter</p>
                        <h1 className="mt-3 max-w-sm text-4xl font-extrabold leading-tight">A community built around books.</h1>
                        <p className="mt-4 max-w-sm text-sm leading-7 text-green-100">
                            Find your next favorite, share the books you love, and make room for new stories.
                        </p>
                    </div>
                    <div className="relative flex items-center gap-3 text-sm text-green-100">
                        <Leaf className="h-4 w-4 text-lime-200" /> A quiet corner for curious readers
                    </div>
                </aside>

                <section className="p-6 sm:p-10 lg:p-12">
                    <div className="mx-auto max-w-md">
                        <div className="mb-8 lg:hidden">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-800">
                                <BookOpen className="h-5 w-5" />
                            </span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-800">Join the community</p>
                        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Create your account</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">Sign up to discover and share books with BookNook.</p>

                        <form className="mt-8 flex flex-col gap-5" onSubmit={onSubmit}>
                            <div>
                                <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    placeholder="Your full name"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={8}
                                    pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
                                    title="Password must be at least 8 characters and include one uppercase letter and one number."
                                    placeholder="Enter your password"
                                    className={inputClass}
                                />
                                <p className="mt-2 text-xs text-slate-500">At least 8 characters, with one uppercase letter and one number.</p>
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    placeholder="Re-enter your password"
                                    className={inputClass}
                                />
                                <p className="mt-2 text-xs text-slate-500">At least 8 characters, with one uppercase letter and one number.</p>
                            </div>



                            <Button
                                type="submit"
                                className="mt-1 h-11 w-full rounded-xl bg-green-800 text-sm font-bold text-white shadow-md shadow-green-900/15 hover:bg-green-900"
                            >
                                <Check />
                                Create account
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500">A welcoming shelf for every reader.</p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default RegisterPage;
