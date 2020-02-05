import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../shared/interfaces';
import {TodosService} from '../todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      user: new FormControl(null, [Validators.required])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const todo: Todo = {
      value: this.form.value.title,
      user: this.form.value.user,
      updatedAt: new Date(),
      addedAt: new Date(),
      checked: false,
      priority: 0
    };

    this.todosService.add(todo)
      .subscribe(() => {
        console.log(todo);
        this.form.reset();
      });
  }
}
