import { colors } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import TopSection from "@components/home/ReviewPage/TopSection";
import MiddleSection from "@components/home/ReviewPage/MiddleSection";
import HomeHeader from "@components/home/HomeHeader/";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LargeBtn = styled.button`
  width: 80%;
  height: 49px;
  margin-top: 30px;
  background-color: ${colors.mainPink};
  color: #ffff;
`;

const index = () => {
  const [regData, setRegData] = useState<{ comment: string; phone: string }>({
    comment: "",
    phone: "",
  });

  const onRegister = async () => {
    console.log("리뷰 등록", regData);
  };
  return (
    <Container>
      <HomeHeader />
      <div style={{marginTop:'70px'}}></div>
      <TopSection />
      <MiddleSection
        comment={regData.comment}
        setComment={(value) =>
          setRegData((prev) => ({ ...prev, comment: value }))
        }
        phone={regData.phone}
        setPhone={(value) => setRegData((prev) => ({ ...prev, phone: value }))}
      />
      <LargeBtn onClick={onRegister}>등록하기</LargeBtn>
    </Container>
  );
};

export default index;