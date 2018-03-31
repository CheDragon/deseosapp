import { Component, OnInit } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Lista, ListaItem } from '../../app/clases/index';
import { ListaDeseosService } from '../../app/services/lista-deseos.service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html'
})
export class DetalleComponent implements OnInit {

  idx:number;
  lista:Lista;

  constructor(
              public navCtrl:NavController,
              public navParams:NavParams,
              public _listaDeseos:ListaDeseosService,
              public alertCtrl:AlertController
            ) {

    this.idx = this.navParams.get("idx");
    this.lista = this.navParams.get("lista");
  }

  ngOnInit() { }

  actualizar( item:ListaItem ){
    item.completado = !item.completado;

    this.lista.terminada = this.lista.items.every(
      (item) => item.completado
    );

    this._listaDeseos.actualizarData();
  }

  borrarLista(){
    let confirm = this.alertCtrl.create({
      title: this.lista.nombre,
      message: '¿Estás seguro que quieres borrar la lista? No es posible deshacer esta acción',
      buttons: [
        {
          text: 'No',
          handler: () => {
            return;
          }
        },
        {
          text: 'Si, borrar',
          handler: () => {
            this._listaDeseos.eliminarLista( this.idx );
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }
}
