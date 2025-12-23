import { PrismaClient, CourtType, CourtStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const courts = await Promise.all([
    prisma.court.create({
      data: {
        name: 'Court 1',
        type: CourtType.INDOOR,
        status: CourtStatus.ACTIVE,
        description: 'Premium indoor court with excellent lighting',
        pricePerHour: 100000,
        location: 'Ground Floor, Section A',
        maxPlayers: 4,
      },
    }),
    prisma.court.create({
      data: {
        name: 'Court 2',
        type: CourtType.INDOOR,
        status: CourtStatus.ACTIVE,
        description: 'Standard indoor court',
        pricePerHour: 100000,
        location: 'Ground Floor, Section B',
        maxPlayers: 4,
      },
    }),
    prisma.court.create({
      data: {
        name: 'Court 3',
        type: CourtType.OUTDOOR,
        status: CourtStatus.ACTIVE,
        description: 'Outdoor court with natural grass',
        pricePerHour: 80000,
        location: 'Outdoor Area, East',
        maxPlayers: 4,
      },
    }),
    prisma.court.create({
      data: {
        name: 'Court 4',
        type: CourtType.OUTDOOR,
        status: CourtStatus.ACTIVE,
        description: 'Outdoor court with artificial turf',
        pricePerHour: 80000,
        location: 'Outdoor Area, West',
        maxPlayers: 4,
      },
    }),
    prisma.court.create({
      data: {
        name: 'Premium Court',
        type: CourtType.PREMIUM,
        status: CourtStatus.ACTIVE,
        description: 'VIP court with lounge access',
        pricePerHour: 150000,
        location: 'First Floor, VIP Section',
        maxPlayers: 4,
      },
    }),
  ]);

  console.log(`✅ Created ${courts.length} courts`);
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

