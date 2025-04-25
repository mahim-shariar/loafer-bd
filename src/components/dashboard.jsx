import React, { useState } from 'react';
import { FiHome, FiShoppingBag, FiUsers, FiTruck, FiPieChart, FiSettings, FiLogOut } from 'react-icons/fi';
import { BsGraphUp, BsBoxSeam } from 'react-icons/bs';
import { AiOutlineStock } from 'react-icons/ai';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sample data
  const recentOrders = [
    { id: '#ORD-1001', customer: 'John Smith', date: '2023-05-15', status: 'Shipped', amount: '$199.00' },
    { id: '#ORD-1002', customer: 'Sarah Johnson', date: '2023-05-14', status: 'Processing', amount: '$229.00' },
    { id: '#ORD-1003', customer: 'Michael Brown', date: '2023-05-14', status: 'Delivered', amount: '$179.00' },
    { id: '#ORD-1004', customer: 'Emily Davis', date: '2023-05-13', status: 'Pending', amount: '$349.00' },
    { id: '#ORD-1005', customer: 'Robert Wilson', date: '2023-05-12', status: 'Cancelled', amount: '$159.00' },
  ];

  const topProducts = [
    { name: 'Quantum X-9000', sales: 142, revenue: '$28,258' },
    { name: 'Neo Classic Oxford', sales: 98, revenue: '$22,442' },
    { name: 'AirFlex Pulse', sales: 87, revenue: '$15,573' },
    { name: 'Limited Edition Carbon', sales: 45, revenue: '$15,705' },
    { name: 'Trailblazer Pro', sales: 76, revenue: '$12,084' },
  ];

  const users = [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Customer', joined: '2023-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', joined: '2023-02-20' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin', joined: '2022-11-10' },
    { id: 4, name: 'Michael Brown', email: 'michael@example.com', role: 'Customer', joined: '2023-03-05' },
    { id: 5, name: 'Emily Davis', email: 'emily@example.com', role: 'Customer', joined: '2023-04-18' },
  ];

  const products = [
    { id: 1, name: 'Quantum X-9000', category: 'Running', price: '$199', stock: 45, status: 'Active' },
    { id: 2, name: 'Neo Classic Oxford', category: 'Casual', price: '$229', stock: 32, status: 'Active' },
    { id: 3, name: 'AirFlex Pulse', category: 'Athletic', price: '$179', stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Limited Edition Carbon', category: 'Limited', price: '$349', stock: 12, status: 'Active' },
    { id: 5, name: 'Trailblazer Pro', category: 'Running', price: '$159', stock: 28, status: 'Active' },
  ];

  const shipments = [
    { id: '#SH-1001', orderId: '#ORD-1001', carrier: 'FedEx', tracking: '123456789', status: 'Delivered', date: '2023-05-18' },
    { id: '#SH-1002', orderId: '#ORD-1002', carrier: 'UPS', tracking: '987654321', status: 'In Transit', date: '2023-05-17' },
    { id: '#SH-1003', orderId: '#ORD-1003', carrier: 'USPS', tracking: '456123789', status: 'Delivered', date: '2023-05-16' },
    { id: '#SH-1004', orderId: '#ORD-1004', carrier: 'DHL', tracking: '789456123', status: 'Processing', date: '2023-05-15' },
    { id: '#SH-1005', orderId: '#ORD-1005', carrier: 'FedEx', tracking: '321654987', status: 'Cancelled', date: '2023-05-14' },
  ];

  // Analytics data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 19000, 15000, 22000, 18000, 25000],
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        borderColor: 'rgba(6, 182, 212, 1)',
        borderWidth: 2,
      },
    ],
  };

  const stats = [
    { title: 'Total Revenue', value: '$124,568', change: '+12%', icon: <AiOutlineStock className="text-cyan-500" /> },
    { title: 'Total Orders', value: '1,245', change: '+8%', icon: <FiShoppingBag className="text-purple-500" /> },
    { title: 'Total Customers', value: '856', change: '+15%', icon: <FiUsers className="text-green-500" /> },
    { title: 'Avg. Order Value', value: '$112.45', change: '+5%', icon: <BsGraphUp className="text-orange-500" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-sm text-green-500 mt-1">{stat.change}</p>
                    </div>
                    <div className="text-3xl">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                <h3 className="text-lg font-bold mb-4">Sales Overview</h3>
                <div className="h-64">
                  {/* Chart would be implemented with Chart.js or similar */}
                  <div className="flex items-center justify-center h-full bg-gray-50 rounded">
                    <p className="text-gray-500">Sales Chart Visualization</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Top Selling Products</h3>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sales} sales</p>
                      </div>
                      <p className="font-bold">{product.revenue}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <h3 className="text-lg font-bold p-6">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Pending' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-cyan-600 hover:text-cyan-900 mr-3">View</button>
                          <button className="text-gray-600 hover:text-gray-900">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 flex justify-between items-center">
              <h3 className="text-lg font-bold">All Orders</h3>
              <div className="flex space-x-2">
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Filter by Status</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          defaultValue={order.status}
                          className={`border rounded px-2 py-1 text-xs ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            order.status === 'Pending' ? 'bg-gray-100 text-gray-800 border-gray-200' :
                            'bg-red-100 text-red-800 border-red-200'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-cyan-600 hover:text-cyan-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> orders
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                <button className="px-3 py-1 bg-gray-900 text-white rounded-md text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 flex justify-between items-center">
              <h3 className="text-lg font-bold">Product Management</h3>
              <div className="flex space-x-2">
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-md text-sm hover:bg-cyan-700">
                  Add New Product
                </button>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-md" src="/shoes.png" alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-cyan-600 hover:text-cyan-900 mr-3">Edit</button>
                        <button className="text-gray-600 hover:text-gray-900">Inventory</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">12</span> products
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                <button className="px-3 py-1 bg-gray-900 text-white rounded-md text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 flex justify-between items-center">
              <h3 className="text-lg font-bold">User Management</h3>
              <div className="flex space-x-2">
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-md text-sm hover:bg-cyan-700">
                  Add New User
                </button>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              {user.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-cyan-600 hover:text-cyan-900 mr-3">Edit</button>
                        <button className="text-gray-600 hover:text-gray-900">Permissions</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> users
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                <button className="px-3 py-1 bg-gray-900 text-white rounded-md text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        );
      case 'shipments':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 flex justify-between items-center">
              <h3 className="text-lg font-bold">Shipment Management</h3>
              <div className="flex space-x-2">
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Filter by Carrier</option>
                  <option>FedEx</option>
                  <option>UPS</option>
                  <option>USPS</option>
                  <option>DHL</option>
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Filter by Status</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>In Transit</option>
                  <option>Delivered</option>
                </select>
                <input
                  type="text"
                  placeholder="Search shipments..."
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shipments.map((shipment, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.carrier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.tracking}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                          shipment.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-cyan-600 hover:text-cyan-900 mr-3">Track</button>
                        <button className="text-gray-600 hover:text-gray-900">Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">18</span> shipments
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                <button className="px-3 py-1 bg-gray-900 text-white rounded-md text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-sm text-green-500 mt-1">{stat.change}</p>
                    </div>
                    <div className="text-3xl">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Sales Performance</h3>
                <div className="h-80">
                  {/* Chart would be implemented with Chart.js or similar */}
                  <div className="flex items-center justify-center h-full bg-gray-50 rounded">
                    <p className="text-gray-500">Sales Performance Chart</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Top Products</h3>
                <div className="h-80">
                  {/* Chart would be implemented with Chart.js or similar */}
                  <div className="flex items-center justify-center h-full bg-gray-50 rounded">
                    <p className="text-gray-500">Top Products Chart</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Customer Acquisition</h3>
                <div className="h-80">
                  {/* Chart would be implemented with Chart.js or similar */}
                  <div className="flex items-center justify-center h-full bg-gray-50 rounded">
                    <p className="text-gray-500">Customer Acquisition Chart</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Inventory Levels</h3>
                <div className="h-80">
                  {/* Chart would be implemented with Chart.js or similar */}
                  <div className="flex items-center justify-center h-full bg-gray-50 rounded">
                    <p className="text-gray-500">Inventory Levels Chart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">Loafer Admin</h1>
          ) : (
            <h1 className="text-xl font-bold">LA</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
            {sidebarOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
        <nav className="mt-6">
          <div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center w-full px-4 py-3 ${activeTab === 'dashboard' ? 'bg-cyan-700' : 'hover:bg-gray-800'}`}
            >
              <FiHome className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Dashboard</span>}
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center w-full px-4 py-3 ${activeTab === 'orders' ? 'bg-cyan-700' : 'hover:bg-gray-800'}`}
            >
              <FiShoppingBag className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Orders</span>}
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center w-full px-4 py-3 ${activeTab === 'products' ? 'bg-cyan-700' : 'hover:bg-gray-800'}`}
            >
              <BsBoxSeam className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Products</span>}
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center w-full px-4 py-3 ${activeTab === 'users' ? 'bg-cyan-700' : 'hover:bg-gray-800'}`}
            >
              <FiUsers className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Users</span>}
            </button>
            <button
              onClick={() => setActiveTab('shipments')}
              className={`flex items-center w-full px-4 py-3 ${activeTab === 'shipments' ? 'bg-cyan-700' : 'hover:bg-gray-800'}`}
            >
              <FiTruck className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Shipments</span>}
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center w-full px-4 py-3 ${activeTab === 'analytics' ? 'bg-cyan-700' : 'hover:bg-gray-800'}`}
            >
              <FiPieChart className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Analytics</span>}
            </button>
          </div>
          {/* <div className="absolute bottom-0 left-0 right-0 p-4">
            <button className="flex items-center w-full px-4 py-3 hover:bg-gray-800">
              <FiSettings className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Settings</span>}
            </button>
            <button className="flex items-center w-full px-4 py-3 hover:bg-gray-800">
              <FiLogOut className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div> */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'orders' && 'Order Management'}
              {activeTab === 'products' && 'Product Management'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'shipments' && 'Shipment Management'}
              {activeTab === 'analytics' && 'Business Analytics'}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium">AD</span>
                </div>
                {sidebarOpen && <span className="ml-2 text-sm font-medium">Admin User</span>}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;