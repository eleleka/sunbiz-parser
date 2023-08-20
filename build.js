const pkg = require('pkg');

pkg.exec(['modifyTxtFile.js', '--output', 'myapp'], { targets: 'node16-macos-x64' }) // for other OS use this: node16-linux-x64,node16-win-x64
  .then(() => console.log('Build complete'))
  .catch(err => console.error('Build failed:', err));
