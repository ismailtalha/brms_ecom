import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//import _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  private subjects:any;
    private sub:number;
   public app:boolean;
   public dimensiontabbool : boolean;
    // events
    // public LOGIN_DONE:any = 'login_done';
   
    constructor() {
        this.subjects = {};
        this.sub = 0;
    }

    emit(name, data) {
        let fnName = this._createName(name);
        if (!this.subjects[fnName])
            this.subjects[fnName] = new Subject();
        this.subjects[fnName].next(data);
        //this.subjects[fnName].emit(data);
    }

    listen(name, handler) {
        let fnName = this._createName(name);
        if (!this.subjects[fnName])
            this.subjects[fnName] = new Subject();
        return this.subjects[fnName].subscribe(handler);
    }
    unlisten(name) {
        let fnName = this._createName(name);
        //this.subjects[fnName].unsubscribe();
        //this.subjects[fnName] = null;
        return 
    }

    // do we need this dispose?
    // dispose() {
    //     let hasOwnProp = {}.hasOwnProperty;

    //     _.forEach(this.subjects, subject => {
    //         if (hasOwnProp.call(this.subjects, subject)) {
    //             this.subjects[subject].unsubscribe();
    //         }
    //     });
    //     this.subjects = {};

    // }

    _createName(name) {
        return `$ ${name}`;
    }
}
