"use client";

import { useEffect, useState } from "react";

import {
    Card,
    Table,
    Button,
    Modal,
} from "@heroui/react";

import {
    ShieldCheck,
    UserCog,
    Trash2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import Loading from "@/app/loading";

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [updatingRole, setUpdatingRole] = useState(null);

    const fetchUsers = async () => {
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            if (res.ok) {
                setUsers(data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (
        userId,
        role
    ) => {
        try {
            setUpdatingRole(userId);

            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userId}/role`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                    body: JSON.stringify({
                        role,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setUsers((prev) =>
                prev.map((user) =>
                    user._id === userId
                        ? {
                              ...user,
                              role,
                          }
                        : user
                )
            );
        } catch (error) {
            console.log(error);
        } finally {
            setUpdatingRole(null);
        }
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedUser) return;

        try {
            setDeleting(true);

            const { data: tokenData } =
                await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${selectedUser._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setUsers((prev) =>
                prev.filter(
                    (user) =>
                        user._id !== selectedUser._id
                )
            );

            setDeleteModalOpen(false);
            setSelectedUser(null);
        } catch (error) {
            console.log(error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Card className="rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <Card.Title className="text-xl">
                    User Management
                </Card.Title>

                <div className="text-sm text-gray-500">
                    Total Users: {users.length}
                </div>
            </div>

            <Table className="bg-[#ef0161]/10 rounded-xl">
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Users table"
                        className="min-w-[800px]"
                    >
                        <Table.Header className="bg-[#ef0161]/5">
                            <Table.Column isRowHeader>
                                Name
                            </Table.Column>

                            <Table.Column>
                                Email
                            </Table.Column>

                            <Table.Column>
                                Role
                            </Table.Column>

                            <Table.Column>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {loading ? (
                                <Table.Row>
                                    <Table.Cell colSpan={4}>
                                        <Loading />
                                    </Table.Cell>
                                </Table.Row>
                            ) : users.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={4}>
                                        No users found.
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                users.map((user) => (
                                    <Table.Row
                                        key={user._id}
                                        className="hover:bg-[#ef0161]/5"
                                    >
                                        <Table.Cell>
                                            {user.name}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {user.email}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="capitalize font-medium">
                                                {user.role}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex gap-2">
                                                {user.role !==
                                                "admin" ? (
                                                    <Button
                                                        size="sm"
                                                        isLoading={
                                                            updatingRole ===
                                                            user._id
                                                        }
                                                        className="
                                                            rounded-lg
                                                            text-white
                                                            bg-[#ef0161]
                                                            hover:bg-[#5d1bb6]
                                                            transition-all
                                                        "
                                                        onPress={() =>
                                                            handleRoleChange(
                                                                user._id,
                                                                "admin"
                                                            )
                                                        }
                                                    >
                                                        <ShieldCheck
                                                            size={
                                                                15
                                                            }
                                                        />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        isLoading={
                                                            updatingRole ===
                                                            user._id
                                                        }
                                                        className="
                                                            rounded-lg
                                                            text-white
                                                            bg-amber-500
                                                            hover:bg-amber-600
                                                        "
                                                        onPress={() =>
                                                            handleRoleChange(
                                                                user._id,
                                                                "librarian"
                                                            )
                                                        }
                                                    >
                                                        <UserCog
                                                            size={
                                                                15
                                                            }
                                                        />
                                                    </Button>
                                                )}

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
                                                        openDeleteModal(
                                                            user
                                                        )
                                                    }
                                                >
                                                    <Trash2
                                                        size={
                                                            15
                                                        }
                                                    />
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
                                    Delete User
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body>
                                <p>
                                    Are you sure you want to
                                    delete{" "}
                                    <strong>
                                        {selectedUser?.name}
                                    </strong>
                                    ?
                                </p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    variant="light"
                                    className="rounded-xl bg-gray-100"
                                    onPress={() =>
                                        setDeleteModalOpen(
                                            false
                                        )
                                    }
                                >
                                    Cancel
                                </Button>

                                <Button
                                    isLoading={deleting}
                                    onPress={handleDelete}
                                    className="
                                        rounded-xl
                                        bg-[#ef0161]
                                        text-white
                                        hover:bg-[#5d1bb6]
                                        transition-all
                                    "
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

export default UsersPage;