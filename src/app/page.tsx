import { redirect } from "next/navigation";

export default function IndexView(): never {
    redirect("/dashboard");
}