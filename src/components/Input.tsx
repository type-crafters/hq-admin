import type { Dispatch, JSX, KeyboardEventHandler, SetStateAction } from "react";

type TextInputType = 
| "text"
| "email"
| "password"
| "search"
| "tel"
| "url"
| "number"

interface TextboxProps {
    id: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    pattern?: string;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    state: string;
    setState: Dispatch<SetStateAction<string>>;
    type: TextInputType;
    bi?: `bi-${string}`;
}

export default function Input({ 
    id,
    name=id,
    placeholder="",
    pattern="*",
    disabled=false,
    readOnly=false,
    onKeyDown,
    state,
    setState,
    type,
    bi
}: TextboxProps): JSX.Element {
    return (
        <div 
            className="w-full flex px-2 py-1 gap-2 rounded border border-zinc-500 bg-zinc-800/60 outline outline-transparent duration-150 has-focus-within:outline-indigo-500"
        >
            {bi && <i className={`bi ${bi}`}></i>}
            <input
                id={id} 
                name={name} 
                type={type} 
                placeholder={placeholder} 
                disabled={disabled}
                readOnly={readOnly}
                value={state}
                onChange={(e) => setState(e.currentTarget.value)}
                pattern={pattern}
                onKeyDown={onKeyDown}
                className="flex-1 focus:outline-none"
            />
        </div>
    );
}