import { Component, OnInit } from '@angular/core';
import { Lista, ListaItem } from '../../app/clases/index';
import { AlertController, NavController } from 'ionic-angular';
import { ListaDeseosService } from '../../app/services/lista-deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: 'agregar.component.html'
})
export class AgregarComponent implements OnInit{

  nombreLista:string = "";
  nombreItem:string = "";

  items:ListaItem[] = [];

  constructor(
              public _listaDeseos:ListaDeseosService,
              public alertCtrl:AlertController,
              public navCtrl:NavController
            ) {

  }

  ngOnInit(){

  }

  agregarItem(){

    if( this.nombreItem.length == 0 ){
      return;
    }

    let item = new ListaItem();
    item.nombre = this.nombreItem;

    this.items.push( item );

    this.nombreItem = "";
  }

  removerItem( idx:number ){
    this.items.splice( idx, 1 );
  }


  guardarLista(){
    if( this.nombreLista.length == 0){
      let alert = this.alertCtrl.create({
        title: 'Nombre de la lista',
        subTitle: 'Es necesario escribir un nombre para la lista!',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    let lista = new Lista( this.nombreLista );
    lista.items = this.items;

    this._listaDeseos.agregarLista( lista );

    this.navCtrl.pop();
  }

}
