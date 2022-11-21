let Class = document.getElementById('class');
let Day = document.getElementById('day');

let Para = document.getElementById('para');
let Room = document.getElementById('room');
let Teacher = document.getElementById('teacher');
var dateDay = new Date().getDate();
let table = document.createElement('table');
table.id = 'tb'
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

document.getElementById('body').appendChild(table);



fetch(`https://erp.nttek.ru/api/schedule/legacy`)
  .then((response) => response.json())
  .then(function(date) {
    CreateTable(date)
  })



async function CreateTable(date) {
  for (let i = 0; i < date.length; i++) {
    if (date[i] != undefined) {
      if (date[i].slice(0, 2) < dateDay) {
        break;
      }
      let dat = date[i]
      let a = await fetch(`https://erp.nttek.ru/api/schedule/legacy/${date[i].slice(6, 10)}-${date[i].slice(3, 5)}-${date[i].slice(0, 2)}/group/3ИС3`)
        .then((response) => response.json())
        .then(function(data) {

          let row_1 = document.createElement('tr');

          tbody.appendChild(row_1);
          let row_2 = document.createElement('tr');
          tbody.appendChild(row_2);
          let row_3 = document.createElement('tr');
          tbody.appendChild(row_3);
          let row_4 = document.createElement('tr');
          tbody.appendChild(row_4);
          let row_5 = document.createElement('tr');
          tbody.appendChild(row_5);
          let row_6 = document.createElement('tr');
          tbody.appendChild(row_6);
          let margin = document.createElement('tr');
          console.log(date[i].slice(0, 2))
          console.log(dateDay)
          if (date[i].slice(0, 2) == dateDay) {
            row_1.className = "red";
            row_2.className = "red";
            row_3.className = "red";
            row_4.className = "red";
            row_5.className = "red";
            row_6.className = "red";
          }

          margin.className = "Five";
          tbody.appendChild(margin);
          for (let j = 0; j < data.schedule.length; j++) {
            if (j == 0) {
              createDay((JSON.stringify(dat)), row_1)
              createClass((JSON.stringify(data.schedule[j].lesson)), row_1);
              createPara((JSON.stringify(data.schedule[j].name)), row_1);
              createTeacher((JSON.stringify(data.schedule[j].teachers)), row_1);
              createRoom((JSON.stringify(data.schedule[j].rooms)), row_1);
            }
            if (j == 1) {
              createDay((JSON.stringify(dat)), row_2)
              createClass((JSON.stringify(data.schedule[j].lesson)), row_2);
              createPara((JSON.stringify(data.schedule[j].name)), row_2);
              createTeacher((JSON.stringify(data.schedule[j].teachers)), row_2);
              createRoom((JSON.stringify(data.schedule[j].rooms)), row_2);
            }

            if (j == 2) {
              createDay((JSON.stringify(dat)), row_3)
              createClass((JSON.stringify(data.schedule[j].lesson)), row_3);
              createPara((JSON.stringify(data.schedule[j].name)), row_3);
              createTeacher((JSON.stringify(data.schedule[j].teachers)), row_3);
              createRoom((JSON.stringify(data.schedule[j].rooms)), row_3);
            }

            if (j == 3) {
              createDay((JSON.stringify(dat)), row_4)
              createClass((JSON.stringify(data.schedule[j].lesson)), row_4);
              createPara((JSON.stringify(data.schedule[j].name)), row_4);
              createTeacher((JSON.stringify(data.schedule[j].teachers)), row_4);
              createRoom((JSON.stringify(data.schedule[j].rooms)), row_4);
            }

            if (j == 4) {
              createDay((JSON.stringify(dat)), row_5)
              createClass((JSON.stringify(data.schedule[j].lesson)), row_5);
              createPara((JSON.stringify(data.schedule[j].name)), row_5);
              createTeacher((JSON.stringify(data.schedule[j].teachers)), row_5);
              createRoom((JSON.stringify(data.schedule[j].rooms)), row_5);
            }



          }
        })

    }
  }
}

function createDay(text, num) {
  let heading_1 = document.createElement('th');
  heading_1.innerHTML = text;
  num.appendChild(heading_1);

}

function createClass(text, num) {
  let heading_1 = document.createElement('th');
  heading_1.innerHTML = text;
  num.appendChild(heading_1);

}

function createPara(text, num) {
  let heading_2 = document.createElement('th');
  heading_2.innerHTML = text;

  num.appendChild(heading_2);
}

function createTeacher(text, num) {
  let heading_3 = document.createElement('th');
  heading_3.innerHTML = text;
  num.appendChild(heading_3);
}

function createRoom(text, num) {
  let heading_4 = document.createElement('th');
  heading_4.innerHTML = text;
  num.appendChild(heading_4);
}

fetch(`https://erp.nttek.ru/api/schedule/legacy`)
  .then((response) => response.json())
  .then(function(date) {
    console.log(date)
  })
