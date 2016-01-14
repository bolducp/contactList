"use strict";

$(document).ready(init);

var contacts = [];
var editing = false;

function init(){
  loadFromStorage();
  updateList();
  clickHandler();
}

function clickHandler(){
  $("#newContact").submit(addContact);
  $("tbody").on("click", ".trashButton", deleteContact);
  $("tbody").on("click", ".edit", editContact);
  $(".sortable").click(sortContacts);
  $("#typeOfContact").change(filterContacts);

}

function sortContacts(){
  var sortby = $(this).data("sort")
  contacts = _.sortBy(contacts, sortby).reverse();
  updateList();
  saveToStorage();
}

function saveToStorage() {
  localStorage.contacts = JSON.stringify(contacts);
}

function loadFromStorage() {
  if(!localStorage.contacts) {
    localStorage.contacts = '[]';
  }
  contacts = JSON.parse(localStorage.contacts);
}


function editContact(){
  editing = true;
  event.preventDefault();

  var index = $(this).closest("tr").index();
  var editObj = contacts[index -1];

  $('#firstName').val(editObj["firstName"]);
  $('#lastName').val(editObj["lastName"]);
  $('#phone').val(editObj["phone"]);
  $('#email').val(editObj["email"]);

  $('h2').text("Edit Contact:");
  $('#addContact').hide();
  $('#editContact').show();
  $("#editContact").click(makeEdits);

  function makeEdits(){
    editObj["firstName"] = $('#firstName').val();
    editObj["lastName"] = $('#lastName').val();
    editObj["phone"] = $('#phone').val();
    editObj["email"] = $('#email').val();

    updateList();
    saveToStorage();
    location.reload();
  }
}





function deleteContact(){
  var index = $(this).closest("tr").index();
  spliceContact(index - 1);
  updateList();
  saveToStorage();
}


function spliceContact(index){
  contacts.splice(index, 1);
}


function addContact(event){
  event.preventDefault();
  if (editing){
    return;
  }
  var types = [];
  $("input:checkbox[name=contactType]:checked").each(function(){
    types.push($(this).val());
  });

  var contact = {};

  contact["firstName"] = $('#firstName').val();
  contact["lastName"] = $('#lastName').val();
  contact["phone"] = $('#phone').val();
  contact["email"] = $('#email').val();
  contact["types"] = types;

  contacts.push(contact);
  saveToStorage();
  updateList();
  $("#newContact").trigger("reset"); // reset form
}


function updateList() {
  var $tableBody = $('#contacts');
  $tableBody.children().not("#template").remove();

  var $contacts = contacts.map(function(contact) {
    var $contactRow = $("#template").clone();
    $contactRow.removeAttr("id");
    // $tableRow.data("amount", getFormattedAmount(transactionType, amount));

    var types = contact["types"];
    for (var i = 0; i < types.length; i++){
      $contactRow.addClass(types[i]);
    }
    $contactRow.children(".firstName").text(contact["firstName"]);
    $contactRow.children(".lastName").text(contact["lastName"]);
    $contactRow.children(".phone").text(contact["phone"]);
    $contactRow.children(".email").text(contact["email"]);
    return $contactRow;
  });
  $tableBody.append($contacts);
}

function filterContacts(){
  var contactType = $(this).val();
  $("#contacts tr").hide();

  switch(contactType){
    case "family":
      console.log("family");
      $(".family").show();
      break;
    case "friend":
      $('.friend').show();
      break;
    case "colleague":
      $('.colleague').show();
      break;
    case "other":
      $('.other').show();
      break;
    default:
      $('#contacts tr').not("#template").show();
      break;
  }
}
