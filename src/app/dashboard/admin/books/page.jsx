"use client";

import { useEffect, useState } from "react";

import { Button, Card, Modal, Table } from "@heroui/react";

import { Check, Eye, EyeOff, Trash2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CgDetailsMore } from "react-icons/cg";

const BooksPage = () => {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchBooks = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (res.ok) {
        setBooks(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const approveBook = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/approve/${id}`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokenData?.token}`,
        },
      });

      if (res.ok) {
        setBooks((prev) =>
          prev.map((book) =>
            book._id === id
              ? {
                  ...book,
                  approvalStatus: "Published",
                }
              : book,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unpublishBook = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/unpublish/${id}`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokenData?.token}`,
        },
      });

      if (res.ok) {
        setBooks((prev) =>
          prev.map((book) =>
            book._id === id
              ? {
                  ...book,
                  approvalStatus: "Unpublished",
                }
              : book,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModal = (book) => {
    setSelectedBook(book);
    setDeleteModalOpen(true);
  };

  const deleteBook = async () => {
    if (!selectedBook) return;

    try {
      setDeleting(true);

      const { data: tokenData } = await authClient.token();
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/${selectedBook._id}`;

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenData?.token}`,
        },
      });

      if (res.ok) {
        setBooks((prev) =>
          prev.filter((book) => book._id !== selectedBook._id),
        );

        setDeleteModalOpen(false);
        setSelectedBook(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Published: "bg-green-100 text-green-700",
    Unpublished: "bg-red-100 text-red-700",
  };

  return (
    <Card className="rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <Card.Title className="text-xl"> Books </Card.Title>

        <div className="text-sm text-gray-500">Total Books: {books.length}</div>

        <div className="text-sm text-gray-500">
          Pending: {
            books.filter(
              (book) => book.approvalStatus === "Pending"
            ).length
          }
        </div>

        <div className="text-sm text-gray-500">
           Published: {
            books.filter(
              (book) => book.approvalStatus === "Published"
            ).length
          }
        </div>

        <div className="text-sm text-gray-500">
          Unpublished: {
            books.filter(
              (book) => book.approvalStatus === "Unpublished"
            ).length
          }
        </div>
      </div>

      <Table className="bg-[#ef0161]/10 rounded-xl">
        <Table.ScrollContainer>
          <Table.Content aria-label="Books" className="min-w-[900px]">
            <Table.Header>
              <Table.Column isRowHeader>Title</Table.Column>

              <Table.Column>Librarian</Table.Column>

              <Table.Column>Status</Table.Column>

              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {loading ? (
                <Table.Row>
                  <Table.Cell colSpan={4}>Loading...</Table.Cell>
                </Table.Row>
              ) : books.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4}>No books found</Table.Cell>
                </Table.Row>
              ) : (
                books.map((book) => (
                  <Table.Row key={book._id} className="hover:bg-[#ef0161]/.1">
                    <Table.Cell>{book.title}</Table.Cell>

                    <Table.Cell>{book.librarianId?.name}</Table.Cell>

                    <Table.Cell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[book.approvalStatus]
                        }`}
                      >
                        {book.approvalStatus}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex gap-2">
                        {book.approvalStatus === "Pending" && (
                          <Button
                            size="sm"
                            className="
                                rounded-lg
                                text-white
                                bg-[#ef0161]
                                hover:bg-[#5d1bb6]
                            "
                            onPress={() => approveBook(book._id)}
                          >
                            <Check size={15} />
                          </Button>
                        )}

                        {book.approvalStatus === "Published" && (
                          <Button
                            size="sm"
                            className="
                                rounded-lg
                                text-white
                                bg-[#ef0161]
                                hover:bg-[#5d1bb6]
                            "
                            onPress={() => unpublishBook(book._id)}
                          >
                            <EyeOff size={15} />
                          </Button>
                        )}

                        {book.approvalStatus === "Unpublished" && (
                          <Button
                            size="sm"
                            className="
                                rounded-lg
                                text-white
                                bg-[#ef0161]
                                hover:bg-[#5d1bb6]
                            "
                            onPress={() => approveBook(book._id)}
                          >
                            <Eye size={15} />
                          </Button>
                        )}

                        <Button
                          size="sm"
                          className="
                                rounded-lg
                                text-white
                                bg-[#ef0161]
                                hover:bg-[#5d1bb6]
                            "
                          onPress={() => openDeleteModal(book)}
                        >
                          <Trash2 size={15} />
                        </Button>

                        <Button
                          size="sm"
                          className="
                                rounded-lg
                                text-white
                                bg-[#ef0161]
                                hover:bg-[#5d1bb6]
                            "
                          onPress={() =>
                            router.push(`/dashboard/admin/books/${book._id}`)
                          }
                        >
                          <CgDetailsMore size={15} />
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

      <Modal isOpen={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Delete Book</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                Are you sure you want to delete
                <strong> {selectedBook?.title}</strong>?
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="light"
                  onPress={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  color="danger"
                  isLoading={deleting}
                  onPress={deleteBook}
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

export default BooksPage;
