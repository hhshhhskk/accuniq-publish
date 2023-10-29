// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 6개

// 각각 필요로 한 항목이 무엇인가
// - 이미지 경로
// - URL
const ticket_xh = new XMLHttpRequest();

ticket_xh.open("GET", "/data/ticket.json");
ticket_xh.send();
ticket_xh.onreadystatechange = function (event) {
  //console.log(event.target);

  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("자료왔다");
    // console.log(event.target.response);

    const result = JSON.parse(event.target.response);
    // console.log(result);
    // 현재 화면 출력에 활용을 하지는 않고 있어요.
    makeTicketSlideHtml(result);
  }
};

// visual 슬라이드 내용 채우는 기능
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
            <h1>전체보기 -> </h1>
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
                </div>
                <div class="ticket-info" >
                  <ul>
                    <li>
                      <span class="ticket-info-title">
                        <b>뮤지컬, 공연</b>
                      </span>
                    </li>
                    <li>
                      <span class="ticket-info-location">
                        그린아트컴퓨터학원 5층
                      </span>
                    </li>
                    <li>
                      <span class="ticket-info-time">
                       2023.10.25 ~ 2023.12.31
                      </span>
                    </li>
                    <li>
                      <span class="ticket-info-tag">
                        좌석우위
                      </span>
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
  ticketSlide.innerHTML = ticketHtml;

  new Swiper(".ticket-slide", {
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
}
