import React from 'react';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Matcher} from "@testing-library/dom/matches";

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
                    assertAddTodoItemTextFieldValue('Hello, World!');
                });

                it('should be able to todo item which would also remove the text in addTodoItemTextField', async () => {
                    // given
                    render(<TodoListApp/>);

                    const textField = screen.getByTestId(TEST_IDS.ADD_TODO_ITEM_TEXT_FIELD) as HTMLInputElement;
                    await userEvent.type(textField, 'Hello, World!')

                    // when
                    await userEvent.click(screen.getByRole(TEST_IDS.ADD_TODO_ITEM_BUTTON))

                    // then
                    assertCountByRole(TEST_IDS.TODO_ITEM_TEXT_FIELD, 1);
                    assertAddTodoItemTextFieldValue("");
                });

                it('should be able to add multiple todo items', async () => {
                    // given
                    render(<TodoListApp/>);

                    const count = 5;

                    // when
                    const textField = screen.getByTestId(TEST_IDS.ADD_TODO_ITEM_TEXT_FIELD) as HTMLInputElement;
                    for (let i = 0; i < count; i++) {
                        await userEvent.type(textField, 'Hello, World!')
                        await userEvent.click(screen.getByRole(TEST_IDS.ADD_TODO_ITEM_BUTTON))
                    }

                    // then
                    assertCountByRole(TEST_IDS.TODO_ITEM_TEXT_FIELD, count);
                });

                it('should not add todo item and show error instead if addTodoItemTextField is empty', async () => {
                    // given
                    render(<TodoListApp/>);
                    assertAddTodoItemTextFieldValue("");
                    assertCountByRole(TEST_IDS.ERROR_SNACKBAR, 0);

                    // when
                    await userEvent.click(screen.getByRole(TEST_IDS.ADD_TODO_ITEM_BUTTON))

                    // then
                    assertCountByRole(TEST_IDS.TODO_ITEM_TEXT_FIELD, 0);
                    assertCountByRole(TEST_IDS.ERROR_SNACKBAR, 1);
                });
            });

            describe('Existing Todo', () => {
            });

            function assertAddTodoItemTextFieldValue(expected: string) {
                expect((screen.getByTestId(TEST_IDS.ADD_TODO_ITEM_TEXT_FIELD) as HTMLInputElement).value).toEqual(expected);
            }

            function assertCountByRole(role: Matcher, expectedCount: number) {
                expect(screen.queryAllByRole(role).length).toEqual(expectedCount);
            }
        })
    );
});