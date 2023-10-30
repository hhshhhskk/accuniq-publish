// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 6개

// 각각 필요로 한 항목이 무엇인가
// - 이미지 경로
// - URL

const recommend_xh = new XMLHttpRequest();

recommend_xh.open("GET", "/data/recommend.json");
recommend_xh.send();
recommend_xh.onreadystatechange = function (event) {
  //console.log(event.target);

  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("자료왔다");
    // console.log(event.target.response);

    const result = JSON.parse(event.target.response);
    // console.log(result);
    // 현재 화면 출력에 활용을 하지는 않고 있어요.
    makeRecommendSlideHtml(result);
  }
};

// visual 슬라이드 내용 채우는 기능
function makeRecommendSlideHtml(_data) {
  const RecommendRes = _data;
  // 출력을 시켜줄 문장을 만들자.
  let recommendHtml = "";
  // total만큼 반복하자.
  // for는 반복을 하는데 true인 경우에만 반복한다.
  for (let i = 1; i <= RecommendRes.total + 1; i++) {
    let temp = ``;
    if (i === RecommendRes.total + 1) {
      temp = `
    <div class="swiper-slide">
        <div class="recommend-slide-item">
          <div class="recommend-slide-total">
            <img src="${RecommendRes.total_img.file}" alt="${RecommendRes.total_img.url}"/>
            <div class="recommend-total-txt">전체보기</div>
          </div>
        </div>
    </div>
    `;
    } else {
      temp = `
      <div class="swiper-slide">
          <div class="recommend-slide-item">
              <a class="recommend-link" href="${
                RecommendRes["recommend_" + i].url
              }">
                <div class="recommend-img" >
                  <img src="${RecommendRes["recommend_" + i].file}" alt="${
        RecommendRes["recommend_" + i].url
      }"/>
                </div>
                <div class="recommend-info" >
                  <ul>
                    <li>
                      <span class="recommend-good-info-price">
                        <b>${RecommendRes["recommend_" + i].discount}</b>
                        <em>${RecommendRes["recommend_" + i].price}</em>
                      </span>
                    </li>
                    <li>
                      <p class="recommend-good-info-desc">
                      ${RecommendRes["recommend_" + i].prodName}
                      </p>
                    </li>
                  </ul>
                </div>
              </a> 
          </div>
      </div>
      `;
    }

    // console.log(temp);
    recommendHtml += temp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const recommendSlide = document.querySelector(
    ".recommend-slide .swiper-wrapper"
  );
  const prevBt = document.querySelector(".recommend-slide-prev");
  const NextBt = document.querySelector(".recommend-slide-next");
  // console.log(prevBt);
  // console.log(recommendSlide);
  recommendSlide.innerHTML = recommendHtml;

  var mySwiper = new Swiper(".recommend-slide", {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 27,
    // 이동 속도 : 1000은 1초
    speed: 500,
    // 좌측, 우측 이동 버튼
    navigation: {
      prevEl: ".recommend-slide-prev",
      nextEl: ".recommend-slide-next",
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
