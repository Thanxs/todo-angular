import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Todo} from '../shared/interfaces';
import {TodosService} from '../todos.service';
import {delay, map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-todo.component.html',
  styleUrls: ['./dashboard-todo.component.scss']
})
export class DashboardTodoComponent implements OnInit {
  todos: Todo[];
  loading = false;
  searchTodo = '';
  isRequestSent = false;
  sortTrigger = false;

  constructor(
    private auth: AuthService,
    private todosService: TodosService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.todosService.fetchTodos()
      .pipe(
        delay(1000),
        map(response => {
          console.log('FETCH TODO RESPONSE: ', response);
          return response.body;
        }))
      .subscribe((todos) => {
        this.loading = false;
        this.todos = todos.map(e => ({...e, isRequestSent: true}));
      });
  }

  removeTodo(id) {
    this.todosService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo._id !== id);
      });
  }

  completeTodo(todo: Todo) {
    this.todosService.completeTodo(todo, todo._id)
      .subscribe(() => {
        todo.checked = !todo.checked;
      });
  }

  IncreasePriority(todo: Todo, id) {
    this.isRequestSent = false;
    if (todo.priority >= 0 && todo.priority <= 3) {
      this.isRequestSent = true;
      this.todosService.IncreasePriority(todo, id)
        .subscribe((result) => {
          this.isRequestSent = true;
          const selectedTodo = this.todos.find(task => task._id === id);
          Object.assign(selectedTodo, result);
        }, error => {
          console.log(error);
        });
    }
  }

  DecreasePriority(todo: Todo, id) {
    this.isRequestSent = false;
    if (todo.priority >= 0 && todo.priority <= 3) {
      this.todosService.DecreasePriority(todo, id)
        .subscribe((result) => {
          this.isRequestSent = true;
          const selectedTodo = this.todos.find(task => task._id === id);
          Object.assign(selectedTodo, result);
        });
    }
  }

  sortByPriority() {
    if (!this.sortTrigger) {
      this.todos.sort((previousTodo, nextTodo) => {
        this.sortTrigger = true;
        return previousTodo.priority - nextTodo.priority;
      });
    } else {
      this.todos.sort((previousTodo, nextTodo) => {
        this.sortTrigger = false;
        return  nextTodo.priority - previousTodo.priority;
      });
    }
  }
}
