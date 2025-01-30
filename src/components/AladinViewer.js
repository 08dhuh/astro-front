"use client";

import { useAladin } from "@/context/AladinContext";
import useAladinLite from "@/hooks/useAladinLite";

export default function AladinViewer() {
    const { settings } = useAladin();
    useAladinLite(settings);

    return (
        <div>
            <div id="aladin-lite-div" style={{ width: "400px", height: "400px" }}></div>
        </div>
    );
}
