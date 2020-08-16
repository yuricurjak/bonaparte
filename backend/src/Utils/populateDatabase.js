import mongoose from 'mongoose';
import database from '../Database';
import Movie from '../Models/Movie';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

async function processLineByLine() {
  try {
    const objResult = {};
    await database.connect();

    const rl = createInterface({
      input: createReadStream('data.tsv'),
      output: process.stdout,
      terminal: false
    });

    for await (const line of rl) {
      let campos = line.split('\t');
      console.log( `tconst: ${campos[0]} - titleType: ${campos[1]} - primaryTitle: ${campos[2]}` );
      objResult[campos[0]] = {
        tconst: campos[0],
        titleType: campos[1],
        primaryTitle: campos[2],
        originalTitle: campos[3],
        isAdult: campos[4],
        startYear: campos[5],
        endYear: campos[6],
        runtimeMinutes: campos[7],
        genres: campos[8]
      };
    }

    const rl2 = createInterface({
      input: createReadStream('data2.tsv'),
      output: process.stdout,
      terminal: false
    });

    for await (const line of rl2) {
      let campos = line.split('\t');
      console.log( `tconst: ${campos[0]} - averageRating: ${campos[1]} - numVotes: ${campos[2]}` );

      if (objResult[campos[0]]) {
        objResult[campos[0]].averageRating = campos[1];
        objResult[campos[0]].numVotes = campos[2];
      }
    }

    const vetResults = Object.values(objResult);
    for(let i = 1; i <= 65; i++) {
      await Movie.insertMany(vetResults.slice((((108641 * (i - 1)) + 1)), ((108641 * (i - 1)) + 1) + 108641));
      console.log(i);
    }

    console.log('File processed.');
    mongoose.connection.close(() => {
      console.info("Database connection closed!");
      console.info(new Date);
      process.exit(0);
    });
  } catch (err) {
    console.error(err);
  }
};

processLineByLine();