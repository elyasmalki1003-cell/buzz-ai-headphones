import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()

  // Create sample products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Buzz AI Pro',
        description: 'Premium noise-cancelling headphones with AI-powered sound optimization. Experience crystal-clear audio with adaptive noise cancellation that adjusts to your environment.',
        price: 299.99,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w-800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop',
        ],
        features: [
          { title: 'AI Noise Cancellation', icon: '🧠', description: 'Adaptive noise cancellation powered by machine learning' },
          { title: '40-hour Battery', icon: '🔋', description: 'All-day battery life with fast charging' },
          { title: 'Premium Sound', icon: '🎵', description: 'Hi-Res audio with custom drivers' },
          { title: 'Voice Assistant', icon: '🎤', description: 'Built-in Alexa and Google Assistant' },
          { title: 'Comfort Fit', icon: '😌', description: 'Memory foam ear cushions for all-day comfort' },
        ],
        faq: [
          {
            question: 'How does AI noise cancellation work?',
            answer: 'Our AI analyzes ambient sound 100 times per second and generates inverse sound waves to cancel noise.',
          },
          {
            question: 'What is the battery life?',
            answer: 'Up to 40 hours with noise cancellation enabled. 15-minute quick charge provides 5 hours of playback.',
          },
          {
            question: 'Are they water resistant?',
            answer: 'Yes, IPX4 rating protects against sweat and light rain.',
          },
        ],
        stock: 150,
      },
      {
        name: 'Buzz AI Lite',
        description: 'Lightweight wireless headphones with smart features. Perfect for everyday use with comfortable fit and clear audio.',
        price: 199.99,
        images: [
          'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&auto=format&fit=crop',
        ],
        features: [
          { title: 'Wireless Freedom', icon: '📡', description: 'Bluetooth 5.3 with stable connection' },
          { title: '30-hour Battery', icon: '🔋', description: 'Extended battery life for daily use' },
          { title: 'Clear Calls', icon: '📞', description: 'Beamforming microphones for crisp calls' },
          { title: 'Compact Design', icon: '🎧', description: 'Foldable and portable' },
        ],
        faq: [
          {
            question: 'What is the difference between Pro and Lite?',
            answer: 'The Pro version features AI noise cancellation and premium materials, while Lite focuses on essential features at a lower price.',
          },
          {
            question: 'Can I use them for sports?',
            answer: 'Yes, they are sweat-resistant and have a secure fit.',
          },
        ],
        stock: 250,
      },
      {
        name: 'Buzz AI Max',
        description: 'Over-ear headphones with studio-quality sound and advanced features. For audiophiles who demand the best.',
        price: 449.99,
        images: [
          'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop',
        ],
        features: [
          { title: 'Studio Quality', icon: '🎛️', description: 'Hi-Res Audio certified with lossless support' },
          { title: 'Multi-point ANC', icon: '🎚️', description: '4 levels of noise cancellation' },
          { title: '50-hour Battery', icon: '🔋', description: 'Industry-leading battery life' },
          { title: 'Premium Materials', icon: '💎', description: 'Aluminum and genuine leather construction' },
          { title: 'Spatial Audio', icon: '🌐', description: '3D audio with head tracking' },
        ],
        faq: [
          {
            question: 'What audio codecs are supported?',
            answer: 'LDAC, aptX HD, AAC, and SBC for maximum compatibility.',
          },
          {
            question: 'Do they support wired connection?',
            answer: 'Yes, includes a 3.5mm audio cable for studio use.',
          },
        ],
        stock: 75,
      },
    ],
  })

  console.log(`✅ Created ${products.count} products`)

  // Create sample orders
  const order = await prisma.order.create({
    data: {
      email: 'customer@example.com',
      total: 299.99,
      status: 'PAID',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'San Francisco',
        country: 'USA',
        postalCode: '94107',
      },
      items: {
        create: [
          {
            productId: (await prisma.product.findFirst({ where: { name: 'Buzz AI Pro' } }))!.id,
            quantity: 1,
            price: 299.99,
          },
        ],
      },
    },
  })

  console.log(`✅ Created sample order ${order.id}`)
  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })