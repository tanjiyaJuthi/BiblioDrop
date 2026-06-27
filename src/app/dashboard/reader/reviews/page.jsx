"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Card, Table } from "@heroui/react";
import { Pencil, Trash2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import Link from "next/link";

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

    const reviewsMap = new Map();

    // Add comments
    comments.forEach((comment) => {
        reviewsMap.set(comment.bookId._id, {
            book: comment.bookId,
            user: comment.userId,
            commentId: comment._id,
            comment: comment.commentText,
            ratingId: null,
            rating: 0,
            createdAt: comment.createdAt,
        });
    });

    // Add ratings
    ratings.forEach((rating) => {
        const existing = reviewsMap.get(rating.bookId._id);

        if (existing) {
            existing.ratingId = rating._id;
            existing.rating = rating.rating;
        } else {
            reviewsMap.set(rating.bookId._id, {
            book: rating.bookId,
            user: rating.userId,
            commentId: null,
            comment: "",
            ratingId: rating._id,
            rating: rating.rating,
            createdAt: rating.createdAt,
            });
        }
    });

    const reviews = Array.from(reviewsMap.values());

    const deleteReview = async (review) => {
        const { data: tokenData } = await authClient.token();

        await Promise.all([
            fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${review.commentId}`,
            {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${tokenData.token}`,
                },
            }
            ),
            fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/rating/${review.ratingId}`,
            {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${tokenData.token}`,
                },
            }
            ),
        ]);

        setComments(prev =>
            prev.filter(item => item._id !== review.commentId)
        );

        setRatings(prev =>
            prev.filter(item => item._id !== review.ratingId)
        );
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
                            <Table.Column>Rating</Table.Column>
                            <Table.Column>Comment</Table.Column>
                            <Table.Column>Date</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {loadingComments ? (
                                <Table.Row>
                                    <Table.Cell colSpan={5}>
                                        <Loading />
                                    </Table.Cell>
                                </Table.Row>
                            ) : comments.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={5}>
                                        No data found
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                reviews.map((review) => (
                                    <Table.Row key={review.book._id}>
                                        <Table.Cell>
                                            <Link href={`/books/${review.book._id}`}>
                                                {review.book.title}
                                            </Link>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex items-center gap-1">
                                                {Array.from({
                                                    length: review.rating,
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

                                        <Table.Cell>{review.comment}</Table.Cell>

                                        <Table.Cell>
                                        {new Date(review.createdAt).toLocaleDateString()}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    className="bg-[#ef0161] text-white"
                                                    onPress={() =>
                                                        router.push(`/books/${review.book._id}?edit=true`)
                                                    }
                                                >
                                                    <Pencil size={15} />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    color="danger"
                                                    onPress={() => deleteReview(review)}
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