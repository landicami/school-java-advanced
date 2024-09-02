import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

describe("HomePage", () => {
	it.skip("Welcomes the user on the homepage", () => {
		render(<HomePage />); // ge den komponenten den ska rendera

		//fint
		const headingEl = screen.getByText("Welcome!");

		//assert
		expect(headingEl).toBeInTheDocument();
	});
});
