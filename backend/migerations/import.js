const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import the model (you'll need to compile the TypeScript model first or convert it to JS)
// For now, let's define the schema directly in this file
const dataSchema = new mongoose.Schema({
  end_year: {
    type: String,
    default: ""
  },
  intensity: {
    type: Number,
    required: false,
    default: 0
  },
  sector: {
    type: String,
    default: ""
  },
  topic: {
    type: String,
    default: ""
  },
  insight: {
    type: String,
    default: ""
  },
  url: {
    type: String,
    default: ""
  },
  region: {
    type: String,
    default: ""
  },
  start_year: {
    type: String,
    default: ""
  },
  impact: {
    type: String,
    default: ""
  },
  added: {
    type: String,
    required: false,
    default: () => new Date().toISOString()
  },
  published: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  relevance: {
    type: Number,
    required: false,
    default: 0
  },
  pestle: {
    type: String,
    default: ""
  },
  source: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    required: false,
    default: "Untitled"
  },
  likelihood: {
    type: Number,
    required: false,
    default: 0
  }
}, {
  timestamps: true
});

const Data = mongoose.model('Data', dataSchema);

const importData = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Read JSON file
    console.log('Reading JSON data...');
    const jsonPath = path.join(__dirname, '..', 'jsondata.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(jsonData);

    console.log(`Found ${data.length} records to import`);

    // Clear existing data (optional - remove this if you want to keep existing data)
    console.log('Clearing existing data...');
    await Data.deleteMany({});

    // Clean and validate data before import
    console.log('Cleaning and validating data...');
    const cleanedData = data.map((record, index) => {
      // Handle missing or null values for all fields
      const cleanedRecord = {
        end_year: record.end_year || "",
        intensity: (record.intensity !== null && record.intensity !== undefined && !isNaN(record.intensity)) ? Number(record.intensity) : 0,
        sector: record.sector || "",
        topic: record.topic || "",
        insight: record.insight || "",
        url: record.url || "",
        region: record.region || "",
        start_year: record.start_year || "",
        impact: record.impact || "",
        added: record.added || new Date().toISOString(),
        published: record.published || "",
        country: record.country || "",
        relevance: (record.relevance !== null && record.relevance !== undefined && !isNaN(record.relevance)) ? Number(record.relevance) : 0,
        pestle: record.pestle || "",
        source: record.source || "",
        title: record.title || `Record ${index + 1}`,
        likelihood: (record.likelihood !== null && record.likelihood !== undefined && !isNaN(record.likelihood)) ? Number(record.likelihood) : 0
      };
      
      return cleanedRecord;
    });

    console.log('Data cleaning completed');
    console.log(`Sample cleaned record:`, cleanedData[0]);

    // Insert data in batches for better performance
    const batchSize = 100;
    let imported = 0;

    for (let i = 0; i < cleanedData.length; i += batchSize) {
      const batch = cleanedData.slice(i, i + batchSize);
      try {
        await Data.insertMany(batch);
        imported += batch.length;
        console.log(`Imported ${imported}/${cleanedData.length} records`);
      } catch (batchError) {
        console.error(`Error importing batch ${i}-${i + batchSize}:`, batchError.message);
        // Try inserting records one by one for this batch
        for (const record of batch) {
          try {
            await Data.create(record);
            imported++;
          } catch (recordError) {
            console.error(`Failed to import record:`, record, recordError.message);
          }
        }
      }
    }

    console.log('Data import completed successfully!');
    
    // Verify import
    const count = await Data.countDocuments();
    console.log(`Total records in database: ${count}`);

  } catch (error) {
    console.error('Error during import:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Run the import
importData();