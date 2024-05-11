import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchRoll, fetchRollSheets } from "@/apis/roll";
import * as b from "./Board.styled";
import Modal from "@common/modal";
import styled from "styled-components";
import useIntersect from "@/hooks/useIntersect";

const TargetRef = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  color: white;
`;

interface RollSheetListProps {
  nickname: string;
  content: string;
  backgroundImageThumbnailUrl?: string;
  backgroundColor?: string;
  font: string;
  fontColor: string;
  shape: string;
  rollSheetId: string;
}

interface BoardProps {
  theme: string;
}

const Board = (props: BoardProps) => {
  const { theme } = props;

  const { eventId, pageUri } = useParams<{
    pageUri: string;
    eventId: string;
  }>();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [rollSheetList, setRollSheetList] = useState<RollSheetListProps[]>([]);
  const loadingRef = useRef(false);

  useEffect(() => {
    const getRolls = async () => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      try {
        const response = await fetchRollSheets(eventId, 0, 8);
        if (response && response.rollSheetList) {
          setRollSheetList(response.rollSheetList);
          setTotalCnt(response.totalCnt);
          setCurrentPage(1);
        }
      } catch (err) {
        console.log(err);
      } finally {
        loadingRef.current = false;
      }
    };
    getRolls();
  }, [eventId]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        !loadingRef.current &&
        clientHeight + scrollTop >= scrollHeight - 10 &&
        rollSheetList.length < totalCnt
      ) {
        loadMoreData();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [rollSheetList.length, totalCnt, currentPage]);

  const loadMoreData = async () => {
    if (loadingRef.current || rollSheetList.length >= totalCnt) return;
    loadingRef.current = true;
    try {
      const response = await fetchRollSheets(eventId, currentPage, 8);
      if (response && response.rollSheetList) {
        setRollSheetList((prev) => [...prev, ...response.rollSheetList]);
        setCurrentPage((prev) => prev + 1);
        console.log("새 페이지:", currentPage);
      }
    } catch (err) {
      console.log(err);
    } finally {
      loadingRef.current = false;
    }
  };

  const [rollingModalOpen, setRollingModalOpen] = useState<boolean>(false);
  // const [fundingModalOpen, setFundingModalOpen] = useState<boolean>(false);

  // const [rollSheetList, setRollSheetList] = useState<RollSheetListProps[]>([]);
  // const [totalCnt, setTotalCnt] = useState<number>(0);
  // const [currentPage, setCurrentPage] = useState(0); // 스크롤이 닿았을 때 새롭게 데이터 페이지를 바꿀 상태
  // const [loading, setLoading] = useState(false); // 로딩 성공
  // const observerRef = useRef<IntersectionObserver>();

  // // 롤링페이퍼 리스트 무한스크롤 불러오기
  // const fetchMoreData = useCallback(async () => {
  //   if (loading || (totalCnt > 0 && rollSheetList.length >= totalCnt)) {
  //     // 로딩 중이거나 모든 데이터를 이미 로드한 경우 더 이상 데이터를 불러오지 않음
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const response = await fetchRollSheets(eventId, currentPage, 8);
  //     if (response) {
  //       setRollSheetList((prev) => [...prev, ...response.rollSheetList]);
  //       console.log("현재 페이지", currentPage + 1);
  //       if (response.rollSheetList.length < 8) {
  //         console.log("연결해제 전에");
  //         observerRef.current?.disconnect(); // 마지막 페이지일 경우 옵저버 중단
  //       } else {
  //         setLoading(false)
  //         setCurrentPage((prevPage) => prevPage + 1); // 데이터 로드가 성공적이면 페이지 번호 증가
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [eventId, currentPage, loading, totalCnt, rollSheetList.length]);

  // const onIntersect = useCallback(
  //   (entry: any, observer: any) => {
  //     if (entry.isIntersecting && !loading) {
  //       fetchMoreData();
  //     }
  //   },
  //   [fetchMoreData, loading]
  // );

  // const ref = useIntersect(onIntersect, {
  //   rootMargin: "200px",
  //   threshold: 0.1,
  // });

  const [selectedRoll, setSelectedRoll] = useState<RollSheetListProps>({
    nickname: "",
    content: "",
    backgroundImageThumbnailUrl: "",
    backgroundColor: "",
    font: "",
    fontColor: "",
    shape: "",
    rollSheetId: "",
  });

  // 카드 디테일 모달 오픈
  const handleCardClick = async (rollId: string) => {
    try {
      const response = await fetchRoll(rollId);
      setSelectedRoll(response);
      setRollingModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("롤링페이퍼 상세조회에 실패했습니다.");
    }
  };

  return (
    <>
      <b.Container $theme={theme}>
        {rollSheetList.length === 0 && <b.P>롤링페이퍼를 작성해주세요.</b.P>}
        <b.CardWrap>
          {rollSheetList.map((roll, index) => (
            <b.Card
              key={index}
              $bgColor={roll.backgroundColor}
              $font={roll.font}
              $fontColor={roll.fontColor}
              $bgImage={roll.backgroundImageThumbnailUrl}
              $shape={roll.shape}
              onClick={() => handleCardClick(roll.rollSheetId)}
            >
              <p>{roll.content}</p>
              <p>From. {roll.nickname}</p>
            </b.Card>
          ))}
        </b.CardWrap>
        {/* {<TargetRef ref={targetRef}>Loading...@@@@@@@@@@@@@@@@@@@@@@@</TargetRef>} */}
        {/* {rollSheetList.length < totalCnt && (
          )} */}
        {/* <div ref={ref}>Loading more...</div> */}
      </b.Container>

      {rollingModalOpen && selectedRoll && (
        <Modal
          name={selectedRoll.nickname}
          onClose={() => setRollingModalOpen(false)}
        >
          <b.CardDetail
            $bgColor={selectedRoll.backgroundColor}
            $font={selectedRoll.font}
            $fontColor={selectedRoll.fontColor}
            $bgImage={selectedRoll.backgroundImageThumbnailUrl}
            $shape={selectedRoll.shape}
          >
            {selectedRoll.content}
          </b.CardDetail>
        </Modal>
      )}
    </>
  );
};

export default Board;
