const average = require("../utils/for_testing").average


describe("average", () => {
    test("of one value is the value itself", () => {
        expect(average([1])).toBe(1)
    })

    test("Of many is calculated right", () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
    })

    test("of empty array is zero", () => {
        console.log("This is average 0: ", average([0]))
        expect(average([0])).toBe(0)
    })

})