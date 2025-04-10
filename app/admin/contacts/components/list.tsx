"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle } from 'lucide-react';
import { useUserStore } from "@/lib/store/useUserStore";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "processed";
  createdAt: string;
}

export default function AdminContacts() {
  const token = useUserStore.getState().token;
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(response.data.data); // lưu ý response.data.data từ object gốc bạn gửi
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId: string, newStatus: "pending" | "processed") => {
    setUpdatingId(contactId);
    try {
      await axios.put(`http://localhost:8080/contacts/${contactId}/status`, {
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === contactId ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: "pending" | "processed") => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Đang chờ</Badge>;
      case "processed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Đã xử lý</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản Lý Liên Hệ</h1>
        <Button onClick={fetchContacts}>Làm mới</Button>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Không có liên hệ nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <Card key={contact._id}>
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  {getStatusBadge(contact.status)}
                </div>
                <p className="text-sm text-gray-500">{formatDate(contact.createdAt)}</p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-sm font-medium">Email:</p>
                  <p className="text-sm">{contact.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Số điện thoại:</p>
                  <p className="text-sm">{contact.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Tin nhắn:</p>
                  <p className="text-sm line-clamp-3">{contact.message}</p>
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Trạng thái:</p>
                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue={contact.status}
                      onValueChange={(value) =>
                        updateContactStatus(contact._id, value as "pending" | "processed")
                      }
                      disabled={updatingId === contact._id}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Đang chờ</SelectItem>
                        <SelectItem value="processed">Đã xử lý</SelectItem>
                      </SelectContent>
                    </Select>
                    {updatingId === contact._id && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {!updatingId && contact.status === "processed" && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
