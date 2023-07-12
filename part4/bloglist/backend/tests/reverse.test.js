const reverse = require("../utils/for_testing").reverse


test("reverse of a", () => {
	const result = reverse("a")

	expect(result).toBe("a") // using toBe matcher function of expect verification function
})

test("reverse of react", () => {
	const result = reverse("react")

	expect(result).toBe("tcaer")
})

test("reverse of releveler", () => {
	const result = reverse("releveler")

	expect(result).toBe("releveler")
})
