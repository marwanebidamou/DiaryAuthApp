import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { DiaryResponseDTO } from '../../models/diary.dtos';

@Component({
  selector: 'app-edit-diary',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './edit-diary.component.html',
  styleUrl: './edit-diary.component.css'
})
export class EditDiaryComponent {
  @Input() id = '';
  diary: Partial<DiaryResponseDTO> = {}

  form = inject(FormBuilder).group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  get title() { return this.form.controls.title };
  get description() { return this.form.controls.description };

  submitForm() {

  }
}
