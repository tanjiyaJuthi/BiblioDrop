const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    // handle 401, 404, 403
    return res.json();
}


export const serverMutation = async (path, data) => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(res);

        const result = await res.json();

        // if (!res.ok) {
        //     throw new Error(result?.message || "Request failed");
        // }

        return result;

    } catch (error) {
        console.error("serverMutation error:", error);
        throw error;
    }
};