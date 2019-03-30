var debug = require('librun');


// status
const STANDBY    = 1;
const DIGING     = 2;
const SENDBASE   = 3;
const MOVE_TO    = 4;
const MOVE_BACK  = 5;


const distribution = new Object();

function dist(x1,y1,x2,y2) {
    let dx = x1-x2;
    let dy = y1-y2;
    return dx*dx + dy*dy;
}

function distFromResouce(source, creep) {
    return dist(source.pos.x,source.pos.y,creep.pos.x,creep.pos.y);
}

function attachSource(source, creep) {
    distribution[source.id].push(creep);
}

function swap(list, i, j) {
    let tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
}

function partition(A, l, r) {
    let pivot = A[r];
    let i = l;
    for (let j=l;j<r-1;j++) {
        if (A[j] <= pivot) {
            swap(A,i,j);
            i++;
        }
    }
    swap(A,i,r);
    return i;
}

function quickSort(list, l, r) {
    if (l < r) {
        let p = partition(list, l, r);
        quickSort(list, l, p-1);
        quickSort(list, p+1, r);
    }
}

function sortByDist(list) {
    let b = []
    for (let item of list) {
        b.push(item[0]);
    }
    console.log(b);
    quickSort(list);
    let a = []
    for (let item of list) {
        a.push(item[0]);
    }
    console.log(a);
    return list;
}

function selectSourceByDist(creep) {

    let result = null;
    let sources = creep.room.find(FIND_SOURCES);
    let list = [];
    for (let source of sources) {
        list.push([distFromResouce(source, creep),source]);
    }
    list = sortByDist(list);
    return result;

}

function checkSource(creep) {
    var sources = creep.room.find(FIND_SOURCES);
    return (creep.memory.source in sources);
}

var roleHarvester = {

	run(creep,base) {
        if (!creep.memory.source || !checkSource(creep)) {
            creep.memory.source = selectSourceByDist(creep);
            if (!creep.memory.source) {
                creep.memory.status = STANDBY;
            }
        }
		if (creep.carry.energy < creep.carryCapacity) {
            if (creep.harvest(creep.memory.source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.source);
                creep.memory.status = MOVE_TO;
            } else {
                creep.memory.status = DIGING;
            }
		} else if (base.energy < base.energyCapacity) {
			if (creep.transfer(base, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(base);
                creep.memory.status = MOVE_BACK;
			} else {
                creep.memory.status = SENDBASE;
            }
		}
	}

};

module.exports = roleHarvester;
