import { JSX } from "react";

export default function UserProfile(): JSX.Element {
    return (
        <div className="flex gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-700 duration-200 cursor-pointer">
            <figure className="w-16 aspect-square h-auto rounded-full overflow-hidden">
                <img src="/img/princess-peach.png" alt="" className="w-full h-full object-cover object-center"/>
            </figure>
            <div className="flex-1 space-y-1">
                <h2 className="line-clamp-1 text-xl font-medium">Princess Peach</h2>
                <div className="flex items-center gap-1">
                    <i className="w-2 h-2 rounded-full bg-emerald-300"></i>
                    <span className="uppercase text-sm font-semibold opacity-60">online</span>
                </div>
            </div>
        </div>
    );
}