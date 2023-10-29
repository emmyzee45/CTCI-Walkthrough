class Entry {
  constructor(n, p) {
    this.name = n;
    this.parent = p;
    this.created = Date.now();
    this.lastUpdated;
    this.lastAccessed;
  }
  delete() {
    if (this.parent === null) {
      return false;
    }
    return this.parent.deleteEntry(this);
  }
  size() {}
  getFullPath() {
    if (this.parent === null) {
      return this.name;
    } else {
      return this.parent.getFullPath() + "/" + this.name;
    }
  }
  getCreationTime() {
    return this.created;
  }
  getLastUpdatedTime() {
    return this.lastUpdated;
  }
  getLastAccessedTime() {
    return this.lastAccessed;
  }
  changeName(n) {
    this.name = n;
  }
  getName() {
    return this.name;
  }
}

class File extends Entry {
  constructor(name, parent, sz) {
    super(name, parent);
    this.size = sz;
    this.content;
  }
  getSize() {
    return this.size;
  }
  getContents() {
    return this.content;
  }
  setContents(c) {
    this.content = c;
  }
}

class Directory extends Entry {
  constructor(name, parent) {
    super(name, parent);
    this.contents = [];
  }
  getContents() {
    return this.contents;
  }
  getSize() {
    let size = 0;
    for (const entry of this.contents) {
      size += entry.getSize();
    }
    return size;
  }
  numberOfFiles() {
    let count = 0;
    for (const entry of this.contents) {
      if (entry instanceof Directory) {
        count++; // Directory counts as a file
        const directory = entry;
        count += directory.numberOfFiles();
      } else if (entry instanceof File) {
        count++;
      }
    }
    return count;
  }
  deleteEntry(entry) {
    const indexOfEntryToRemove = this.contents.indexOf(entry);
    if (indexOfEntryToRemove !== -1) {
      this.contents.splice(indexOfEntryToRemove, 1);
    }
  }
  addEntry(entry) {
    this.contents.push(entry);
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

describe("Class Directory", () => {
  const crackingCodingRoot = new Directory("Cracking Coding Interview");
  const chapter1 = new Directory("Chapter 1", crackingCodingRoot);
  const chapter1IndexJS = new File("index.js", chapter1, 100);
  const chapter2 = new Directory("Chapter 2", crackingCodingRoot);
  const chapter2IndexJS = new File("index.js", chapter2, 100);
  const packageJSON = new File("package.json", crackingCodingRoot, 100);

  crackingCodingRoot.addEntry(chapter1);
  crackingCodingRoot.addEntry(chapter2);
  crackingCodingRoot.addEntry(packageJSON);
  chapter1.addEntry(chapter1IndexJS);
  chapter2.addEntry(chapter2IndexJS);

  it("getContents() works as intended", () => {
    assert.equal(crackingCodingRoot.getContents().length, 3);
  });
  it("numberOfFiles() works as intended", () => {
    assert.equal(crackingCodingRoot.numberOfFiles(), 5);
  });
  it("getSize() works as intended", () => {
    assert.equal(crackingCodingRoot.getSize(), 300);
  });
});

mocha.run();
