import { PrismaClient } from "@prisma/client";

export async function comment(prisma: PrismaClient) {
  await prisma.comment.createMany({
    data: [
      { receiverNo: 1, senderNo: 8, content: "Hello world!" },
      { receiverNo: 1, senderNo: 5, content: "Random content 1" },
      { receiverNo: 1, senderNo: 13, content: "This is a message" },
      { receiverNo: 1, senderNo: 17, content: "Another message" },
      { receiverNo: 1, senderNo: 20, content: "Some random text" },
      { receiverNo: 1, senderNo: 12, content: "Hello there!" },
      { receiverNo: 1, senderNo: 14, content: "Random text 2" },
      { receiverNo: 1, senderNo: 3, content: "Test message" },
      { receiverNo: 1, senderNo: 7, content: "Sample text" },
      { receiverNo: 1, senderNo: 22, content: "Another random content" },

      { receiverNo: 2, senderNo: 2, content: "Self message" },
      { receiverNo: 2, senderNo: 11, content: "Random content 3" },
      { receiverNo: 2, senderNo: 18, content: "Hello again" },
      { receiverNo: 2, senderNo: 21, content: "Text message" },
      { receiverNo: 2, senderNo: 9, content: "Another example" },
      { receiverNo: 2, senderNo: 13, content: "More text here" },

      { receiverNo: 3, senderNo: 5, content: "Content message" },
      { receiverNo: 3, senderNo: 7, content: "Example content" },
      { receiverNo: 3, senderNo: 22, content: "Message content" },
      { receiverNo: 3, senderNo: 10, content: "Just some text" },
      { receiverNo: 3, senderNo: 17, content: "Another text" },

      { receiverNo: 4, senderNo: 6, content: "Message example" },
      { receiverNo: 4, senderNo: 11, content: "Text example" },
      { receiverNo: 4, senderNo: 23, content: "Random message" },
      { receiverNo: 4, senderNo: 20, content: "Sample message" },

      { receiverNo: 5, senderNo: 1, content: "Random content 4" },
      { receiverNo: 5, senderNo: 19, content: "Message random" },
      { receiverNo: 5, senderNo: 24, content: "Text random" },
      { receiverNo: 5, senderNo: 12, content: "Example message 2" },
      { receiverNo: 5, senderNo: 28, content: "Another random text" },

      { receiverNo: 6, senderNo: 9, content: "Hello text" },
      { receiverNo: 6, senderNo: 3, content: "Sample content 2" },
      { receiverNo: 6, senderNo: 15, content: "More random text" },
      { receiverNo: 6, senderNo: 2, content: "Test content" },
      { receiverNo: 6, senderNo: 26, content: "Another message example" },

      { receiverNo: 7, senderNo: 8, content: "Content 3" },
      { receiverNo: 7, senderNo: 19, content: "Random example" },
      { receiverNo: 7, senderNo: 4, content: "Message 3" },
      { receiverNo: 7, senderNo: 10, content: "Sample text 3" },

      { receiverNo: 8, senderNo: 22, content: "Example content 3" },
      { receiverNo: 8, senderNo: 1, content: "Another content example" },
      { receiverNo: 8, senderNo: 12, content: "Hello content" },
      { receiverNo: 8, senderNo: 14, content: "Random message 3" },

      { receiverNo: 9, senderNo: 2, content: "Text 4" },
      { receiverNo: 9, senderNo: 5, content: "Message text 4" },
      { receiverNo: 9, senderNo: 16, content: "Another example content" },

      { receiverNo: 10, senderNo: 7, content: "Example text 4" },
      { receiverNo: 10, senderNo: 29, content: "Random example 4" },
      { receiverNo: 10, senderNo: 25, content: "Message content 4" },

      { receiverNo: 11, senderNo: 13, content: "Text content 4" },
      { receiverNo: 11, senderNo: 20, content: "Sample message 4" },
      { receiverNo: 11, senderNo: 9, content: "Another random content 4" },

      { receiverNo: 12, senderNo: 6, content: "Random message 5" },
      { receiverNo: 12, senderNo: 2, content: "Sample content 5" },
      { receiverNo: 12, senderNo: 30, content: "Message example 5" },

      { receiverNo: 13, senderNo: 14, content: "Content text 5" },
      { receiverNo: 13, senderNo: 21, content: "Another sample message" },
      { receiverNo: 13, senderNo: 5, content: "Example message 5" },

      { receiverNo: 14, senderNo: 10, content: "Random example text" },
      { receiverNo: 14, senderNo: 1, content: "Sample text 5" },

      { receiverNo: 15, senderNo: 2, content: "Another content 5" },
      { receiverNo: 15, senderNo: 6, content: "Random text message" },
      { receiverNo: 15, senderNo: 13, content: "Message text example" },

      { receiverNo: 16, senderNo: 17, content: "Content message 5" },
      { receiverNo: 16, senderNo: 11, content: "Example text message" },

      { receiverNo: 17, senderNo: 4, content: "Text 5" },
      { receiverNo: 17, senderNo: 8, content: "Another random text 5" },

      { receiverNo: 18, senderNo: 9, content: "Sample message text" },
      { receiverNo: 18, senderNo: 3, content: "Random content text" },

      { receiverNo: 19, senderNo: 1, content: "Message text sample" },
      { receiverNo: 19, senderNo: 24, content: "Another content example" },

      { receiverNo: 20, senderNo: 7, content: "Sample random text" },
      { receiverNo: 20, senderNo: 18, content: "Message example text" },

      { receiverNo: 21, senderNo: 14, content: "Random text sample" },
      { receiverNo: 21, senderNo: 25, content: "Another message content" },

      { receiverNo: 22, senderNo: 30, content: "Text message example" },
      { receiverNo: 22, senderNo: 17, content: "Random content message" },

      { receiverNo: 23, senderNo: 10, content: "Sample example text" },
      { receiverNo: 23, senderNo: 26, content: "Another random message" },

      { receiverNo: 24, senderNo: 2, content: "Message sample text" },
      { receiverNo: 24, senderNo: 27, content: "Random text example" },

      { receiverNo: 25, senderNo: 8, content: "Content random message" },
      { receiverNo: 25, senderNo: 5, content: "Text example content" },

      { receiverNo: 26, senderNo: 12, content: "Sample random content" },
      { receiverNo: 26, senderNo: 20, content: "Message text random" },

      { receiverNo: 27, senderNo: 29, content: "Another text content" },
      { receiverNo: 27, senderNo: 3, content: "Example message content" },

      { receiverNo: 28, senderNo: 18, content: "Random message sample" },
      { receiverNo: 28, senderNo: 22, content: "Text content example" },

      { receiverNo: 29, senderNo: 4, content: "Sample text message" },
      { receiverNo: 29, senderNo: 16, content: "Another random content" },

      { receiverNo: 30, senderNo: 7, content: "Message text 6" },
      { receiverNo: 30, senderNo: 13, content: "Random example 6" },
    ],
  });
}
