import { useEffect, useState } from "react";

export default function useAladinLite(settings) {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [aladin, setAladin] = useState(null);

    useEffect(() => {
        const loadScript = () => {
            if (!document.querySelector("#aladin-lite-script")) {
                const script = document.createElement("script");
                script.id = "aladin-lite-script";
                script.src = "https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.js";
                script.async = true;
                script.onload = () => setScriptLoaded(true);
                document.body.appendChild(script);
            } else {
                setScriptLoaded(true);
            }
        };

        loadScript();
    }, []);

    useEffect(() => {
        if (scriptLoaded && typeof window !== "undefined" && window.A) {
            window.A.init.then(() => {
                const aladinInstance = window.A.aladin("#aladin-lite-div", {
                    survey: settings.survey,
                    fov: settings.fov,
                    cooFrame: settings.cooFrame,
                });
                aladinInstance.gotoObject(settings.target);
                setAladin(aladinInstance);
            });
        }
    }, [scriptLoaded, settings]);

    return { aladin };
}
