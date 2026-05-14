import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Product from '../../src/components/Product';

describe('Product Component', () => {
    const mockItem = {
        key: 1,
        name: 'Link Amiibo',
        image: 'https://example.com/link.png',
        price: 1500,
        quantity: 0,
        amiiboSeries: 'The Legend of Zelda',
    };

    const mockNavigation = {
        navigate: jest.fn(),
    };

    const mockOnPress = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render product information correctly', () => {
        const { getByText } = render(
            <Product
                item={mockItem}
                navigation={mockNavigation}
                onPress={mockOnPress}
            />
        );

        expect(getByText(/Link Amiibo/i)).toBeTruthy();
        expect(getByText('The Legend of Zelda')).toBeTruthy();
        expect(getByText(/1500/)).toBeTruthy();
        expect(getByText(/0 unidades/)).toBeTruthy();
    });

    it('should call onPress with incremented quantity when add button is pressed', () => {
        const { getAllByText } = render(
            <Product
                item={mockItem}
                navigation={mockNavigation}
                onPress={mockOnPress}
            />
        );

        const addButton = getAllByText('+')[0];
        fireEvent.press(addButton);

        expect(mockOnPress).toHaveBeenCalledWith({
            ...mockItem,
            quantity: 1,
        });
    });

    it('should call onPress with decremented quantity when subtract button is pressed', () => {
        const itemWithQuantity = {
            ...mockItem,
            quantity: 3,
        };

        const { getAllByText } = render(
            <Product
                item={itemWithQuantity}
                navigation={mockNavigation}
                onPress={mockOnPress}
            />
        );

        const subtractButton = getAllByText('-')[0];
        fireEvent.press(subtractButton);

        expect(mockOnPress).toHaveBeenCalledWith({
            ...itemWithQuantity,
            quantity: 2,
        });
    });



    it('should not mutate the original item', () => {
        const originalItem = { ...mockItem };
        const { getAllByText } = render(
            <Product
                item={mockItem}
                navigation={mockNavigation}
                onPress={mockOnPress}
            />
        );

        const addButton = getAllByText('+')[0];
        fireEvent.press(addButton);

        expect(mockItem).toEqual(originalItem);
    });
});