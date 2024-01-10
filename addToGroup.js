// addToGroup.js
const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const { phoneNumberFormatter } = require('./helpers/formatter');
const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu'
      ],
    },
    authStrategy: new LocalAuth()
  });

  async function addToGroup(groupId, numbers) {
    try {
      // Initialize or use your existing WhatsApp client instance
      // ...
  
      // Find the group by ID
      const group = await client.getChatById(groupId);
  
      if (!group) {
        return 'Group not found';
      }
  
      // Add each number to the group
      for (const number of numbers) {
        const formattedNumber = phoneNumberFormatter(number);
        await group.addParticipants([formattedNumber]);
      }
  
      return 'Numbers added to the group successfully';
    } catch (error) {
      console.error('Error adding numbers to group:', error);
      return 'Failed to add numbers to the group';
    }
  }

module.exports = { addToGroup };
