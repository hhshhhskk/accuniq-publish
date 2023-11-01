// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 6개

// 각각 필요로 한 항목이 무엇인가
// - 이미지 경로
// - URL
window.addEventListener("load", function () {
  const ticket_xh = new XMLHttpRequest();

  ticket_xh.open("GET", "/data/ticket.json");
  ticket_xh.send();
  ticket_xh.onreadystatechange = function (event) {
    //console.log(event.target);

    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료왔다");
      // console.log(event.target.response);

      const result = JSON.parse(event.target.response);
      // console.log(result);
      // 현재 화면 출력에 활용을 하지는 않고 있어요.
      makeTicketSlideHtml(result);
    }
  };

  // 슬라이드 내용 채우는 기능
  function makeTicketSlideHtml(_data) {
    const TicketRes = _data;
    // 출력을 시켜줄 문장을 만들자.
    let ticketHtml = "";

    // total만큼 반복하자.
    // for는 반복을 하는데 true인 경우에만 반복한다.
    for (let i = 1; i <= TicketRes.total + 1; i++) {
      let temp = ``;
      if (i === TicketRes.total + 1) {
        temp = `
      <div class="swiper-slide">
        <div class="ticket-slide-item">
          <div class="ticket-slide-total">
            <img src="${TicketRes.total_img.file}" alt="${TicketRes.total_img.url}"/>
            <div class="ticket-total-txt">전체보기</div>
          </div>
        </div>
      </div>
    `;
      } else {
        temp = `
      <div class="swiper-slide">
          <div class="ticket-slide-item">
              <a class="ticket-link" href="${TicketRes["ticket_" + i].url}">
                <div class="ticket-img" >
                  <img src="${TicketRes["ticket_" + i].file}" alt="${
          TicketRes["ticket_" + i].url
        }"/>
                  <div class="ticket-img-num">${i}</div>
                </div>
                <div class="ticket-info" >
                  <ul>
                    <li>
                      <div class="ticket-info-title">
                        <b>${TicketRes["ticket_" + i].title}</b>
                      </div>
                    </li>
                    <li>
                      <div class="ticket-info-place">
                      ${TicketRes["ticket_" + i].place}
                      </div>
                    </li>
                    <li>
                      <div class="ticket-info-duration">
                      ${TicketRes["ticket_" + i].duration}
                      </div>
                    </li>
                    <li>
                      <div class="ticket-info-babge">
                      ${TicketRes["ticket_" + i].babge}
                      </div>
                    </li>
                    
                  </ul>
                </div>
              </a> 
          </div>
      </div>
      `;
      }

      // console.log(temp);
      ticketHtml += temp;
    }

    // 어디다가 자료를 출력할 것인지 지정
    const ticketSlide = document.querySelector(".ticket-slide .swiper-wrapper");
    //   console.log(ticketHtml);
    const prevBt = document.querySelector(".ticket-slide-prev");
    const NextBt = document.querySelector(".ticket-slide-next");

    ticketSlide.innerHTML = ticketHtml;

    let mySwiper = new Swiper(".ticket-slide", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 28,
      // 이동 속도 : 1000은 1초
      speed: 500,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".ticket-slide-next",
        prevEl: ".ticket-slide-prev",
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
