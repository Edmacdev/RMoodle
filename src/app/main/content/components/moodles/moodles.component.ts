import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MoodleService } from '../../../services/moodle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddMoodleDialogComponent } from '../add-moodle-dialog/add-moodle-dialog.component';
import { EditMoodleDialogComponent } from '../edit-moodle-dialog/edit-moodle-dialog.component';
import { RemoveMoodleDialogComponent } from '../remove-moodle-dialog/remove-moodle-dialog.component';
import { Observable } from 'rxjs/Rx';
import { Moodle } from '../../../models/Moodle';
import swal from 'sweetalert2';

import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'moodles',
  templateUrl: './moodles.component.html',
  styleUrls: ['./moodles.component.scss'],
  animations   : fuseAnimations
})
export class MoodlesComponent {
  user: any; //usuário logado e autenticado
  moodles: any; //moodloes do usuário
  defaultMoodle: any;
  step: number = 0; //atributo para lógica do material accordion

  //Moodles properties
  add_moodle_name: string;
  add_moodle_url: string;
  add_moodle_token: string;

  isDoneLoading: boolean = false;

  //Forms properties
    fg_add_moodle: FormGroup;

  constructor(
    private authService:AuthService,
    private moodleService:MoodleService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    //Controle de formulário
    this.fg_add_moodle = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'url': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      'token': [null, Validators.compose([Validators.required, Validators.minLength(32)])]
    })
  }

  ngOnInit() {
    //Buscar informações de usuário
    this.authService.getUser().subscribe(
      user => {
        if(user){
          this.user = user
          this.moodleService.getMoodles(this.user.uid).subscribe(
            moodles => {
              this.moodles = moodles;
              this.moodleService.getDefaultMoodle(this.user.uid).subscribe(
                data => {
                  this.defaultMoodle = data;
                  if(this.moodles.length == 1 && this.defaultMoodle.length == 0){
                    this.moodleService.setDefaultMoodle(this.user.uid, this.moodles[0])
                  }
                }
              )
            }
          )
        }
      }
    )
  }
  addMoodle(){
    let dialogRef = this.dialog.open(AddMoodleDialogComponent,{
      width: '600px'

    });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result.status == "confirm"){
          this.moodleService.addMoodle(this.user.uid, result.value)
          .then(
            (res) => {
              if(this.moodles.length == 1){
                this.moodleService.setDefaultMoodle(this.user.uid, this.moodles[0])
              }
              swal('', 'Moodle adicionado', 'success')
            }
          )
        }
      }
    );
  }
  editMoodle(moodle){
    let dialogRef = this.dialog.open(
      EditMoodleDialogComponent,{
        width: '800px',
        disableClose: true,
        data: moodle
      }
    )
    dialogRef.afterClosed().subscribe(
      result => {

        if(result.status == "confirm"){
          this.moodleService.updateMoodle(this.user.uid, result.value.id, result.value)
          .then(
            () => {
              swal('Moodle Atualizado', '','success')
            }
          )
        }
      }
    )
  }
  removeMoodle(moodle){
    let dialogRef = this.dialog.open(
      RemoveMoodleDialogComponent,{
        width: '800px',
        data:  moodle
      }
    )
    dialogRef.afterClosed().subscribe(
      result => {
        if(result == "confirm"){
          this.moodleService.removeMoodle(this.user.uid, moodle.id)
          .then(
            () => {
              swal('Moodle Excluido', '', 'success')
            }
          )
        }
      }
    )
  }
  setDefaultMoodle(moodle){
    swal({
      title: '',
      text: 'Definir ' + moodle.name + ' como moodle padrão?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.moodleService.setDefaultMoodle(this.user.uid, moodle).then(
          res => {
            console.log(res)
            swal('Moodle padrão definido', '', 'success')
          }
        )
        .catch(err => console.log(err));
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          '',
          'Moodle padrão não foi alterado',
          'error'
        )
      }
    })
  }
  //material
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
}
