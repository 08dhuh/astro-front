export const processUBVData = (fetchedData) => {
    return fetchedData.map(({ b_v, Mv }) => ({ b_v, Mv}));
}
