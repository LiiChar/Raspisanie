let dateDay = new Date().getDate();
let dateMonth = +(new Date().getMonth())
  + 1;
let mainDiv = document.createElement('div');
const body = document.getElementById('body')
let loading = document.querySelector('.spinner')
const addBackground = document.querySelector('.addBackground')
const Customize = document.querySelector('.Customize')
const hiddenTable = document.querySelector('.hiddenTable')
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
const hiddenTableCss = document.querySelector('.hiddenTableCss')
const group = localStorage.getItem('group') || 'https://klike.net/uploads/posts/2020-01/1579682483_14.jpg'
const clr = localStorage.getItem('color')

const changeColor = document.querySelector('.changeColor')
const update = document.querySelector('.update')
const defaulter = document.querySelector('.default')
const textColor = document.querySelector('.textColor')
const dateColor = document.querySelector('.dateColor')
const oddColor = document.querySelector('.oddColor')
const evenColor = document.querySelector('.evenColor')

const groups = ['Б10', '1Б2', '1ГД11', '1ИС3', '1ИС6', '1ИС9', '1ПД1',
  '1ПД7', '1Ф8', '23Б10', '2Б2', '2ГД11', '2ИС3', '2ИС6',
  '2ПД1', '2ПД16', '2ПД7', '2Ф8', '34Т10', '3Б2',
  '3ГД11', '3ИС3', '3ООП6', '3ПД7', '3Т1', '3Ф8',
  '4ГД11', '4ИС3', '4ООП6', '4ПД7', '4Т1']

let isLoading = true;

function evenClorFuc() {
  if (JSON.parse(clr)) {
    const celr = JSON.parse(clr)
    if (celr.textColor) {
      body.style.color = celr.textColor
      menu.style.color = celr.textColor
      openMenu.style.color = celr.textColor
    }
    if (celr.dateColor) {
      const dataCol = document.querySelectorAll('.data')
      dataCol.forEach(element => {
        element.style.background = celr.dateColor
        element.style.border = `1px solid ${celr.dateColor}`
      });
    }
    if(celr.oddColor && celr.evenColor) {
      let i = 0
  
      const row = document.querySelectorAll('#row')
    
      row.forEach(element => {
        if (i % 2 == 0) {
          element.style.background = celr.oddColor
        } else {
          element.style.background = celr.evenColor
        }
        i++
      });
    }
  }
}


defaulter.addEventListener('click', () => {
  body.style.color = 'black'
  menu.style.color = 'black'
  openMenu.style.color = 'black'

  const data = document.querySelectorAll('.data')
  data.forEach(element => {
    element.style.background = `rgba(243, 243, 243, 0.8)`
    element.style.border = `1px solid rgba(243, 243, 243, 0.8)`
  });
  let i = 0

  const row = document.querySelectorAll('#row')

  row.forEach(element => {
    if (i % 2 == 0) {
      element.style.background = `rgba(243, 243, 243, 0.8)`
    } else {
      element.style.background = `rgba(255, 255, 255, 0.8)`
    }
    i++
  });
  localStorage.removeItem('color')
  changeColor.style.display = 'none'
})

update.addEventListener('click', () => {
  const coloful = {}
  if (textColor.value) {
    body.style.color = textColor.value
    menu.style.color = textColor.value
    openMenu.style.color = textColor.value
    coloful.textColor = textColor.value
  }
  if (dateColor.value && dateColor.value != '#000000') {
    const dataCol = document.querySelectorAll('.data')
    dataCol.forEach(element => {
      element.style.background = dateColor.value
      element.style.border = `1px solid ${dateColor.value}`
    });
    coloful.dateColor = dateColor.value
  }
  if(oddColor.value && oddColor.value != '#000000' && evenColor.value && evenColor.value != '#000000') {
    let i = 0

    const row = document.querySelectorAll('#row')
  
    row.forEach(element => {
      if (i % 2 == 0) {
        element.style.background = oddColor.value
      } else {
        element.style.background = evenColor.value
      }
      i++
    });
    coloful.oddColor = oddColor.value
    coloful.evenColor = evenColor.value
  }

  localStorage.setItem('color', JSON.stringify(coloful))
  changeColor.style.display = 'none'
})



openMenu.addEventListener('click', (e) => {
  if (e.target.className == 'openMenu') {
    if (menu.style.display == 'flex') {
      menu.style.display = 'none'
    } else {
      menu.style.display = 'flex'
    }
  }
})

changeGroup.addEventListener('click', () => {
  localStorage.removeItem('group')
  window.location.reload()
})

Customize.addEventListener('click', () => {
  if (changeColor.style.display == 'block') {
    changeColor.style.display = 'none'
  } else {
    changeColor.style.display = 'block'
    const celr = JSON.parse(clr)
    if (celr.textColor) {
      textColor.value = celr.textColor
    } else {
      textColor.value = '#ffffff'
    }
    if (celr.dateColor) {
      dateColor.value = celr.dateColor
    } else {
      dateColor.value = '#f5f5f5'
    }
    if(celr.value) {
      oddColor.value = celr.oddColor
    } else {
      oddColor.value = '#f5f5f5'
    }
    if(celr.value) {
      evenColor.value = celr.evenColor
    } else {
      evenColor.value = '#fffff1'
    }
  }
})

hiddenTable.addEventListener('click', () => {
  if (hiddenTableCss.style.display == 'flex') {
    hiddenTableCss.style.display = 'none'
  } else {
    hiddenTableCss.style.display = 'flex'
  }
})

insertGroup.addEventListener('click', () => {
  localStorage.setItem('group', JSON.stringify(textGroup.value))
  window.location.reload()
})

// textGroup.addEventListener('')

textGroup.addEventListener('click', () => {
  if (document.querySelector(".groupsLists") == null) {
    const list = document.createElement('ul')
    list.style.position = 'absolute'
    list.className = 'groupsLists'
    // list.style.left = '20vw'
    list.style.listStyleType = 'none'
    list.style.width = 'calc(60vw + 7px)'
    list.style.height = '20%'
    list.style.overflow = 'auto'
    groups.forEach(grouper => {
      const listGroup = document.createElement('li')
      listGroup.innerText = grouper
      listGroup.addEventListener('click', () => {
        textGroup.value = grouper
        list.remove()
      })
      list.append(listGroup)
    });
    textGroup.after(list)
  }

})


if (localStorage.getItem('image')) {
  chooseImg.src = localStorage.getItem('image')
} else {
  chooseImg.src = 'https://klike.net/uploads/posts/2020-01/1579682483_14.jpg'
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
            hidden.innerHTML = `<div class='data' style='display: flex;'>${JSON.parse(dat)}(${getDayOfWeek(`${date[i].slice(6, 10)}-${date[i].slice(3, 5)}-${date[i].slice(0, 2)}`)})</div>`
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
              row.id = 'row'
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
    evenClorFuc()
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
      return `11:20 - 12:00 `
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
    window.location.reload()
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

function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();    
  return isNaN(dayOfWeek) ? null : 
    ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][dayOfWeek];
}