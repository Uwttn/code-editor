import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Exports a function to POST to the database.
export const putDb = async (content) => {
  console.log("Put to the database");

  // Creates a connection to the data database and version.
  const dataDb = await openDB("data", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = dataDb.transaction("data", "readwrite");

  // Opens up the desired object store.
  const store = tx.objectStore("data");

  // Uses the .put() method on the store and passes in the content.
  const request = store.put({ id: 1, value: content });

  // Gets confirmation of the request.
  const result = await request;

  if (result !== undefined) {
    console.log("Data saved to the database, ID:", result);

    // Fetch the newly inserted data to confirm it was saved correctly.
    const savedData = await store.get(result);
    console.log("Saved data:", savedData.value);
    return savedData.value;
  } else {
    console.log(
      "The cat ran away with the note! It wasn't saved to the database!"
    );
    return null;
  }
};

// Exports a function to get the database.
export const getDb = async () => {
  console.log("Get all notes from the database");

  // Creates a connection to the data database and version.
  const dataDb = await openDB("data", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = dataDb.transaction("data", "readonly");

  // Opens up the desired object store.
  const store = tx.objectStore("data");

  // Uses the .get(1) method to retrieve the value of the first record matching the query.

  const request = store.get(1);

  // Gets confirmation of the request.
  const result = await request;
  result
    ? console.log("Notes retrieved from database:", result.value)
    : console.log("No notes found in database! The cat must have stolen them!");
  return result?.value;
};

export const deleteDb = async () => {
  console.log("Uh oh! The cat ran away with your notes!");
  const dataDb = await openDB("data", 1);
  const tx = dataDb.transaction("data", "readwrite");
  const store = tx.objectStore("data");
  const request = store.delete(1);
  await request;

  console.log("Note has been removed from the database");
  return true;
};

// Starts database
initdb();
