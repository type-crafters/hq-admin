import type { Dispatch, JSX, SetStateAction } from "react";
import styles from "@styles/toggle.module.css";

interface ToggleProps {
    id: string;
    name?: string;
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
    label: string;
    labelPosition: "left" | "right";
    disabled?: boolean;
}

export default function Toggle({
    id,
    name=id,
    state,
    setState,
    label,
    labelPosition,
    disabled=false
}: ToggleProps): JSX.Element {
    return (
        <label htmlFor={id} className={`group flex ${labelPosition === "left" ? "flex-row" : "flex-row-reverse"}`}>
            <input
                type="checkbox"
                name={name} 
                id={id} 
                checked={state}
                onChange={() => setState(!state)}
                disabled={disabled}
                className="hidden"
            />
            <span>{label}</span>
            <div className="flex-1">&nbsp;</div>
            <div className={styles.toggle}></div>
        </label>
    );
}