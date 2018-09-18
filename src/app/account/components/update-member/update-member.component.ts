import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUrl } from '../../../app.url';
import { AccountUrl } from '../../account.url';
import { AccontService } from '../../../services/account.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccessTokenService } from '../../../services/accesstoken.service';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.css']
})
export class UpdateMemberComponent implements OnInit {
  constructor(
    private nativeRoute: ActivatedRoute,
    private router: Router,
    private account: AccontService,
    private builder: FormBuilder,
    private accessTokenService: AccessTokenService
  ) {
    this.nativeRoute.params.forEach(query => {
      this.MemberId = query.id;
    });
    this.initailLoadMember(this.MemberId);
    this.initailLoadForm();
  }

  AppUrl = AppUrl;
  AccountUrl = AccountUrl;

  form: FormGroup;
  MemberId: number;
  ngOnInit() {}

  initailLoadMember(id: number) {
    this.account
      .onGetMemberByID(id, this.accessTokenService.getAccesstokenStore())
      .then(member => {
        this.form.controls['username'].setValue(member.username);
        this.form.controls['fristname'].setValue(member.fristname);
        this.form.controls['lastname'].setValue(member.lastname);
      });
  }

  initailLoadForm() {
    this.form = this.builder.group({
      username: [],
      fristname: [],
      lastname: [],
      image: []
    });
  }
  onSubmitUpdate() {
    this.account
      .onRegister(
        this.form.value,
        this.MemberId,
        this.accessTokenService.getAccesstokenStore()
      )
      .then(res => {
        this.router.navigate(['/', AppUrl.Account, AccountUrl.Members]);
        console.log('update member success');
      })
      .catch(err => console.log(err.Message));
  }
}
