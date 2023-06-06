import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default  async function usersSeedData() {
    // MAIN USER
    await prisma.user.upsert({
        where: { id: 804929 },
        update: {},
        create: {
            id: 804929,
            email: 'raiesbo@uoc.edu',
            phone: '0179408329048',
            firstName: 'Raimon',
            lastName: 'Espasa',
            role: 'SP',
            location: {
                create: {
                    country: '',
                    city: '',
                    zip: '',
                    streetName: '',
                    streetNumber: ''
                }
            }
        }
    });

    // ALT USER 1
    await prisma.user.upsert({
        where: { id: 804931 },
        update: {},
        create: {
            id: 804931,
            email: 'alice@uoc.edu',
            phone: '0179408329048',
            firstName: 'Alice',
            lastName: 'Muller',
            role: 'CUSTOMER',
            location: {
                create: {
                    country: '',
                    city: '',
                    zip: '',
                    streetName: '',
                    streetNumber: ''
                }
            }
        }
    });

    // ALT USER 2
    await prisma.user.upsert({
        where: { id: 804930 },
        update: {},
        create: {
            id: 804930,
            email: 'bob@uoc.edu',
            phone: '0179408329048',
            firstName: 'Bob',
            lastName: 'Madok',
            role: 'SP',
            location: {
                create: {
                    country: '',
                    city: '',
                    zip: '',
                    streetName: '',
                    streetNumber: ''
                }
            }
        }
    });

    // ALT USER 3
    await prisma.user.upsert({
        where: { id: 804932 },
        update: {},
        create: {
            id: 804932,
            email: 'jan@uoc.edu',
            phone: '0179408329048',
            firstName: 'Jan',
            lastName: 'Andreas',
            role: 'SP',
            location: {
                create: {
                    country: '',
                    city: '',
                    zip: '',
                    streetName: '',
                    streetNumber: ''
                }
            }
        }
    });

    // ALT USER 4
    await prisma.user.upsert({
        where: { id: 804933 },
        update: {},
        create: {
            id: 804933,
            email: 'sophia@uoc.edu',
            phone: '017940854353',
            firstName: 'Sophia',
            lastName: 'Oliveira',
            role: 'SP',
            location: {
                create: {
                    country: '',
                    city: '',
                    zip: '',
                    streetName: '',
                    streetNumber: ''
                }
            }
        }
    });

    // ALT USER 5
    await prisma.user.upsert({
        where: { id: 804934 },
        update: {},
        create: {
            id: 804934,
            email: 'laura@uoc.edu',
            phone: '0179408329048',
            firstName: 'Laura',
            lastName: 'Muster',
            role: 'SP',
            location: {
                create: {
                    country: '',
                    city: '',
                    zip: '',
                    streetName: '',
                    streetNumber: ''
                }
            }
        }
    });
}
