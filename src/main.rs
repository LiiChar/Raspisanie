use std::io::Read;
use serde_json;
use serde::{self, Deserialize};
// use termsize;
use chrono::Datelike;
use chrono::prelude::*;

#[derive(Deserialize, Debug)]
struct Lesson {
  lesson: String,
  name: String,
  teachers: Vec<String>,
  rooms: Vec<String>
}

#[derive(Deserialize, Debug)]
struct Schedule {
  #[serde(default)] 
  data: String,
  schedule: Vec<Lesson>
}
fn main() {
  let schedules = fetch_schedule();
  show_schedules(&schedules);
}

fn format_data (data: &String) -> String {
  let v_data: Vec<&str> = data.split(".").collect();
  format!("{}-{}-{}", v_data[2], v_data[1], v_data[0])
}

fn fetch_schedule () -> Vec<Schedule> {
    let res = reqwest::blocking::get("https://erp.nttek.ru/api/schedule/legacy");

    let data_shedule: Vec<String> = match res {
      Ok(mut data) => {
        let mut buf = String::new();
        let _ = data.read_to_string(&mut buf);
        serde_json::from_str::<Vec<String>>(&buf.to_owned()).expect("Can't parse json")
      },
      Err(e) => panic!("{}", e)
    };

    let mut schedules: Vec<Schedule> = vec![];

    for data in data_shedule {
        let n_data = format_data(&data);
          let res = reqwest::blocking::get(format!("https://erp.nttek.ru/api/schedule/legacy/{}/group/4ИС3", n_data));

        match res {
          Ok(mut data) => {

            let mut buf = String::new();
            let _ = data.read_to_string(&mut buf);
            let mut shedule_req = serde_json::from_str::<Schedule>(&buf.to_owned()).expect("Can't parse json");
            shedule_req.data = n_data;
            schedules.push(shedule_req);
          },
          Err(e) => panic!("{}", e)
        };
    }

    return schedules;
}

fn print_table(schedule: &Schedule, is_visible: bool) {

    for lesson in &schedule.schedule {
      if is_visible {
        let name = trim_whitespace(lesson.name.trim());
        let is_space: bool;
        let mut index_new_line = 124;
        if trim_whitespace(&lesson.name.trim()).len() > 128 {
          is_space = true;
          match name.get(..index_new_line) {
            Some(_) => (),
            None => {
              index_new_line -= 1; 
              ()
            },
        }
        } else {
          is_space = false;
        }
        println!("{}", format!("{:-<106}+", "+"));
        println!(
          "| {0: <5} | {1: <65} | {2: <13} | {3: <11} |", 
        lesson.lesson.to_owned().trim(), 
        if is_space {&name[..index_new_line]} else {&name},
        lesson.teachers
          .clone()
          .into_iter()
          .map(|c| c.to_string())
          .collect::<Vec<String>>()
          .join(", ")
          .trim(), 
        lesson.rooms
          .clone()
          .into_iter()
          .map(|c| c.to_string())
          .collect::<Vec<String>>()
          .join(", ")
          .trim()
      );
      if is_space {
        println!( "| {3:<5} | {0: <65} | {1:<13} | {2:<11} |", &name[index_new_line..name.len()], "", "", "");
      }
      }
    }
}

fn show_schedules (schedules: &Vec<Schedule>) {
  // let termsize::Size {rows, cols} = termsize::get().unwrap();
  let mut unvisible_vector: Vec<u8> = vec![];

  loop {
    for (i, schedule) in schedules.iter().enumerate() {
      println!("{}", format!("{:-<106}+", "+"));
      println!(
        "| {0: >42} - {1} - {2: <45} |",
        i, schedule.data, get_day_of_week(&schedule.data)
      );
      print_table(schedule, unvisible_vector.contains(&u8::try_from(i).unwrap()));
      println!("{}", format!("{:-<106}+", "+"));
    }
    let mut line = String::new();
    println!("Enter index of table to show or close:");
    std::io::stdin().read_line(&mut line).unwrap();
    if unvisible_vector.contains(&line.trim().parse::<u8>().expect("Expect number from 0 to 255")) {
      let index = unvisible_vector.iter().position(|x| *x == line.trim().parse::<u8>().expect("Expect number from 0 to 255")).unwrap();
      unvisible_vector.remove(index);
    } else {
      unvisible_vector.push(line.trim().parse::<u8>().expect("Expect number from 0 to 255"));
    };
  }
}

  // fn calc_time_schedule(time: &String) -> String {
  //   match time.as_str() {
  //     "" => return "".to_owned(),
  //     "1-2" => return "8:30 - 9:50".to_owned(),
  //     "3" => return "10:00 - 10:40".to_owned(),
  //     "4" => return "10:40 - 11:20".to_owned(),
  //     "5" => return "11:20 - 12:00".to_owned(),
  //     "6-7" => return "12:10 - 13:30".to_owned(),
  //     "8-9" => return "13:40 - 15:00".to_owned(),
  //     "10-11" => return "15:10 - 16:30".to_owned(),
  //     "12-13" => return "16:40 - 18:00".to_owned(),
  //     "14-15" => return "16:40 - 18:00".to_owned(),
  //     _ => return "".to_owned()
  //   };
  // }

 fn trim_whitespace(s: &str) -> String {
  const SPACE: &str = " ";
const TWO_SPACES: &str = "  ";
    let mut new_str: String = s.trim().to_owned();
    while new_str.contains(TWO_SPACES) {
        new_str = new_str.replace(TWO_SPACES, SPACE);
    }
    new_str
}

fn get_day_of_week (time: &String) -> String {
  // let current_time = chrono::offset::Local::now();
  let p_time: Vec<&str> = time.split("-").collect();
  let t = Utc.with_ymd_and_hms(p_time[0].parse::<i32>().unwrap(), 
  p_time[1].parse::<u32>().unwrap(), 
  p_time[2].parse::<u32>().unwrap(), 
  0, 0, 0).unwrap();
  match t.date_naive().weekday() {
    chrono::Weekday::Mon => return "понедельник".to_owned(),
    chrono::Weekday::Tue => return "вторник".to_owned(),
    chrono::Weekday::Wed => return "среда".to_owned(),
    chrono::Weekday::Thu => return "четверг".to_owned(),
    chrono::Weekday::Fri => return "пятница".to_owned(),
    chrono::Weekday::Sat => return "суббота".to_owned(),
    chrono::Weekday::Sun => return "воскресенье".to_owned(),
  }
}