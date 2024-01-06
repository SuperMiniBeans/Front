import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";


// 이미지 크기를 지정할 때는 단위까지 써서 Carousel에 prop으로 전달해주기
// ex) imageWidth: `100vw`


function Carousel({ imgArray, imgWidth, imgHeight }) {
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setImageIndex((prevIndex) => prevIndex + 1 === imgArray.length ? 0 : prevIndex + 1);
    }, 3000); // 1.5초마다 이미지 변경

    return () => {
      clearInterval(intervalRef.current); // 컴포넌트 unmount 시, setInterval을 정리합니다.
    };
  }, [imgArray]);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  }

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setImageIndex(prevIndex => prevIndex + 1 === imgArray.length ? 0 : prevIndex + 1)
    }, 3000);
  }

  const handlePrevClick = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 < 0 ? imgArray.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setImageIndex((prevIndex) => prevIndex + 1 === imgArray.length ? 0 : prevIndex + 1);
  };

  return (
    <CarouselContainer imgWidth={imgWidth} imgHeight={imgHeight} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <StyledCarousel
        style={{
          backgroundImage: `url(${imgArray[imageIndex]})`
        }}
      />

      <CarouselButton onClick={handlePrevClick}>
        <IoChevronBackSharp size={40} />
      </CarouselButton>

      <CarouselButton onClick={handleNextClick}>
        <IoChevronForwardSharp size={40} />
      </CarouselButton>
    </CarouselContainer>
  );
};


const CarouselContainer = styled.div`
  position: relative;
  width: ${({ imgWidth }) => `${imgWidth}`};
  height: ${({ imgHeight }) => `${imgHeight}`};
`;

const StyledCarousel = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in;
  width: 100%;
  height: 100%;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 10px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;

  svg {
    width: 20px;
    height: 80px;
    color: #333;
  }

  &:first-of-type {
    left: 0;
  }

  &:last-child {
    right: 0;
  }
`;

export default Carousel;