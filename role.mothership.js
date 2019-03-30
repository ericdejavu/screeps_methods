const NORMAL 	= 1;
const CAPACITY 	= 2;
const FAST		= 3;
const HARDWORK	= 4;

const MEANINGLESS	= 10;

function buildWorkerByList(base, list, role) {
	let result = MEANINGLESS;
	for (let i=0;i < 3 && result != OK;i++) {
		let name = role + Math.floor(Math.random()*10000);
		result = base.spawnCreep( list, name, {memory:{'role':role}});
	}
}

function buildWorker(base, type, MajorRole) {
	switch(type) {
		case NORMAL: 	buildWorkerByList(base, [WORK, CARRY, MOVE], role);break;
		case CAPACITY: 	buildWorkerByList(base, [WORK, CARRY, CARRY, MOVE], role);break;
		case FAST: 		buildWorkerByList(base, [WORK, CARRY, MOVE, MOVE], role);break;
		case HARDWORK: 	buildWorkerByList(base, [WORK, WORK, CARRY, MOVE], role);break;
	}
}

function buildHarvester(base, type) {
	buildWorker(base, type, 'harvester');
}

function buildUpgrader(base, type) {
	buildWorker(base, type, 'upgrader');
}


var motherShip = {

	run: base => {
		if (base.energy > 0) {
			if (base.energy > 200) {
				buildHarvester(base, NORMAL);
			}
		}
	}
};

module.exports = motherShip;
