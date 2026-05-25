import {
    useEffect,
    useState,
    type Dispatch,
    type JSX,
    type ReactNode,
    type SetStateAction
} from "react";

interface DialogProps {
    id?: string;
    modal?: boolean;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

export default function Dialog({
    id,
    modal = false,
    open,
    setOpen,
    children
}: DialogProps): JSX.Element | null {
    const [mounted, setMounted] = useState(open);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setMounted(true);

            const frame = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setVisible(true);
                });
            });

            return () => cancelAnimationFrame(frame);
        }

        setVisible(false);

        const timeout = setTimeout(() => {
            setMounted(false);
        }, 300);

        return () => clearTimeout(timeout);

    }, [open]);

    if (!mounted) return null;

    const close = () => {
        setOpen(false);
    };

    return (
        <div
            {...(id ? { id } : {})}
            className={`fixed inset-0 w-screen h-screen z-50 duration-300 ${visible ? "backdrop-brightness-75 backdrop-blur-xs" : ""}`}
            onClick={() => !modal && close()}
        >
            <div
                className={`w-full h-full flex justify-center items-center pointer-events-none duration-300 ${visible ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"}`}
            >
                <div
                    role="dialog"
                    className="min-w-lg w-max max-w-2xl bg-zinc-700 p-4 rounded-lg shadow-sm shadow-zinc-800 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}