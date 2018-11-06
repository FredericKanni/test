import './template.js';
import './card.js';
import './navbar.js';
import './jumbotron.js';
import './carousel.js';
import './footer.js';
import './atelier.js';
import './body.html';
import { Ateliers } from '../api/Ateliers.js';
import { Reserves } from '../api/Reserves.js';


Template.carte.events({
  'click .delres': function() {
  Reserves.remove(this._id);
},
});
Template.body.helpers({
    ateliers: function(){
        // return Ateliers.find().fetch(); 
        return Ateliers.find({ownerId: Meteor.userId()}).fetch(); 
    },

    ateliersparticulier: function(){
      // return Ateliers.find().fetch(); 
      return Ateliers.find({ownerId}).fetch(); 
  },

  desactive() {
    return Ateliers.find( {  checked: { $ne: false } });
  },
  // ct() {
  //   return Ateliers.find( {  checked: { $ne: false } }).count();
  // },

  });

  Template.cartereservation.helpers({
    reser: function(){
        return Reserves.find({ownerId: Meteor.userId()}).fetch(); 
    }
  });


  Template.body.helpers({
    reserves: function(){
        return Reserves.find().fetch(); 
    }
  });

Template.body.events({


     'click .del': function(event) {

      const hidden = document.querySelector('#edit-id');
      this._id=hidden.value ;
      
    Ateliers.remove(this._id);
  },

    'submit .new-atelier'(event) {
  
      // Prevent default browser form submit
      event.preventDefault();
  
      // Get value from form element
      const target = event.target;
      const nomcuisinier= target.modal1nomcuisinier.value;
      const prenomcuisinier = target.modal1prenomcuisinier.value;
      const spécialitécuisinier = target.modal1spécialitécuisinier.value;
      const title= target.modal1title.value;
      const text = target.modal1text.value;
      const date = target.modal1date.value;
      const duree = target.modal1duree.value;
      const horaire = target.modal1horaire.value;
      const dispo = target.modal1dispo.value;
      const prix = target.modal1prix.value;
      const image = target.modal1image.value;
      const max = target.modal1dispo.value;
      const reserve = 0;
      $('#exampleModal').modal('hide')

      Ateliers.insert({
        

        nomcuisinier,
        prenomcuisinier,
        spécialitécuisinier,
        title,
        text,
        date,
        horaire,
        duree,
        dispo,
        reserve,
        max,
        prix,
        image,
        checked:true,//fait que le checkbox de l atelier soit cocher 
        ownerId:Meteor.userId(),
        createdAt: new Date(), // current time
      });
      // Clear form
       target.modal1nomcuisinier.value= '';
       target.modal1prenomcuisinier.value= '';
      target.modal1spécialitécuisinier.value= '';

      target.modal1title.value = '';
      target.modal1text.value = '';
      target.modal1date.value = '';
      target.modal1horaire.value = '';
      target.modal1duree.value = '';
      target.modal1dispo.value = '';
      target.modal1prix.value = '';
      target.modal1image.value = '';
    },
    /************************/
    'submit .new-reserve'(event) {
      // Prevent default browser form submit
      event.preventDefault();
    
      const hidden = document.querySelector('#edit-id');
      idAtelier=hidden.value;
      const atelier = Ateliers.findOne({_id:hidden.value});
      
      const ownerId =atelier.ownerId;
      const date =atelier.date;
      const title =atelier.title;

      // Get value from form element
      const target = event.target;
      const Name= target.Name.value;
      const Prenom = target.Prenom.value;
      const Tel = target.Tel.value;
      const Email = target.Email.value;
      const Place = target.Place.value;
      const Placedispo = atelier.dispo;
      const tdispo =  parseInt(atelier.dispo) - parseInt(Place);
      const treserve =   parseInt(atelier.reserve) + parseInt(Place);

      if( parseInt(Place) <= parseInt(Placedispo)){
        Ateliers.update(idAtelier, {
          $set:{ dispo: tdispo, reserve: treserve, 
          }
          });
        console.log('reservation reussi');
         alert("reservation reussie!");
// Mise à jour de la collection

            Reserves.insert({
                    
              Name,
              Prenom,
              Tel,
              Email,
              Place,
              idAtelier,
              ownerId,
              date,
              title,
              createdAt: new Date(), // current time
            });

      }
      if( parseInt(Place) > parseInt(Placedispo)){
        alert("Pas assez de places disponibles!");

      }
     
      // Clear form
      target.Name.value = '';
      target.Prenom.value = '';
      target.Tel.value = '';
      target.Email.value = '';
      target.Place.value = ''; 
    },
    /********************* */
     //Update
     'submit .save'(event){
        event.preventDefault();
        //Récupère valeur dans l'élément form (formulaire)
        const target = event.target;
        const savenomcuisinier = target.modal2nomcuisinier.value;
        const saveprenomcuisinier = target.modal2prenomcuisinier.value;
        const savespécialitécuisinier = target.modal2spécialitécuisinier.value;
        const savetitle = target.modal2title.value;
        const savetext = target.modal2text.value;
        const savedate = target.modal2date.value;
        const savehoraire = target.modal2horaire.value;
        const saveduree = target.modal2duree.value;
        const savedispo = target.modal2dispo.value;
        const saveprix = target.modal2prix.value;
        const saveimage = target.modal2image.value
        const id = target.editId.value;
        //Mise à jour de la collection
        Ateliers.update(id, {
          $set:{title: savetitle,
            text: savetext,
            horaire: savehoraire, 
            duree: saveduree, 
            date: savedate, 
            dispo: savedispo, 
            prix: saveprix, 
            image: saveimage,
            nomcuisinier:savenomcuisinier,
            prenomcuisinier:saveprenomcuisinier,
            spécialitécuisinier:savespécialitécuisinier,
          }
          });

          $('#exampleModal2').modal('hide')
    },
  });
Template.modal2.events({
    'click .edit': function(event) {
      //Récupère l'identifiant de la valeur
      const target = event.target;
      const idAtelier = target.getAttribute('data-id');
      const atelier = Ateliers.findOne({_id:idAtelier});
      //Selectionnne l'id de la cellule
      const one = document.querySelector('#editTitle');
      const two = document.querySelector('#editText');
      const three = document.querySelector('#editDate');
      const four = document.querySelector('#editHoraire');
      const five = document.querySelector('#editDuree');
      const six = document.querySelector('#editDispo');
      const eight = document.querySelector('#editPrix');
      const nime = document.querySelector('#editImage');
      const ten = document.querySelector('#editnomcuisinier');
      const eleven = document.querySelector('#editprenomcuisinier');
      const twelve = document.querySelector('#editspécialitécuisinier');
      const id = document.querySelector('#edit-id');
      //Insert les valeurs de la collection dans la cellule
      one.value = atelier.title; 
      two.value = atelier.text;
      three.value = atelier.date;
      four.value = atelier.horaire;
      five.value = atelier.duree;
      six.value = atelier.dispo;
      eight.value = atelier.prix;
      nime.value = atelier.image;
      ten.value = atelier.nomcuisinier;
      eleven.value = atelier.prenomcuisinier;
      twelve.value = atelier.spécialitécuisinier;
      id.value = idAtelier;
    }
  });

  Template.navbar.events({
    'click .js-logout'(event,instance) {
    Meteor.logout();
    },
  });
//QUAND ON CLICK SUR LE BTN RESERVE DE LA CARTE RECUPERE L ID DE LA CARTE ET LA STOCK
  Template.carte.events({
    'click .res': function(event) {
    // Reserves.remove(this._id);
    const target = event.target;
    const hidden = document.querySelector('#edit-id');
    hidden.value =this._id;
    
    const atelier = Ateliers.findOne({_id:hidden.value});

    const hidden2 = document.querySelector('#edit-ownerid');
    hidden2.value=atelier.ownerId;

    // const hidden3 = document.querySelector('#date-atelier');
    // hidden3.value=atelier.date;

    // const hidden4 = document.querySelector('#nom-atelier');
    // hidden4.value=atelier.title;

  },
    'click .delete': function(event) {
      // Reserves.remove(this._id);
      const target = event.target;
      const hidden = document.querySelector('#edit-id');
      hidden.value =this._id;
    },
  });
  Template.carte.events({

    'click .toggle-checked'(event) {
  
      const target = event.target;
      const suivanttarget = event.target.nextSibling;
      Ateliers.update(this._id, {
        $set: { checked: ! this.checked },
      });
    },
  });
Template.cartereservation.events({
  'click .delres'(event) {
    const target = event.target;
    Reserves.remove(this._id);
  },
});
