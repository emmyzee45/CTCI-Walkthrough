const RequestStatus = {
  Unread: "Unread",
  Read: "Read",
  Accepted: "Accepted",
  Rejected: "Rejected",
};

const UserStatusType = {
  Offline: "Offline",
  Away: "Away",
  Idle: "Idle",
  Available: "Available",
  Busy: "Busy",
};

// UserManager serves as the central place for the core user actions.
class UserManager {
  //static instance;
  constructor() {
    this.usersById = {}; // {integer: user};
    this.usersByAccountName = {}; // {string: user};
    this.onlineUsers = {}; // {number: user};
  }
  static getInstance() {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }
  addUser(fromUser, toAccountName) {
    const toUser = this.usersByAccountName[toAccountName];
    const req = new AddRequest(fromUser, toUser, new Date());
    toUser.receivedAddRequest(req);
    fromUser.sentAddRequest(req);
  }
  approveAddRequest(req) {
    req.status = RequestStatus.Accepted;
    const from = req.getFromUser();
    const to = req.getToUser();
    from.addContact(to);
    to.addContact(from);
  }
  rejectAddRequest(req) {
    req.status = RequestStatus.Rejected;
    const from = req.getFromUser();
    const to = req.getToUser();
    from.removeAddRequest(req);
    to.removeAddRequest(req);
  }
  userSignedOn(accountName) {
    const user = this.usersByAccountName[accountName];
    if (user) {
      user.setStatus(new UserStatus(UserStatusType.Available, ""));
      this.onlineUsers[user.getId()] = user;
    }
  }
  userSignedOff(accountName) {
    const user = this.usersByAccountName[accountName];
    if (user) {
      user.setStatus(new UserStatus(UserStatusType.Offline, ""));
      delete this.onlineUsers[user.getId()];
    }
  }
}

class User {
  constructor(id, accountName, fullName) {
    this.accountName = accountName;
    this.fullName = fullName;
    this.id = id;
    this.status = null;
    this.privateChats = {}; // {number: PrivateChat}
    this.groupChats = [];
    this.receivedAddRequests = {}; // {number: AddRequest}
    this.sentAddRequests = {}; // {number: AddRequest}
    this.contacts = {}; // {number: User}
  }
  sendMessageToUser(toUser, content) {
    let chat = this.privateChats[toUser.getId()];
    if (chat === undefined) {
      chat = new PrivateChat(this, toUser);
      this.privateChats[toUser.getId()] = chat;
    }
    const message = new Message(content, new Date());
    return chat.addMessage(message);
  }
  sendMessageToGroupChat(groupId, content) {
    const chat = this.groupChats[groupId];
    if (chat !== undefined) {
      const message = new Message(content, new Date());
      return chat.addMessage(message);
    }
    return false;
  }
  setStatus(status) {
    this.status = status;
  }
  getStatus() {
    return this.status;
  }
  addContact(user) {
    if (user.getId() in this.contacts) {
      return false;
    } else {
      this.contacts[user.getId()] = user;
      return true;
    }
  }
  receivedAddRequest(req) {
    const senderId = req.getFromUser().getId();
    if (senderId in this.receivedAddRequests === false) {
      this.receivedAddRequests[senderId] = req;
    }
  }
  sentAddRequest(req) {
    const receiverId = req.getFromUser().getId();
    if (receiverId in this.sentAddRequests === false) {
      this.sentAddRequests[receiverId] = req;
    }
  }
  removeAddRequest(req) {
    const fromUserId = req.getFromUser().getId();
    if (req.getToUser() === this) {
      delete this.receivedAddRequests[fromUserId];
    } else if (req.getFromUser() === this) {
      delete this.sentAddRequests[fromUserId];
    }
  }
  requestAddUser(accountName) {
    UserManager.getInstance().addUser(this, accountName);
  }
  addConversation(conversation) {
    const otherUser = conversation.getOtherParticipant(this);
    this.privateChats[otherUser.getId()] = conversation;
  }
  addGroupConversation(conversation) {
    this.groupChats.push(conversation);
  }
  getId() {
    return this.id;
  }
  getAccountName() {
    return this.accountName;
  }
  getFullName() {
    return this.fullName;
  }
}

// The Conversation class is implemented as an abstract class, since all Conversations must be either a
// GroupChat or a PrivateChat, and since these two classes each have their own functionality.
class Conversation {
  constructor() {
    this.participants = [];
    this.id;
    this.messages = [];
  }
  getMessages() {
    return this.messages;
  }
  addMessage(m) {
    this.messages.push(m);
    return true;
  }
  getId() {
    return this.id;
  }
}

class GroupChat extends Conversation {
  removeParticipant(user) {
    const userIndex = this.participants.indexOf(user);
    this.participants.splice(userIndex, 1);
  }
  addParticipant(user) {
    this.participants.push(user);
  }
}

class PrivateChat extends Conversation {
  constructor(user1, user2) {
    this.participants.push(user1);
    this.participants.push(user2);
  }
  getOtherParticipant(primary) {
    if (this.participants[0] === primary) {
      return this.participants[1];
    } else if (this.participants[1] === primary) {
      return this.participants[0];
    }
    return null;
  }
}

class Message {
  constructor(content, date) {
    this.content = content;
    this.date = date;
  }
  getContent() {
    return this.content;
  }
  getDate() {
    return this.date;
  }
}

// AddRequest and UserStatus are simple classes with little functionality. Their main purpose is to group
// data that other classes will act upon.
class AddRequest {
  constructor(from, to, date) {
    this.fromUser = from; // User obj
    this.toUser = to; // User obj
    this.date = date;
    this.status = RequestStatus.Unread;
  }
  getStatus() {
    return this.status;
  }
  getFromUser() {
    return this.fromUser;
  }
  getToUser() {
    return this.toUser;
  }
  getDate() {
    return this.date;
  }
}

class UserStatus {
  constructor(type, message) {
    this.type = type;
    this.message = message;
  }
  getStatusType() {
    return this.type;
  }
  getMessage() {
    return this.message;
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

describe("Chat Server", () => {
  const kevin = new User(11, "kDawg", "kevin nguyen");
  const eric = new User(12, "eDawg", "eric nguyen");
  let addRequestByKevin;
  let sentAddRequestToEric;

  const facebookChatService = UserManager.getInstance();
  facebookChatService.usersByAccountName["kDawg"] = kevin;
  facebookChatService.usersByAccountName["eDawg"] = eric;

  it("UserManager getInstance works", () => {
    assert.equal(facebookChatService instanceof UserManager, true);
  });

  it("UserManager addUser works", () => {
    facebookChatService.addUser(kevin, "eDawg");
    addRequestByKevin = eric.receivedAddRequests[11];
    sentAddRequestToEric = kevin.sentAddRequests[11];

    assert.equal(addRequestByKevin instanceof AddRequest, true);
    assert.equal(addRequestByKevin.fromUser, kevin);
    assert.equal(addRequestByKevin.toUser, eric);

    assert.equal(sentAddRequestToEric instanceof AddRequest, true);
    assert.equal(sentAddRequestToEric.fromUser, kevin);
    assert.equal(sentAddRequestToEric.toUser, eric);
  });

  it("UserManager rejectAddRequest works", () => {
    facebookChatService.rejectAddRequest(addRequestByKevin);
    assert.equal(Object.keys(eric.receivedAddRequests).length, 0);
    assert.equal(Object.keys(kevin.sentAddRequests).length, 0);
  });

  it("UserManager approveAddRequest works", () => {
    assert.equal(Object.values(eric.contacts).includes(kevin), false);
    assert.equal(Object.values(kevin.contacts).includes(eric), false);

    facebookChatService.addUser(kevin, "eDawg");
    facebookChatService.approveAddRequest(addRequestByKevin);

    assert.equal(Object.values(eric.contacts).includes(kevin), true);
    assert.equal(Object.values(kevin.contacts).includes(eric), true);
  });

  it("UserManager userSignedOn and userSignedOff works", () => {
    assert.equal(11 in facebookChatService.onlineUsers, false);
    assert.equal(kevin.status, null);

    facebookChatService.userSignedOn("kDawg");
    assert.equal(11 in facebookChatService.onlineUsers, true);
    assert.equal(kevin.status.type, UserStatusType.Available);

    facebookChatService.userSignedOff("kDawg");
    assert.equal(11 in facebookChatService.onlineUsers, false);
    assert.equal(kevin.status.type, UserStatusType.Offline);
  });
});

mocha.run();
