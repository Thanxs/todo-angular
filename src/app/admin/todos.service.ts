import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from './shared/interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  url = '/api';

  constructor(private http: HttpClient) {
  }

  fetchTodos(): Observable<any> {
    return this.http.get(`${this.url}/todo`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      observe: 'response'
    });
  }

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.url}/todo`, todo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }

  removeTodo(id): Observable<any> {
    return this.http.delete(`${this.url}/todo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }

  updateTodo(todo: Todo, id) {
    return this.http.put(`${this.url}/todo/${id}`, todo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }

  completeTodo(todo: Todo, id) {
    return this.http.put(`${this.url}/todo/${id}/toggle`, todo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }

  IncreasePriority(todo: Todo, id) {
    return this.http.put(`${this.url}/todo/${id}`, {...todo, priority: todo.priority + 1}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }

  DecreasePriority(todo: Todo, id) {
    return this.http.put(`${this.url}/todo/${id}`, {...todo, priority: todo.priority - 1}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }
}
