const path=require('node:path');
const projectRoot=path.resolve(__dirname,'..');
// Override for another checkout: SS14_ROOT=/path/to/space-station-14
const gameRoot=path.resolve(process.env.SS14_ROOT||'C:/Users/almar/Desktop/ss14llocal/space-station-14');
module.exports={projectRoot,gameRoot};
