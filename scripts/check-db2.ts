import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const projects = await prisma.project.findMany();
    fs.writeFileSync('scripts/db-dump.json', JSON.stringify(projects, null, 2));
    console.log('Dumped to scripts/db-dump.json');
}

main().catch(console.error).finally(() => prisma.$disconnect());
