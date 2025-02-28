import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import SearchForm from "../../components/SearchForm.tsx";

const mockOnSearch = vi.fn();
const mockOnInputUpdate = vi.fn();

const renderComponent = (props = {}) => {
    return render(
        <SearchForm
            onSearch={mockOnSearch}
            onInputUpdate={mockOnInputUpdate}
            isDisabled={false}
            {...props}
        />
    );
};

describe("SearchForm Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders correctly with initial state", () => {
        renderComponent();

        expect(screen.getByRole("search")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Search for images")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Perform search" })).toBeInTheDocument();
    });

    test("updates input value and calls onInputUpdate", () => {
        renderComponent();
        const input = screen.getByPlaceholderText("Search for images");

        fireEvent.change(input, { target: { value: "test" } });

        expect(input).toHaveValue("test");
        expect(mockOnInputUpdate).toHaveBeenCalledWith("test");
    });

    test("submits valid form with trimmed query", () => {
        renderComponent();
        const input = screen.getByPlaceholderText("Search for images");
        const form = screen.getByRole("search");

        fireEvent.change(input, { target: { value: "  nature  " } });
        fireEvent.submit(form);

        expect(mockOnSearch).toHaveBeenCalledWith("nature");
        expect(mockOnInputUpdate).toHaveBeenCalledWith("  nature  ");
    });

    test("does not submit empty query", () => {
        renderComponent();
        fireEvent.submit(screen.getByRole("search"));

        expect(mockOnSearch).not.toHaveBeenCalled();
    });

    test("disables form elements when isDisabled is true", () => {
        renderComponent({ isDisabled: true });

        expect(screen.getByPlaceholderText("Search for images")).toBeDisabled();
        expect(screen.getByRole("button")).toBeDisabled();
    });

    test("handles empty search term submission", () => {
        renderComponent();
        const input = screen.getByPlaceholderText("Search for images");
        const form = screen.getByRole("search");

        fireEvent.change(input, { target: { value: "   " } });
        fireEvent.submit(form);

        expect(mockOnSearch).not.toHaveBeenCalled();
    });
});
