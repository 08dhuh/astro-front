// // Round input values before sending to backend
// const z = parseFloat(inputZ).toFixed(4);    // Example: 0.0004
// const logAge = parseFloat(inputAge).toFixed(2); // Example: 7.80

// // Send via WebSocket or API
// socket.send(JSON.stringify({ Z: z, log_age: logAge }));
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (!API_BASE_URL) {
    throw new Error("API base URL is missing. Set NEXT_PUBLIC_BACKEND_API_URL in .env.local");
}

const API_ROUTES = {
    CLUSTER_UBV: (clusterPk) => `${API_BASE_URL}/api/debug/cluster-ubvs/${clusterPk}`,
    STAR_CLUSTERS: `${API_BASE_URL}/api/debug/clusters`,
    ISOCHRONES: (logAge, Z) => `${API_BASE_URL}/api/isochrone/?log_age=${logAge}&Z=${Z}`,
};

export async function fetchIsochroneData(logAge, Z) {
    try {
        const response = await fetch(API_ROUTES.ISOCHRONES(logAge, Z));    
        if (!response.ok) throw new Error(`Error fetching isochrones data: ${response.statusText}`);
        const data = await response.json();
        //console.log(data);
        return data.data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}