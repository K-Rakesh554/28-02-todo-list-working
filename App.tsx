import * as React from 'react';
import { useState, ChangeEvent, useRef } from 'react';
import './style.css';
import { Itask } from './interface';
import TodoList from './components/todolist';

export default function App() {
  let [task, setTask] = useState<string>('');
  let [deadline, setdeadline] = useState<number>(0);
  let [todolist, setToDoList] = useState<Itask[]>([]);

  const Identity = useRef(null);

  const displaydate = new Date();

  const checked = useRef(true);
  const checkid = useRef(null);

  // handler to set data
  const handledatadisplay = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'task') setTask(event.target.value);
    else setdeadline(Number(event.target.value));
  };

  //handler to push data
  const handledatapush = (): void => {
    const genID = Date.now();

    if (task == '' || deadline == 0) {
      alert('please fill all the fields');
    } else {
      if (Identity.current) {
        const newarr = todolist.map((item) => {
          if (item.ID === Identity.current) {
            // return {
            //   taskname: task,
            //   daystocomplete: deadline,
            //   ID: genID,
            //   isComplete: checked.current,
            // };

            item.taskname = task;
            item.daystocomplete = deadline;
          }
          return item;
        });

        setToDoList(newarr);
      } else {
        const newtask = {
          taskname: task,
          daystocomplete: deadline,
          ID: genID,
          isComplete: true,
        };
        setToDoList([...todolist, newtask]);
      }

      console.log(todolist);
      setTask('');
      setdeadline(0);

      Identity.current = null;
    }
  };

  // handler to delete data
  const handledelete = (tasknametodelete: number): void => {
    setToDoList(
      todolist.filter((task) => {
        return task.ID !== tasknametodelete;
      })
    );
  };

  // handle edit data
  const handleEdit = (taskidtoedit: number): void => {
    Identity.current = taskidtoedit;

    todolist.map((clickedForEdit) => {
      if (Identity.current === clickedForEdit.ID) {
        setTask(clickedForEdit.taskname);
        setdeadline(clickedForEdit.daystocomplete);

        if (Identity.current) {
        }
      } else {
        [...todolist];
      }
    });
  };

  //handle checkbox toggle
  const handleCheckbox = (taskIdtoEdit: number, taskBoxVal: boolean): void => {
    if (Identity.current != null) {
      checkid.current = null;
      checked.current = false;
    } else {
      checkid.current = taskIdtoEdit;
      checked.current = taskBoxVal;

      if (checkid.current) {
        const newarr = todolist.map((item) => {
          if (item.ID === checkid.current) {
            item.isComplete = checked.current;
          }
          return item;
        });

        setToDoList(newarr);
      }
    }
  };

  //
  return (
    <div>
      <div className="navbar">
        <h1> TO-DO LIST APP</h1>
        <h3>Date:{displaydate.toLocaleDateString()}</h3>
      </div>
      <div className="inputarea">
        <label>SET GOAL:</label>
        <input
          type="text"
          value={task}
          name="task"
          placeholder="input task...."
          onChange={handledatadisplay}
          required
        />
        <label> BALL-PARK YOUR GOAL:</label>
        <input
          type="number"
          value={deadline}
          name="deadline"
          placeholder="deadline in days"
          onChange={handledatadisplay}
          required
        />

        <button onClick={handledatapush} id="button">
          {' '}
          {Identity.current ? 'save task' : 'add the task'}
        </button>
      </div>

      <div className="outputarea">
        <table id="task " cellPadding="20" cellSpacing="20">
          <thead id="tablehead">
            <tr>
              <th>task</th>
              <th>days to complete</th>
              <th> edit or delete</th>
            </tr>
          </thead>
          <tbody id="todo">
            {todolist.map((task: Itask, id) => {
              return (
                <TodoList
                  task={task}
                  key={id}
                  tasktodelete={handledelete}
                  tasktoedit={handleEdit}
                  handleCheck={handleCheckbox}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
