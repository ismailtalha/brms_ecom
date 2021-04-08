import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as jsPDF from 'jspdf';
const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

 
  // ------------------------------------------------------------
  

 
  getCurrencies() {
    return this.http.get(url + `/currency`);
  }

  getCurrenyById(id) {
    return this.http.get(url + `/currency/${id}`);
  }

  createCurrency(data) {
    return this.http.post(url + '/currency/create', data);
  }

  updateCurrency(id, data) {
    return this.http.post(url + `/currency/update/${id}`, data);
  }

  deleteCurrency(id) {
    return this.http.get(url + `/currency/delete/${id}`);
  }

  // ---------------------------------------------------------------

 
  // -----------------------------------------------------------

  private saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '-Report' + EXCEL_EXTENSION);
    });
  }

  // Export EXCEL XLSX file of approved deals /
  exportExcel(data, name?) {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, name);
    });
  }

  

  createCustomer(data) {
    return this.http.post(url + 'custinfo/post', data);
  }
  createUser(data) {
    return this.http.post(url + 'cobuserhdr/get', data);
  }

  getsingleuser(id)
  {
    return this.http.get(url +`cobuserhdr/get?no=${id}`);
  }
  getsinglecustomer(id)
  {
    return this.http.get(url +`custinfo/get?no=${id}`);
  }


  // getProducts() {
  //   return this.http.get(url + '/api/item');
  // }

   getProducts() {
    return this.http.get(url + `iteminfo/get`);
  }

  getsingleProduct(id) {
    console.log(id)
    return this.http.get(url + `iteminfo/get?no=${id}`);
  }
  getcompany()
  {
    return this.http.get(url + 'companyinfo/get');
  }
  getcategory()
  {
    return this.http.get(url + 'productinfo/get');
  }
  getitemgroup()
  {
    return this.http.get(url + 'itemgroupinfo/get');
  }
  getbrands()
  {
    return this.http.get(url + 'makeinfo/get');
  }
  createorder(data)
  {
    return this.http.post(url + "sldsaleorderhdr/post" , data);
  }
  getOrders() {
    return this.http.get(url + 'sldsaleorderhdr/get');
  }
  getsingleorder(id) {
    console.log(id)
    return this.http.get(url + `sldsaleorderhdr/get?no=${id}`);
  }
}
