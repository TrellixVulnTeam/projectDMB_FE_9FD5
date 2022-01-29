import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-account-page2',
  templateUrl: './create-account-page2.component.html',
  styleUrls: ['./create-account-page2.component.css']
})
export class CreateAccountPage2Component implements OnInit {
  account2: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  froalaOptions: Object = {
    charCounterCount: false,
    fileUpload: false,
    attribution: false,
    toolbarButtons: [
      ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'],
      ['fontFamily', 'fontSize', 'backgroundColor', 'textColor'],
      ['paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertImage', 'embedly',
        'insertTable', 'insertLink'],
      ['specialCharacters', 'insertHR', 'clearFormatting'],
      ['print', 'spellChecker'],
      ['undo', 'redo']],
    toolbarSticky: false,
    language: 'de',
    fontFamily: {
      'Arial,Helvetica,sans-serif': 'Arial',
      '\'Courier New\',Courier,monospace': 'Courier New',
      'Georgia,serif': 'Georgia',
      'Impact,Charcoal,sans-serif': 'Impact',
      '\'Lucida Console\',Monaco,monospace': 'Lucida Console',
      'Tahoma,Geneva,sans-serif': 'Tahoma',
      '\'Times New Roman\',Times,serif': 'Times New Roman',
      'Verdana,Geneva,sans-serif': 'Verdana',
    },
    events: {
      'froalaEditor.image.beforeUpload': function (e, editor, files) {
        if (files.length) {
          // Create a File Reader.
          const reader = new FileReader();

          // Set the reader to insert images when they are loaded.
          reader.onload = function (eLoad) {
            const result = (<any>(eLoad.target)).result;
            editor.image.insert(result, null, null, editor.image.get());
          };

          // Read image as base64.
          reader.readAsDataURL(files[0]);
        }

        editor.popups.hideAll();

        // Stop default upload chain.
        return false;
      },
      'contentChanged': () => {
        // Nothing
        //console.log('contentChanged', this.model.details);
      }
    },
  };

}
