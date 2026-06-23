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

import { Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const RolesAddPage = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const [submitError, setSubmitError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        try {
            const { data: tokenData } = await authClient.token();

            // console.log("Token:", tokenData?.token);
            // console.log("Type:", typeof tokenData?.token);
            
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/role`;

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

            router.push("/dashboard/admin/roles");

        } catch (error) {
            console.error(error);
            setSubmitError(error.message);
        }
    };

    return (
        <Card className="rounded-xl">
            <Card.Header>
                <Card.Title className="text-xl mb-5">
                    Add Role
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
                    name="title"
                    value={form.title}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            title: value,
                        })
                    }
                    validate={(value) => {
                        if (!value.trim()) {
                            return "Role title is required";
                        }

                        if (value.length < 3) {
                            return "Role title must be at least 3 characters";
                        }

                        return null;
                    }}
                >
                    <Label>
                        Role Title
                    </Label>

                    <Input
                        placeholder="Enter role title"
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
                        placeholder="Enter role description"
                    />

                    <Description>
                        Optional description for this role
                    </Description>

                    <FieldError />
                </TextField>


                <div className="flex gap-2">

                    <Button
                        type="submit"
                        className="relative overflow-hidden h-9.5 px-6 text-white rounded-xl bg-[#ef0161] group flex items-center gap-2"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Check size={16} />
                            Create Role
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
                                title: "",
                                description: "",
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

export default RolesAddPage;