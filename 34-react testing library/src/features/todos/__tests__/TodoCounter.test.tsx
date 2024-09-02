import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoCounter from "../TodoCounter";

describe("TodoCounter", () => {
	it.skip("Shows correct count with no todos", () => {
		// Render
		render(<TodoCounter count={0} />);

		// Find
		const paragraphEl = screen.getByText(/0 todos/i);
		expect(paragraphEl).toBeInTheDocument();
		// Assert
	});

	it.skip("Shows correct count with a single todo", () => {
		// Render
		render(<TodoCounter count={1} />);

		// Find
		const paragraphEl = screen.getByText(/1 todo /i);
		expect(paragraphEl).toBeInTheDocument();
		// Assert
	});

	it.skip("Shows correct count with multiple todos", () => {
		// Render
		render(<TodoCounter count={5} />);

		// Find
		const paragraphEl = screen.getByText(/5 todos/i);
		expect(paragraphEl).toBeInTheDocument();
		// Assert
	});
});
