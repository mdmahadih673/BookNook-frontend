"use client";

import { useState } from "react";
import { BookOpen, Check, Leaf, } from "lucide-react";
import { signIn, } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Field, FieldDescription } from "@/components/ui/field";
import Link from "next/link";

const inputClass =
    "mt-2 h-11 rounded-xl border-slate-200 bg-white px-3.5 text-sm shadow-sm placeholder:text-slate-400 focus-visible:border-green-700 focus-visible:ring-green-700/20";


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const SignInPage = () => {
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

        setPending(true)
        try {
            const { data: resdata, error } = await signIn.email({
                email: data.email,
                password: data.password,
                rememberMe: true,
                callbackURL: "/",
            })

            if (error) {
                setError(error.message || "Could not sign in.")
                return
            }

            console.log(resdata)
            router.push("/")
            router.refresh()
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setPending(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setError(null)
        setPending(true)
        try {
            const { error } = await signIn.social({
                provider: 'google',
                callbackURL: '/'
            });
            if (error) {
                setError(error.message || "Google sign-in failed.");
                setPending(false)
            }
        } catch {
            setError("Something went wrong. Please try again.")
            setPending(false)
        }
    }

    const handleGitHubSignUp = async () => {
        setError(null)
        setPending(true)
        try {
            const { error } = await signIn.social({
                provider: 'github',
                callbackURL: '/'
            });
            if (error) {
                setError(error.message || "Google sign-in failed.");
                setPending(false)
            }
        } catch {
            setError("Something went wrong. Please try again.")
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
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-800">Welcome back</p>
                        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Sign in to BookNook</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">Continue exploring and sharing books with the community.</p>

                        <form className="mt-8 flex flex-col gap-5" onSubmit={onSubmit}>


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



                            <Button
                                type="submit"
                                className="mt-1 h-11 w-full rounded-xl bg-green-800 text-sm font-bold text-white shadow-md shadow-green-900/15 hover:bg-green-900"
                            >
                                <Check />
                                Sign In
                            </Button>

                        </form>

                        <Field className="mt-6 ">
                            <Button
                                className={'cursor-pointer'}
                                variant="outline"
                                type="button"
                                onClick={handleGitHubSignUp}
                                disabled={pending}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Login with GitHub
                            </Button>
                            <Button
                                className={'cursor-pointer'}
                                variant="outline"
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={pending}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Login with Google
                            </Button>
                            <FieldDescription className="my-6 text-center">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/Register"
                                    className="underline underline-offset-4 hover:text-foreground"
                                >
                                    Register
                                </Link>
                            </FieldDescription>
                        </Field>

                        <p className="text-center text-sm text-slate-500">A welcoming shelf for every reader.</p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default SignInPage;
