import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from './interfaces';

@Pipe({
  name: 'searchTodo'
})
export class SearchPipe implements PipeTransform {
  transform(todos: Todo[], search = ''): Todo[] {
    if (!search.trim()) {
      return todos;
    }
    return todos.filter(todo => todo.value.toLowerCase().includes(search.toLowerCase()));
  }

}
