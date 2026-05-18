import type { Dispatch, JSX, SetStateAction } from "react";
import styles from "@styles/toggle.module.css";

interface ToggleProps {
    id: string;
    name?: string;
    state: boolean;
    label: string;
    labelPosition: "left" | "right";
    setState: Dispatch<SetStateAction<boolean>>;
}

export default function Toggle({
    id,
    name=id,
    label,
    labelPosition,
    state,
    setState
}: ToggleProps): JSX.Element {
    return (
        <label htmlFor={id} className={`group flex ${labelPosition === "left" ? "flex-row" : "flex-row-reverse"}`}>
            <input
                type="checkbox"
                name={name} 
                id={id} 
                checked={state}
                onChange={() => setState(!state)}
                className="hidden"
            />
            <span>{label}</span>
            <div className="flex-1">&nbsp;</div>
            <div className={styles.toggle}></div>
        </label>
    );
}