import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoForm from "../TodoForm";
import userEvent from "@testing-library/user-event";
import { act } from "react";

const fakeOnSave = async () => {};
const todoTitle = "This is my todotitle";

/**
 * Render a component witj user interaction
 * @param component
 * @returns
 */
const renderWithUserInteraction = (component: React.ReactNode) => {
	return {
		user: userEvent.setup(),
		...render(component),
	};
};

describe("TodoForm", () => {
	it("Is empty at first render", () => {
		render(<TodoForm onSave={fakeOnSave} />);

		const form = screen.getByRole("textbox");
		expect(form).toHaveValue("");
	});

	it("Can type into input field", async () => {
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />);

		const form: HTMLInputElement = screen.getByRole("textbox");

		//interact
		await user.type(form, todoTitle);

		expect(form).toHaveValue(todoTitle);
	});

	it("Empties input field after clicking on the 'Save' button", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />);

		// Find
		const inputElement = screen.getByRole("textbox");
		const btnSaveElement = screen.getByRole("button", { name: /save/i });

		// Interact
		await act(async () => {
			await user.type(inputElement, todoTitle);
			await user.click(btnSaveElement);
		});

		// Assert
		expect(inputElement).toHaveValue("");
	});

	it("Empties input field after pressing <Enter>", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />);

		// Find
		const inputElement = screen.getByRole("textbox");

		// Interact
		await act(async () => {
			await user.type(inputElement, todoTitle);
			await user.type(inputElement, "{Enter}");
		});

		// Assert
		expect(inputElement).toHaveValue("");
	});
});
