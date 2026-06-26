"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Card, Table } from "@heroui/react";
import { Pencil, Trash2, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const ReviewPage = () => {
    const router = useRouter();

    const [comments, setComments] = useState([]);
    const [ratings, setRatings] = useState([]);

    const [loadingComments, setLoadingComments] = useState(true);
    const [loadingRatings, setLoadingRatings] = useState(true);

    useEffect(() => {
        fetchComments();
        fetchRatings();
    }, []);

    const fetchComments = async () => {
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/my-comment`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            console.log(data);

            if (data.success) {
                setComments(data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingComments(false);
        }
    };

    const fetchRatings = async () => {
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/rating/my-rating`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            console.log(data);

            if (data.success) {
                setRatings(data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingRatings(false);
        }
    };

    const deleteComment = async (id) => {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${tokenData.token}`,
                },
            }
        );

        if (res.ok) {
            setComments((prev) =>
                prev.filter((item) => item._id !== id)
            );
        }
    };

    const deleteRating = async (id) => {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/rating/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${tokenData.token}`,
                },
            }
        );

        if (res.ok) {
            setRatings((prev) =>
                prev.filter((item) => item._id !== id)
            );
        }
    };

    return (
    <div className="space-y-8">
        {/* Comments */}
        <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2>Comments</h2>

                <span className="text-sm text-gray-500">
                    Total: {comments.length}
                </span>
            </div>

            <Table className="bg-[#ef0161]/10 rounded-xl">
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Comments"
                        className="min-w-[900px]"
                    >
                        <Table.Header>
                            <Table.Column isRowHeader >Book</Table.Column>
                            <Table.Column>User</Table.Column>
                            <Table.Column>Comment</Table.Column>
                            <Table.Column>Date</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {loadingComments ? (
                                <Table.Row>
                                    <Table.Cell colSpan={5}>
                                        Loading...
                                    </Table.Cell>
                                </Table.Row>
                            ) : comments.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={5}>
                                        No comments found
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                comments.map((comment) => (
                                    <Table.Row key={comment._id}>
                                        <Table.Cell>{comment.bookId?.title}</Table.Cell>
                                        <Table.Cell>{comment.userId?.name}</Table.Cell>
                                        <Table.Cell>{comment.commentText}</Table.Cell>
                                        <Table.Cell>
                                            {new Date(
                                                comment.createdAt
                                            ).toLocaleDateString()}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    className="bg-[#ef0161] text-white"
                                                    onPress={() =>
                                                        router.push(
                                                            `/books/${comment.bookId._id}?editComment=${comment._id}`
                                                        )
                                                    }
                                                >
                                                    <Pencil size={15} />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    color="danger"
                                                    onPress={() =>
                                                        deleteComment(
                                                            comment._id
                                                        )
                                                    }
                                                >
                                                    <Trash2 size={15} />
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

            <div className="flex justify-between items-center mb-6 mt-10">
                <h2>Ratings</h2>

                <span className="text-sm text-gray-500">
                    Total: {ratings.length}
                </span>
            </div>

            <Table className="bg-[#ef0161]/10 rounded-xl">
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Ratings"
                        className=""
                    >
                        <Table.Header>
                            <Table.Column isRowHeader>Book</Table.Column>
                            <Table.Column>User</Table.Column>
                            <Table.Column>Rating</Table.Column>
                            <Table.Column>Date</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {loadingRatings ? (
                                <Table.Row>
                                    <Table.Cell colSpan={5}>
                                        Loading...
                                    </Table.Cell>
                                </Table.Row>
                            ) : ratings.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={5}>
                                        No ratings found
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                ratings.map((rating) => (
                                    <Table.Row key={rating._id}>
                                        <Table.Cell>
                                            {rating.bookId?.title}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {rating.userId?.name}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex items-center gap-1">
                                                {Array.from({
                                                    length: rating.rating,
                                                }).map((_, index) => (
                                                    <Star
                                                        key={index}
                                                        size={16}
                                                        fill="gold"
                                                        color="gold"
                                                    />
                                                ))}
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>
                                            {new Date(
                                                rating.createdAt
                                            ).toLocaleDateString()}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    className="bg-[#ef0161] text-white"
                                                    onPress={() =>
                                                        router.push(
                                                            `/books/${rating.bookId._id}?editRating=${rating._id}`
                                                        )
                                                    }
                                                >
                                                    <Pencil size={15} />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    color="danger"
                                                    onPress={() =>
                                                        deleteRating(
                                                            rating._id
                                                        )
                                                    }
                                                >
                                                    <Trash2 size={15} />
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
        </Card>
    </div>
);
};

export default ReviewPage;