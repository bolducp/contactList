"use strict";

$(document).ready(init);

var contacts = [];


function init(){
  loadFromStorage();
  updateList();
  clickHandler();
}

function clickHandler(){
  $("form").submit(addContact);
  //$("#contacts").on("click", ".trashButton", deleteTransaction); // deferred event handler


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


function deleteName(){
  var index = $(this).index();
  names.splice(index, 1);
  updateList();
  saveToStorage();
}




function addContact(event){
  event.preventDefault();

  var types = [];
  $("input:checkbox[name=contactType]:checked").each(function(){
    types.push($(this).val());
  });
  //updateBalance(transactionType, amount);
  $("#newContact").trigger("reset"); // reset form

  var contact = {};
  contact["firstName"] = $('#firstName').val();
  contact["lastName"] = $('#lastName').val();
  contact["phoneNumber"] = $('#phone').val();
  contact["email"] = $('#email').val();
  contact["types"] = types;

  contacts.push(contact);
  saveToStorage();
  updateList();


}


function updateList() {
  var $tableBody = $('#contacts');
  $tableBody.children().not("#template").empty();

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
