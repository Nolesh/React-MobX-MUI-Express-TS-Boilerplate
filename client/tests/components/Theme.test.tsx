import React, { FunctionComponent } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { MobXObserver, StoreProvider, useStore } from '../../src/stores';
import Theme, { DARK_BG, LIGHT_BG } from '../../src/components/Theme';


const toRGB = (color: string) => {
    const { style } = new Option();
    style.color = color;
    return style.color;
}

// Mock ThemeProvider
jest.mock('@mui/material', () => {
    const originalModule = jest.requireActual('@mui/material');
    return {
        ...originalModule,
        ThemeProvider: jest.fn(({ theme, children }) => (
            //@ts-ignore
            <div theme={theme}>{children}</div>
        )),
    };
});


describe('Theme Component', () => {

    it('renders with light and dark theme and sets the correct body background color', () => {

        const ThemeChanger: FunctionComponent = MobXObserver(() => {
            const themeStore = useStore('theme');
            return (
                <div>
                    <button onClick={() => themeStore.setDark(!themeStore.dark)}>
                        Toggle
                    </button>
                </div>
            );
        });

        const { getByText, debug } = render(
            <StoreProvider>
                <Theme>
                    <ThemeChanger />
                </Theme>
            </StoreProvider>
        );

        expect(document.body.style.backgroundColor).toBe(toRGB(LIGHT_BG));

        // Check if ThemeProvider was called with the light theme
        expect(ThemeProvider).toHaveBeenCalledWith(expect.objectContaining({
            theme: expect.objectContaining({
                palette: expect.objectContaining({
                    mode: 'light',
                }),
            }),
        }), expect.anything());


        fireEvent.click(getByText('Toggle'));

        expect(document.body.style.backgroundColor).toBe(toRGB(DARK_BG));

        // Check if ThemeProvider was called with the dark theme
        expect(ThemeProvider).toHaveBeenCalledWith(expect.objectContaining({
            theme: expect.objectContaining({
                palette: expect.objectContaining({
                    mode: 'dark',
                }),
            }),
        }), expect.anything());

    });
});
