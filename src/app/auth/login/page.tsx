"use client";

import LoginFooter from "@/components/LoginFooter";
import { useState, type JSX } from "react";

export default function LoginPage(): JSX.Element {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
    async function login(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const submit = event.nativeEvent.submitter as HTMLButtonElement;
        try {
            submit.disabled = true;
            const url = new URL("/auth/login", process.env.NEXT_PUBLIC_API_URL);

            const data = new FormData(form);

            const payload = {
                email: data.get("email"),
                password: data.get("password")
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            console.log({ status: response.status, statusText: response.statusText });
        } catch (error) {
            console.error(error);
        } finally {
            submit.disabled = false;
        }
    }

    return (
        <>
            <main className="w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
                <div className="flex-1 flex items-center">
                    <form onSubmit={login} className="w-full max-w-lg bg-zinc-900 px-8 py-6 border border-indigo-500">
                        <div className="w-full space-y-6">
                            <div className="w-fit mx-auto p-2 rounded border border-indigo-500 bg bg-indigo-800/40">
                                <i className="bi bi-lock text-4xl text-indigo-400"></i>
                            </div>
                            <div className="space-y-1 text-center">
                                <h2 className="text-indigo-500 uppercase text-lg">TypeCrafters HQ</h2>
                                <h1 className="text-2xl font-bold uppercase">Admin Control Panel</h1>
                                <p className="text-neutral-400">
                                    Authorized personnel only.&nbsp;
                                    <strong className="font-normal text-pink-500">
                                        All access is strictly controlled.
                                    </strong>
                                </p>
                            </div>
                            <div className="flex items-center text-center gap-4 uppercase text-xs opacity-35 before:content-[''] before:flex-1 before:border-t after:content-[''] after:flex-1 after:border-t">
                                Identity Verification
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm opacity-60 uppercase font-semibold">Email address</label>
                                    <div className="flex items-center border border-zinc-600 rounded bg-zinc-800/60 outline outline-transparent has-focus:outline-indigo-500 duration-150 px-2 py-1 gap-2">
                                        <i className="bi bi-person-vcard opacity-60"></i>
                                        <input type="email" name="email" id="email" placeholder="name@example.com" className="flex-1 focus:outline-none text-lg" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm opacity-60 uppercase font-semibold">Password</label>
                                    <div className="flex items-center border border-zinc-600 rounded bg-zinc-800/60 outline outline-transparent has-focus:outline-indigo-500 duration-150 px-2 py-1 gap-2">
                                        <i className="bi bi-key opacity-60"></i>
                                        <input type={passwordVisibility ? "text" : "password"} name="password" id="password" placeholder="My$trongPassword_123" className="flex-1 focus:outline-none text-lg" />
                                        <button type="button" className="flex items-center opacity-60" onClick={() => setPasswordVisibility(!passwordVisibility)}>
                                            {passwordVisibility ? (
                                                <i className="bi bi-eye-slash"></i>
                                            ) : (
                                                <i className="bi bi-eye"></i>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <label htmlFor="rememberMe" className="group flex items-center gap-2">
                                        <input type="checkbox" name="rememberMe" id="rememberMe" className="hidden" />
                                        <div className="cursor-pointer size-4 rounded border border-zinc-600 bg-zinc-800/60 flex justify-center items-center">
                                            <i className="bi bi-check text-indigo-500 text-lg scale-0 group-has-checked:scale-100"></i>
                                        </div>
                                        <span className="opacity-60">Remember me</span>
                                    </label>
                                    <a href="/auth/password/forgot" className="text-indigo-500 visited:text-pink-900 hover:underline">Forgot your password?</a>
                                </div>
                                <div>
                                    <button type="submit" className="uppercase font-semibold text-lg bg-indigo-800 hover:bg-indigo-900 duration-150 rounded w-full py-2 flex justify-center items-center gap-2">
                                        Enter
                                        <i className="bi bi-box-arrow-in-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <LoginFooter />
            </main>
        </>
    );
}