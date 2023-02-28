import React, { ChangeEvent, useRef } from 'react';
import { Itask } from '../interface';
import './style2.css';
interface Props {
  task: Itask;
  tasktodelete(taskID: number): void;
  tasktoedit(taskID: number): void;
  handleCheck(taskID: number, checked: boolean): void;
}

export default function TodoList({
  task,
  tasktodelete,
  tasktoedit,
  handleCheck,
}: Props) {
  const buttonedit = (): void => {
    tasktoedit(task.ID);
  };
  const buttondelete = (): void => {
    tasktodelete(task.ID);
  };

  const checkbutton = (boolvalue: boolean): void => {
    handleCheck(task.ID, boolvalue);
  };
  //
  return task.isComplete ? (
    <tr>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onClick={() => {
              checkbutton(false);
            }}
          />
          <label className="form-check-label">{task.taskname} </label>
        </div>
      </td>

      <td>days left: {task.daystocomplete} </td>

      <td>
        <button onClick={buttonedit}>edit task</button>
        <button onClick={buttondelete}>delete task</button>
      </td>
    </tr>
  ) : (
    <tr>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckCheckedDisabled"
            checked
            onClick={() => {
              checkbutton(true);
            }}
          />
          <label className="form-check-label">
            {' '}
            <del>{task.taskname}</del>
          </label>
        </div>
      </td>

      <td>
        <del>days left: {task.daystocomplete} </del>{' '}
      </td>

      <td>
        <button onClick={buttonedit} disabled>
          edit task
        </button>
        <button onClick={buttondelete}>delete task</button>
      </td>
    </tr>
  );
}
