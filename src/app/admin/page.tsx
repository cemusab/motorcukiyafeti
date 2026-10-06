import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Package, Tag, Layers, TrendingUp } from 'lucide-react';

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const productCount = await prisma.product.count();
  const brandCount = await prisma.brand.count();
  const categoryCount = await prisma.category.count();

  const stats = [
    { title: 'Toplam Ürün', value: productCount, icon: <Package size={24} className="text-blue-500" />, href: '/admin/products' },
    { title: 'Markalar', value: brandCount, icon: <Tag size={24} className="text-purple-500" />, href: '/admin/brands' },
    { title: 'Kategoriler', value: categoryCount, icon: <Layers size={24} className="text-orange-500" />, href: '#' },
    { title: 'Rehber / Blog', value: '0', icon: <TrendingUp size={24} className="text-green-500" />, href: '/admin/guides' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          + Yeni Ürün Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Link key={idx} href={stat.href} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              {stat.icon}
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Hoş Geldiniz</h2>
        <p className="text-gray-600">
          Sol menüden ürünlerinizi, fiyatlarınızı ve SEO uyumlu motosiklet rehberlerinizi yönetebilirsiniz. 
          Şu anda <strong>{productCount}</strong> adet ürün sisteminizde aktif olarak sergileniyor.
        </p>
      </div>
    </div>
  );
}
