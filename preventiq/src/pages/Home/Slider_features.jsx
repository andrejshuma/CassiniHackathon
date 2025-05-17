import {Atom, Brain, Bubbles, Factory, House, Sun} from "lucide-react";

export default function Slider_features({ activeSubpage, changeSubpage }) {


    return (
        <div className="w-full flex justify-between overflow-x-auto p-4" data-theme="nord">
            <button
                onClick={() => changeSubpage("home")}
                className={`flex items-center justify-center rounded-full p-4 ${activeSubpage === "home" ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-[rgba(0,0,0,0.2)]'} shrink-0`}>
                <House size={24}/>
            </button>
            <button
                onClick={() => changeSubpage("pollen")}
                className={`flex items-center justify-center rounded-full p-4 ${activeSubpage === "pollen" ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-[rgba(0,0,0,0.2)]'} shrink-0`}>
                <Bubbles size={24}/>
            </button>
            <button
                onClick={() => changeSubpage("uv")}
                className={`flex items-center justify-center rounded-full p-4 ${activeSubpage === "uv" ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-[rgba(0,0,0,0.2)]'} shrink-0`}>
                <Sun size={24}/>
            </button>
            <button
                onClick={() => changeSubpage("pollution")}
                className={`flex items-center justify-center rounded-full p-4 ${activeSubpage === "pollution" ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-[rgba(0,0,0,0.2)]'} shrink-0`}>
                <Factory size={24}/>
            </button>
            <button
                onClick={() => changeSubpage("mental")}
                className={`flex items-center justify-center rounded-full p-4 ${activeSubpage === "mental" ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-[rgba(0,0,0,0.2)]'} shrink-0`}>
                <Brain size={24}/>
            </button>
        </div>
);
}
