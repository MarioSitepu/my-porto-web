import { prisma } from '../src/lib/prisma';

async function main() {
  const p = await prisma.project.findMany({ orderBy: { order: 'asc' } });
  console.log('Total in DB:', p.length);
  p.forEach((x, i) => console.log(`${i}. [order: ${x.order}] ${x.title} (image: ${x.image})`));
}

main().finally(() => prisma.$disconnect());
