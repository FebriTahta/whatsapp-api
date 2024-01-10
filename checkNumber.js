// checkRegisteredNumber.js

const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');

async function checkNumber(client, number) {
  try {
    // Initialize a temporary client
    const tempClient = new Client();

    // Connect the temporary client
    await tempClient.initialize();

    // Check if the number is registered
    const isRegistered = await tempClient.isRegisteredUser(number);

    // Close the temporary client connection
    await tempClient.destroy();

    return isRegistered;
  } catch (error) {
    console.error('Error checking registered number:', error);
    return false;
  }
}

module.exports = { checkNumber };
