import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import Data from '../models/Data';
import * as dotenv from 'dotenv';
dotenv.config();
const importData = async () => {
  try {
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB successfully!');

    
    console.log('Reading JSON data...');
    const jsonPath = path.join(__dirname, '..', 'jsondata.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(jsonData);

    console.log(`Found ${data.length} records to import`);

   
    console.log('Clearing existing data...');
    await Data.deleteMany({});

    
    const batchSize = 100;
    let imported = 0;

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      await Data.insertMany(batch);
      imported += batch.length;
      console.log(`Imported ${imported}/${data.length} records`);
    }

    console.log('Data import completed successfully!');
    
    
    const count = await Data.countDocuments();
    console.log(`Total records in database: ${count}`);

  } catch (error) {
    console.error('Error during import:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Run the import
importData();