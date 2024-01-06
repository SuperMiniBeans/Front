import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
// import "./post.css";

function PostCodeModal(props) {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      // fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
      extraAddress = `(${extraAddress})`;
    }
    // console.log(data);
    // console.log(data.zonecode);
    // console.log(fullAddress);
    // console.log(data.address);
    // console.log(extraAddress);

    props.setcompany({
      ...props.company,
      postcode: data.zonecode,
      address1: fullAddress,
      address3: extraAddress,
    });
  };

  return (
    <PostCodeModalWrap>
      <DaumPostcode 
        className="postmodal" 
        autoClose 
        onComplete={complete}
      />
    </PostCodeModalWrap>
  );
}

const PostCodeModalWrap = styled.div`
  .postmodal {
    background : rgba(0, 0, 0, 0.2);
    position : absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 20px 40px;
    z-index: 100;
  }
`

export default PostCodeModal;