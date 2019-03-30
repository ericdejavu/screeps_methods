const roleHarvester = require('role.harvester');
const debug = require('librun');
const motherShip = require('role.mothership');


module.exports.loop = () => {
	let base = Game.spawns['Spawn1'];
	motherShip.run(base);
	for (let name in Game.creeps) {
		let creep = Game.creeps[name];
		if (creep.memory.role == 'harvester') {
			roleHarvester.run(creep, base);
		}
	}
}
