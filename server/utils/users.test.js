const expect = require('expect');

const {Users} = require('./users');

describe.only("Users", () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: "rajat",
            room: "node"
        },
            {
                id: '2',
                name: "rishabh",
                room: "angular"
            },
            {
                id: '3',
                name: "robert",
                room: "node"
            }];
    });

    it("should add a new user", () => {
        let users = new Users();
        let user = {
            id: "123",
            name: "rajat",
            room: "gaming"
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should return names for node course", () => {
        let userList = users.getUserList('node');
        expect(userList).toEqual(["rajat", "robert"]);
    });

    it("should return names for angular course", () => {
        let userList = users.getUserList('angular');
        expect(userList).toEqual(["rishabh"]);
    });

    it("should remove a user", () => {
        let removedUser = users.removeUser('2');
        expect(removedUser).toEqual( {
            id: '2',
            name: "rishabh",
            room: "angular"
        });
        expect(users).toExclude( {
            id: '2',
            name: "rishabh",
            room: "angular"
        });
    });

    it("should not remove a user", () => {
        let removedUser = users.removeUser('5');
        expect(users.users).toEqual(users.users);
    });

    it("should find a user", () => {
        let user = users.getUser('3');
        expect(user).toEqual(users.users[2]);
    });

    it("should not find a user", () => {
        let user = users.getUser('35');
        expect(user).toEqual(undefined);
        expect(user).toNotExist;
    });
});