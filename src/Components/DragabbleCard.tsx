import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

export interface IDraggableCard {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({ toDoId, toDoText, index, boardId }: IDraggableCard) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClickXmark = (event: React.MouseEvent<SVGElement>) => {
    setToDos((allBoards) => {
      const boardCopy = allBoards[boardId].slice();
      boardCopy.splice(index, 1);
      // console.log(boardCopy);

      // allBoards를 looping 돌려서 id가 boardId와 일치하는 경우 해당 board를 boardCopy로 바꿔준 뒤 반환해줘야 함
      if (allBoards.key === boardId) {
      }

      return { ...allBoards, boardCopy };
    });
  };
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
          <FontAwesomeIcon
            onClick={onClickXmark}
            icon={faXmark}
            color="#f15089"
          ></FontAwesomeIcon>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
