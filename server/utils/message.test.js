let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe("generateMessage", () => {
    it("should generate the correct message object", () => {
        let message = generateMessage("rajat", "become freelancer");
        expect(message.from).toEqual("rajat");
        expect(message.text).toEqual("become freelancer");
        expect(message.createdAt).toBeA('number');
    });
});

describe("generateLocationMessage", () => {
    it("should generate the correct location message object", ()=> {
        let locationMessage = generateLocationMessage("hat", 24, -21.3);
        expect(locationMessage.from).toEqual("hat");
        expect(locationMessage.url).toEqual("https://www.google.com/maps?q=24,-21.3");
        expect(locationMessage.createdAt).toBeA('number');
    });
});