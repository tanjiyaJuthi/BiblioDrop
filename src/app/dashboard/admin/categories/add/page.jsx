"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Form,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Description,
    Button,
    Card,
} from "@heroui/react";

import { Check, Upload } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { imbb } from "@/lib/helper/image uploader/imbb";

const CategoryAddPage = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        description: "",
        image: "",
    });

    const [submitError, setSubmitError] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (file) => {
        try {
            setUploading(true);

            const imageUrl = await imbb(file);

            setForm((prev) => ({
                ...prev,
                image: imageUrl,
            }));
        } catch (error) {
            console.log(error);
            setSubmitError("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        try {
            const { data: tokenData } = await authClient.token();            
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            console.log("Response:", data);

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            router.push("/dashboard/admin/categories");

        } catch (error) {
            console.error(error);
            setSubmitError(error.message);
        }
    };

    return (
        <Card className="rounded-xl">
            <Card.Header>
                <Card.Title className="text-xl mb-5">
                    Add Category
                </Card.Title>
            </Card.Header>

            <Form
                className="flex w-96 flex-col gap-4"
                onSubmit={onSubmit}
            >
                {submitError && (
                    <p className="text-red-500 text-sm">
                        {submitError}
                    </p>
                )}

                <TextField
                    isRequired
                    name="name"
                    value={form.name}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            name: value,
                        })
                    }
                    validate={(value) => {
                        if (!value.trim()) {
                            return "Category Name is required";
                        }

                        if (value.length < 3) {
                            return "Category Name must be at least 3 characters";
                        }

                        return null;
                    }}
                >
                    <Label>
                        Category Name
                    </Label>

                    <Input
                        placeholder="Enter category name"
                        className="rounded-xl"
                    />

                    <FieldError />
                </TextField>


                <TextField
                    name="description"
                    value={form.description}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            description: value,
                        })
                    }
                >
                    <Label>
                        Description
                    </Label>

                    <TextArea
                        className="rounded-xl"
                        placeholder="Enter category description"
                    />

                    <Description>
                        Optional description for this category
                    </Description>

                    <FieldError />
                </TextField>

                <div className="flex flex-col gap-2">
                    <Label>Category Image</Label>

                    <label
                        htmlFor="image-upload"
                        className="flex items-center gap-2 w-fit cursor-pointer rounded-lg border h-9.5 px-2 hover:bg-red-100"
                    >
                        <Upload className="h-3" />
                        <span>Upload Image</span>
                    </label>

                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                        if (e.target.files?.[0]) {
                            handleImageUpload(e.target.files[0]);
                        }
                        }}
                    />

                    {uploading && <p>Uploading...</p>}

                    {form.image && (
                        <Image
                        width={100}
                        height={100}
                        src={form.image}
                        alt="preview"
                        className="w-32 h-32 rounded-xl object-cover"
                        />
                    )}
                </div>

                <div className="flex gap-2">
                    <Button
                        type="submit"
                        className="relative overflow-hidden h-9.5 px-6 text-white rounded-xl bg-[#ef0161] group flex items-center gap-2"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Check size={16} />
                            Create Category
                        </span>

                        <span
                            className="absolute inset-0 rounded-xl bg-[#5d1bb6] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out pointer-events-none"
                        />
                    </Button>


                    <Button
                        type="reset"
                        variant="secondary"
                        className="relative overflow-hidden h-9.5 px-6 text-[#ef0161] rounded-xl group"
                        onPress={() =>
                            setForm({
                                name: "",
                                description: "",
                                image: ""
                            })
                        }
                    >
                        <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                            Reset
                        </span>

                        <span
                            className="absolute inset-0 rounded-xl bg-[#5d1bb6] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out pointer-events-none"
                        />
                    </Button>

                </div>
            </Form>
        </Card>
    );
};

export default CategoryAddPage;