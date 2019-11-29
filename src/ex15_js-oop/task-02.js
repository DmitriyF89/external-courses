/*jslint
    browser, this, white
*/

function ElectricalAppliance(name, power) {
  this.name = name;
  this.power = power;
  this.isPlugged = false;
}

ElectricalAppliance.prototype.plugIn = function () {
  window.console.log(this.name + " is plugged!");
  this.isPlugged = true;
};

ElectricalAppliance.prototype.unplug = function () {
  window.console.log(this.name + " is unplugged!");
  this.isPlugged = false;
};

function Lamp(name, brand, power, bulbType) {
  this.name = name;
  this.brand = brand;
  this.power = power;
  this.bulbType = bulbType;
  this.isPlugged = false;
}

Lamp.prototype = new ElectricalAppliance();

function Computer(name, brand, power, type, functionality) {
  this.name = name;
  this.brand = brand;
  this.power = power;
  this.type = type;
  this.functionality = functionality;
  this.isPlugged = false;
}

Computer.prototype = new ElectricalAppliance();

function TelevisionSet(name, brand, power, hasSmart) {
  this.name = name;
  this.brand = brand;
  this.power = power;
  this.hasSmart = hasSmart || false;
  this.isPlugged = false;
}

TelevisionSet.prototype = new ElectricalAppliance();

function Fridge(name, brand, power, hasCoolFrost) {
  this.name = name;
  this.brand = brand;
  this.power = power;
  this.hasCoolFrost = hasCoolFrost || false;
  this.isPlugged = false;
}

Fridge.prototype = new ElectricalAppliance();

function WashingMachine(name, brand, power, hasDryer) {
  this.name = name;
  this.brand = brand;
  this.power = power;
  this.hasDryer = hasDryer || false;
  this.isPlugged = false;
}

WashingMachine.prototype = new ElectricalAppliance();

function Flat() {
  this.rooms = [];
}

Flat.prototype.addRoom = function (room) {
  this.rooms.push(room);
};

Flat.prototype.removeRoom = function (roomName) {
  const deletedIndex = this.rooms.findIndex((item) => item.name === roomName);
  if (deletedIndex !== -1) {
    this.rooms.splice(deletedIndex, 1);
    window.console.log(roomName + ' was removed');
  } else {
    window.console.log('There is no ' + roomName + ' in the flat');
  }
};

Flat.prototype.findElectroAppliance = function (name) {
  this.rooms.forEach(function (room) {
    const roomName = room.name;
    room.electroAppliance.forEach(function (appliance) {
      if (appliance.name.includes(name)) {
        if (appliance.isPlugged) {
          window.console.log(name + " in " + roomName + " is plugged!");
        } else {
          window.console.log(name + " in " + roomName + " is not plugged!");
        }
      }
    });
  });
};

Flat.prototype.calcTotalPower = function () {
  let totalPower = 0;

  this.rooms.forEach(function (elem) {
    elem.electroAppliance.forEach(function (elem) {
      if (elem.isPlugged) {
        totalPower += elem.power;
      }
    });
  });

  window.console.log
    ("Total power of the plugged electrical appliances " + totalPower + "W");
};

function Room(name, electroAppliance, furniture) {
  this.name = name;
  this.electroAppliance = electroAppliance || [];
  this.furniture = furniture || [];
}

Room.prototype.addElectroAppliance = function (appliance) {
  this.electroAppliance.push(appliance);
};

const tableLamp = new Lamp("Table lamp", "Xiaomi", 5, "LED");
const chandlier1 = new Lamp("Chandelier", "Eurosvet", 180, "incandescent lamp");
const chandlier2 = new Lamp("Chandelier", "Eurosvet", 180, "incandescent lamp");
const chandlier3 = new Lamp("Chandelier", "Eurosvet", 180, "incandescent lamp");
const homePC = new Computer("Table PC", "Intel", 120, "stationary", "for work");
const tv = new TelevisionSet("Plasma TV", "Samsung", 340, true);
const fridge = new Fridge("Fridge", "LG", 190, true);
const washingMachine = new WashingMachine("Washing machine", "Electrolux", 425);
const livingRoom = new Room("Living Room");
const kitchen = new Room("Kitchen");
const bedRoom = new Room("Bedroom");
const flat = new Flat();

livingRoom.addElectroAppliance(chandlier1);
livingRoom.addElectroAppliance(tv);
kitchen.addElectroAppliance(fridge);
kitchen.addElectroAppliance(chandlier2);
kitchen.addElectroAppliance(washingMachine);
bedRoom.addElectroAppliance(tableLamp);
bedRoom.addElectroAppliance(homePC);
bedRoom.addElectroAppliance(chandlier3);

flat.addRoom(livingRoom);
flat.addRoom(kitchen);
flat.addRoom(bedRoom);

chandlier1.plugIn();
fridge.plugIn();
homePC.plugIn();
tableLamp.plugIn();

flat.calcTotalPower();
flat.findElectroAppliance("Plasma TV");