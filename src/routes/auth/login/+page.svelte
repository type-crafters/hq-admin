<script lang="ts">
    let type: "text" | "password" = $state("password");
    let email: string = $state("");
    let password: string = $state("");
</script>

<div class="w-full h-screen flex justify-center items-center">
    <div class="w-full max-w-100 bg-white/10">
        <div class="border border-neutral-600 shadow-md">
            <div id="form-title" class="w-full bg-white/5 py-2">
                <h1 class="font-bold text-xl text-center">Sign in to HQ Admin</h1>
            </div>
            <form id="login" class="p-4">
                <div class="space-y-6">
                    <div class="space-y-1">
                        <label for="email" class="block">Email</label>
                        <input
                            type="email"
                            id="email"
                            autocomplete="off"
                            bind:value={email}
                            class="w-full py-1 px-2 border bg-transparent border-neutral-600 focus:outline-1 outline-blue-500 rounded-sm"
                        />
                    </div>
                    <div class="space-y-1">
                        <label for="password" class="block">Password</label>
                        <input
                            {type}
                            id="password"
                            autocomplete="off"
                            bind:value={password}
                            class="w-full py-1 px-2 border bg-transparent border-neutral-600 focus:outline-1 outline-blue-500 rounded-sm"
                        />
                    </div>
                    <div class="flex justify-between">
                        <div class="flex gap-2 items-center">
                            <label for="showPassword" class="group size-4 border flex justify-center items-center border-neutral-600">
                                <i class="bi bi-check scale-0 group-has-checked:scale-100 text-blue-500 duration-150"></i>
                                <input type="checkbox" name="showPassword" id="showPassword" class="hidden">
                            </label>
                            <span>Show password</span>
                        </div>
                        <div>
                            <a href="/" class="text-blue-400 hover:underline">Forgot password?</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
