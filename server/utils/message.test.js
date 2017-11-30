let expect = require('expect');

let {generateMessage} = require('./message');

describe("generateMessage", () => {
    it("should generate the correct message object", () => {
        let message = generateMessage("rajat", "become freelancer");
        expect(message.from).toEqual("rajat");
        expect(message.text).toEqual("become freelancer");
        expect(message.createdAt).toBeA('number');
    });
});