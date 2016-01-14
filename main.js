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



  // $("#typeOfTransaction").change(filterTransactions);
  // $("#newTransaction").submit(addTransaction);
  // $("#transactions").on("click", ".trashButton", deleteTransaction); // deferred event handler
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

  console.log("object to edit", editObj);
  $('h2').text("Edit Contact:");
  //
  $('#firstName').val(editObj["firstName"]);
  $('#lastName').val(editObj["lastName"]);
  $('#phone').val(editObj["phone"]);
  $('#email').val(editObj["email"]);

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
  //updateBalance(transactionType, amount);

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
    $contactRow.children(".firstName").text(contact["firstName"]);
    $contactRow.children(".lastName").text(contact["lastName"]);
    $contactRow.children(".phone").text(contact["phone"]);
    $contactRow.children(".email").text(contact["email"]);
    return $contactRow;
  });

  $tableBody.append($contacts);
}



// function deleteTransaction(){
//   var $currentRow = $(this).closest("tr");
//   var rowAmount = $currentRow.data("amount");
//
//   undoTransaction(rowAmount);
//   $currentRow.remove();
// }
//
// function undoTransaction(rowAmount){
//   account.balance -= rowAmount;
//   $('h3').text("Current Account Balance: " + numeral(account["balance"]).format('$0,0.00'));
//   $('h3').addClass("animated flash");
//   setTimeout(function(){$('h3').removeClass("animated flash")}, 1000);
// }
//
// function updateBalance(transactionType, amount){
//   if (transactionType === "deposit"){
//     account.balance += amount;
//   } else{
//     account.balance -= amount;
//   }
//   $('h3').text("Current Account Balance: " + numeral(account["balance"]).format('$0,0.00'));
//   $('h3').addClass("animated flash");
//   setTimeout(function(){$('h3').removeClass("animated flash")}, 1000);
// }
//
// function getFormattedAmount(transactionType, amount){
//   if (transactionType === "deposit"){
//     return amount;
//   } else{
//     return amount * -1;
//   }
// }
//
// function filterTransactions(){
//   var transactionType = $(this).val();
//   $("#transactions tr").hide();
//
//   switch(transactionType){
//     case "deposits":
//       $(".deposit").show();
//       break;
//     case "withdrawals":
//       $('.withdrawals').show();
//       break;
//     default:
//       $('#transactions tr').not("#template").show();
//       break;
//   }
// }
