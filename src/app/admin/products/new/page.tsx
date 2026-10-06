import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function NewProduct() {
  const brands = await prisma.brand.findMany();
  const categories = await prisma.category.findMany();

  async function createProduct(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const brandId = formData.get('brandId') as string;
    const categoryId = formData.get('categoryId') as string;
    const price = Number(formData.get('price'));
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    
    // Get brand to form the slug
    const brand = await prisma.brand.findUnique({ where: { id: brandId } });
    if (!brand) throw new Error("Brand not found");

    const slug = `${brand.slug}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    await prisma.product.create({
      data: {
        name,
        slug,
        brandId,
        categoryId,
        description,
        basePriceMin: price,
        imageUrl,
      }
    });

    redirect('/admin/products');
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Yeni Ürün Ekle</h1>
      
      <form action={createProduct} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı (Model)</label>
          <input type="text" name="name" required className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Örn: Neotec 3" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marka</label>
            <select name="brandId" required className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
              {brands.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select name="categoryId" required className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL)</label>
          <input type="number" name="price" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="25000" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Görsel URL</label>
          <input type="url" name="imageUrl" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="https://..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama / Editoryal İnceleme</label>
          <textarea name="description" rows={5} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="MotorcuKiyafeti özel incelemesi..."></textarea>
        </div>

        <div className="pt-4 border-t">
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
            Ürünü Kaydet ve Yayınla
          </button>
        </div>
      </form>
    </div>
  );
}
