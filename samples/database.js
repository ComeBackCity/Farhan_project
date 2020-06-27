const {Firestore} = require('@google-cloud/firestore');

// Create a new client
const firestore = new Firestore({keyFilename: "Ajraar-shop-78d0c5c5676f.json"});

async function quickstart() {
    // Obtain a document reference.
    const document = firestore.doc('user/ashraful');

    // Enter new data into the document.
    await document.set({
        name: 'Ashraful'
    });
    console.log('Entered new data into the document');

    // // Update an existing document.
    // await document.update({
    //     body: 'My first Firestore app',
    // });
    // console.log('Updated an existing document');
    //
    // // Read the document.
    // let doc = await document.get();
    // console.log('Read the document');
    //
    // // Delete the document.
    // await document.delete();
    // console.log('Deleted the document');
}
quickstart();
