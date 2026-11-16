const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (!API_BASE_URL) {
    throw new Error("API base URL is missing. Set NEXT_PUBLIC_BACKEND_API_URL in .env.local");
}

const API_ROUTES = {
    CLUSTER_UBV: (clusterPk) => `${API_BASE_URL}/api/debug/cluster-ubvs/${clusterPk}`,
    STAR_CLUSTERS: `${API_BASE_URL}/api/debug/clusters`,
    ISOCHRONES: `${API_BASE_URL}/api/debug/isochrones`,
};

export async function fetchClusterUBV(clusterPk) {
    try {
        const response = await fetch(API_ROUTES.CLUSTER_UBV(clusterPk));        
        if (!response.ok) throw new Error(`Error fetching UBV data: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}