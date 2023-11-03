// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 6개

// 각각 필요로 한 항목이 무엇인가
// - 이미지 경로
// - URL
window.addEventListener("load", function () {
  const live_xh = new XMLHttpRequest();

  live_xh.open("GET", "/data/live.json");
  live_xh.send();
  live_xh.onreadystatechange = function (event) {
    //console.log(event.target);

    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료왔다");
      // console.log(event.target.response);

      const result = JSON.parse(event.target.response);
      // console.log(result);
      // 현재 화면 출력에 활용을 하지는 않고 있어요.
      makeLiveSlideHtml(result);
    }
  };

  // 슬라이드 내용 채우는 기능
  function makeLiveSlideHtml(_data) {
    const LiveRes = _data;

    let liveHtml = "";

    for (let i = 0; i < LiveRes.total; i++) {
      let temp = ``;
      temp = `
      <div class="swiper-slide">
          <div class="live-slide-item">
              <a class="live-link" href="${
                LiveRes.live_slide[i].live_info.url
              }">
                <div class="live-img" >
                  <img src="${LiveRes.live_slide[i].live_info.file}" alt="${
        LiveRes.live_slide[i].live_info.url
      }"/>
                </div>
                <div class="live-slide-overlay">
                  <div class="live-info-top"> 
                    <div class="live-babge">${
                      LiveRes.live_slide[i].live_info.babge
                    }</div>
                    <div class="live-name">${
                      LiveRes.live_slide[i].live_info.name
                    }</div>
                  </div>  
                  <div class="live-info-mid">
                    <div class="live-day">${
                      LiveRes.live_slide[i].live_day.day
                    }</div>
                    <div class="live-time">${
                      LiveRes.live_slide[i].live_day.time
                    }</div>
                  </div>
                  <div class="live-info-bottom">
                    <div class="live-bot-img" >
                      <img src="${
                        LiveRes.live_slide[i].live_bottom.bot_img
                      }" alt="이미지 없음"  onerror="this.style.display='none'"/>
                    </div>
                    <div class="live-bot-text" >
                      <div class="live-bot-title">${
                        LiveRes.live_slide[i].live_bottom.bot_title
                      }</div>
                      <div class="live-bot-num">
                        <div class="live-bot-discount">${
                          LiveRes.live_slide[i].live_bottom.bot_discount &&
                          LiveRes.live_slide[i].live_bottom.bot_discount + "%"
                        }</div>
                        <div class="live-bot-price">${
                          LiveRes.live_slide[i].live_bottom.bot_price &&
                          LiveRes.live_slide[i].live_bottom.bot_price + "원"
                        }</div>
                      </div>
                    </div>
                  </div>
                </div>
              </a> 
          </div>
      </div>
      `;
      // console.log(temp);
      liveHtml += temp;

      if (i === LiveRes.total - 1) {
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
        liveHtml += temp;
      }
    }

    // 어디다가 자료를 출력할 것인지 지정
    const liveSlide = document.querySelector(".live-slide .swiper-wrapper");
    //   console.log(liveHtml);

    const prevBt = document.querySelector(".slide-prev");
    const NextBt = document.querySelector(".slide-next");
    liveSlide.innerHTML = liveHtml;

    let mySwiper = new Swiper(".live-slide", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 27,
      // 이동 속도 : 1000은 1초
      speed: 500,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".slide-next",
        prevEl: ".slide-prev",
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
});
