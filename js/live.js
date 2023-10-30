// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 6개

// 각각 필요로 한 항목이 무엇인가
// - 이미지 경로
// - URL
const live_xh = new XMLHttpRequest();

live_xh.open("GET", "/data/live.json");
live_xh.send();
live_xh.onreadystatechange = function (event) {
  //console.log(event.target);

  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("자료왔다");
    // console.log(event.target.response);

    const result = JSON.parse(event.target.response);
    // console.log(result);
    // 현재 화면 출력에 활용을 하지는 않고 있어요.
    makeLiveSlideHtml(result);
  }
};

// visual 슬라이드 내용 채우는 기능
function makeLiveSlideHtml(_data) {
  const LiveRes = _data;
  // 출력을 시켜줄 문장을 만들자.
  let liveHtml = "";

  // total만큼 반복하자.
  // for는 반복을 하는데 true인 경우에만 반복한다.
  for (let i = 1; i <= LiveRes.total + 1; i++) {
    let temp = ``;
    if (i === LiveRes.total + 1) {
      temp = `
    <div class="swiper-slide">
        <div class="live-slide-item">
          <a class="live-link">
            <img src="${LiveRes.shortcuts_bg.file}" alt="${LiveRes.shortcuts_bg.url}"/>
            <div class="live-slide-overlay">
              <div class="live-slide-shortcut">
                <div class="live-slide-logo">  
                  <img src="${LiveRes.shortcuts_logo.file}" alt="${LiveRes.shortcuts_logo.url}"/>
                </div>
                <div class="live-total-txt">방송준비중입니다.</div>
                <div class="live-total-bt">편성표 바로가기</div>
              </div>
            </div>
          </a>
        </div>
    </div>
    `;
    } else {
      temp = `
      <div class="swiper-slide">
          <div class="live-slide-item">
              <a class="live-link" href="${LiveRes["live_" + i].url}">
                <div class="live-img" >
                  <img src="${LiveRes["live_" + i].file}" alt="${
        LiveRes["live_" + i].url
      }"/>
                </div>
                <div class="live-slide-overlay">
                  <div class="live-info-top"> 
                    <div class="live-babge">${LiveRes["live_" + i].babge}</div>
                    <div class="live-name">${LiveRes["live_" + i].name}</div>
                  </div>  
                  <div class="live-info-mid">
                    <div class="live-day">${LiveRes["live_" + i].day}</div>
                    <div class="live-time">${LiveRes["live_" + i].time}</div>
                  </div>
                </div>
              </a> 
          </div>
      </div>
      `;
    }
    // console.log(temp);
    liveHtml += temp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const liveSlide = document.querySelector(".live-slide .swiper-wrapper");
  //   console.log(liveHtml);

  const prevBt = document.querySelector(".live-slide-prev");
  const NextBt = document.querySelector(".live-slide-next");
  liveSlide.innerHTML = liveHtml;

  let mySwiper = new Swiper(".live-slide", {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 27,
    // 이동 속도 : 1000은 1초
    speed: 500,
    // 좌측, 우측 이동 버튼
    navigation: {
      nextEl: ".live-slide-next",
      prevEl: ".live-slide-prev",
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
