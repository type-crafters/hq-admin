"use client";

import { Message } from "@/common/interface/Message";
import { dateFormat } from "@/common/util";
import { type JSX } from "react";

export default function MessageView(): JSX.Element {
    const message: Message = {
        id: crypto.randomUUID(),
        firstName: "Diego",
        lastName: "Chan",
        mailTo: "xdiego.chanx@gmail.com",
        subject: "Negros en la Compañía",
        content: "Lorem ipsum dolor sit amet",
        receivedAt: new Date("2026-05-09T01:21:23.586Z"),
        readAt: new Date("2026-05-09T01:21:23.586Z"),
        repliedAt: null,
        ipAddress: "192.168.0.1",
        userAgent: "Mozilla Firefox"
    };

    if (message) {
        return (
            <div className="w-full max-w-5xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{message.subject}</h2>
                    <p className="opacity-60">From {message.firstName} {message.lastName}</p>
                </div>
                <section className="space-y-4">
                    <h3 className="text-sm uppercase font-bold opacity-60">Sender Information</h3>
                    <dl className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-2">
                        <dt className="flex items-center gap-2 uppercase font-bold text-sm opacity-60">
                            <i className="bi bi-person"></i>
                            Name
                        </dt>
                        <dd>
                            {message.firstName} {message.lastName}
                        </dd>

                        <dt className="flex items-center gap-2 uppercase font-bold text-sm opacity-60">
                            <i className="bi bi-envelope"></i>
                            Email
                        </dt>
                        <dd>
                            {message.mailTo}
                        </dd>
                        <dt className="flex items-center gap-2 uppercase font-bold text-sm opacity-60">
                            <i className="bi bi-inbox"></i>
                            Received at
                        </dt>
                        <dd>
                            <time dateTime={message.receivedAt.toISOString()}>
                                {dateFormat.format(new Date(message.receivedAt))}
                            </time>
                        </dd>
                        <dt className="flex items-center gap-2 uppercase font-bold text-sm opacity-60">
                            <i className="bi bi-clock"></i>
                            Status
                        </dt>
                        <dd>
                            {message.repliedAt ? (
                                <span className="inline-flex items-center gap-2 px-2 rounded border border-green-500 bg-green-950 text-green-400">
                                    <i className="bi bi-send text-sm"></i>
                                    Replied
                                </span>
                            ) : message.readAt ? (
                                <span className="inline-flex items-center gap-2 px-2 rounded border border-green-500 bg-green-950 text-green-400">
                                    <i className="bi bi-envelope-paper text-sm"></i>
                                    Read
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-2 px-2 rounded border border-green-500 bg-green-950 text-green-400">
                                    <i className="bi bi-envelope text-sm"></i>
                                    Received
                                </span>
                            )}
                        </dd>
                    </dl>
                </section>
                <section className="space-y-4">
                    <h3 className="uppercase font-bold text-sm opacity-60">Message Content</h3>
                    <div className="border border-zinc-500 bg-zinc-900/50 rounded p-4 max-h-75 overflow-auto">
                        {message.content}
                    </div>
                </section>
                <section className="space-y-4">
                    <h3 className="uppercase font-bold text-sm opacity-60">Technical Details</h3>
                    <dl className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-4">
                        <dt className="flex items-center gap-2 uppercase font-bold text-sm opacity-60">
                            <i className="bi bi-globe"></i>
                            IP Address
                        </dt>
                        <dd>
                            <pre className="border border-zinc-500 bg-zinc-900/50 px-4 rounded w-fit">{message.ipAddress}</pre>
                        </dd>
                        <dt className="flex items-center gap-2 uppercase font-bold text-sm opacity-60">
                            <i className="bi bi-display"></i>
                            User Agent
                        </dt>
                        <dd>
                            <pre className="border border-zinc-500 bg-zinc-900/50 px-4 rounded w-fit">{message.userAgent}</pre>
                        </dd>
                    </dl>
                </section>
            </div>
        );
    } else {
        return (
            <p className="w-full p-2 text-center opacity-60">This message could not be found.</p>
        );
    }
}