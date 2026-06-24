"use client";

import { use, useEffect, useState } from "react";
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

const RolesEditPage = ({ params }) => {
    const router = useRouter();
    const { id } = use(params);

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const fetchRole = async () => {
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/role/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            if(res.ok){
                setForm({
                    title:data.data.title,
                    description:data.data.description || "",
                });
            }
        } catch(error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRole();
    }, []);

    const updateRole = async (e) => {
        e.preventDefault();
        setSubmitError("");

        try {
            setSaving(true);

            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/role/${id}`,
                {
                    method:"PATCH",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${tokenData?.token}`,
                    },
                    body:JSON.stringify(form),
                }
            );

            const data = await res.json();

            if(!res.ok){
                throw new Error(
                    data.message || "Update failed"
                );
            }

            router.push(
                "/dashboard/admin/roles"
            );
        } catch(error){
            console.log(error);
            setSubmitError(error.message);
        } finally {
            setSaving(false);
        }
    };

    if(loading){
        return (
            <Card className="rounded-xl p-6">
                Loading...
            </Card>
        );
    }

    return (
        <Card className="rounded-xl">
            <Card.Header>
                <Card.Title className="text-xl mb-5">
                    Edit Role
                </Card.Title>
            </Card.Header>

            <Form
                className="flex w-96 flex-col gap-4"
                onSubmit={updateRole}
            >
                {
                    submitError && (
                        <p className="text-red-500 text-sm">
                            {submitError}
                        </p>
                    )
                }

                <TextField
                    isRequired
                    name="title"
                    value={form.title}
                    onChange={(value)=>
                        setForm({
                            ...form,
                            title:value,
                        })
                    }

                    validate={(value)=>{
                        if(!value.trim()){
                            return "Role title is required";
                        }
                        if(value.length < 3){
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
                    onChange={(value)=>
                        setForm({
                            ...form,
                            description:value,
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
                        isLoading={saving}
                        className="
                            relative overflow-hidden
                            h-9.5 px-6
                            text-white
                            rounded-xl
                            bg-[#ef0161]
                            group
                            flex items-center gap-2
                        "
                    >
                        <span className="
                            relative z-10
                            flex items-center gap-2
                        ">
                            <Check size={16}/>
                            Update Role
                        </span>

                        <span className="
                            absolute inset-0
                            rounded-xl
                            bg-[#5d1bb6]
                            translate-x-full
                            group-hover:translate-x-0
                            transition-transform
                            duration-500
                            ease-in-out
                            pointer-events-none
                        "/>

                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        className="
                            relative overflow-hidden
                            h-9.5 px-6
                            text-[#ef0161]
                            rounded-xl
                            group
                        "
                        onPress={() =>
                            router.push(
                                "/dashboard/admin/roles"
                            )
                        }
                    >
                        <span className="
                            relative z-10
                            transition-colors
                            duration-500
                            group-hover:text-white
                        ">
                            Cancel
                        </span>

                        <span className="
                            absolute inset-0
                            rounded-xl
                            bg-[#5d1bb6]
                            translate-x-full
                            group-hover:translate-x-0
                            transition-transform
                            duration-500
                            ease-in-out
                            pointer-events-none
                        "/>
                    </Button>
                </div>
            </Form>
        </Card>
    );
};


export default RolesEditPage;