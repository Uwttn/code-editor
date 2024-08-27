const install = document.getElementById('buttonInstall');

// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    // Stores the triggered events
    window.deferredPrompt = event;

    // Removes the hidden class from the button.
    install.classList.toggle('hidden', false);
});

// Click event handler on the `install` element
install.addEventListener('click', async () => {
      
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  // Shows prompt
  promptEvent.prompt();
  
  // Resets the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;
  
  // Adds the hidden class to the button.
  install.classList.toggle('hidden', true);
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
      // Clear prompt
  window.deferredPrompt = null;
});

// SAVE BUTTON

const butSave = document.getElementById('buttonSave');
const saveMessage = document.getElementById('saveMessage'); // Element to display the save message

// Click event handler on the `butSave` element
butSave.addEventListener('click', async () => {
      
  // Example: Save some data or perform a save action
  const dataToSave = {
    key: 'value', // Replace with your actual data
  };

  try {
    // Simulate a save operation (e.g., saving to localStorage or sending to a server)
    localStorage.setItem('savedData', JSON.stringify(dataToSave)); // Example: Save to localStorage
    console.log('Data saved successfully!');

    // Display a "Code saved" message on the page
    saveMessage.textContent = 'Code saved';
    saveMessage.classList.toggle('hidden', false); // Ensure the message is visible

  } catch (error) {
    console.error('Failed to save data:', error);

    // Optionally display an error message
    saveMessage.textContent = 'Failed to save code';
    saveMessage.classList.toggle('hidden', false);
  }

  // Hide the save button after the save action
  butSave.classList.toggle('hidden', true);
});

// Optional: Re-show the button and clear the message based on some condition
window.addEventListener('someEvent', () => {
  // Some condition to re-show the button
  butSave.classList.toggle('hidden', false);
  
  // Clear the save message
  saveMessage.classList.toggle('hidden', true);
});