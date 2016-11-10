import { Component, OnInit } from '@angular/core';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

import gql from 'graphql-tag';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'todo-app',
  template: `
  <div>
    <section class='todoapp'>
      <header class='header'>
        <add-todo
          (onSave)="add($event)">
        </add-todo>
      </header>
      <todo-list
        [todos]="todos | async | select: 'allTodos'"
        [filter]="filter"
        (renameTodo)="rename($event)"
        (deleteTodo)="delete($event)"
        (toggleTodo)="toggle($event)">
      </todo-list>
      <todo-list-footer (onFilter)="onFilter($event)"></todo-list-footer>
    </section>
    <footer class='info'>
      <p>
        Double-click to edit a todo
      </p>
    </footer>
  </div>
  `
})
export default class TodoApp implements OnInit {
  todos: ApolloQueryObservable<ApolloQueryResult>;
  filter: string;

  constructor(
    private apollo: Angular2Apollo
  ) {}

  ngOnInit(): void {
    this.todos = this.apollo.watchQuery({
      query: gql`
        query Todos {
          allTodoes {
            id
            complete
            text
          }
        }
      `,
      forceFetch: false,
    });
  }

  onFilter(filter: string) {
    this.filter = filter;
  }

  add(text) {
    this.apollo.mutate({
      mutation: gql`
        mutation addTodo($text: String!) {
          createTodo(complete: false, text: $text) { id }
        }
      `,
      variables: { text },
    }).toPromise();
  }

  rename({ todo, text }) {
    this.apollo.mutate({
      mutation: gql`
        mutation renameTodo($id: ID!, $text: String!) {
          updateTodo(id: $id, text: $text) { id }
        }
      `,
      variables: {
        id: todo.id,
        text,
      },
    }).toPromise();
  }

  toggle({ todo, complete }) {
    this.apollo.mutate({
      mutation: gql`
        mutation toggleTodo($id: ID!, $complete: Boolean!) {
          updateTodo(id: $id, complete: $complete) { id }
        }
      `,
      variables: {
        id: todo.id,
        complete,
      },
    }).toPromise();
  }

  delete({ todo }) {
    this.apollo.mutate({
      mutation: gql`
        mutation deleteTodo($id: ID!) {
          deleteTodo(id: $id) { id }
        }
      `,
      variables: {
        id: todo.id,
      },
    }).toPromise();
  }
}
