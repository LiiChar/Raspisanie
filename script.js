let dateDay = new Date().getDate();
let dateMonth = +(new Date().getMonth())
  + 1;
let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');
const body = document.getElementById('body')
let loading = document.querySelector('.spinner')
const addBackground = document.querySelector('.addBackground')
const insertBgWrap = document.querySelector('.insertBgWrap')
const mainInsertButton = document.querySelector('.mainInsertButton')
const mainInsertInput = document.querySelector('.mainInsertInput')
const chooseImg = document.querySelector('#chooseImg')

let isLoading = true;

table.appendChild(thead);
table.appendChild(tbody);


fetch(`https://erp.nttek.ru/api/schedule/legacy`)
  .then((response) => response.json())
  .then(function (date) {
    isLoading = false
    CreateTable(date)
  })


body.appendChild(table);

// выпадающие таюлицы при нажатии даты, стандартно открывается сейгодняшняя дата

async function CreateTable(date) {
  for (let i = 0; i < date.length; i++) {
    if (date[i] != undefined) {
      if (date[i].slice(0, 2) < dateDay && date[i].slice(3, 5) == dateMonth) {
        break;
      }
      let dat = JSON.stringify(date[i])
      let a = await fetch(`https://erp.nttek.ru/api/schedule/legacy/${date[i].slice(6, 10)}-${date[i].slice(3, 5)}-${date[i].slice(0, 2)}/group/3ИС3`)
        .then((response) => response.json())
        .then(function (data) {
          let hidden = document.createElement('div')
          hidden.innerHTML = `<div class='data' style='display: flex;'>${JSON.parse(dat)}</div>`
          hidden.className = 'hid'
          tbody.appendChild(hidden);

          hidden.addEventListener('click', (e) => unHidden(e, i))


          let Pari = data.schedule
          for (let q = 0; q < Pari.length; q++) {
            let row = document.createElement('tr');
            row.style.height = 'auto'
            row.style.width = '70vw'
            if (dat.slice(1, 3) != dateDay) {
              row.style.display = 'none'
            }
            row.className = 'r' + i
            hidden.appendChild(row);
            createDay(JSON.parse(dat), row)
            createClass(Pari[q].lesson, row);
            createPara(Pari[q].name, row);
            createTeacher(Pari[q].teachers, row);
            createRoom(Pari[q].rooms, row);

          }

          let margin = document.createElement('div')
          margin.style.marginBottom = '50px'
          tbody.appendChild(margin)
        })
    }

  }
  loading.style.display = 'none'
  table.style.display = 'block'
}

function createDay(text, num) {
  let heading_1 = document.createElement('th');
  heading_1.innerText = text;
  num.appendChild(heading_1);

}

function createClass(text, num) {
  let heading_1 = document.createElement('th');
  let TimePara = document.createElement('p')
  TimePara.innerText = CalcTimePara(text)
  TimePara.id = 'widh'
  heading_1.innerText = text;
  num.appendChild(heading_1);
  heading_1.appendChild(TimePara)
}

function createPara(text, num) {
  let heading_2 = document.createElement('th');
  heading_2.innerText = text;
  num.appendChild(heading_2);

}

function createTeacher(text, num) {
  let heading_3 = document.createElement('th');
  text = text.join(',')
  heading_3.innerText = text.includes(',') ? text.replace(',', '/') : text;
  num.appendChild(heading_3);
}

function createRoom(text, num) {
  let heading_4 = document.createElement('th');
  heading_4.innerText = text;
  num.appendChild(heading_4);
}

function CalcTimePara(text) {
  if (text == "") {
    return ''
  }
  else if (text == "1-2") {
    return `8:30 - 9:50`
  } else if (text == '3') {
    return `10:00 - 10:40`
  } else if (text == '4') {
    return `10:40 - 11:20`
  } else if (text == '5') {
    return `11:30 - 12:10 `
  } else if (text == '6-7') {
    return `12:10 - 13:30 `
  } else if (text == '8-9') {
    return `13:40 - 15:00 `
  } else if (text == '10-11') {
    return `15:10 - 16:30`
  } else if (text == '12-13') {
    return `16:40 - 18:00`
  } else if (text == '14-15') {
    return `16:40 - 18:00`
  }
}

addBackground.addEventListener('click', (e) => {
  if (insertBgWrap.style.display = 'none') {
    insertBgWrap.style.display = 'flex'
  } else {
    insertBgWrap.style.display = 'none'
  }

})

mainInsertButton.addEventListener('click', (e) => {
  chooseImg.style.visibility = 'visible'
  console.log(mainInsertInput.value);
  chooseImg.src = mainInsertInput.value
  insertBgWrap.style.display = 'none'
})


function unHidden(e, i) {
  const r = document.querySelectorAll('.r' + i)
  console.log(e.target.className);
  if (e.target.className == 'data') {
    if (r[0].style.display == 'table-row') {
      r.forEach(element => {
        element.style.display = 'none'
      });
    } else {
      r.forEach(element => {
        element.style.display = 'table-row'
      });
    }
  }

}