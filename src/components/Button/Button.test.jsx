import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import { Button } from './Button';

describe("Button Component", () => {
    test("Should show label", () => {
        render(<Button label="Testbutton"/>);
        expect(screen.getByText(/Testbutton/i)).toBeDefined()
    });
});
