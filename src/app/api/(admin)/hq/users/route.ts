import { ErrorResponse } from "@/common/interface/ErrorResponse";
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

		let payload: ListResponse<User> | ErrorResponse;

		if (response.ok) {
			payload = await response.json() as ListResponse<User>;
		} else {
			payload = await response.json() as ErrorResponse;
		}
		
		return Response.json(payload, { status: response.status });

	} catch {
		return Response.json({ error: "Unexpected error" }, { status: 500 });
	}
}
