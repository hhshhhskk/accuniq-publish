// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 6개

// 각각 필요로 한 항목이 무엇인가
// - 이미지 경로
// - URL
const tour_xh = new XMLHttpRequest();

tour_xh.open("GET", "/data/tour.json");
tour_xh.send();
tour_xh.onreadystatechange = function (event) {
  //console.log(event.target);

  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("자료왔다");
    // console.log(event.target.response);

    const result = JSON.parse(event.target.response);
    // console.log(result);
    // 현재 화면 출력에 활용을 하지는 않고 있어요.
    makeTourSlideHtml(result);
  }
};

// visual 슬라이드 내용 채우는 기능
function makeTourSlideHtml(_data) {
  const TourRes = _data;
  // 출력을 시켜줄 문장을 만들자.
  let tourHtml = "";

  // total만큼 반복하자.
  // for는 반복을 하는데 true인 경우에만 반복한다.
  for (let i = 1; i <= TourRes.total; i++) {
    let temp = `
    <div class="swiper-slide">
        <div class="tour-slide-item">
            <a href="${TourRes["tour_" + i].url}">
                <img src="${TourRes["tour_" + i].file}" alt="${
      TourRes["tour_" + i].url
    }" />
            </a>
            <div class="tour-slide-info" >
              <div class="tour-itemBadge">
              ${TourRes["tour_" + i].babge}
              </div>
              <div class="tour-itemBenefit">
              ${TourRes["tour_" + i].benefit}
              </div>
              <div class="tour-itemName">
              ${TourRes["tour_" + i].name}
              </div>
              <div class="tour-itemPrice">
              ${TourRes["tour_" + i].price}
              </div>
            </div>
        </div>
    </div>
    `;
    // console.log(temp);
    tourHtml += temp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const tourSlide = document.querySelector(".tour-slide .swiper-wrapper");
  //   console.log(visualSlide);
  const prevBt = document.querySelector(".tour-slide-prev");
  const NextBt = document.querySelector(".tour-slide-next");
  tourSlide.innerHTML = tourHtml;
  let mySwiper = new Swiper(".tour-slide", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 24,
    // 이동 속도 : 1000은 1초
    speed: 500,
    // 좌측, 우측 이동 버튼
    navigation: {
      nextEl: ".tour-slide-next",
      prevEl: ".tour-slide-prev",
    },
  });

  mySwiper.on("slideChange", function () {
    if (mySwiper.isBeginning) {
      // 처음 슬라이드인 경우
      prevBt.style.display = "none"; // 이전 버튼 숨김
      NextBt.style.display = "block"; // 다음 버튼 표시
    } else if (mySwiper.isEnd) {
      // 마지막 슬라이드인 경우
      prevBt.style.display = "block"; // 이전 버튼 표시
      NextBt.style.display = "none"; // 다음 버튼 숨김
    } else {
      // 중간 슬라이드인 경우
      prevBt.style.display = "block"; // 이전 버튼 표시
      NextBt.style.display = "block"; // 다음 버튼 표시
    }
  });
}
