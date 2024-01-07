import { Container } from "../styles/Layout";
import styled from "styled-components";
import Carousel from "../components/Carousel";

function Home() {
  // 배너 이미지
  const images = [
    require('../img/home_banner_img1.jpg'),
    require('../img/home_banner_img2.jpg'),
    require('../img/home_banner_img3.jpg'),
    require('../img/home_banner_img4.jpg'),
  ];
  const image_width = `1180px`;
  const image_height = `640px`;
  
  return(
    <>
      <Container>
        <ImgBannerSection>
          {/* <Container> */}
            <Carousel 
              imgArray={images}
              imgWidth={image_width}
              imgHeight={image_height}
            />
          {/* </Container> */}
        </ImgBannerSection>

        <TrendSection>
          <h2>기획전</h2>
          <div className="content_wrap">
            <div className="content_box">
              <img src={require("../img/home_banner_img1.jpg")} alt="" />
              <div className="square"></div>
              <div className="content_title">
                <span>New In Shop</span>
                <span>Winter 2023</span>
              </div>
            </div>

            <div className="content_box">
              <img src={require("../img/home_banner_img1.jpg")} alt="" />
              <div className="square"></div>
              <div className="content_title">
                <span>New In Shop</span>
                <span>Winter 2023</span>
              </div>
            </div>

            <div className="content_box">
              <img src={require("../img/home_banner_img1.jpg")} alt="" />
              <div className="square"></div>
              <div className="content_title">
                <span>New In Shop</span>
                <span>Winter 2023</span>
              </div>
            </div>
          </div>
        </TrendSection>

        <BestItemSection>
          <h2>인기상품</h2>

          <div className="best_item_wrap">
            <div className="best_item_main">
              <img src={require("../img/home_banner_img1.jpg")} alt="" />
            </div>
            <div className="best_item_sub">
              <img src={require("../img/home_banner_img1.jpg")} alt="" />
              <img src={require("../img/home_banner_img2.jpg")} alt="" />
              <img src={require("../img/home_banner_img3.jpg")} alt="" />
              <img src={require("../img/home_banner_img4.jpg")} alt="" />
            </div>
          </div>
        </BestItemSection>
      </Container>

      {/* <BottomImgSection>
        <div>
          <img src={require("../img/home-bottom-img.png")} alt="outer12" />
        </div>
      </BottomImgSection> */}
    </>
  )
}

const ImgBannerSection = styled.section`
  margin-bottom: 80px;
`

const TrendSection = styled.section`  
  margin: 120px 0;

  h2 {
    text-align: center;
    padding-bottom: 24px;
  }

  .content_wrap {
    position:relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    width: 1180px;
    height: 380px;

    .content_box {
      position:relative;
      cursor: pointer;

      .square {
        position: absolute;
        top:0;
        width: 100%;
        height: 100%;
        transition: all 0.5s ease-in-out;

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      }
  
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .content_title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #fff;

        span {
          display: block;

          &:first-child {
            font-size: 24px;
            margin-bottom: 10px;

          }
        }
      }
    }

  }
`

const BestItemSection = styled.section`
  h2 {
    text-align: center;
    padding-bottom: 24px;
  }

  .best_item_wrap {
    display: flex;
    width: 1180px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .best_item_main {
      width: 580px;
      height: 700px;
      margin-right: 20px;
    }

    .best_item_sub {
      width: 580px;
      height: 700px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 20px;
      row-gap: 24px;
    }
  }

`




// const BottomImgSection= styled.section`
//   div {
//     width: 100%;
//     height: 400px;
//     background: red;
    
//     img {
//       display: block;
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//     }
//   }
// `
export default Home;