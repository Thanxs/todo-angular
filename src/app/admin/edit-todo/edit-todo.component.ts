import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodosService} from '../todos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../shared/interfaces';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  form: FormGroup;
  todoTitle = '';
  id: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private todosService: TodosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.id = +res.id;
    });

    this.todosService.fetchTodos().subscribe((todos: Todo[]) => {
      this.todoTitle = todos.find(todo => this.id === todo._id).value;
    });

    this.form = this.fb.group({
      title: [this.todoTitle, [Validators.required]],
      author: ['', [Validators.required]]
    });
  }

  submit() {
    this.todosService.updateTodo({value: this.todoTitle, priority: 0 }, this.id).subscribe(res => {
      this.router.navigate(['/admin', 'dashboard']);
      console.log(res);
    });
  }

  changeTodoTitle(event) {
    this.todoTitle = event.target.value;
  }
}
