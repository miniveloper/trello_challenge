import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  color: ${(props) => props.theme.boardColor};
  font-size: 24px;
  left: 50vw;
  top: 80vh;
`;

function TrashCan() {
  return (
    <Droppable droppableId="Trash">
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Wrapper>
      )}
    </Droppable>
  );
}

export default TrashCan;
