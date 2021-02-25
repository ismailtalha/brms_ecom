import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import autoTable from 'jspdf-autotable';
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
    return this.http.post(url + 'custinfo', data);
  }
  createUser(data) {
    return this.http.post(url + 'cobuserhdr', data);
  }

  getsingleuser(id)
  {
    return this.http.get(url +`cobuserhdr/${id}`);
  }

  // getProducts() {
  //   return this.http.get(url + '/api/item');
  // }

   getProducts() {
    return this.http.get(url + `iteminfo/getiteminfo`);
  }

  getsingleProduct(id) {
    console.log(id)
    return this.http.get(url + `iteminfo/getiteminfo/${id}`);
  }
  getcompany()
  {
    return this.http.get(url + 'companyinfo/getcompanyinfo');
  }
  getcategory()
  {
    return this.http.get(url + 'productinfo');
  }
  getitemgroup()
  {
    return this.http.get(url + 'itemgroupinfo');
  }
  getbrands()
  {
    return this.http.get(url + 'makeinfo');
  }
}
