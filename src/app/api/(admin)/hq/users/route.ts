import { ListResponse } from "@/common/interface/ListResponse";
import { User } from "@/common/interface/User";

export async function GET() {
	const url = new URL("/api/users", process.env.API_URL);

	try {
		const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

		if (response.ok) {
			const payload: ListResponse<User> = await response.json();
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
