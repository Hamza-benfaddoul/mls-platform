const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Computer Science' },
        { name: 'Music' },
        { name: 'Fitness' },
        { name: 'Photography' },
        { name: 'Accounting' },
        { name: 'Engineering' },
        { name: 'Filming' },
      ],
    })
    console.log('success')
  } catch (error) {
    console.log('Error seeding the database categories', error)
  } finally {
    await database.$disconnect()
  }
}

async function AddAttachment() {
  try {
    await database.attachment.create({
      data: {
        url:
          'https://www.youtube.com/watch?v=7CqJlxBYj-M&list=PL4cUxeGkcC9gZD-Tvwfod2ga0y0B5c8Ml',
        name: 'Node.js',
        courseId: 'clvv4m43e000010aoc21dyhpx',
      },
    })
    console.log('success')
  } catch (error) {
    console.log('Error seeding the database categories', error)
  } finally {
    await database.$disconnect()
  }
  }

/* main() */
AddAttachment()
