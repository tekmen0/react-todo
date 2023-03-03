import * as React from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { type TodoItemInterface } from '../interfaces';

interface TodoFormProps {
	todos: TodoItemInterface[];
	handleTodoCreate: (todo: TodoItemInterface) => void;
}

const ToDoForm = (props: TodoFormProps) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const [values, setValues] = React.useState<string>('');

	const router = useRouter();

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setValues(event.target.value);
	}

	function handleInputEnter(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			const newTodo: TodoItemInterface = {
				id: '1',
				name: values,
				isCompleted: false,
			};
			props.handleTodoCreate(newTodo);

			console.log('enter handling is working');

			if (inputRef && inputRef.current != null) {
				inputRef.current.value = '';
			}
			router.push('/');
		}
	}

	function handleInputButton() {
		const newTodo: TodoItemInterface = {
			id: '1',
			name: values,
			isCompleted: false,
		};
		props.handleTodoCreate(newTodo);
		router.push('/');
	}
	return (
		<Modal show={true} onHide={() => {}}>
			<Modal.Header>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<input
					ref={inputRef}
					type="text"
					placeholder="Enter new task"
					onChange={event => {
						handleInputChange(event);
					}}
					onKeyDown={event => {
						handleInputEnter(event);
					}}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() => {
						router.push('/');
					}}
				>
					Close
				</Button>
				<Button variant="primary" onClick={handleInputButton}>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default ToDoForm;
