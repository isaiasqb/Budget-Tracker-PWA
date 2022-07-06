let db;

const request = indexedDB.open('budget_tracker', 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore('new_transaction', { autoIncrement: true });
};

// if successful eventhandler
request.onsuccess = function(event) {
  db = event.target.result;

  // check if online, if yes send all local db data to api
  if (navigator.onLine) {
    uploadTransaction();
  }
};

request.onerror = function(event) {
  console.log(event.target.errorCode);
};


//store data when off line
function saveRecord(record) {
  // open a new transaction
  const transaction = db.transaction(['new_transaction'], 'readwrite');
  // access the object store
  const transactionObjectStore = transaction.objectStore('new_transaction');
  // add record to your store with add method
  transactionObjectStore.add(record);
}

//when regaining connection
function uploadTransaction() {
  // open a transaction on your db
  const transaction = db.transaction(['new_transaction'], 'readwrite');
  // access your object store
  const transactionObjectStore = transaction.objectStore('new_transaction');

  // get all records from store and set to a variable
  const getAll = transactionObjectStore.getAll();

  // upon a successful .getAll() execution, run this function
  getAll.onsuccess = function() {
    // if there was data in indexedDb's store, let's send it to the api server
    if (getAll.result.length > 0) {
      fetch('/api/transaction', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open one more transaction
          const transaction = db.transaction(['new_transaction'], 'readwrite');
          // access the object store
          const transactionObjectStore = transaction.objectStore('new_transaction');
          // clear all items in your store
          transactionObjectStore.clear();

          alert('All saved transactions has been submitted!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', uploadTransaction);