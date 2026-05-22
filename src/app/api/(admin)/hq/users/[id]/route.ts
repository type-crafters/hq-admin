import { ItemResponse } from "@/common/interface/ItemResponse";
import { User } from "@/common/interface/User";

interface UserDetailsPathParams {
    id: string;
}

interface UserDetailsGetArgs {
    params: Promise<UserDetailsPathParams>;
}

export async function GET(request: Request, { params }: UserDetailsGetArgs) {
    const { id } = await params;
    const url = new URL(`/api/users/${id}`, process.env.API_URL);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            const payload: ItemResponse<User> = await response.json();
            return Response.json(payload.data, { status: response.status });
        }

        if (response.status === 404) {
            return Response.json({ error: "Not found" }, { status: 404 });
        }

        return Response.json({ error: "Request failed" }, { status: response.status });
    } catch {
        return Response.json({ error: "Unexpected error" }, { status: 500 });
    }
}
