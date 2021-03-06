import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import Todo from './Todo.ts';
import StatusPipe from '../pipes/StatusPipe.ts';
import ReversePipe from '../pipes/ReversePipe.ts';

@Component({
  selector: 'todo-list',
  directives: [
    Todo
  ],
  pipes: [
    StatusPipe,
    ReversePipe
  ],
  template: `
    <section class='main'>
      <ul class='todo-list'>
        <todo
          *ngFor="let todo of todos | reverse | status:filter"
          [todo]="todo"
          (onToggle)="onToggle(todo, $event)"
          (onDelete)="onDelete(todo)"
          (onRename)="onRename(todo, $event)">
        </todo>
      </ul>
    </section>
  `
})
export default class TodoList {
  @Input() todos: any[];
  @Input() filter: string;
  @Output() renameTodo: EventEmitter<any> = new EventEmitter();
  @Output() deleteTodo: EventEmitter<any> = new EventEmitter();
  @Output() toggleTodo: EventEmitter<any> = new EventEmitter();

  onToggle(todo, complete) {
    this.toggleTodo.emit({
      todo,
      complete
    });
  }

  onDelete(todo) {
    this.deleteTodo.emit({
      todo
    });
  }

  onRename(todo, text) {
    this.renameTodo.emit({
      todo,
      text
    });
  }
}
