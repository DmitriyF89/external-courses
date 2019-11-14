/*jslint
    browser, this, white
*/

/*global
    Computer, ElectricalAppliance, Flat, Fridge, Lamp, Room, TelevisionSet,
    WashingMachine, bedRoom, chandlier1, chandlier2, chandlier3, flat, fridge,
    homePC, kitchen, livingRoom, tableLamp, tv, washingMachine, window
*/

/*property
    addElectrApp, addRoom, brand, bulbType, calcTotalPower, console, electrApp,
    findElectrApp, forEach, functionality, furniture, hasCoolFrost, hasDryer,
    hasSmart, includes, isPlugged, log, name, plugIn, power, prototype, push,
    rooms, type
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

Flat.prototype.findElectrApp = function (name) {
  this.rooms.forEach(function (elem) {
    const roomName = elem.name;
    elem.electrApp.forEach(function (elem) {
      if (elem.name.includes(name)) {
        if (elem.isPlugged) {
          window.console.log(name + " in " + roomName + " is plugged!");
        } else {
          window.console.log(name + " in " + roomName + " is not plugged!");
        }
      }
    });
  });
};

Flat.prototype.calcTotalPower = function () {
  let totPower = 0;

  this.rooms.forEach(function (elem) {
    elem.electrApp.forEach(function (elem) {
      if (elem.isPlugged) {
        totPower += elem.power;
      }
    });
  });

  window.console.log
    ("Total power of the plugged electrical appliances " + totPower + "W");
};

function Room(name, electrApp, furniture) {
  this.name = name;
  this.electrApp = electrApp || [];
  this.furniture = furniture || [];
}

Room.prototype.addElectrApp = function (appliance) {
  this.electrApp.push(appliance);
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

livingRoom.addElectrApp(chandlier1);
livingRoom.addElectrApp(tv);
kitchen.addElectrApp(fridge);
kitchen.addElectrApp(chandlier2);
kitchen.addElectrApp(washingMachine);
bedRoom.addElectrApp(tableLamp);
bedRoom.addElectrApp(homePC);
bedRoom.addElectrApp(chandlier3);

flat.addRoom(livingRoom);
flat.addRoom(kitchen);
flat.addRoom(bedRoom);

chandlier1.plugIn();
fridge.plugIn();
homePC.plugIn();
tableLamp.plugIn();

flat.calcTotalPower();
flat.findElectrApp("Plasma TV");