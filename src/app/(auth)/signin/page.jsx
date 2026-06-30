"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input } from "@heroui/react";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { LayoutGrid } from "lucide-react";
import { useGoogleAuth } from "@/lib/helper/utils-client";
import Image from "next/image";
import toast from "react-hot-toast";

export default function SigninPage() {
    // Form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const { handleGoogleAuth, googleLoading } = useGoogleAuth();

    const handleSignin = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { data, error: authError } = await signIn.email({
                email,
                password,
                callbackURL: "/auth/callback",
            });

            if (authError) {
                setError(authError.message || "Invalid email or password.");

                return;
            } else {    
                toast.success("Signed in successfully!");

                setSuccess("Signed in successfully! Redirecting...");
                setEmail("");
                setPassword("");
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-200 lg:flex bg-cover bg-center"
            style={{ backgroundImage: "url('/images/signup-bg.png')" }}
        >
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 rounded-xl">
                <div className="flex justify-center">
                    <Link href="/">
                        <Image
                            src="/images/lexi-cart.png"
                            alt="Job Portal"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    </Link>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-stone-900 mb-1 mt-9">
                            Welcome Back!
                        </h2>
                        <div className="text-sm text-zinc-600">
                        New to LexiCart?{" "}
                            <Link href="/signup" className="font-medium cursor-pointer text-sm text-[#f10262]">
                                Signup
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Button
                            onClick={handleGoogleAuth}
                            disabled={googleLoading}
                            type="button"
                            variant="outline"
                            className="w-full h-9.5 rounded-xl border-stone-200 bg-white hover:bg-white text-stone-900 font-semibold relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {googleLoading ? (
                                "Redirecting to Google..."
                                ) : (
                                <>
                                    <FcGoogle className="text-lg" />
                                    Login with Google
                                </>
                                )}
                            </span>

                            <span className="absolute inset-0 bg-stone-100 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                        </Button>
                    </div>
                </div>

                <div className="relative flex items-center">
                    <div className="flex-1 border-t border-stone-200"></div>

                    <span className="px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                    Or continue with email
                    </span>

                    <div className="flex-1 border-t border-stone-200"></div>
                </div>

                <form onSubmit={handleSignin} className="flex flex-col gap-5">
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 rounded-xl px-3 bg-zinc-50 focus-within:border-primary transition-colors">
                            <At className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Password Field */}
                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                            <button
                                className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup>
                    </TextField>

                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}

                    {/* Action Button */}
                    <Button
                        type="submit"
                        color="primary"
                        className="relative overflow-hidden w-full font-semibold rounded-xl text-sm bg-[#f10262] h-9.5 group"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        <span className="relative z-10">Sign In</span>

                        <span className="absolute inset-0 rounded-xl bg-[#5d1bb6] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>  
                    </Button>

                    {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        New to LexiCart?{" "}
                        <Link href="/signup" className="font-medium cursor-pointer text-sm text-[#f10262]">
                            Create an account
                        </Link>
                    </div>

                </form>
            </Card>
        </div>
    );
}