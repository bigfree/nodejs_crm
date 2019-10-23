process.env.PORT = process.env.PORT|| 8000; // Port express

// Configuration MongoDB
process.env.DBNAME = process.env.DBNAME || 'manager';
process.env.DBHOST = process.env.DBHOST || 'localhost';
process.env.DBUSER = process.env.DBUSER || 'user';
process.env.DBPASS = process.env.DBPASS || '';
process.env.DBPORT = process.env.DBPORT || 27017;

// For development
// process.env.URI = `mongodb://${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`;
process.env.URI = `mongodb+srv://bigfree:Anetka2357@test-ecpfd.gcp.mongodb.net/test?retryWrites=true&w=majority`;

// For production
// process.env.URI = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`;
