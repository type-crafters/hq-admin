import { OptionalToastContent } from "@/common/interface/ToastContent";
import { type Dispatch, type JSX, type SetStateAction, useEffect, useState } from "react";

interface ToastProps {
    content: OptionalToastContent;
    timeout?: number;
    setContent: Dispatch<SetStateAction<OptionalToastContent>>;
    buttonText?: string;
}

export default function Toast({
    content,
    setContent,
    timeout = 5000,
    buttonText = "Close"
}: ToastProps): JSX.Element | null {
    const [rendered, setRendered] = useState(!!Object.keys(content).length);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (Object.keys(content).length) {
            setRendered(true);
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
            const timer = setTimeout(() => setRendered(false), 300);
            return () => clearTimeout(timer);
        }
    }, [content]);

    const close = () => setContent({});

    useEffect(() => {
        if (!visible) return;
        const timer = setTimeout(close, timeout);
        return () => clearTimeout(timer);
    }, [visible]);

    if (!rendered) return null;

    return (
        <div className="w-full flex justify-center fixed inset-x-0 top-6 pointer-events-none">
            <div className={`
                border border-zinc-500 bg-zinc-700 rounded p-4 min-w-2xs w-max max-w-sm 
                duration-300 ease-in-out pointer-events-auto 
                ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
            `}>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <h2 className="text-lg font-bold">{content.title}</h2>
                        <p>{content.message}</p>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="bg-zinc-100 hover:bg-zinc-200 duration-150 text-black text-sm font-semibold rounded px-2 py-1"
                            onClick={close}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}