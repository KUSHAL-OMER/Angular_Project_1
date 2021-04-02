import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand, visibility } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
    visibility()
  ]
})

export class ContactComponent implements OnInit {

  feedErrMess: string;
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  visibility = 'shown';
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name can not be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name can not be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel No. is required.',
      'pattern': 'Tel No. must contain only numbers.'
    },
    'email': {
      'required': 'email is required.',
      'email': 'email not in valid format.'
    }
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService,
    @Inject('BaseURL')private BaseURL) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this. fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0,  [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {
        //clear previous error message ( if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for(const key in control.errors) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  changes() {
    this.visibility = 'shown';
    expand();
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feedback).subscribe(feedback => this.BaseURL.push(feedback));
    this.feedbackForm.reset({
    firstname: '',
    lastname: '',
    telnum: 0,
    email: '',
    agree: false,
    contacttype: 'None',
    message: ''
  });
  this.visibility = 'hidden';
  this.feedbackService.getFeedback()
    .subscribe(feedback => this.feedback = feedback,
      errmess => this.feedErrMess = <any>errmess);
  setTimeout(this.changes, 5000);
  this.feedbackFormDirective.resetForm();
}
}
