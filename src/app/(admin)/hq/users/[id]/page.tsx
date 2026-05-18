"use client";

import type { JSX } from "react";
import { useParams } from "next/navigation";

interface UserParams {
    id: string;
    [key: string]: any;
}

export default function UserView(): JSX.Element {
    const { id } = useParams<UserParams>();

    return (
        <>
            {id}
        </>
    );
}