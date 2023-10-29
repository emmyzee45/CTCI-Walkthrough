const Rank = {
  Responder: 0,
  Manager: 1,
  Director: 2,
};

class CallHandler {
  constructor() {
    // Respondents, managers, directors.
    this.LEVELS = 3;

    this.NUM_RESPONDENTS = 10;
    this.NUM_MANAGERS = 4;
    this.NUM_DIRECTORS = 2;

    this.employeeLevels = []; // [[R1, R2, R3, ...], [M1, M2, M3, M4], [D1, D2]]
    this.callQueues = []; // [queueForRespondents, queueForManagers, queueForDirectors]

    for (let i = 0; i < this.LEVELS; i++) {
      this.callQueues.push(new Queue());
    }

    // Create respondents.
    let respondents = [];
    for (let k = 1; k <= this.NUM_RESPONDENTS; k++) {
      respondents.push(new Respondent(this));
    }
    this.employeeLevels.push(respondents);

    // Create managers.
    let managers = [];
    for (let k = 1; k <= this.NUM_MANAGERS; k++) {
      managers.push(new Manager(this));
    }
    this.employeeLevels.push(managers);

    // Create directors.
    let directors = [];
    for (let k = 1; k <= this.NUM_DIRECTORS; k++) {
      directors.push(new Director(this));
    }
    this.employeeLevels.push(directors);
  }
  // Assigns call to free employee or a queue.
  dispatchCall(callParam) {
    let call = callParam;
    if (callParam instanceof Caller) call = new Call(callParam);

    const emp = this.getHandlerForCall(call);

    if (emp !== null) {
      emp.receiveCall(call);
      call.setHandler(emp);
    } else {
      call.reply("Please wait for free employee to reply");
      this.callQueues[call.getRank()].add(call);
    }
  }
  // Returns first free employee that meets minimal rank of call, null otherwise.
  getHandlerForCall(call) {
    for (let level = call.getRank(); level <= this.LEVELS - 1; level++) {
      const employeeLevel = this.employeeLevels[level];
      for (let emp of employeeLevel) {
        if (emp.isFree()) return emp;
      }
    }
    return null;
  }
  // Return true/false if we were able to assign a call
  assignCall(emp) {
    // Check call queues.
    for (let rank = emp.getRank(); rank >= 0; rank--) {
      let queue = this.callQueues[rank];

      // Dequeue call and assign
      if (queue.size() > 0) {
        const call = queue.remove();
        if (call !== null) {
          emp.receiveCall(call);
          return true;
        }
      }
    }

    return false;
  }
}

class Call {
  constructor(c) {
    this.rank = Rank.Responder; // Minimum rank of employee for this call
    this.caller = c;
    this.handler; // Employee handling call.
  }
  setHandler(employee) {
    this.handler = employee;
  }
  reply(message) {
    console.log(message);
  }
  getRank() {
    return this.rank;
  }
  setRank(r) {
    this.rank = r;
  }
  incrementRank() {
    if (this.rank === Rank.Responder) {
      this.rank = Rank.Manager;
    } else if (this.rank === Rank.Manager) {
      this.rank = Rank.Director;
    }
    return this.rank;
  }
  disconnect() {
    this.reply("Thank you for calling");
  }
}

class Employee {
  constructor(handler) {
    this.callHandler = handler;
    this.currentCall = null;
    this.rank;
  }
  receiveCall(call) {
    this.currentCall = call;
  }
  callCompleted() {
    if (this.currentCall !== null) {
      this.currentCall.disconnect();
      this.currentCall = null;
    }
    this.assignNewCall();
  }
  escalateAndReassign() {
    if (this.currentCall !== null) {
      this.currentCall.incrementRank();
      this.callHandler.dispatchCall(this.currentCall);
      this.currentCall = null;
    }
    this.assignNewCall();
  }
  assignNewCall() {
    if (!this.isFree()) return false;
    return this.callHandler.assignCall(this);
  }
  isFree() {
    return this.currentCall === null;
  }
  getRank() {
    return this.rank;
  }
}

class Director extends Employee {
  constructor(callHandler) {
    super(callHandler);
    this.rank = Rank.Director;
  }
}

class Manager extends Employee {
  constructor(callHandler) {
    super(callHandler);
    this.rank = Rank.Manager;
  }
}

class Respondent extends Employee {
  constructor(callHandler) {
    super(callHandler);
    this.rank = Rank.Responder;
  }
}

class Caller {
  constructor(id, nm) {
    this.name = nm;
    this.userId = id;
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

let callCenter;
let kevin, eric, andrew;
let respondentRankCall, managerRankCall, directorRankCall;

function initializeCallCenter() {
  callCenter = new CallHandler();

  kevin = new Caller(12, "Kevin");
  eric = new Caller(13, "Eric");
  andrew = new Caller(14, "Andrew");

  respondentRankCall = new Call(kevin);
  managerRankCall = new Call(eric);
  managerRankCall.setRank(1);
  directorRankCall = new Call(andrew);
  directorRankCall.setRank(2);
}

function assertCallQueueEmpty(rank) {
  assert.equal(callCenter.callQueues[rank].isEmpty(), true);
}

function dispatchCallsToEmployees(...calls) {
  for (const call of calls) {
    callCenter.dispatchCall(call);
  }
}

function getEmployeesAssigned(rank) {
  return callCenter.employeeLevels[rank].filter(
    (emp) => emp.currentCall !== null
  );
}

describe("Call Handler", () => {
  beforeEach(() => {
    initializeCallCenter();
  });

  describe("dispatchCall", () => {
    it("assigns call to a free employee, and does not fill up the queue", () => {
      dispatchCallsToEmployees(
        respondentRankCall,
        managerRankCall,
        directorRankCall
      );

      // Check the number of employees assigned to calls for each rank
      const respondentsAssigned = getEmployeesAssigned(0);
      const managersAssigned = getEmployeesAssigned(1);
      const directorsAssigned = getEmployeesAssigned(2);

      // There should be 1 respondent, manager, and director that has a call assigned to them.
      assert.equal(respondentsAssigned.length, 1);
      assert.equal(respondentsAssigned[0].currentCall, respondentRankCall);

      assert.equal(managersAssigned.length, 1);
      assert.equal(managersAssigned[0].currentCall, managerRankCall);

      assert.equal(directorsAssigned.length, 1);
      assert.equal(directorsAssigned[0].currentCall, directorRankCall);

      // Queues should be empty since we assigned calls to the free employees
      assertCallQueueEmpty(0);
      assertCallQueueEmpty(1);
      assertCallQueueEmpty(2);
    });
    it("assigns call to queue when no free employees", () => {
      //Force all 16 default created employees to NOT be free, so we have to fill out callQueues
      for (const level of callCenter.employeeLevels) {
        for (const employee of level) {
          employee.currentCall = "Filled";
        }
      }

      dispatchCallsToEmployees(
        directorRankCall,
        respondentRankCall,
        managerRankCall
      );

      assert.equal(callCenter.callQueues[0].peek(), respondentRankCall);
      assert.equal(callCenter.callQueues[1].peek(), managerRankCall);
      assert.equal(callCenter.callQueues[2].peek(), directorRankCall);
    });
  });

  describe("assignCall", () => {
    it("correctly assigns highest ranked call to employee, returns false otherwise", () => {
      //Force all 16 default created employees to NOT be free, so we have to fill out callQueues
      for (const level of callCenter.employeeLevels) {
        for (const employee of level) {
          employee.currentCall = "Filled";
        }
      }

      dispatchCallsToEmployees(
        respondentRankCall,
        managerRankCall,
        directorRankCall
      );

      const freeRespondent = new Respondent(callCenter);
      const freeManager = new Manager(callCenter);
      const freeDirector = new Director(callCenter);

      assert.equal(callCenter.callQueues[2].peek(), directorRankCall);
      callCenter.assignCall(freeDirector);
      assertCallQueueEmpty(2);
      assert.equal(freeDirector.currentCall, directorRankCall);

      assert.equal(callCenter.callQueues[1].peek(), managerRankCall);
      callCenter.assignCall(freeManager);
      assertCallQueueEmpty(1);
      assert.equal(freeManager.currentCall, managerRankCall);

      assert.equal(callCenter.callQueues[0].peek(), respondentRankCall);
      callCenter.assignCall(freeRespondent);
      assertCallQueueEmpty(0);
      assert.equal(freeRespondent.currentCall, respondentRankCall);

      assert.equal(callCenter.assignCall(freeDirector), false);
    });
  });
});

describe("Employee", () => {
  describe("escalateAndReassign", () => {
    it("escalates call to the next rank employee", () => {
      initializeCallCenter();
      const respondent = callCenter.employeeLevels[0][0];
      callCenter.dispatchCall(respondentRankCall);

      // Ensure the call is initially assigned to the respondent
      assert.equal(respondent.currentCall, respondentRankCall);

      // Escalate the call and check if it's assigned to a manager
      respondent.escalateAndReassign();
      assert.equal(respondent.currentCall, null);
      const manager = callCenter.employeeLevels[1][0]; // Get the first manager
      assert.equal(manager.currentCall, respondentRankCall);
      assert.equal(manager.currentCall.rank, Rank.Manager);

      // Escalate the call again and check if it's assigned to a director
      manager.escalateAndReassign();
      assert.equal(manager.currentCall, null);
      const director = callCenter.employeeLevels[2][0]; // Get the first director
      assert.equal(director.currentCall, respondentRankCall);
      assert.equal(director.currentCall.rank, Rank.Director);
    });
  });
});

mocha.run();
