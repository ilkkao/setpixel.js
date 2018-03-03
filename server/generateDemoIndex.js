const fs = require('fs');
const path = require('path')

const demoDir = path.join(__dirname, '../demos');

function isDirectory(source) {
  return fs.lstatSync(source).isDirectory();
}

module.exports = function generate() {
  const demos = fs.readdirSync(demoDir)
    .map(name => path.join(demoDir, name))
    .filter(isDirectory)
    .map(dir => path.basename(dir));

  let output = '';

  for (let i = 0; i < 10; i++) {
    output += '// GENERATED FILE. DO NOT EDIT!\n';
  }

  output += '\n';

  demos.forEach(demo => {
    output += `import * as ${demo} from './${demo}';\n`;
  });

  output += '\n';
  output += 'export default {\n';

  demos.forEach(demo => {
    output += `  ${demo}: ${demo},\n`;
  });

  output += '};\n';

  fs.writeFileSync(path.join(demoDir, 'index.js'), output);
};