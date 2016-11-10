import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'isomorphic-fetch';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ApolloModule } from 'angular2-apollo';

import { client } from './client';

import TodoApp from './components/TodoApp';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import TodoListFooter from './components/TodoListFooter';
import TodoTextInput from './components/TodoTextInput';
import ReversePipe from './pipes/ReversePipe';
import StatusPipe from './pipes/StatusPipe';

import './style.css';

@NgModule({
  declarations: [
    TodoApp,
    Todo,
    AddTodo,
    TodoList,
    TodoListFooter,
    TodoTextInput,
    ReversePipe,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ApolloModule.withClient(client)
  ],
  bootstrap: [ TodoApp ],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
