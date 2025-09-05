"use client";

import { useAladin } from "@/context/AladinContext";
import useAladinLite from "@/hooks/useAladinLite";

export default function AladinViewer() {
    const { settings } = useAladin();
    useAladinLite(settings);

    return (
        <>
            <div className="relative z-50 flex flex-col justify-center items-center">
                <div id="aladin-lite-div" style={{ width: "600px", height: "400px" }} />
                <p className="mt-2 px-4 py-2 text-gray-900 dark:text-white text-center border border-gray-300 dark:border-gray-600">
                    Now displaying: <span className="font-semibold">{settings.target}</span>
                </p>

            </div>

        </>
    );
}
