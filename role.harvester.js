var debug = require('librun');

var roleHarvester = {
	run(creep,base) {
		var sources = creep.room.find(FIND_SOURCES);
		if (creep.carry.energy < creep.carryCapacity) {
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0]);
			}
		} else if (base.energy < base.energyCapacity) {
			if (creep.transfer(base, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(base);
			}
		}
	}
};

module.exports = roleHarvester;
