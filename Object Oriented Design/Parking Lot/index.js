const VehicleSize = {
  Motorcycle: 0,
  Compact: 1,
  Large: 2,
};

class Vehicle {
  constructor() {
    // Store references to parking spots (instances of the ParkingSpot class) where this particular vehicle is parked.
    // Each Vehicle object can occupy one or more parking spots, and this array is used to keep track of those spots.
    // When a vehicle is parked, a reference to the parking spot(s) it occupies is added to the array.
    // When a vehicle is removed from its parking spot(s), the references in this array are cleared.
    // If a car is parked in two adjacent compact parking spots, the parkingSpots array for that car would contain references to
    // those two parking spots. When the car leaves, clearSpots() will remove the references, indicating that those spots
    // are now available for other vehicles.
    this.parkingSpots = [];
    this.licensePlate;
    this.spotsNeeded;
    this.size;
  }
  getSpotsNeeded() {
    return this.spotsNeeded;
  }
  getSize() {
    return this.size;
  }
  parkInSpot(spot) {
    this.parkingSpots.push(spot);
  }
  clearSpots() {
    for (let i = 0; i < this.parkingSpots.length; i++) {
      this.parkingSpots[i].removeVehicle();
    }
    this.parkingSpots = [];
  }
  canFitInSpot(spot) {}
}

class Bus extends Vehicle {
  constructor() {
    super();
    this.spotsNeeded = 5;
    this.size = VehicleSize.Large;
  }
  canFitInSpot(spot) {
    return spot.getSize() === VehicleSize.Large;
  }
}

class Car extends Vehicle {
  constructor() {
    super();
    this.spotsNeeded = 1;
    this.size = VehicleSize.Compact;
  }
  canFitInSpot(spot) {
    return (
      spot.getSize() === VehicleSize.Large ||
      spot.getSize() === VehicleSize.Compact
    );
  }
}

class MotorCycle extends Vehicle {
  constructor() {
    super();
    this.spotsNeeded = 1;
    this.size = VehicleSize.Motorcycle;
  }
  canFitInSpot(spot) {
    return true;
  }
}

// Holds an array of levels
class ParkingLot {
  constructor() {
    this.NUM_LEVELS = 5;
    this.levels = [];

    // Construct 5 levels, each level with 30 spots.
    for (let i = 0; i < this.NUM_LEVELS; i++) {
      this.levels[i] = new Level(i, 30);
    }
  }
  parkVehicle(vehicle) {
    // Go through each level and try to park the vehicle
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].parkVehicle(vehicle)) return true;
    }
    return false;
  }
}

// A level in the parking lot
class Level {
  constructor(flr, numberSpots) {
    this.floor = flr;
    this.spots = []; // The individual parking spots on this level.
    this.availableSpots = numberSpots;
    this.SPOTS_PER_ROW = 10; // number of parking spots per row on this level.

    const largeSpots = Math.floor(numberSpots / 4); // Quarter of the total spots will be large parking spots.
    const bikeSpots = Math.floor(numberSpots / 4); // Quarter of the total spots will be bike parking spots.
    const compactSpots = numberSpots - largeSpots - bikeSpots;

    for (let spotNumber = 0; spotNumber < numberSpots; spotNumber++) {
      let sz = VehicleSize.Motorcycle;
      if (spotNumber < largeSpots) {
        sz = VehicleSize.Large;
      } else if (spotNumber < largeSpots + compactSpots) {
        sz = VehicleSize.Compact;
      }

      const row = Math.floor(spotNumber / this.SPOTS_PER_ROW);
      this.spots[spotNumber] = new ParkingSpot(this, row, spotNumber, sz);
    }
  }
  getAvailableSpots() {
    return this.availableSpots;
  }
  // Return false if unable to park vehicle.
  parkVehicle(vehicle) {
    if (this.getAvailableSpots() < vehicle.getSpotsNeeded()) return false;

    // See if there are available consecutive spots for parking a vehicle. Returns starting spot number or -1.
    const spotNumber = this.findAvailableSpots(vehicle);
    if (spotNumber < 0) return false;
    return this.parkStartingAtSpot(spotNumber, vehicle);
  }
  // Find available consecutive spots for parking a vehicle.
  findAvailableSpots(vehicle) {
    const spotsNeeded = vehicle.getSpotsNeeded();
    let currentRow = -1;
    let consecutiveSpotsFound = 0;
    for (let i = 0; i < this.spots.length; i++) {
      const spot = this.spots[i];
      if (currentRow != spot.getRow()) {
        consecutiveSpotsFound = 0;
        currentRow = spot.getRow();
      }
      // canFitVehicle() checks that spot is available AND that the vehicle can fit
      if (spot.canFitVehicle(vehicle)) {
        consecutiveSpotsFound++;
      } else {
        consecutiveSpotsFound = 0;
      }

      // A sequence of consecutive spots large enough for the vehicle has been found.
      if (consecutiveSpotsFound === spotsNeeded) {
        // Return the starting spot number of this sequence
        return i - (spotsNeeded - 1);
      }
    }
    return -1;
  }
  // Park starting at spotNumber and continuing until vehicle.spotsNeeded.
  parkStartingAtSpot(spotNumber, vehicle) {
    vehicle.clearSpots();
    let success = true;
    for (let i = spotNumber; i < spotNumber + vehicle.getSpotsNeeded(); i++) {
      success = success && this.spots[i].park(vehicle);
    }
    // Even if the parking operation was not successful, the parking spots are no longer available for other vehicles
    // The parking spots have still been effectively reserved or blocked by the vehicle's attempt.
    this.availableSpots -= vehicle.getSpotsNeeded();
    return success;
  }
  spotFreed() {
    this.availableSpots++;
  }
}

class ParkingSpot {
  constructor(lvl, r, n, sz) {
    this.level = lvl;
    this.row = r;
    this.spotNumber = n;
    this.spotSize = sz;
    this.vehicle = null;
  }
  isAvailable() {
    return this.vehicle === null;
  }
  canFitVehicle(vehicle) {
    return this.isAvailable() && vehicle.canFitInSpot(this);
  }
  park(v) {
    if (!this.canFitVehicle(v)) return false;

    this.vehicle = v;
    v.parkInSpot(this);
    return true;
  }
  getRow() {
    return this.row;
  }
  getSpotNumber() {
    return this.spotNumber;
  }
  getSize() {
    return this.spotSize;
  }
  removeVehicle() {
    this.level.spotFreed();
    this.vehicle = null;
  }
}

// _________ _______  _______ _________   _______  _______  _______  _______  _______
// \__   __/(  ____ \(  ____ \\__   __/  (  ____ \(  ___  )(  ____ \(  ____ \(  ____ \
//    ) (   | (    \/| (    \/   ) (     | (    \/| (   ) || (    \/| (    \/| (    \/
//    | |   | (__    | (_____    | |     | |      | (___) || (_____ | (__    | (_____
//    | |   |  __)   (_____  )   | |     | |      |  ___  |(_____  )|  __)   (_____  )
//    | |   | (            ) |   | |     | |      | (   ) |      ) || (            ) |
//    | |   | (____/\/\____) |   | |     | (____/\| )   ( |/\____) || (____/\/\____) |
//    )_(   (_______/\_______)   )_(     (_______/|/     \|\_______)(_______/\_______)
//                             ____       _
//                             |  _ \     | |
//                             | |_) | ___| | _____      __
//                             |  _ < / _ \ |/ _ \ \ /\ / /
//                             | |_) |  __/ | (_) \ V  V /
//                             |____/ \___|_|\___/ \_/\_/
//                         ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

mocha.setup("bdd");
const { assert } = chai;

describe("Vehicle", () => {
  it("should be able to park in a spot and clear spots", () => {
    const level = new Level(0, 10);
    const car = new Car();
    const spot = level.spots[0];

    spot.park(car);
    assert.equal(car.parkingSpots.length, 1);
    assert.equal(spot.isAvailable(), false);

    car.clearSpots();
    assert.equal(car.parkingSpots.length, 0);
    assert.equal(spot.isAvailable(), true);
  });
});

describe("ParkingLot", () => {
  it("should return true / false if there are / are not available spots for parking", () => {
    const parkingLot = new ParkingLot();

    //Should allow 150 motorcycles.
    for (let i = 1; i <= 149; i++) {
      parkingLot.parkVehicle(new MotorCycle());
    }
    assert.equal(parkingLot.parkVehicle(new MotorCycle()), true);
    assert.equal(parkingLot.parkVehicle(new MotorCycle()), false);
  });
});

describe("ParkingSpot", () => {
  it("should be able to park vehicles and free spots", () => {
    const level = new Level(0, 10);
    const car = new Car();
    const spot = level.spots[0];

    assert.equal(spot.isAvailable(), true);
    assert.equal(spot.canFitVehicle(car), true);

    spot.park(car);

    assert.equal(spot.isAvailable(), false);
    assert.equal(spot.vehicle, car);

    spot.removeVehicle();
    assert.equal(spot.isAvailable(), true);
    assert.equal(spot.vehicle, null);
  });
});

describe("Level", () => {
  let level;
  let car;
  let bus;

  beforeEach(() => {
    level = new Level(0, 10);
    car = new Car();
    bus = new Bus();
  });

  it("should be able to find available spots for parking", () => {
    let availableSpotNumber = level.findAvailableSpots(car);
    assert.equal(availableSpotNumber, 0);

    availableSpotNumber = level.findAvailableSpots(bus);
    assert.equal(availableSpotNumber, -1);
  });
  it("should be able to park vehicles", () => {
    assert.equal(level.parkVehicle(bus), false);
    assert.equal(level.parkVehicle(car), true);

    assert.equal(level.getAvailableSpots(), 9);
  });
});

mocha.run();
