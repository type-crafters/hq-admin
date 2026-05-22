"use client";

import { useEffect, useState, type JSX } from "react";
import { useParams } from "next/navigation";
import { ToastContent } from "@/common/interface/ToastContent";
import { User } from "@/common/interface/User";
import { Optional } from "@/common/interface/Optional";
import Toast from "@/components/Toast";
import UserStatusBadge from "@/components/UserStatusBadge";
import Spinner from "@/components/Spinner";

interface UserParams {
    id: string;
    [key: string]: any;
}

export default function UserView(): JSX.Element {
    const df = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const { id } = useParams<UserParams>();

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(true);
    const [toast, setToast] = useState<Optional<ToastContent>>({});
    const [user, setUser] = useState<Optional<User>>({});

    const fetchUser = () => {
        setLoading(true);
        if (Object.keys(user).length) setUser({});
        fetch(`/api/hq/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => setToast({ title: "Error", message: error }))
            .finally(() => setTimeout(() => setLoading(false), 500));
    }

    useEffect(fetchUser, [])
    useEffect(() => console.log(user), [user]);

    return (
        <>
            <Toast content={toast} setContent={setToast} />
            <div className="w-full space-y-8">
                <div>
                    <h2 className="text-2xl font-bold">User Details</h2>
                </div>
                {loading ? (
                    <div className="w-full flex justify-center items-center p-8">
                        <Spinner />
                    </div>
                ) : Object.keys(user).length ? (
                    <div className="flex flex-col gap-8">
                        <div className="w-full border border-zinc-500 p-6">
                            <figure className="flex gap-6 items-center">
                                <label className="relative flex" htmlFor="profilePicture">
                                    <input
                                        type="file"
                                        name="profilePicture"
                                        id="profilePicture"
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <picture
                                        className="rounded-full overflow-hidden size-20 cursor-pointer hover:brightness-50 duration-150"
                                    >
                                        <img
                                            src={user.profilePictureUrl}
                                            alt={`${user.firstName} ${user.lastName}'s profile`}
                                            className="w-full h-full bg-zinc-700 object-center object-cover"
                                        />
                                    </picture>
                                </label>
                                <legend className="space-y-2">
                                    <div className="flex gap-4 items-center">
                                        <h3 className="text-2xl font-bold">
                                            {user.firstName} {user.lastName}
                                        </h3>
                                        <UserStatusBadge status={user.status} />
                                    </div>
                                    <p className="opacity-60">
                                        <span>{user.role}</span>
                                        <span>&nbsp;&middot;&nbsp;</span>
                                        <span>Joined {df.format(new Date(user.createdAt))}</span>
                                    </p>
                                </legend>
                            </figure>
                        </div>
                        <div className="w-full flex gap-8 items-stretch">
                            <div className="flex-2 flex flex-col gap-8">
                                <div className="bg-zinc-800/60 border border-zinc-500 *:px-4">
                                    <div className="bg-zinc-700 border-b border-zinc-500 py-2">
                                        <h3 className="flex items-center gap-2 uppercase font-semibold">
                                            <i className="bi bi-person"></i>
                                            Personal information
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-4">
                                        <div>
                                            <label htmlFor="firstName" className="text-sm font-bold uppercase opacity-60">
                                                First Name
                                            </label>
                                            <div
                                                className="cursor-text has-read-only:cursor-default py-1 border-b-2 has-read-only:border-transparent! border-zinc-500 has-focus:border-indigo-500 duration-150"
                                            >
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    readOnly={!editing}
                                                    value={user.firstName}
                                                    className="focus:outline-none text-lg"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="text-sm font-bold uppercase opacity-60">
                                                Last Name
                                            </label>
                                            <div
                                                className="cursor-text has-read-only:cursor-default py-1 border-b-2 has-read-only:border-transparent! border-zinc-500 has-focus:border-indigo-500 duration-150"
                                            >
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    readOnly={!editing}
                                                    value={user.lastName}
                                                    className="focus:outline-none text-lg"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="text-sm font-bold uppercase opacity-60">
                                                Email
                                            </label>
                                            <div
                                                className="cursor-text has-read-only:cursor-default py-1 border-b-2 has-read-only:border-transparent! border-zinc-500 has-focus:border-indigo-500 duration-150"
                                            >
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    readOnly={!editing}
                                                    value={user.email}
                                                    className="focus:outline-none text-lg"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="role" className="text-sm font-bold uppercase opacity-60">
                                                Role
                                            </label>
                                            <div
                                                className="cursor-text has-read-only:cursor-default py-1 border-b-2 has-read-only:border-transparent! border-zinc-500 has-focus:border-indigo-500 duration-150"
                                            >
                                                <input
                                                    type="text"
                                                    name="role"
                                                    id="role"
                                                    readOnly={!editing}
                                                    value={user.role}
                                                    className="focus:outline-none text-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-zinc-800/60 border border-zinc-500  *:px-4">
                                    <div className="bg-zinc-700 border-b border-zinc-500 py-2">
                                        <h3 className="flex items-center gap-2 uppercase font-semibold">
                                            <i className="bi bi-key"></i>
                                            Authentication & Permissions
                                        </h3>
                                    </div>
                                    <div className="py-4">

                                    </div>
                                </div>
                            </div>
                            <div className="bg-zinc-800/60 flex-1 border border-zinc-500  *:px-4">
                                <div className="bg-zinc-700 border-b border-zinc-500 py-2">
                                    <h3 className="flex items-center gap-2 uppercase font-semibold">
                                        <i className="bi bi-graph-up"></i>
                                        Recent activity
                                    </h3>
                                </div>
                                <div className="py-4">

                                </div>
                            </div>
                        </div>
                        <div className="w-full gap-8">

                        </div>
                    </div>
                ) : (
                    <>

                    </>
                )}
            </div>
        </>
    );
}