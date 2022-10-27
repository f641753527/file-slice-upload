const fs = require('fs')

function rmDir(path) {
  new Promise(async (resolve) => {
    if (fs.existsSync(path)) {
      const dirs = [];

      const files = await fs.readdirSync(path);

      files.forEach(async (file) => {
        const childPath = path + "/" + file;
        if (fs.statSync(childPath).isDirectory()) {
          await rmDir(childPath);
          dirs.push(childPath);
        } else {
          await fs.unlinkSync(childPath);
        }
      });

      dirs.forEach((fir) => fs.rmdirSync(fir));

      resolve();
    }
  });
}

module.exports = {
  rmDir,
}