//test that a set of names are returned
test('A set of names is returned', done =>{
    function callback(data) {
        expect(data.names.size).toBe(data.arr.length);
        done();
      }
    
      var names = new Set();
    //function retrieves data from the airtable an puts into appointments
    var count = 0;
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: "keyYFWbcwIfgdSCb4"}).base('appuPqYIxCcvESuzm');

    base('Appointments').select({
      //add conditions here
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function(record) {
            names.add(record.get("first_name") + " " + record.get("last_name"));
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        var arr = Array.from(names);
        callback({names,arr});
        if (err) { console.error(err); return; }
    });  
});

// //test that the sample database is our set size
// test('200 appointments in the factory', done =>{
//     function callback(data) {
//         expect(data.length).toBe(200);
//         done();
//       }
    
//     var appointments = [];
//     //function retrieves data from the airtable an puts into appointments
//     var count = 0;
//     var Airtable = require('airtable');
//     var base = new Airtable({apiKey: "keyYFWbcwIfgdSCb4"}).base('appuPqYIxCcvESuzm');

//     base('Appointments').select({
//       //add conditions here
//     }).eachPage(function page(records, fetchNextPage) {
//         // This function (`page`) will get called for each page of records.
//         records.forEach(function(record) {
//             appointments[count] = record.fields;
//             count ++;
//         });

//         // To fetch the next page of records, call `fetchNextPage`.
//         // If there are more records, `page` will get called again.
//         // If there are no more records, `done` will get called.
//         fetchNextPage();

//     }, function done(err) {
//         callback(appointments);
//         if (err) { console.error(err); return; }
//     });  
// });


