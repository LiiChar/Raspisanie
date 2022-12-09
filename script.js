let dateDay = new Date().getDate();
let dateMonth = +(new Date().getMonth())
  + 1;
let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');
const btn = document.getElementById('btn')
const chooseImg = document.getElementById('chooseImg')
const Ob = document.getElementById('Ob')
const Akame = document.getElementById('Akame')
const Mukasa = document.getElementById('Mikasa')
const Zorro = document.getElementById('Zorro')
const img = document.getElementById('img')

if (localStorage.getItem('Akame')) {
  img.src = localStorage.getItem('Akame')
} else {
  localStorage.setItem('Akame', './Akame.jpg')
}
table.appendChild(thead);
table.appendChild(tbody);


fetch(`https://erp.nttek.ru/api/schedule/legacy`)
  .then((response) => response.json())
  .then(function (date) {
    console.log(date)
    CreateTable(date)
  })




document.getElementById('body').appendChild(table);

function ShowImg(e) {
  chooseImg.style.visibility = 'visible'
  chooseImg.style.zIndex = '100'
  Ob.style.visibility = 'visible'
  Ob.style.zIndex = '101'
}

function Bgi(event) {
  localStorage.setItem('Akame', `./${event.target.alt}.jpg`)
  img.src = localStorage.getItem('Akame')
  chooseImg.style.visibility = 'hidden'
  chooseImg.style.zIndex = '-1'
  Ob.style.visibility = 'hidden'
  Ob.style.zIndex = '-1'
}

function unShow() {
  chooseImg.style.visibility = 'hidden'
  chooseImg.style.zIndex = '-1'
  Ob.style.visibility = 'hidden'
  Ob.style.zIndex = '-1'
}

chooseImg.addEventListener('click', unShow)
btn.addEventListener('click', ShowImg)
Akame.addEventListener('click', Bgi)
Mikasa.addEventListener('click', Bgi)
Zorro.addEventListener('click', Bgi)



async function CreateTable(date) {
  for (let i = 0; i < date.length; i++) {
    if (date[i] != undefined) {
      if (date[i].slice(0, 2) < dateDay && date[i].slice(3, 5) == dateMonth) {
        break;
      }
      let dat = date[i]
      let a = await fetch(`https://erp.nttek.ru/api/schedule/legacy/${date[i].slice(6, 10)}-${date[i].slice(3, 5)}-${date[i].slice(0, 2)}/group/3ИС3`)
        .then((response) => response.json())
        .then(function (data) {

          let Pari = [data.schedule]

          let row_1 = document.createElement('tr');
          row_1.className = 'topBor'
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
          row_6.className = 'roc'
          tbody.appendChild(row_6);

          let margin = document.createElement('tr');
          if (date[i].slice(0, 2) == dateDay) {
            row_1.className = "red";
            row_2.className = "red";
            row_3.className = "red";
            row_4.className = "red";
            row_5.className = "red";
            row_6.className = "red";
          }

          function Prov() {
            for (let i = 0; i < Pari.length; i++) {
              if (!(Pari[i].includes('Кл. час'))) {
                return 1;
              } else {
                return 2;
              }
            }
          }

          margin.className = "Five";
          tbody.appendChild(margin);
          for (let j = 0; j < data.schedule.length; j++) {
            if (j == 0) {
              createDay((JSON.stringify(dat)), row_1)
              createClass((JSON.stringify(data.schedule[j].lesson)), row_1, Prov());
              createPara((JSON.stringify(data.schedule[j].name)), row_1);
              createTeacher((JSON.stringify(data.schedule[j].teachers)), row_1);
              createRoom((JSON.stringify(data.schedule[j].rooms)), row_1);
            }
            if (j == 1) {
              createDay((JSON.stringify(dat)), row_2)
              createClass(JSON.stringify(data.schedule[j].lesson), row_2, Prov());
              createPara((JSON.stringify(data.schedule[j].name)), row_2);
              createTeacher((JSON.stringify(data.schedule[j].teachers)), row_2);
              createRoom((JSON.stringify(data.schedule[j].rooms)), row_2);
            }

            if (j == 2) {
              createDay((JSON.stringify(dat)), row_3)
              createClass((JSON.stringify(data.schedule[j].lesson)), row_3, Prov());
              createPara((JSON.stringify(data.schedule[j].name)), row_3);
              createTeacher((JSON.stringify(data.schedule[j].teachers)), row_3);
              createRoom((JSON.stringify(data.schedule[j].rooms)), row_3);
            }

            if (j == 3) {
              createDay((JSON.stringify(dat)), row_4)
              createClass((JSON.stringify(data.schedule[j].lesson)), row_4), Prov();
              createPara((JSON.stringify(data.schedule[j].name)), row_4);
              createTeacher((JSON.stringify(data.schedule[j].teachers)), row_4);
              createRoom((JSON.stringify(data.schedule[j].rooms)), row_4);
            }

            if (j == 4) {
              createDay((JSON.stringify(dat)), row_5)
              createClass((JSON.stringify(data.schedule[j].lesson)), row_5, Prov());
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

function createClass(text, num, Pare) {
  let heading_1 = document.createElement('th');
  let TimePara = document.createElement('p')
  TimePara.innerHTML = CalcTimePara(text, Pare)
  TimePara.id = 'widh'
  heading_1.innerHTML = text;
  num.appendChild(heading_1);
  heading_1.appendChild(TimePara)
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

function CalcTimePara(text, Pare) {
  console.log(Pare);
  if (Pare == 1) {
    if (text == 1) {
      return `8:30 - 9:50`
    } else if (text == 2) {
      return `10:00 - 11:20`
    } else if (text == 3) {
      return `12:00 - 13:20`
    } else if (text == 0) {
      return `13:30 - 14:10`
    } else if (text == 4) {
      return `14:20 - 15:50`
    } else if (text == 5) {
      return `16:00 - 17:20`
    }
  } else {
    if (text == 1) {
      return `8:30 - 9:50`
    } else if (text == 2) {
      return `10:00 - 11:20`
    } else if (text == 3) {
      return `12:00 - 13:20`
    } else if (text == 4) {
      return `13:30 - 14:50`
    } else if (text == 5) {
      return `15:00 - 16:20`
    } else if (text == 6) {
      return `16:30 - 17:50`
    }
  }
}

