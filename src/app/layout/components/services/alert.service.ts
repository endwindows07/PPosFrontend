import { Injectable } from '@angular/core';
declare let $: any;
@Injectable()

export class AlertService {
  notify(message: string, type: string = 'info', title: string = '') {
    $.notify(
      {
        // options
        icon: 'glyphicon glyphicon-warning-sign',
        title: title,
        message: message,
        url: 'https://github.com/mouse0270/bootstrap-notify',
        target: '_blank'
      },
      {
        // settings
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
          from: 'top',
          align: 'center'
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 500,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class'
      }
    );
  }

  someting_wrong(
    message: string = 'ข้อมูลบางอย่างไม่ถูกต้อง กรุณาลองอีกครั้ง'
  ) {
    this.notify(message);
  }

  error_alert(
    message: string,
    type: string = 'danger',
    title: string = 'Error : '
  ) {
    this.notify(message, type, title);
  }

  success_alert(message: string, type: string = 'info', title: string = '') {
    this.notify(message, type, title);
  }
}
