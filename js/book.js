// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 6개

// 각각 필요로 한 항목이 무엇인가
// - 이미지 경로
// - URL
const book_xh = new XMLHttpRequest();

book_xh.open("GET", "/data/book.json");
book_xh.send();
book_xh.onreadystatechange = function (event) {
  //console.log(event.target);

  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("자료왔다");
    // console.log(event.target.response);

    const result = JSON.parse(event.target.response);
    // console.log(result);
    // 현재 화면 출력에 활용을 하지는 않고 있어요.
    makeBookSlideHtml(result);
  }
};

// 슬라이드 내용 채우는 기능
function makeBookSlideHtml(_data) {
  const BookRes = _data;
  // 출력을 시켜줄 문장을 만들자.
  let bookHtml = "";

  // total만큼 반복하자.
  // for는 반복을 하는데 true인 경우에만 반복한다.
  for (let i = 1; i <= BookRes.total; i++) {
    let temp = `
      <div class="swiper-slide">
          <div class="book-slide-item">
              <a class="book-link" href="${BookRes["book_" + i].url}">
                <div class="book-img" >
                  <img src="${BookRes["book_" + i].file}" alt="${
      BookRes["book_" + i].url
    }"/>
                </div>
                <div class="book-info" >
                  <ul>
                    <li>
                      <div class="book-info-title">
                        ${BookRes["book_" + i].title}
                      </div>
                    </li>
                    <li>
                      <div class="book-info-price">
                      ${BookRes["book_" + i].price}
                      </div>
                    </li>
                  </ul>
                </div>
              </a> 
          </div>
      </div>
      `;
    // console.log(temp);
    bookHtml += temp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const bookSlide = document.querySelector(".book-slide .swiper-wrapper");
  //   console.log(bookHtml);
  const prevBt = document.querySelector(".book-slide-prev");
  const NextBt = document.querySelector(".book-slide-next");
  bookSlide.innerHTML = bookHtml;

  let mySwiper = new Swiper(".book-slide", {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 28,
    // 이동 속도 : 1000은 1초
    speed: 500,
    // 좌측, 우측 이동 버튼
    navigation: {
      nextEl: ".book-slide-next",
      prevEl: ".book-slide-prev",
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
