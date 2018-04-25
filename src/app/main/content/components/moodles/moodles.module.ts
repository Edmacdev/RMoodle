import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';

import { RemoveMoodleDialogComponent } from '../remove-moodle-dialog/remove-moodle-dialog.component';
import { EditMoodleDialogComponent } from '../edit-moodle-dialog/edit-moodle-dialog.component';
import { AddMoodleDialogComponent } from '../add-moodle-dialog/add-moodle-dialog.component';

import { MoodlesComponent } from './moodles.component';
const routes = [
    {
        path     : 'settings',
        component: MoodlesComponent
    }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule


  ],
  declarations: [
    MoodlesComponent,
    EditMoodleDialogComponent,
    RemoveMoodleDialogComponent,
    AddMoodleDialogComponent
  ],
  entryComponents:  [
    EditMoodleDialogComponent,
    RemoveMoodleDialogComponent,
    AddMoodleDialogComponent
  ]


})
export class MoodlesModule { }
