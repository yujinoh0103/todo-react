import React from "react";
import WhenToMeet from "./when2meet";
import "./App.css";
import "./when2meet.css";
import "./style.css";
function App() {
  return (
    <>
      <div className="timegrid-containers">
        <WhenToMeet index={0} />
        <WhenToMeet index={1} />
      </div>
    </>
  );
}

{
  /*전역변수와 storage를 이용한 데이터 관리*/
}
// ✅ 전역 변수: tasksByDate, categories
// tasksByDate: 날짜별로 할 일 목록을 저장하는 객체
// categories: 카테고리 목록을 저장하는 객체
// localStorage에 저장된 데이터를 불러와 초기화 (없으면 빈 객체로 초기화)
let tasksByDate = JSON.parse(localStorage.getItem("tasksByDate")) || {};
let categories = JSON.parse(localStorage.getItem("categories")) || {};
// 펜(마우스) 색을 저장할 전역 변수
window.currentPenColor = "#000000"; // 기본값

window.categories = categories; // 인라인 onclick 등에서 참조 가능

// ✅ 한국 시간/로컬 시간 기반으로 날짜를 "YYYY-MM-DD"로 포맷하는 함수
function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 현재 선택된 날짜 (기본값: 오늘, 0시로 설정)
let selectedDate = new Date();
selectedDate.setHours(0, 0, 0, 0);

/*******************************************************
 * 데이터 저장 함수: localStorage에 저장
 *******************************************************/
function saveData() {
  localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
  localStorage.setItem("categories", JSON.stringify(categories));
}

export default App;
