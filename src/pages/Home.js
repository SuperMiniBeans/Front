import { Container } from "../styles/Layout";

function Home() {
  return(
    <Container>
      <section>
        <div className="banner-wrap">
          <div><img src="../img/outer0.jpg" alt="s" /></div>
        </div>
      </section>

      <section>
        <h3>기획전</h3>
        <div className="slide-wrap">

        </div>

        <div className="slider-wrap">
          <div>슬라이드 바</div>
          <div>전체 슬라이드 바</div>
        </div>
      </section>

      <section>
        <h3>인기상품</h3>
        <div><img src="../img/outer10.jpg" alt="d" /></div>
      </section>

      <section>
        <div><img src="../img/outer12.jpg" alt="d" /></div>
        <div>장식용 이미지</div>
      </section>


    </Container>
  )
}

export default Home;