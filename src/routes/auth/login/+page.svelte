<script lang="ts">
    let showPassword: boolean = $state(false);

    let form: HTMLFormElement;
    function enterIsSubmit(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            form?.submit();
        }
    }
</script>

<div class="w-full min-h-screen flex justify-center items-center p-4">
    <div class="w-full max-w-md">
        <!-- Login Card -->
        <div class="bg-zinc-700/40 backdrop-blur-md border-2 border-zinc-600 rounded-lg shadow-2xl p-8 space-y-6 animate-fade-in">
            <!-- Logo & Header -->
            <div class="text-center space-y-2">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-violet-600 rounded-full mb-4">
                    <i class="bi bi-lock-fill text-3xl"></i>
                </div>
                <h1 class="text-3xl font-semibold text-white">
                    TypeCrafters Administration
                </h1>
                <p class="text-zinc-400 text-sm">Sign in to manage projects</p>
            </div>

            <!-- Form -->
            <form method="POST" class="space-y-4" bind:this={form}>
                <!-- Email Input -->
                <div class="space-y-2">
                    <label for="email" class="block text-sm font-semibold opacity-80">Email address</label>
                    <div class="group flex items-center gap-2 p-2 border-2 border-zinc-600 rounded-lg text-white placeholder:opacity-50 has-focus:ring-2 ring-violet-600 duration-150 has-focus:border-transparent outline-none">
                        <i class="bi bi-at text-xl opacity-50"></i>
                        <input
                            type="email" 
                            name="email" 
                            id="email" 
                            onkeydown={enterIsSubmit}
                            placeholder="admin@example.com"
                            class="min-w-0 flex-1 focus:outline-none bg-transparent"
                        >
                    </div>
                </div>
                <!-- Password Input -->
                 <div class="space-y-2">
                    <label for="password" class="block text-sm font-semibold opacity-80">Password</label>
                    <div class="group flex items-center gap-2 p-2 border-2 border-zinc-600 rounded-lg text-white placeholder:opacity-50 has-focus:ring-2 ring-violet-600 duration-150 has-focus:border-transparent outline-none">
                        <i class="bi bi-lock text-lg opacity-50"></i>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            onkeydown={enterIsSubmit}
                            placeholder="••••••••"
                            class="min-w-0 flex-1 focus:outline-none bg-transparent"
                        >
                        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
                        <label tabindex="0" for="show-password" class="cursor-pointer">
                            <input type="checkbox" name="show-password" id="show-password" class="hidden" bind:checked={showPassword}>
                            <i class={[ "bi", showPassword ? "bi-eye-slash" : "bi-eye", "text-xl opacity-50"]}></i>
                        </label>
                    </div>
                </div>
                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between text-sm">
                    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
                    <label tabindex="0" for="rememberMe" class="group flex gap-2 items-center cursor-pointer">
                        <input
                            type="checkbox"
                            class="hidden"
                            name="rememberMe"
                            id="rememberMe"
                        />
                        <div
                            role="presentation"
                            class="size-4 flex items-center justify-center rounded border border-zinc-600 group-has-focus:ring-2 ring-violet-600"
                        >
                            <i class="bi bi-check text-lg text-violet-500 scale-0 group-has-checked:scale-100 duration-150"></i>
                        </div>
                        <span>Remember me</span>
                    </label>
                    <a href="/" class="text-violet-600 hover:text-violet-400 hover:underline font-semibold">
                        Forgot password?
                    </a>
                </div>

                <!-- Login Button -->
                <input
                    type="submit" 
                    value="Sign in"
                    class="w-full py-2 rounded-lg bg-linear-to-r from-indigo-500 to-violet-600 hover:from-violet-600 hover:to-indigo-500 hover:scale-101 active:scale-100 text-white font-semibold transition-all duration-200 cursor-pointer"
                >
            </form>
            <!-- Divider -->
            <div class="relative">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-zinc-600"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-zinc-800 rounded-full text-zinc-400">OR</span>
                </div>
            </div>

            <!-- Social Login Options -->
            <div class="grid md:grid-cols-2 gap-3">
                <button
                    class="flex items-center justify-center gap-2 py-3 px-4 border-2 border-zinc-600 bg-zinc-700/75 rounded-lg hover:border-violet-600 hover:bg-zinc-600/40 transition-all font-semibold text-zinc-300"
                >
                    <i class="bi bi-lock text-lg"></i>
                    <span>SSO</span>
                </button>
                <button
                    class="flex items-center justify-center gap-2 py-3 px-4 border-2 border-zinc-600 bg-zinc-700/75 rounded-lg hover:border-violet-600 hover:bg-zinc-600/40 transition-all font-semibold text-zinc-300"
                >
                    <i class="bi bi-key text-xl rotate-135 -ml-2"></i>
                    <span>2FA</span>
                </button>
            </div>

            <!-- Footer -->
            <p class="text-center text-sm text-zinc-400">
                <span>Need help?</span>
                <a href="/" class="text-violet-600 hover:text-purple-400 font-semibold">
                    Contact Support
                </a>
            </p>
        </div>
    </div>
</div>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 0.5s ease-out;
    }
</style>
