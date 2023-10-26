// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 6개

// 각각 필요로 한 항목이 무엇인가
// - 이미지 경로
// - URL
const xh = new XMLHttpRequest();

xh.open("GET", "visual.json");
xh.send();
xh.onreadystatechange = function (event) {
  //console.log(event.target);

  if (event.target.readyState === XMLHttpRequest.DONE) {
    // console.log("자료왔다");
    // console.log(event.target.response);

    const result = JSON.parse(event.target.response);
    // console.log(result);
    // 현재 화면 출력에 활용을 하지는 않고 있어요.
    makeVisualSlideHtml(result);
  }
};

// visual 슬라이드 내용 채우는 기능
function makeVisualSlideHtml(_data) {
  const VisualRes = _data;
  // 출력을 시켜줄 문장을 만들자.
  let visualHtml = "";

  // total만큼 반복하자.
  // for는 반복을 하는데 true인 경우에만 반복한다.
  for (let i = 1; i <= VisualRes.total; i++) {
    let temp = `
    <div class="swiper-slide">
        <div class="visual-slide-item">
            <a href="${VisualRes["visual_" + i].url}">
                <img src="${VisualRes["visual_" + i].file}" alt="${
      VisualRes["visual_" + i].url
    }" />
            </a>
        </div>
    </div>
    `;
    // console.log(temp);
    visualHtml += temp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const visualSlide = document.querySelector(".visual-slide .swiper-wrapper");
  // console.log(visualSlide);
  visualSlide.innerHTML = visualHtml;

  new Swiper(".visual-slide", {
    slidesPerView: 2,
    spaceBetween: 24,
    // 반복해서 무한루프
    loop: true,
    // 자동 실행
    autoplay: {
      // 대기시간
      delay: 1000,
      // 사용자 터치후 자동실행 다시
      disableOnInteraction: false,
    },
    // 이동 속도 : 1000은 1초
    speed: 500,
    // 좌측, 우측 이동 버튼
    navigation: {
      nextEl: ".visual-slide-next",
      prevEl: ".visual-slide-prev",
    },
  });
}
