/**
 * @jest-environment jsdom
 */
import * as React from "react";
import { act } from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import App from "./App";

describe('App', function () {

    it('should App Component display', function () {
        const container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<App />, container);
        })
        const header = container.querySelector('strong');
        expect(header.textContent).toBe("CSWEB");
    });
});