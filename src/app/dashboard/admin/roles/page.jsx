"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    Table,
    Button,
    Card,
    Modal,
} from "@heroui/react";

import {
    Pencil,
    Trash2,
    Plus,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";


const RolesPage = () => {
    const router = useRouter();
    
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchRoles = async () => {
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/role`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            if (res.ok) {
                setRoles(data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const openDeleteModal = (role) => {
        setSelectedRole(role);
        setDeleteModalOpen(true);
    };

    const deleteRole = async () => {
        if (!selectedRole) return;

        try {
            setDeleting(true);

            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/role/${selectedRole._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            if (res.ok) {
                setRoles(
                    roles.filter(
                        role => role._id !== selectedRole._id
                    )
                );

                setDeleteModalOpen(false);
                setSelectedRole(null);
            }

        } catch(error) {
            console.log(error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Card className="rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <Card.Title className="text-xl">
                    Roles
                </Card.Title>

                <Button
                    className="h-10 px-5 
                    rounded-xl 
                    text-white
                    bg-[#ef0161]
                    hover:bg-[#5d1bb6]
                    transition-all
                    flex items-center gap-2"
                    onPress={() =>
                        router.push(
                            "/dashboard/admin/roles/add"
                        )
                    }
                >
                    <Plus size={17}/>
                    Add Role
                </Button>
            </div>

            <Table className="bg-[#ef0161]/10 rounded-xl">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Roles table" className="min-w-150">
                        <Table.Header className="bg-[#ef0161]/1 text-xl">
                            <Table.Column isRowHeader>Role Name</Table.Column>
                            <Table.Column isRowHeader>Description</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {loading ? (
                                <Table.Row>
                                    <Table.Cell colSpan={3}>
                                        Loading...
                                    </Table.Cell>
                                </Table.Row>
                            ) : roles.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={3}>
                                        No roles found.
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                roles.map((item) => (
                                    <Table.Row key={item._id} className="hover:bg-[#ef0161]/.1">
                                        <Table.Cell>
                                            {item.title}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {item.description || "No description"}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    className="
                                                        rounded-lg
                                                        text-white
                                                        bg-[#ef0161]
                                                        hover:bg-[#5d1bb6]
                                                        transition-all
                                                    "
                                                    onPress={() =>
                                                        router.push(
                                                            `/dashboard/admin/roles/edit/${item._id}`
                                                        )
                                                    }
                                                >
                                                    <Pencil size={15}/>
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    className="
                                                        rounded-lg
                                                        text-white
                                                        bg-[#ef0161]
                                                        hover:bg-[#5d1bb6]
                                                    "
                                                    onPress={() => openDeleteModal(item)}
                                                >
                                                    <Trash2 size={15}/>
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            <Modal
                isOpen={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
            >
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="rounded-xl">
                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Heading>
                                    Delete Role
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body>
                                <p>
                                    Are you sure you want to delete{" "}
                                    <strong>
                                        {selectedRole?.name}
                                    </strong>
                                    ?
                                </p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    variant="light"
                                    onPress={() => setDeleteModalOpen(false)}
                                    className="rounded-xl bg-gray-100"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    className="rounded-xl bg-[#ef0161] text-white hover:bg-[#5d1bb6] transition-all"
                                    isLoading={deleting}
                                    onPress={deleteRole}
                                >
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </Card>

    );
};

export default RolesPage;