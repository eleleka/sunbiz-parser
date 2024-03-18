const fs = require('fs');

// const filePath = '20230605c.txt';
// const newFilePath = '20230605c-export.txt';
const symbol = '|';
// const symbol = ',';

const searchZip = ['33009', '33019', '33154', '33160', '33180', '33181']; // zip codes
const positionsToInsertSymbol = [12, 205, 222, 265, 308, 339, 352, 395, 438, 467, 480, 505, 515, 557, 578, 593, 602, 646, 675, 687, 692, 694, 715, 730, 739, 782, 811, 823, 849, 864, 873, 916, 945, 957, 962, 984, 999, 1008, 1051, 1080, 1092, 1118, 1133, 1142, 1146, 1186, 1215]; // char positions for column separator
const newLine = 'Entity|Name|Type|Principal Address 1|Principal Address 2|Principal City|Principal ZIP|Principal Address 3|Mailing Address 1|Mailing City|Mailing ZIP|Mailing Address 2|Mailing Address 3|Principal State|Registered Agent Name|||Registered Agent address|Registered Agent City||Title||Authorized Person Last name|Authorized Person First Name||Authorized Person Address 1|Authorized Person city|Authorized Person ZIP||||||||\n';
const path = require('path');
// const newLine = 'Entity,Name,Type,Principal Address 1,Principal Address 2,Principal City,Principal ZIP,Principal Address 3,Mailing Address 1,Mailing City,Mailing ZIP,Mailing Address 2,Mailing Address 3,Principal State,Registered Agent Name,,,Registered Agent address,Registered Agent City,,Title,,Authorized Person First Name,Authorized Person Last name,,Authorized Person Address 1,Authorized Person city,Authorized Person ZIP,,,,,,,,\n';

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`Enter name of TXT file: `, name => {
  function test () {
    const fileName = `${name}.txt`;
    const exportFileName = `${name}-export.txt`;
    const inputPath = path.join(process.cwd() + '/sunbiz-parser/', fileName);
    const outputPath = path.join(process.cwd() + '/sunbiz-parser/', exportFileName);
    console.log('process.cwd():', process.cwd())

    fs.readFile(inputPath, 'utf-8', (err, content) => {
      if (err) {
        console.error('Error reading the TXT file:', err);
        return;
      }

      // Process each line
      const modifiedContent = content.split('\n').map(line => {
        // Insert the symbol at specified positions
        let modifiedLine = line;
        for (const position of positionsToInsertSymbol) {
          if (position <= modifiedLine.length) {
            modifiedLine = modifiedLine.slice(0, position) + symbol + modifiedLine.slice(position);
          }
        }

        // Remove all spaces before the |
        modifiedLine = modifiedLine.replace(/\s*(\|)/g, `$1`);

        return modifiedLine;
      }).join('\n'); // Join the modified lines back to form the updated content


      const lines = modifiedContent.split('\n'); // break the text on lines
      const filteredLines = lines.filter(line => {
        // Check if the line contains any of the values to delete
        return searchZip.some(value => line.includes(value));
      }).join('\n');

      // add new first line
      const updatedContent = newLine + filteredLines;

      // Write the modified content back to the file
      fs.writeFile(outputPath, updatedContent, 'utf-8', (err) => {
        if (err) {
          console.error('Error writing to the TXT file:', err);
          return;
        }

        console.log('Symbols inserted successfully on each line of the TXT file.');
      });
    });
  }

  test();
  test();

  readline.close();
});


// Ref Links:
// https://www.geeksforgeeks.org/node-js-path-dirname-method/?ref=lbp
// https://stackoverflow.com/questions/58679182/how-to-get-programs-current-directory-in-node-js-program-using-pkg
// https://stackoverflow.com/questions/63933581/using-node-pkg-to-create-executable-with-npm-config
// https://stackoverflow.com/questions/76097029/how-can-i-read-or-copy-assets-out-of-an-exe-packaged-with-vercel-pkg
// https://stackoverflow.com/questions/36540996/how-to-take-two-consecutive-input-with-the-readline-module-of-node-js
