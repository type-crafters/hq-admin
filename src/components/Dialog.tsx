import { useEffect, useState, type Dispatch, type JSX, type ReactNode, type SetStateAction } from "react";

interface DialogProps {
    id?: string;
    modal?: boolean;
    mounted: boolean;
    setMounted: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

export default function Dialog({
    id,
    modal = false,
    mounted,
    setMounted,
    children
}: DialogProps): JSX.Element | null {
    const [visible, setVisible] = useState<boolean>(false);
    
    useEffect(() => {
        if (mounted) requestAnimationFrame(() => setVisible(true));
    }, [mounted]);
    
    const close = () => {
        setVisible(false);
        const t = setTimeout(() => setMounted(false), 300);
        return () => clearTimeout(t);
    }
    
    if (!mounted) return null;

    return (
        <div
            {...(id ? { id } : {})}
            className={`fixed inset-0 w-screen h-screen z-50 duration-300 ${visible ? "backdrop-brightness-75 backdrop-blur-xs" : ""}`}
            onClick={() => !modal && close()}
        >
            <div className={`w-full h-full flex justify-center items-center pointer-events-none duration-300  ${visible ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"}`}>
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