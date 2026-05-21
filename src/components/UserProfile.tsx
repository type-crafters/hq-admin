import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";

export interface UserProfileProps {
    firstName: string;
    lastName: string;
    profilePictureUrl?: string;
    role: string;
}

export default function UserProfile({
    firstName,
    lastName,
    profilePictureUrl,
    role
}: UserProfileProps): JSX.Element {
    return (
        <Link href="/hq/users/profile" className="inline-flex items-center gap-4 rounded hover:bg-zinc-700 duration-150 py-1 px-2">
            <div className="flex justify-center items-center size-10 rounded-full overflow-hidden bg-blue-500/20 border-2 border-blue-500 text-blue-500">
                {profilePictureUrl ? (
                    <Image src={profilePictureUrl} alt={`${firstName} ${lastName}'s profile`}/>
                ) : (
                    <span className="font-semibold">{firstName.at(0)}{lastName.at(0)}</span>
                )}
            </div>
            <div>
                <h2 className="font-semibold">{firstName} {lastName}</h2>
                <p className="text-xs opacity-60">{role}</p>
            </div>
        </Link>
    );
}