export const imbb = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const imbb_key = process.env.NEXT_PUBLIC_IMBB_KEY;

    const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imbb_key}`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();

    if (!data.success) {
        throw new Error(
            data.error?.message || "Image upload failed"
        );
    }

    return data.data.url;
};