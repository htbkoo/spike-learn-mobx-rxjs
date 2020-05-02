import React from 'react';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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
                    const element = screen.getByTestId(TEST_IDS.ADD_TODO_ITEM_TEXT_FIELD) as HTMLInputElement;

                    // then
                    expect(element.value).toEqual("");
                });
            })

            describe('Add Todo', () => {
                it('should be able to update addTodoItemTextField text', async () => {
                    // given
                    render(<TodoListApp/>);

                    // when
                    const textField = screen.getByTestId(TEST_IDS.ADD_TODO_ITEM_TEXT_FIELD) as HTMLInputElement;
                    await userEvent.type(textField, 'Hello, World!')

                    // then
                    expect(textField.value).toEqual('Hello, World!');
                });

                it('should be able to todo item which would also remove the text in addTodoItemTextField', async () => {
                    // given
                    render(<TodoListApp/>);

                    const textField = screen.getByTestId(TEST_IDS.ADD_TODO_ITEM_TEXT_FIELD) as HTMLInputElement;
                    await userEvent.type(textField, 'Hello, World!')

                    // when
                    await userEvent.click(screen.getByRole(TEST_IDS.ADD_TODO_ITEM_BUTTON))

                    // then
                    const todoItemsTextFields = screen.getAllByRole(TEST_IDS.TODO_ITEM_TEXT_FIELD);
                    expect(todoItemsTextFields.length).toEqual(1);
                    expect(textField.value).toEqual("");
                });
            });

            describe('Existing Todo', () => {
            });
        })
    );
});