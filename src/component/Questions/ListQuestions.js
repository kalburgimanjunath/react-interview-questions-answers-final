import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
export default function ListQuestions({ questions }) {
  let count = 0;
  return (
    <div className="ideas-list">
      <h1>
        Questions in Total:
        {questions && questions.length ? questions.length : null}
      </h1>
      <ListGroup>
        {questions &&
          questions.map((item) => {
            count++;
            let rowclass = count % 5 == 0 ? 'even' : 'odd';
            return (
              <>
                <ListGroupItem
                  key={item.id}
                  className={rowclass == 'even' ? 'active' : ''}
                >
                  <ListGroupItemHeading>
                    {item.fields['question']}
                    <span className="bold">
                      &nbsp;{item.fields['category']}
                    </span>
                  </ListGroupItemHeading>

                  <ListGroupItemText>
                    {item.fields['description']}
                  </ListGroupItemText>
                </ListGroupItem>
              </>
            );
          })}
      </ListGroup>
    </div>
  );
}
