"use client";

import {
  Button,
  Input,
  InputGroup,
  Label,
  Link,
  Radio,
  RadioGroup,
  TextField,
} from "@heroui/react";
import { useState } from "react";

import { signUp } from "@/lib/auth-client";
import { At, Eye, EyeSlash, Person, ShieldKeyhole } from "@gravity-ui/icons";
import Image from "next/image";

import { BarChart3, Briefcase, Users } from "lucide-react";
import { useGoogleAuth } from "@/lib/helper/utils-client";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("seeker");

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { handleGoogleAuth, googleLoading } = useGoogleAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        image,
        role,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Something went wrong during signup.");
      } else {
        setSuccess("Account created successfully! Welcome.");

        setName("");
        setEmail("");
        setPassword("");

        router.push("/signin");
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    {
      title: "Job Analytics",
      description: "Track hiring performance and trends",
      icon: BarChart3,
      active: true,
    },
    {
      title: "Job Listings",
      description: "Manage open positions",
      icon: Briefcase,
      active: false,
    },
    {
      title: "Candidates",
      description: "Review and manage applicants",
      icon: Users,
      active: false,
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center items-center justify-center"
        style={{ backgroundImage: "url('/images/signup-bg.png')" }}
      >
        <div className="bg-white/30 space-y-6 rounded-2xl py-14 px-10">
          {/* Hero Image */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/images/lexi-cart.png"
                alt="Job Portal"
                width={250}
                height={250}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm text-white/70 hover:bg-white/10 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.active ? "bg-white/20" : "bg-white/10"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <p className="font-medium leading-tight text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-white/60">{item.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 lg:px-12">
        <div className="signp-container w-full max-w-md">
          <header className="mb-5">
            <h2 className="text-3xl md:text-3xl font-bold tracking-tight text-stone-900 mb-1">
              Create your account
            </h2>

            <p className="text-sm text-stone-500">
              Have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-[#f10262] transition-colors"
              >
                Sign in Now
              </Link>
            </p>
          </header>

          <div className="mb-5">
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
                        Continue with Google
                    </>
                    )}
                </span>

                <span className="absolute inset-0 bg-stone-100 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
            </Button>
          </div>

          <div className="relative flex items-center mb-8 ">
            <div className="flex-1 border-t border-stone-200"></div>

            <span className="px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
              Or continue with email
            </span>

            <div className="flex-1 border-t border-stone-200"></div>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <TextField isRequired name="name" className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Name
              </Label>
              <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                <Person
                  className="text-zinc-400 pointer-events-none"
                  size={16}
                />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                />
              </InputGroup>
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email Address
              </Label>
              <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                <At className="text-zinc-400 pointer-events-none" size={16} />
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                />
              </InputGroup>
            </TextField>

            <TextField
              isRequired
              name="password"
              className="flex flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </Label>
              <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                <ShieldKeyhole
                  className="text-zinc-400 pointer-events-none"
                  size={16}
                />
                <Input
                  type={isVisible ? "text" : "password"}
                  placeholder="Choose a password"
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

            <TextField
              isRequired
              name="image"
              type="text"
              className="flex flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Image Url
              </Label>
              <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                <At className="text-zinc-400 pointer-events-none" size={16} />
                <Input
                  placeholder="https://www.website.com"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                />
              </InputGroup>
            </TextField>

            <div className="flex flex-col gap-4">
              <Label>Subscription plan</Label>
              <RadioGroup
                defaultValue="seeker"
                name="role"
                onChange={(value) => setRole(value)}
                orientation="horizontal"
                className="flex gap-6"
              >
                <Radio value="seeker" className="flex items-center gap-2">
                  <Radio.Control className="text-[#f10262]">
                    <Radio.Indicator className="bg-[#f10262]" />
                  </Radio.Control>

                  <Radio.Content>
                    <Label className="cursor-pointer">Reader</Label>
                  </Radio.Content>
                </Radio>

                <Radio value="recruiter" className="flex items-center gap-2">
                  <Radio.Control className="text-[#f10262]">
                    <Radio.Indicator className="bg-[#f10262]" />
                  </Radio.Control>

                  <Radio.Content>
                    <Label className="cursor-pointer">Librarian</Label>
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            </div>

            {error && (
              <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}

            {success && (
              <div className="p-3.5 text-xs font-medium rounded-xl bg-green-50 text-green-800">
                <span className="font-semibold">Success:</span> {success}
              </div>
            )}

            <Button
              type="submit"
              color="primary"
              className="relative overflow-hidden w-full font-semibold rounded-xl text-sm bg-[#f10262] h-9.5 group"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              <span className="relative z-10">Sign Up</span>

              <span className="absolute inset-0 rounded-xl bg-[#5d1bb6] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
            </Button>

            <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium cursor-pointer text-sm text-[#f10262] dark:text-[#5d1bb6]"
              >
                Signin
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
