import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private projectService: ProjectService, private router: Router) { }

  projects!: Observable<any>;

  ngOnInit(): void {
    this.projects = this.projectService.getAll()
    this.initForm()
  }
  modalClass = "modal"
  toggleAddProjectForm() {
    if (this.modalClass == "modal") {
      this.modalClass = "modal show"
    } else {
      this.modalClass = "modal"
    }
  }
  initForm() {
    this.createForm = new FormGroup({
      projectName: new FormControl(null, Validators.required),
      owner: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      priority: new FormControl('NORMAL', Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      budget: new FormControl(null, Validators.required),
      budgetIndays: new FormControl(null, Validators.required)
    })
  }
  createForm!: FormGroup
  addProject() {
    this.projectService.create(this.createForm.value).subscribe((data: any) => {
      this.projects = this.projectService.getAll()
      this.toggleAddProjectForm()
      this.router.navigate(["project", "details", 1])
    })
    this.initForm()
    console.log(this.createForm)
  }
}
