class OnlineReaderSystem {
  constructor() {
    this.library = new Library();
    this.userManager = new UserManager();
    this.display = new Display();
    this.activeBook = null;
    this.activeUser = null;
  }
  getLibrary() {
    return this.library;
  }
  getUserManager() {
    return this.userManager;
  }
  getDisplay() {
    return this.display;
  }
  getActiveBook() {
    return this.activeBook;
  }
  setActiveBook(book) {
    this.display.displayBook(book);
    this.activeBook = book;
  }
  getActiveUser() {
    return this.activeUser;
  }
  setActiveUser(user) {
    this.activeUser = user;
    this.display.displayUser(user);
  }
}

class Library {
  constructor() {
    this.books = new Map(); // {number: book}
  }
  addBook(id, details) {
    if (this.books.has(id)) return null;

    const book = new Book(id, details);
    this.books.set(id, book);
    return book;
  }
  remove(book) {
    return this.removeById(book.getID());
  }

  removeById(id) {
    if (!this.books.has(id)) return false;

    this.books.delete(id);
    return true;
  }

  find(id) {
    return this.books.get(id);
  }
}

class UserManager {
  constructor() {
    this.users = new Map(); // {number: User}
  }
  addUser(id, details, accountType) {
    if (this.users.has(id)) return null;

    const user = new User(id, details, accountType);
    this.users.set(id, user);
    return user;
  }
  remove(user) {
    return this.removeById(user.getID());
  }
  removeById(id) {
    if (!this.users.has(id)) return false;

    this.users.delete(id);
    return true;
  }
  find(id) {
    return this.users.get(id);
  }
}

class Display {
  constructor() {
    this.activeBook = null;
    this.activeUser = null;
    this.pageNumber = 0;
  }
  displayUser(user) {
    this.activeUser = user;
    this.refreshUsername();
  }
  displayBook(book) {
    this.pageNumber = 0;
    this.activeBook = book;

    this.refreshTitle();
    this.refreshDetails();
    this.refreshPage();
  }
  refreshUsername() {}
  refreshTitle() {}
  refreshDetails() {}
  refreshPage() {}
  turnPageForward() {
    this.pageNumber++;
    this.refreshPage();
  }
  turnPageBackward() {
    this.pageNumber--;
    this.refreshPage();
  }
}

// The classes for User and Book simply hold data and provide little true functionality.
class Book {
  constructor(id, det) {
    this.bookId = id;
    this.details = det;
  }
  update() {}
  getID() {
    return this.bookId;
  }
  setID(id) {
    this.bookId = id;
  }
  getDetails() {
    return this.details;
  }
  setDetails(details) {
    this.details = details;
  }
}

class User {
  constructor(id, details, accountType) {
    this.userId = id;
    this.details = details;
    this.accountType = accountType;
  }
  renewMembership() {}
  getID() {
    return this.userId;
  }
  setID(id) {
    this.userId = id;
  }
  getDetails() {
    return this.details;
  }
  setDetails(details) {
    this.details = details;
  }
  getAccountType() {
    return this.accountType;
  }
  setAccountType(accountType) {
    this.accountType = accountType;
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

describe("OnlineReaderSystem", () => {
  it("should set active book and user", () => {
    const onlineReaderSystem = new OnlineReaderSystem();
    const book = onlineReaderSystem.getLibrary().addBook(1, "Book 1");
    const user = onlineReaderSystem
      .getUserManager()
      .addUser(1, "User 1", "Basic");
    onlineReaderSystem.setActiveBook(book);
    onlineReaderSystem.setActiveUser(user);

    assert.equal(onlineReaderSystem.getActiveBook(), book);
    assert.equal(onlineReaderSystem.getActiveUser(), user);
  });
});

describe("Library", () => {
  let library;

  beforeEach(function () {
    library = new Library();
  });

  it("should add a book", () => {
    const book = library.addBook(1, "Book 1");
    assert.equal(library.find(1), book);
  });

  it("should not add a duplicate book", () => {
    const book = library.addBook(1, "Book 1");
    const duplicateBook = library.addBook(1, "Duplicate Book");

    assert.equal(!!duplicateBook, false);
    assert.equal(library.find(1), book);
  });

  it("should remove a book by ID", () => {
    const book = library.addBook(1, "Book 1");

    assert.equal(library.find(1), book);
    assert.equal(library.removeById(1), true);

    assert.equal(!!library.find(1), false);
    assert.equal(library.removeById(1), false);
  });
});

describe("UserManager", () => {
  let userManager;

  beforeEach(function () {
    userManager = new UserManager();
  });

  it("should add a user", () => {
    const user = userManager.addUser(1, "User 1", "Basic");
    assert.equal(userManager.find(1), user);
  });

  it("should not add a duplicate user", () => {
    const user = userManager.addUser(1, "User 1", "Basic");
    const duplicateUser = userManager.addUser(1, "Duplicate User", "Premium");
    assert.equal(!!duplicateUser, false);
    assert.equal(userManager.find(1), user);
  });

  it("should remove a user by ID", () => {
    const user = userManager.addUser(1, "User 1", "Basic");

    assert.equal(userManager.find(1), user);
    assert.equal(userManager.removeById(1), true);

    assert.equal(!!userManager.find(1), false);
    assert.equal(userManager.removeById(1), false);
  });
});

mocha.run();
