// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 6개

// 각각 필요로 한 항목이 무엇인가
// - 이미지 경로
// - URL
const recommend_xh = new XMLHttpRequest();

recommend_xh.open("GET", "recommend.json");
recommend_xh.send();
recommend_xh.onreadystatechange = function (event) {
  //console.log(event.target);

  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("자료왔다");
    // console.log(event.target.response);

    const result = JSON.parse(event.target.response);
    // console.log(result);
    // 현재 화면 출력에 활용을 하지는 않고 있어요.
    makeVisualSlideHtml(result);
  }
};

// visual 슬라이드 내용 채우는 기능
function makeVisualSlideHtml(_data) {
  const RecommendRes = _data;
  // 출력을 시켜줄 문장을 만들자.
  let recommendHtml = "";

  // total만큼 반복하자.
  // for는 반복을 하는데 true인 경우에만 반복한다.
  for (let i = 1; i <= RecommendRes.total; i++) {
    let temp = `
    <div class="swiper-slide">
        <div class="recommend-slide-item">
            <a href="${RecommendRes["recommend_" + i].url}">
                <img src="${RecommendRes["recommend_" + i].file}" alt="${
      RecommendRes["recommend_" + i].url
    }" />
            </a>
        </div>
    </div>
    `;
    // console.log(temp);
    recommendHtml += temp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const recommendSlide = document.querySelector(
    ".recommend-slide .swiper-wrapper"
  );
  //   console.log(visualSlide);
  recommendSlide.innerHTML = recommendHtml;

  new Swiper(".recommend-slide", {
    slidesPerView: 4,
    spaceBetween: 24,
    // 이동 속도 : 1000은 1초
    speed: 500,
    // 좌측, 우측 이동 버튼
    navigation: {
      nextEl: ".recommend-slide-next",
      prevEl: ".recommend-slide-prev",
    },
  });
}
