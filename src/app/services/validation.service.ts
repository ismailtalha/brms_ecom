import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
  })
  export class ValidationService {

    
    applyvalidation(arr:any)
    {
       let validatedarr;
       arr.forEach(element => {
            [element]=['',Validators.required]
        });
        validatedarr = this.fb.group({

     

    
        })
        return validatedarr;
    }
  }