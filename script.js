let dateDay = new Date().getDate();
let dateMonth = +(new Date().getMonth())
  + 1;
let mainDiv = document.createElement('div');
const body = document.getElementById('body')
let loading = document.querySelector('.spinner')
const addBackground = document.querySelector('.addBackground')
const insertBgWrap = document.querySelector('.insertBgWrap')
const insertBgWrap1 = document.querySelector('.insertBgWrap1')
const mainInsertButton = document.querySelector('.mainInsertButton')
const mainInsertInput = document.querySelector('.mainInsertInput')
const insertGroup = document.querySelector('.insertGroup')
const textGroup = document.querySelector('.textGroup')
const chooseImg = document.querySelector('#chooseImg')
const openMenu = document.querySelector('.openMenu')
const changeGroup = document.querySelector('.changeGroup')
const menu = document.querySelector('.menu')
const group = localStorage.getItem('group')

const groups = ['Б10','1Б2', '1ГД11', '1ИС3', '1ИС6', '1ИС9', '1ПД1',
'1ПД7', '1Ф8', '23Б10', '2Б2', '2ГД11', '2ИС3', '2ИС6',
'2ПД1', '2ПД16', '2ПД7', '2Ф8', '34Т10', '3Б2',
'3ГД11', '3ИС3', '3ООП6', '3ПД7', '3Т1', '3Ф8',
'4ГД11', '4ИС3', '4ООП6', '4ПД7', '4Т1']

let isLoading = true;

openMenu.addEventListener('click', (e) => {
  if (e.target.className == 'openMenu') {
    if (menu.style.display == 'block') {
      menu.style.display = 'none'
    } else {
      menu.style.display = 'block'
    }
  }
})

changeGroup.addEventListener('click', () => {
  localStorage.removeItem('group')
  window.location.reload()
})

insertGroup.addEventListener('click', () => {
  localStorage.setItem('group', JSON.stringify(textGroup.value))
  window.location.reload()
})

textGroup.addEventListener('click', () => {
  const list = document.createElement('ul')
  list.style.position = 'absolute'
  list.style.left = '25%'
  list.style.listStyleType = 'none'
  list.style.width = '20%'
  list.style.height = '20%'
  list.style.overflow = 'auto'
  groups.forEach(grouper => {
    const listGroup = document.createElement('li')
    listGroup.innerText = grouper
    listGroup.addEventListener('click', () => {
      textGroup.value = grouper
      list.style.display = 'none'
    })
    console.log(listGroup);
    list.append(listGroup)
  });
  textGroup.after(list)
})


if (localStorage.getItem('image')) {
  chooseImg.src = localStorage.getItem('image')
}

if (!localStorage.getItem('group')) {
  insertBgWrap1.style.display = 'flex'
} else {
  insertBgWrap1.style.display = 'none'

fetch(`https://erp.nttek.ru/api/schedule/legacy`)
  .then((response) => response.json())
  .then(function (date) {
    isLoading = false
    CreateTable(date)
  })


body.appendChild(mainDiv);

async function CreateTable(date) {
  for (let i = 0; i < date.length; i++) {
    if (date[i] != undefined) {
      if (date[i].slice(0, 2) < dateDay && date[i].slice(3, 5) == dateMonth) {
        break;
      }
      let url = `https://erp.nttek.ru/api/schedule/legacy/${date[i].slice(6, 10)}-${date[i].slice(3, 5)}-${date[i].slice(0, 2)}/group/${JSON.parse(group)}`
      let dat = JSON.stringify(date[i])
      let a = await fetch(url)
        .then((response) => response.json())
        .then(function (data) {
          let hidden = document.createElement('div')
          hidden.innerHTML = `<div class='data' style='display: flex;'>${JSON.parse(dat)}</div>`
          hidden.className = 'hid'
          mainDiv.appendChild(hidden);

          let table = document.createElement('table');
          table.className = `table${i}`
          let tbody = document.createElement('tbody');

          hidden.appendChild(table);
          table.appendChild(tbody);


          hidden.addEventListener('click', (e) => unHidden(e, i))
          if (dat.slice(1, 3) == dateDay) {
            table.style.display = 'table'
          }

          let Pari = data.schedule
          for (let q = 0; q < Pari.length; q++) {
            let row = document.createElement('tr');
            row.style.height = 'auto'
            row.style.width = '100%'
            row.className = 'r' + i
            tbody.appendChild(row);
            createClass(Pari[q].lesson, row);
            createPara(Pari[q].name, row);
            createTeacher(Pari[q].teachers, row);
            createRoom(Pari[q].rooms, row);
          }
        })
    }

  }
  chooseImg.style.visibility = 'visible'
  loading.style.display = 'none'
  mainDiv.style.display = 'block'
  openMenu.style.display = 'block'
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
  localStorage.setItem('image', mainInsertInput.value)
  chooseImg.src = mainInsertInput.value
  insertBgWrap.style.display = 'none'
})


function unHidden(e, i) {
  const r = document.querySelector(`.table${i}`)
  if (e.target.className == 'data') {
    if (r.style.display == 'table') {
      r.style.display = 'none'
    } else {
      r.style.display = 'table'
    }
  }

}
}