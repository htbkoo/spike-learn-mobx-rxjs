import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

import PlainReactHookTodoApp from "./PlainReactHookTodoApp";
import {TEST_IDS} from "./constants";

describe('<TodoListApp/>', () => {

    [
        {
            componentName: `PlainReactHookTodoApp`,
            TodoListApp: PlainReactHookTodoApp,
        }
    ].forEach(({componentName, TodoListApp}) =>
        describe(`${componentName}`, () => {
            describe('Renders', () => {
                it('renders without crashing', () => {
                    render(<TodoListApp/>);
                });

                it('should show initial app which include a text field (empty by default) for adding todo', () => {
                    // given
                    render(<TodoListApp/>);

                    // when
                    const element = screen.getByTestId(TEST_IDS.ADD_TODO_ITEM_TEXT_FIELD);

                    // then
                    expect((element as HTMLInputElement).value).toEqual("");
                });
            })

            describe('Add Todo', () => {
            });

            describe('Existing Todo', () => {
            });
        })
    );
});