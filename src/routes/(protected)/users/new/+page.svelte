<script>
    import Container from "$lib/Container.svelte";
</script>

<Container id="new-user" maxWidth="max-w-2xl" centered>
    <div>
        <h2 class="font-semibold text-2xl">Invite user</h2>
        <p class="opacity-60">Send an invitation to add a new user to this organization</p>
    </div>
    <div class="rounded-lg border-zinc-600 p-4">
        <div>
            <h3 class="text-lg font-semibold">User information</h3>
            <p>Enter the details of the person you want to invite</p>
        </div>
        <div class="space-y-6">
            <div class="space-y-2">
                <label for="firstName" class="block font-semibold opacity-80 text-sm">First name</label>
                <div class="group flex items-center p-2 rounded border border-zinc-600 has-focus:ring-2 ring-blue-500">
                    <i class="bi bi-person text-lg opacity-60"></i>
                    <input type="text" name="firstName" id="firstName">
                </div>
            </div>
            <div class="space-y-2">
                <label for="lastName" class="block font-semibold opacity-80 text-sm">Last name</label>
                <div class="group flex items-center p-2 rounded border border-zinc-600 has-focus:ring-2 ring-blue-500">
                    <i class="bi bi-person text-lg opacity-60"></i>
                    <input type="text" name="lastName" id="lastName">
                </div>
            </div>
            <div class="space-y-2">
                <label for="email" class="block font-semibold opacity-80 text-sm">Email address</label>
                <div class="group flex items-center p-2 rounded border border-zinc-600 has-focus:ring-2 ring-blue-500">
                    <i class="bi bi-envelope text-lg opacity-60"></i>
                    <input type="email" name="email" id="email">
                </div>
            </div>
        </div>
    </div>
</Container>
