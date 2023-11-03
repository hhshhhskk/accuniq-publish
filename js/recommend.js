window.addEventListener("load", function () {
  var mySwiper;
  fetch("/data/recommend.json")
    .then((response) => response.json())
    .then((data) => makeRecommendSlideHtml(data))
    .catch((error) => console.error("Error:", error));

  const buttons = document.querySelectorAll(".recommend-cate-bt");

  buttons.forEach((button) => {
    // console.log(button);
    button.addEventListener("click", async () => {
      // 모든 버튼에서 'recommend-cate-bt-active' 클래스 제거
      buttons.forEach((btn) =>
        btn.classList.remove("recommend-cate-bt-active")
      );
      // 클릭한 버튼에 'recommend-cate-bt-active' 클래스 추가
      button.classList.add("recommend-cate-bt-active");
      mySwiper.slideTo(0, 0);

      const selectedButton = document
        .querySelector(".recommend-cate-bt.recommend-cate-bt-active")
        .textContent.replace(/\s+/g, "");
      // console.log(selectedButton);

      let fileName = "";

      if (selectedButton === "쎈딜") {
        fileName = "/data/recommend.json";
      } else if (selectedButton === "베스트") {
        fileName = "/data/recommend2.json";
      }
      // console.log(fileName);
      await fetch(fileName)
        .then((response) => response.json())
        .then((data) => makeRecommendSlideHtml(data))
        .catch((error) => console.error("Error:", error));
    });
  });
  // 슬라이드 내용 채우는 기능
  function makeRecommendSlideHtml(_data) {
    const RecommendRes = _data;
    // 출력을 시켜줄 문장을 만들자.
    let recommendHtml = "";
    // total만큼 반복하자.
    // for는 반복을 하는데 true인 경우에만 반복한다.
    for (let i = 0; i < RecommendRes.total; i++) {
      let temp = ``;
      let price = RecommendRes.recommend_slide[i].price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      temp = `
      <div class="swiper-slide">
          <div class="recommend-slide-item">
              <a class="recommend-link" href="${
                RecommendRes.recommend_slide[i].url
              }">
                <div class="recommend-img" >
                  <img src="${RecommendRes.recommend_slide[i].file}" alt="${
        RecommendRes.recommend_slide[i].url
      }"/>
                </div>
                <div class="recommend-info" >
                  <ul>
                    <li>
                      <span class="recommend-good-info-price">
                        <b>${
                          RecommendRes.recommend_slide[i].discount === 0
                            ? ""
                            : RecommendRes.recommend_slide[i].discount + "%"
                        }</b>
                        <em>${price}원</em>
                      </span>
                    </li>
                    <li>
                      <p class="recommend-good-info-desc">
                      ${RecommendRes.recommend_slide[i].prodName}
                      </p>
                    </li>
                  </ul>
                </div>
              </a> 
          </div>
      </div>
      `;

      // console.log(temp);
      recommendHtml += temp;

      if (i === RecommendRes.total - 1) {
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
        recommendHtml += temp;
      }
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

    mySwiper = new Swiper(".recommend-slide", {
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
});
