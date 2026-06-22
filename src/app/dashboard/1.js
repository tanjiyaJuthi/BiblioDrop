"use client";
import React from "react";
import { Card, Button, Chip, Avatar } from "@heroui/react";
import { DollarSign, ShoppingBag, Users, TrendingUp, Calendar, ChevronDown } from "lucide-react";

export default function DashboardPage() {
  // Mock Metric Row
  const metrics = [
    { title: "Total Revenue", value: "$24,780.00", change: "+12.5%", icon: <DollarSign className="text-purple-600" />, bg: "bg-purple-50" },
    { title: "Orders", value: "1,248", change: "+8.2%", icon: <ShoppingBag className="text-blue-600" />, bg: "bg-blue-50" },
    { title: "Customers", value: "856", change: "+5.4%", icon: <Users className="text-green-600" />, bg: "bg-green-50" },
    { title: "Conversion Rate", value: "2.43%", change: "+1.2%", icon: <TrendingUp className="text-orange-600" />, bg: "bg-orange-50" },
  ];

  // Top Selling Items
  const products = [
    { name: "Wireless Headphones", sold: "1,245 sold", price: "$12,430", img: "🎧" },
    { name: "Smart Watch", sold: "876 sold", price: "$8,760", img: "⌚" },
    { name: "Coffee Mug", sold: "1,234 sold", price: "$5,370", img: "☕" },
    { name: "Backpack", sold: "654 sold", price: "$4,320", img: "🎒" },
    { name: "Desk Lamp", sold: "432 sold", price: "$2,890", img: "💡" },
  ];

  // Latest Transactions Log
  const orders = [
    { id: "#ORD-1248", name: "Jane Cooper", email: "jane@example.com", status: "success", statusText: "Completed", amount: "$239.99", img: "https://i.pravatar.cc/150?img=32" },
    { id: "#ORD-1247", name: "Floyd Miles", email: "floyd@example.com", status: "primary", statusText: "Processing", amount: "$129.00", img: "https://i.pravatar.cc/150?img=60" },
    { id: "#ORD-1246", name: "Robert Fox", email: "robert@example.com", status: "secondary", statusText: "Shipped", amount: "$99.99", img: "https://i.pravatar.cc/150?img=11" },
    { id: "#ORD-1245", name: "Kristin Watson", email: "kristin@example.com", status: "warning", statusText: "Pending", amount: "$59.00", img: "https://i.pravatar.cc/150?img=49" },
  ];

  return (
    <div className="space-y-8">
      {/* Banner / Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">Here&apos;s what&apos;s happening with your business today.</p>
        </div>

        <Button variant="bordered" className="bg-white border-slate-200" startContent={<Calendar size={16} />}>
          May 12 - May 18, 2024 <ChevronDown size={14} />
        </Button>
      </div>

      {/* Grid Row 1: KPI Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((card, index) => (
          <Card key={index} shadow="none" className="border border-slate-100 bg-white rounded-2xl p-2">
            <div className="flex flex-row justify-between items-start p-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.title}</span>
                <p className="text-2xl font-bold text-slate-800 tracking-tight">{card.value}</p>
                <span className="text-xs font-bold text-green-500 bg-green-50/50 px-2 py-0.5 rounded-md inline-block">
                  {card.change} <span className="text-slate-400 font-normal">vs last week</span>
                </span>
              </div>
              <div className={`p-3 rounded-xl ${card.bg}`}>
                {card.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Grid Row 2: Graph Analytics Area & Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Line Chart Component Wrapper (Placeholder Mimic Styling) */}
        <Card shadow="none" className="xl:col-span-2 border border-slate-100 bg-white p-4 rounded-2xl">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Revenue Overview</h3>
              <Button size="sm" variant="bordered" radius="md">Daily <ChevronDown size={14} /></Button>
            </div>
            
            {/* Visual mock replacement chart frame using pure SVG styling lines */}
            <div className="h-64 w-full relative pt-4 flex flex-col justify-between">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-slate-200 w-full h-0"></div>
                <div className="border-b border-dashed border-slate-200 w-full h-0"></div>
                <div className="border-b border-dashed border-slate-200 w-full h-0"></div>
                <div className="border-b border-dashed border-slate-200 w-full h-0"></div>
              </div>
              {/* Fake Graph SVG matching the target visual */}
              <svg className="w-full h-44 drop-shadow-xl overflow-visible" viewBox="0 0 700 150">
                <path
                  d="M0,110 Q50,70 100,100 T200,90 T300,50 T400,100 T500,30 T600,40 T700,20"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex justify-between text-xs text-slate-400 px-1">
                <span>May 12</span><span>May 13</span><span>May 14</span><span>May 15</span><span>May 16</span><span>May 17</span><span>May 18</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Top Product List Card */}
        <Card shadow="none" className="border border-slate-100 bg-white p-4 rounded-2xl">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Top Products</h3>
              <Button size="sm" variant="light" className="text-slate-500 font-semibold">View all</Button>
            </div>
            <div className="divide-y divide-slate-50">
              {products.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 bg-slate-50 rounded-xl">{p.img}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.sold}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{p.price}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Grid Row 3: Recent Orders Table & Traffic Source Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Table Column */}
        <Card shadow="none" className="xl:col-span-2 border border-slate-100 bg-white p-4 rounded-2xl">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Recent Orders</h3>
              <Button size="sm" variant="bordered" className="border-slate-200">View all</Button>
            </div>
            
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <Avatar src={order.img} size="md" radius="lg" />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{order.name}</p>
                      <p className="text-xs text-slate-400">{order.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-8 flex-1">
                    <span className="text-xs font-medium text-slate-400">{order.id}</span>
                    <Chip size="sm" variant="flat" color={order.status} className="font-medium">
                      {order.statusText}
                    </Chip>
                    <span className="text-sm font-bold text-slate-700">{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Traffic Source Pie Chart UI Mock */}
        <Card shadow="none" className="border border-slate-100 bg-white p-4 rounded-2xl">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800">Traffic Source</h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
              {/* Simplified high fidelity donut graphic representation inside standard template boundaries */}
              <div className="w-32 h-32 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-blue-600" strokeDasharray="40 100" strokeWidth="4.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-cyan-400" strokeDasharray="32 100" strokeDashoffset="-40" strokeWidth="4.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-purple-400" strokeDasharray="15 100" strokeDashoffset="-72" strokeWidth="4.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-orange-400" strokeDasharray="8 100" strokeDashoffset="-87" strokeWidth="4.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-teal-400" strokeDasharray="5 100" strokeDashoffset="-95" strokeWidth="4.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>

              {/* Legend List Labels matching metrics */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 block"></span> <span className="text-slate-500 w-20">Direct</span> <span className="font-bold text-slate-700">1,234 (40%)</span></div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400 block"></span> <span className="text-slate-500 w-20">Org. Search</span> <span className="font-bold text-slate-700">987 (32%)</span></div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-400 block"></span> <span className="text-slate-500 w-20">Social Media</span> <span className="font-bold text-slate-700">456 (15%)</span></div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-400 block"></span> <span className="text-slate-500 w-20">Referral</span> <span className="font-bold text-slate-700">234 (8%)</span></div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-teal-400 block"></span> <span className="text-slate-500 w-20">Email</span> <span className="font-bold text-slate-700">156 (5%)</span></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}