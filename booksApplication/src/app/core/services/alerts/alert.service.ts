import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  showAlert(type: any, title: string, message: string) {
    Swal.fire(title, message, type)
  }

  questionAlert(title: string) : Promise<any> {
    return Swal.fire({
      title,
      showCancelButton: true,
      confirmButtonText: 'Save',
    })
  }
}
